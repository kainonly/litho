export interface Queue {
  project: string;
  name: string;
  description: string;
  subjects: string[];
  max_consumers?: number;
  max_msgs?: number;
  max_bytes?: number;
  max_age?: number;
}
