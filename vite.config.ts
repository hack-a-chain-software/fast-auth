import { resolve } from 'path';
import { defineConfig } from 'vite';
import Pages from 'vite-plugin-pages';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';

const inject = require('@rollup/plugin-inject');

export default defineConfig({
	plugins: [
		react(),
		reactRefresh(),
		Pages({
			pagesDir: 'src/pages',
      importMode: () => 'sync',
		}),
		{
			...inject({
				global: [
					require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
					'global',
				],
				process: [
					require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
					'process',
				],
				Buffer: [
					require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
					'Buffer',
				],
			}),
			enforce: 'post',
		},
	],
	define: {
		'process.env': {},
	},
	optimizeDeps: {
		include: ['buffer', 'process'],
	},
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql/, ""),
      },
    },
  },
	resolve: {
		alias: {
			util: 'util',
			process: 'process/browser',
			'@': resolve(__dirname, './src'),
		},
	},
});
