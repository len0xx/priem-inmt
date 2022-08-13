import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            '$components': path.resolve('src/lib/components/index.ts')
        }
    },
    optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'],
    }
}

export default config
