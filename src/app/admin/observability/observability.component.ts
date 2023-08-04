import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-observability',
  templateUrl: './observability.component.html'
})
export class ObservabilityComponent implements OnInit {
  options = ['APM', 'MONGODB', 'REDIS', 'NATS'];
  index = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.index = this.options.indexOf(data['type'].toUpperCase());
    });
  }

  link(index: number): void {
    this.router.navigate(['/admin', 'observability', this.options[index].toLowerCase()]);
  }
}
