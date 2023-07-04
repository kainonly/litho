import appTools, { defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig<'rspack'>({
  runtime: {
    router: true,
    state: true
  },
  tools: {
    sass: {
      sourceMap: true
    },
    devServer: {
      client: {
        port: '8443'
      }
    }
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack'
    })
  ]
});
