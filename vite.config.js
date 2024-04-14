import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@/gql': './src/graphql/graphql.ts',
        },
    },
    rollupOptions: {
        input: {
            app: path.resolve('./', 'index.html'),
            playground: path.resolve('./', 'playground/index.html'),
        },
    },
    plugins: [react()],
})
