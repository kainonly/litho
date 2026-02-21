export interface Resource {
  id: string;
  label: string;
  actions: ResourceAction[];
}

export interface ResourceAction {
  label: string;
  value: string;
}
