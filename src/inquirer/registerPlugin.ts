/*

 * @Description: 注册Plugin组件
 */

import inquirer from 'inquirer';
import { existNpm, npmInstall } from '@/util/npm'
import { loggerSuccess } from '@/util';
import { updatePlugin } from '@/plugin'

const promptList = [
  {
    type: 'input',
    message: '请输入插件名称:',
    name: 'pluginName',
    default: 'fe-plugin-eslint',
    validate(v: string) {
      return v.includes('fe-plugin-')
    },
    transformer(v: string) {
      return `@ras-design/${v}`
    }
  }
];

export const registerPlugin = () => {
  inquirer.prompt(promptList).then(async (answers: any) => {
    const { pluginName } = answers
    const exist = await existNpm(`@ras-design/${pluginName}`)
    if (exist) {
      npmInstall(`@ras-design/${pluginName}`)
      loggerSuccess(`@ras-design/${pluginName} register successful!`)
      updatePlugin({ name: `@ras-design/${pluginName}` })
    }
  })
}