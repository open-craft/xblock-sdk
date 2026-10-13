import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

interface AppConfig {
    entry: Record<string, string>;
    outDir: string;
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const libs: Record<string, AppConfig> = {
        {{cookiecutter.short_name}}: {
            entry: {
                cardCarouselStudent: resolve(
                    import.meta.dirname,
                    'src/card/{{cookiecutter.short_name}}/student-ui/main.tsx',
                ),
                cardCarouselStudio: resolve(
                    import.meta.dirname,
                    'src/card/{{cookiecutter.short_name}}/studio-ui/main.tsx',
                ),
            },
            outDir: resolve(__dirname, '../src/{{cookiecutter.short_name}}/public'),
        },
    };

    const xblock = process.env.XBLOCK;
    if (!xblock || !(xblock in libs)) {
        console.error(`Invalid XBLOCK environment variable: ${xblock}`);
        console.error(
            'Set it to the XBlock you wish to build. Available options:\n',
        );
        for (const key in libs) {
            console.error(`  ${key}`);
        }
        console.error('\nFor example: export XBLOCK={{cookiecutter.short_name}}');
        process.exit(1);
    }

    return {
        define: {
            global: 'globalThis',
            // Don't force NODE_ENV in test mode so vitest can set it to 'test'
            ...(mode !== 'test' && {
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
        },
        root: 'src',
        plugins: [react()],
        css: {
            lightningcss: {
                errorRecovery: true, // Otherwise lightningcss fails with var() usage in media queries.
            },
        },
        build: {
            cssMinify: 'lightningcss',
            lib: {
                entry: libs[xblock].entry,
                formats: ['es'],
            },
            outDir: libs[xblock].outDir,
            emptyOutDir: true,
        },
        test: {
            globals: true,
            environment: 'jsdom',
        },
        resolve: {
            alias: {
                '@': resolve(import.meta.dirname, 'src'),
            },
        },
    };
});
