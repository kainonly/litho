export interface LoginLog {
  time: Date;
  v: string;
  user: string;
  username: string;
  email: string;
  token_id: string;
  ip: string;
  detail: {
    isp: string;
    province: string;
    city: string;
    country: string;
  };
}
