//引入vite导出的build方法，用它来创建
const { defineConfig, build } = require('vite')
const path = require('path')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')
const fsExtra = require('fs-extra')
const fs = require('fs')

//基础配置
const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [vue(), vueJsx()]
})
//入口文件设置
//输出目录
const entryFile = path.resolve(__dirname, './entry.ts')

const componentsDir = path.resolve(__dirname, '../src')

const outputDir = path.resolve(__dirname, '../build')

//rollup配置
const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}
//生成package
const createPackageJson = name => {
  const fileStr = `{
        "name": "${name ? name : 's-ui'}",
        "version": "0.0.0",
        "main":"${name ? 'index.umd.js' : 's-ui.umd.js'}",
        "module":"${name ? 'index.mjs' : 's-ui.mjs'}",
        "author":"sqf",
        "license":"ISC"
    }`
  if (name) {
    fsExtra.outputFile(
      path.resolve(outputDir, `${name}/package.json`),
      fileStr,
      'utf-8'
    )
  } else {
    //全量
    fsExtra.outputFile(
      path.resolve(outputDir, 'package.json'),
      fileStr,
      'utf-8'
    )
  }
}

//执行创建
//全量构建
const buildAll = async () => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: entryFile,
        name: 's-ui',
        fileName: 's-ui',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  })
  //生成package.json
  createPackageJson()
}

const buildSingle = async name => {
  await build({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(componentsDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outputDir, name)
    }
  })
  //生成package.json
  createPackageJson(name)
}

const isDirFn = comDir => {
  return new Promise((resolve, reject) => {
    fs.stat(comDir, (err, stats) => {
      if (err) {
        return reject(false)
      }
      const isDirectory = stats.isDirectory()
      resolve(isDirectory)
    })
  })
}
const buildLib = async () => {
  await buildAll()
  //遍历目录
  const fileNames = fs
    .readdirSync(componentsDir)
    .filter(name => {
      //只要目录不要文件，且饱含index
      const comDir = path.resolve(componentsDir, name)
      const isDir = fs.statSync(comDir).isDirectory()
      const flag = isDir && fs.readdirSync(comDir).includes('index.ts')
      return flag
    })
    .filter(name => {
      buildSingle(name)
    })
}

buildLib()
