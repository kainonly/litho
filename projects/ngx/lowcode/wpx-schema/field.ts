export interface Field {
  name: string;
  type: string;
  label: string;
  default: string;
  unique: boolean;
  required: boolean;
  private: boolean;
  reference: Reference;
  system: boolean;
}

export interface Reference {
  mode: string;
  target: string;
  to: string;
}
