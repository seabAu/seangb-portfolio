/* https://vite.dev/config/server-options.html */
// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import reactRefresh from "eslint-plugin-react-refresh";

import dotenv from 'dotenv';
dotenv.config(); // load env vars from .env

// https://vitejs.dev/config/
const config = defineConfig( {
    mode: 'development',
    plugins: [
        // {
        //     name: 'treat-js-files-as-jsx',
        //     async transform(code, id) {
        //         if (!id.match(/src\/.*\.js$/)) return null;
        //         // Use the exposed transform from vite, instead of directly
        //         // transforming with esbuild
        //         return transformWithEsbuild(code, id, {
        //             loader: 'jsx',
        //             jsx: 'automatic',
        //         });
        //     },
        // },
        // {
        //     name: "react-refresh",
        //     reactRefresh,
        // },
        react( {
            // Add this line
            include: "**/*.jsx",
        } )
    ],
    define: {
        'process.env': process.env
    },
    // rest of configuration
    // https://github.com/vitejs/vite/discussions/3448#discussioncomment-749919
    esbuild: {
        loader: 'jsx',
        // include: /\.[jt]sx?$/,
        include: /src\/.*\.jsx?$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: []
    },
    optimizeDeps: {
        force: true,
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
            plugins: [
                {
                    name: 'load-js-files-as-jsx',
                    setup ( build ) {
                        build.onLoad( { filter: /src\/.*\.js$/ }, async ( args ) => ( {
                            loader: 'jsx',
                            contents: await fs.readFile( args.path, 'utf8' )
                        } ) );
                    }
                }
            ]
        }
    },
    // Build options
    build: {
        // to make tests faster
        manifest: true,
        rollupOptions: {
            // Overwrite default .html entry
            input: './src/App.jsx'
        },
        minify: false,
        // base: '',
        // root: '..',
        outDir: '../public'
        /* Enables this project file structure: 
         * - client
         * - server
         * - public (BUILD FOLDER)
         * - node_modules
         * - index.js
         */
    },
    preview: {
        port: 8080,
    },
    server: {
        // hmr: true,
        watch: {
            usePolling: true,
        },
        host: true, // needed for the Docker Container port mapping to work
        port: 3000,
        open: true, // automatically open the app in the browser
        origin: 'http://127.0.0.1:3000',
        proxy: {
            "/api": {
                target: "http://localhost:4000/api",
                changeOrigin: true,
                rewrite: ( path ) => path.replace( /^\/api/, '' ),
                secure: false,
            }
        }
    }
} );

export default config;