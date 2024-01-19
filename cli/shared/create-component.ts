import { ensureDirSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { lightGreen, lightBlue } from 'kolorist'
import genCoreTemplate from '../src/template/core'
import { genTypesTemplate } from '../src/template/types'
import { genStyleTemplate } from '../src/template/style'
import { genTestTemplate } from '../src/template/test'
import { genIndexTemplate } from '../src/template'

export interface CompentMeta {
  name: string
  title: string
  category: string
}
const WriteFileOptions = 'utf-8' as BufferEncoding

export default function createComponent(meta: CompentMeta) {
  const { name } = meta
  //name 应当要做一些检测
  //拼接组件目录
  const componentDir = resolve('../src', name)
  //其他核心的文件目录：组件源文件，类型，样式，测试
  const compsSrcDir = resolve(componentDir, 'src')
  const styleDir = resolve(componentDir, 'style')
  const testDir = resolve(componentDir, 'test')

  ensureDirSync(compsSrcDir)
  ensureDirSync(styleDir)
  ensureDirSync(testDir)
  //核心文件-组件文件

  const coreFilePath = resolve(compsSrcDir, name) + '.tsx'
  // console.log(genCoreTemplate(name),coreFilePath)
  writeFileSync(coreFilePath, genCoreTemplate(name))
  //文件和内容创建
  //创建成功通知
  console.log(lightBlue(`✅组件${name}目录创建完毕`))
  console.log(lightGreen(`✅组件目录${componentDir}目录创建完毕`))

  const typesFilePath = resolve(compsSrcDir, name) + '-types.ts'
  writeFileSync(typesFilePath, genTypesTemplate(name), WriteFileOptions)
  console.log(lightGreen(`✅组件类型${name}声明文件创建完毕`))

  //样式
  const styleFilePath = styleDir + `/${meta.name}.scss`
  writeFileSync(styleFilePath, genStyleTemplate(name), WriteFileOptions)
  console.log(lightGreen(`✅组件样式${name}声明文件创建完毕`))

  //测试
  const testFilePath = testDir + `/${meta.name}.test.ts`
  writeFileSync(testFilePath, genTestTemplate(name), WriteFileOptions)
  console.log(lightGreen(`✅测试${name}声明文件创建完毕`))

  //索引
  const indexFilePath = componentDir + '/index.ts'
  writeFileSync(indexFilePath, genIndexTemplate(name), WriteFileOptions)
  console.log(lightGreen(`✅索引${name}文件创建完毕`))
}
