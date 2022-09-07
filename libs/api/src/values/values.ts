export class Values {
  /**
   * 会话周期（秒）。用户在 1 小时 内没有操作，将结束会话。
   */
  session_ttl: number;

  /**
   * 登录锁定时间。锁定 15 分钟。
   */
  login_ttl: number;

  /**
   * 用户最大登录失败次数。有限时间（锁定时间）内连续登录失败 5 次，锁定帐号。
   */
  login_failures: number;

  /**
   * IP 最大登录失败次数。同 IP 连续 10 次登录失败后，锁定 IP（周期为锁定时间）。
   */
  ip_login_failures: number;

  /**
   * IP 白名单。白名单 IP 允许超出最大登录失败次数。
   */
  ip_whitelist: string[];

  /**
   * IP 黑名单。黑名单 IP 将禁止访问。
   */
  ip_blacklist: string[];

  /**
   * 密码强度
   * 0：无限制；
   * 1：需要大小写字母；
   * 2：需要大小写字母、数字；
   * 3：需要大小写字母、数字、特殊字符
   */
  pwd_strategy: 0 | 1 | 2 | 3 | number;

  /**
   * 密码有效期（天）
   * 密码过期后强制要求修改密码，0：永久有效
   */
  pwd_ttl: number;

  /**
   * 云平台
   * tencent：腾讯云；
   */
  cloud: string;

  /**
   * 腾讯云 API 密钥 Id，建议用子账号分配需要的权限
   */
  tencent_secret_id: string;

  /**
   * 腾讯云 API 密钥 Key
   */
  tencent_secret_key: string;

  /**
   * 腾讯云 COS 对象存储 Bucket（存储桶名称）
   */
  tencent_cos_bucket: string;

  /**
   * 腾讯云 COS 对象存储所属地域，例如：ap-guangzhou
   */
  tencent_cos_region: string;

  /**
   * 腾讯云 COS 对象存储预签名有效期，单位：秒
   */
  tencent_cos_expired: number;

  /**
   * 腾讯云 COS 对象存储上传大小限制，单位：KB
   */
  tencent_cos_limit: number;

  /**
   * 办公平台
   * feishu：飞书
   */
  office: string;

  /**
   * 飞书应用 ID
   */
  feishu_app_id: string;

  /**
   * 飞书应用密钥
   */
  feishu_app_secret: string;

  /**
   * 飞书事件订阅安全校验数据密钥
   */
  feishu_encrypt_key: string;

  /**
   * 飞书事件订阅验证令牌
   */
  feishu_verification_token: string;

  /**
   * 第三方免登授权码跳转地址
   */
  redirect_url: string;

  /**
   * 公共电子邮件服务 SMTP 地址
   */
  email_host: string;

  /**
   * SMTP 端口号（SSL）
   */
  email_port: number;

  /**
   * 公共邮箱用户，例如：support@example.com
   */
  email_username: string;

  /**
   * 公共邮箱用户密码
   */
  email_password: string;

  /**
   * 开放服务地址
   */
  openapi_url: string;

  /**
   * 开放服务应用认证 Key
   * API 网关应用认证方式 https://cloud.tencent.com/document/product/628/55088
   */
  openapi_key: string;

  /**
   * 开放服务应用认证密钥
   */
  openapi_secret: string;

  /**
   * 自定义
   */
  [key: string]: any;
}
