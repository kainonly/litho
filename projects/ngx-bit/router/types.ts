export interface BreadcrumbOption {
  name: string | Record<string, string>;
  key: string;
  router: boolean;
}

export interface RouterData {
  resource: Record<string, unknown>;
  router: Record<string, unknown>;
}
