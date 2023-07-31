import { WpxFile } from '@weplanx/ng/filebrowser';

export interface Picture extends WpxFile {
  categories: string[];
  query?: string;
  process?: PictureProcess;
}

export interface PictureProcess {
  mode: number;
  cut: { x: number; y: number; w: number; h: number };
  zoom: { w: number; h: number };
}
