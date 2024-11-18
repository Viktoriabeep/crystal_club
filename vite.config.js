import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/css/login.css'
            ],
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Дозволяє доступ із Docker
        port: 5173, // Порт для Vite
        hmr: {
            host: 'crystal_club', // Домен, який використовує проект
            port: 5173,
        },
    },
});