export interface ImageConfig {
  resolve: (done: (data: ImageData) => void) => void;
  change: () => void;
}

export interface ImageData {
  assets: string;
  url: string;
}
