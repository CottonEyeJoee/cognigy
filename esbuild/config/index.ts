import { ServeOptions, BuildOptions, Loader } from 'esbuild'
// import envPlugin from '../plugins/envPlugin';
import 'dotenv/config'

type ILoader = {
	[key: string]: Loader
}

export const DEV_SERVER_PORT = 3000
export const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`
export const PUBLIC_PATH = 'public'
export const HTML_COMMENTS = /<!--[\s\S]*?-->/g
export const DEV_LINK_TAG = `<link rel="stylesheet" href="http://localhost:8080/serve/index.css" />`
export const DEV_SCRIPT_TAG = `<script src="http://localhost:8080/serve/index.js" type="module"></script>`
export const BUILD_LINK_TAG = `<link rel="stylesheet" href="index.css">`
export const BUILD_SCRIPT_TAG = `<script src="index.js" type="module"></script>`

const define = {
	'process.env.API_ENDPOINT_URI': JSON.stringify(process.env.API_ENDPOINT_URI),
	'process.env.API_TOKEN': JSON.stringify(process.env.API_TOKEN),
}

const serveLoader: ILoader = {
	'.png': 'dataurl',
	'.jpg': 'dataurl',
	'.webp': 'dataurl',
	'.jpeg': 'dataurl',
	'.gif': 'dataurl',
	'.svg': 'dataurl',
}

const buildLoader: ILoader = {
	'.png': 'file',
	'.jpg': 'file',
	'.webp': 'file',
	'.jpeg': 'file',
	'.gif': 'file',
	'.svg': 'file',
}

export const serveOptions: ServeOptions = {
	servedir: 'www',
	host: '127.0.0.1',
	port: 8080,
}

export const transformOptions: BuildOptions = {
	entryPoints: ['src/index.tsx'],
	outdir: 'www/serve',
	bundle: true,
	format: 'esm',
	inject: ['esbuild/config/react-shim.ts'],
	loader: serveLoader,
	// plugins: [envPlugin],
	define,
}

export const buildOptions: BuildOptions = {
	entryPoints: ['src/index.tsx'],
	outdir: 'build',
	bundle: true,
	sourcemap: true,
	minify: true,
	format: 'esm',
	inject: ['esbuild/config/react-shim.ts'],
	target: ['es6'],
	loader: buildLoader,
}
