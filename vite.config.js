import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            '$components': 'src/lib/components/index.ts',
            '$components/*': 'src/lib/components/*'
        }
    },
    optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'],
    }
}

export default config
