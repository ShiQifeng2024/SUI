import * as inquirer from 'inquirer'
import { red } from 'kolorist'
const CREATE_TYPES = ['component', 'lib-entry']

//组件分类
const DOC_CATEGORY = ['通用', '导航', '反馈', '数据录入', '数据显示']
export const onCreate = async (args = { type: '' }) => {
  console.log(args)
  //先容错 是否有输入type
  //输入则创建内容，给用户交互选项，给用户列表选项
  let { type } = args
  if (!type) {
    const result = await inquirer.prompt([
      {
        //获取属性名字
        name: 'type',
        //交互方式
        type: 'list',
        //提示信息
        message: '(必填)请选择创建类型',
        choices: CREATE_TYPES,
        default: 0
      }
    ])
    type = result.type
  }
  //用户有输入，但输错了，重新判断
  // console.log(CREATE_TYPES,!CREATE_TYPES.includes(type))
  if (!CREATE_TYPES.includes(type)) {
    console.log(
      red(
        `当前类型仅支持：${CREATE_TYPES.join(
          ', '
        )},您输入的是："${type}",请重新输入`
      )
    )
    return onCreate()
  }

  try {
    switch (type) {
      case 'component':
        //如果是组件
        //收集组件信息
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '(必填)请输入组件name，将文件名和文件夹名称',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件name不能为空'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '(必填)请输入组件中文名称,将用作文档列表中显示',
            validate(value: string) {
              if (value.trim() === '') {
                return '组件名称不能为空'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '请选择组件的分类，将用作文档列表分类',
            choices: DOC_CATEGORY
          }
        ])
        createComponent(info)
        break
      default:
        break
    }
  } catch (error) {}
}

function createComponent(info) {
  console.log(info)
}
