import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import Rspack from '@rspack/core';
import path from 'path';
import postcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';

import { pluginSass } from '@rsbuild/plugin-sass';
import { name, dependencies as deps } from './package.json';

const { ModuleFederationPluginV1 } = Rspack.container;

export default defineConfig({
  plugins: [
    pluginSass(),
    pluginVue(),
  ],
  source: {
    // 指定入口文件
    entry: {
      index: './src/main.ts',
    },
    alias: {
      '@': './src',
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    define: {
      'process.env': JSON.stringify(process.env),
    },
    include: [{ not: /[\\/]core-js[\\/]/ }],
  },
  html: {
    // 设置 HTML 根节点的 id 为 'app'
    mountId: 'app',
  },
  server: {
    port: 8160,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
    },
  },
  output: {
    polyfill: 'usage',
    // minify: false,
    distPath: {
      css: 'css',
      font: 'fonts',
      js: 'js',
      image: 'img',
      svg: 'img',
    },
  },
  tools: {
    postcss(config) {
      config.postcssOptions?.plugins?.push(autoprefixer);

      config.postcssOptions?.plugins?.push(postcssImport());
    },
    rspack: {
      optimization: {
        minimize: false,
      },
      output: {
        publicPath: process.env.VUE_APP_PUBLIC_BASE_PATH,
        library: {
          name: `${name}-[name]`,
          type: 'umd',
        },
        chunkLoadingGlobal: `webpackJsonp_${name}`,
      },
      plugins: [
        new ModuleFederationPluginV1({
          name,
          // eager 为 true 此参数无意义
          shared: {
            vue: {
              singleton: true,
              requiredVersion: deps.vue,
              eager: true,
            },
          },
        }),
      ],
    },
  },
});
