import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
    rollupOptions: {
        input: {
            app: path.resolve('./', 'index.html'),
            playground: path.resolve('./', 'playground/index.html'),
        },
    },
    plugins: [react()],
})
