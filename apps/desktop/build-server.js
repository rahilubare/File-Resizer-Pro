const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['../web/build/server/index.js'],
    bundle: true,
    outfile: 'server.cjs',
    platform: 'node',
    external: [
        'electron',
        '@auth/core',
        '@hono/auth-js',
        '@neondatabase/serverless',
        'argon2',
        'hono',
        'react-router-hono-server',
        'serialize-error',
        'ws'
    ],
    loader: { '.ts': 'ts' },
    format: 'esm',
    banner: {
        js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
    },
}).catch(() => process.exit(1));
