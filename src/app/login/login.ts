import { Component, DestroyRef, ElementRef, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { Global, SharedModule } from '@shared';
import { Any } from '@shared/models';

/** 登录方式 */
type LoginMode = 'email' | 'sms';

/** 粒子形状类型 */
enum ParticleShape {
  Dot,
  Line,
  Dash
}

/** 粒子数据结构 */
interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  angle: number;
  angleSpeed: number;
  radius: number;
  size: number;
  length: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: ParticleShape;
}

@Component({
  standalone: true,
  imports: [SharedModule],
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.less']
})
export class Login implements OnInit, OnDestroy {
  global = inject(Global);

  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notification = inject(NzNotificationService);

  @ViewChild('particlesCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // 登录模式
  loginMode: LoginMode = 'email';

  // 邮箱登录表单
  emailForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    remember: [true]
  });

  // 短信登录表单
  smsForm: FormGroup = this.fb.group({
    phonePrefix: ['+86'],
    phone: [null, [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]],
    code: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
    remember: [true]
  });

  loading = false;
  countdown = 0;
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  // Canvas 相关
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private dpr = 1;

  // 粒子配置
  private readonly PARTICLE_COUNT = 200;
  private readonly PARTICLE_COLOR = { r: 66, g: 133, b: 244 };

  // 鼠标状态
  private mouse = { x: -1000, y: -1000, active: false };
  private readonly MOUSE_RADIUS = 120;
  private readonly REPEL_FORCE = 0.15;
  private readonly RETURN_FORCE = 0.02;
  private readonly FRICTION = 0.94;

  private easeOutQuad(t: number): number {
    return t * (2 - t);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.mouse.x = event.clientX * this.dpr;
    this.mouse.y = event.clientY * this.dpr;
    this.mouse.active = true;
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.mouse.active = false;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.redistributeParticles();
  }

  ngOnInit(): void {
    this.initCanvas();
    this.initParticles();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.countdownTimer !== null) {
      clearInterval(this.countdownTimer);
    }
  }

  /** 切换登录方式 */
  switchLoginMode(mode: LoginMode): void {
    this.loginMode = mode;
  }

  /** 发送验证码 */
  sendCode(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (this.countdown > 0 || !this.smsForm.get('phone')?.valid) {
      return;
    }

    // TODO: 调用发送验证码 API
    const phone = this.smsForm.get('phone')?.value;
    const prefix = this.smsForm.get('phonePrefix')?.value;
    console.log(`发送验证码到: ${prefix}${phone}`);

    // 开始倒计时
    this.countdown = 60;
    this.countdownTimer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0 && this.countdownTimer) {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
      }
    }, 1000);

    this.notification.success('验证码已发送', '请查收短信');
  }

  /** 邮箱登录提交 */
  submitEmail(data: Any): void {
    this.loading = true;
    this.global
      .login(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigateByUrl('/jobs');
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  /** 短信登录提交 */
  submitSms(data: Any): void {
    this.loading = true;
    // TODO: 调用短信登录 API
    console.log('短信登录数据:', data);

    // 模拟登录
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('/jobs');
    }, 1000);
  }

  ssoLogin(type: string): void {
    console.log(`SSO 登录类型: ${type}`);
  }

  // ========== Canvas 粒子动画相关 ==========

  private initCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.dpr = window.devicePixelRatio || 1;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width * this.dpr;
    this.canvas.height = height * this.dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.ctx.scale(this.dpr, this.dpr);
  }

  private initParticles(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle(width, height));
    }
  }

  private createParticle(maxX: number, maxY: number): Particle {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    const shapeRand = Math.random();
    let shape: ParticleShape;
    let size: number;
    let length: number;

    if (shapeRand < 0.5) {
      shape = ParticleShape.Dot;
      size = Math.random() * 2 + 1.5;
      length = size;
    } else if (shapeRand < 0.8) {
      shape = ParticleShape.Line;
      size = 1.5;
      length = Math.random() * 6 + 3;
    } else {
      shape = ParticleShape.Dash;
      size = Math.random() * 1.5 + 1;
      length = Math.random() * 10 + 5;
    }

    const angle = Math.random() * Math.PI * 2;
    const angleSpeed = (Math.random() - 0.5) * 0.002;
    const radius = Math.random() * 30 + 10;

    return {
      x,
      y,
      originX: x,
      originY: y,
      vx: 0,
      vy: 0,
      angle,
      angleSpeed,
      radius,
      size,
      length,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      opacity: Math.random() * 0.3 + 0.15,
      shape
    };
  }

  private redistributeParticles(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.particles.forEach(p => {
      p.originX = Math.random() * width;
      p.originY = Math.random() * height;
    });
  }

  private animate(): void {
    this.update();
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  private update(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.particles.forEach(particle => {
      particle.angle += particle.angleSpeed;
      const radialX = Math.cos(particle.angle) * particle.radius * 0.01;
      const radialY = Math.sin(particle.angle) * particle.radius * 0.01;

      if (this.mouse.active) {
        const dx = this.mouse.x / this.dpr - particle.x;
        const dy = this.mouse.y / this.dpr - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.MOUSE_RADIUS && distance > 0) {
          const normalizedDist = distance / this.MOUSE_RADIUS;
          const force = this.easeOutQuad(1 - normalizedDist) * this.REPEL_FORCE;
          const angle = Math.atan2(dy, dx);

          particle.vx -= Math.cos(angle) * force * 8;
          particle.vy -= Math.sin(angle) * force * 8;
        }
      }

      const returnDx = particle.originX - particle.x;
      const returnDy = particle.originY - particle.y;
      particle.vx += returnDx * this.RETURN_FORCE;
      particle.vy += returnDy * this.RETURN_FORCE;

      particle.vx += radialX;
      particle.vy += radialY;

      particle.vx *= this.FRICTION;
      particle.vy *= this.FRICTION;

      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.rotation += particle.rotationSpeed;

      if (particle.originX < 0) particle.originX = width;
      if (particle.originX > width) particle.originX = 0;
      if (particle.originY < 0) particle.originY = height;
      if (particle.originY > height) particle.originY = 0;
    });
  }

  private draw(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, width, height);

    this.particles.forEach(particle => {
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate(particle.rotation);

      const { r, g, b } = this.PARTICLE_COLOR;
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particle.opacity})`;

      switch (particle.shape) {
        case ParticleShape.Dot:
          this.ctx.beginPath();
          this.ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          this.ctx.fill();
          break;

        case ParticleShape.Line:
          this.ctx.fillRect(-particle.length / 2, -particle.size / 2, particle.length, particle.size);
          break;

        case ParticleShape.Dash:
          const w = particle.length;
          const h = particle.size;
          const r2 = h / 2;
          this.ctx.beginPath();
          this.ctx.moveTo(-w / 2 + r2, -h / 2);
          this.ctx.lineTo(w / 2 - r2, -h / 2);
          this.ctx.arc(w / 2 - r2, 0, r2, -Math.PI / 2, Math.PI / 2);
          this.ctx.lineTo(-w / 2 + r2, h / 2);
          this.ctx.arc(-w / 2 + r2, 0, r2, Math.PI / 2, -Math.PI / 2);
          this.ctx.fill();
          break;
      }

      this.ctx.restore();
    });
  }
}
