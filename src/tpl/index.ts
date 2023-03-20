
import { loggerError, loggerSuccess, getDirPath, getCwdPath, loggerWarring } from '@/util'
import { loadFile, writeFile } from '@/util/file'
import download from 'download-git-repo'
export interface ITpl {
  tplUrl: string
  name: string
  desc: string
  org?: string
  downloadUrl?: string
  apiUrl?: string
}

const cacheTpl = '.botyCache'

/**
 * @description: 添加模板信息
 * @param {ITpl} params
 * @return {*}
 */
export const updateTpl = async (params: ITpl) => {
  const { tplUrl, name, desc } = params
  const { pathname } = new URL(tplUrl)
  let isExist = false
  try {
    const reTpl: ITpl = {
      tplUrl,
      name,
      desc
    }
    if (tplUrl.includes('github.com')) {
      reTpl.org = pathname.substring(1)
      reTpl.downloadUrl = 'https://codeload.github.com'
      reTpl.apiUrl = 'https://api.github.com'
    }

    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`)
    let file = [reTpl]
    if (tplConfig) {
      isExist = tplConfig.some(tpl => tpl.name === name)
      if (isExist) {
        file = tplConfig.map(tpl => {
          if (tpl.name === name) {
            return reTpl
          }
          return tpl
        })
      } else {
        file = [
          ...tplConfig,
          ...file
        ]
      }
    }
    writeFile(cacheTpl, '.tpl.json', file)
    loggerSuccess(`${isExist ? 'Update' : 'Add'} Template Successful!`)
  } catch (error) {
    loggerError(error as string | undefined)
  }
}

/**
 * @description: 获取模板列表
 * @param {*}
 * @return {*}
 */
export const getTplList = () => {
  try {
    const tplConfig = loadFile<ITpl[]>(`${cacheTpl}/.tpl.json`)
    if (tplConfig) {
      return tplConfig
    }
    loggerWarring('No template! Please add template first!')
    process.exit(1)
  } catch (error) {
    loggerError(error as string)
  }
}

export const loadTpl = (name: string, downloadUrl: string, path: string) => {
  download(`direct:${downloadUrl}`, getCwdPath(`./${path}`), (err: string) => {
    if (err) {
      loggerError(err)
    } else {
      loggerSuccess(`Download ${name} Template Successful!`)
    }
  })
}