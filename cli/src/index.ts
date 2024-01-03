import { Command } from 'commander'
import * as inquirer from 'inquirer'
import { red } from 'kolorist'
import { onCreate } from '../command/create'

// _创建命令对象
const cmd = new Command()
//注册命令，参数以及回调函数
//tsnd ./src/index.ts create --type component
cmd
  .command('create')
  .description('创建一个组件模版配置文件')
  //添加命令参数-t或者 --type ，<必填>
  .option('-t --type <type>', 'component,lib-entry')
  .action(onCreate)
//执行命令行参数解析
cmd.parse()
