export const environment = {
  production: false,
  baseUrl: 'https://dev.kainonly.com',
  cdn: 'https://cdn.kainonly.com',
  upload: {
    url: 'https://cdn-1251113164.cos.ap-guangzhou.myqcloud.com',
    presignedUrl: 'uploader',
    size: 102400,
    storage: 'cos'
  },
  editorjs: {
    url: 'https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest',
    plugins: [
      'https://cdn.jsdelivr.net/npm/@editorjs/paragraph@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/header@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/underline@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/nested-list@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/image@latest',
      'https://cdn.jsdelivr.net/npm/@editorjs/table@latest'
    ]
  }
};
