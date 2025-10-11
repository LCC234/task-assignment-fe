import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';
import svgr from 'vite-plugin-svgr';
import importMetaEnv from "@import-meta-env/unplugin";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(),
    svgr(),
    importMetaEnv.vite({ example: ".env.example" })
    ],
    resolve: {
        alias: {
            '@styles': resolve(__dirname, 'src/styles'),
        }
    }
})

