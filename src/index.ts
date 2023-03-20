
import { loggerError } from './util'
import { checkVersion as selfCheckVersion } from './util/npm'
import { getEslint } from './eslint'

import { buildWebpack as selfBuildWebpack, devServerWebpack as selfDevWebpack } from './build/webpack'
import { buildRollup as selfBuildRollup } from './build/rollup'
type Error = undefined | string
// eslint 校验
export const execEslint = async () => {
  await getEslint()
}

// webpack 构建
export const buildWebpack = async () => {
  try {
    await getEslint()
    await selfBuildWebpack()
  } catch (error) {
    loggerError(error as Error)
  }
}

// webpack 产物分析
export const analysisWebpack = async () => {
  try {
    await selfBuildWebpack({ analysis: true })
  } catch (error) {
    loggerError(error as Error)
  }
}

// webpack 开发
export const devServerWebpack = async () => {
  try {
    await selfDevWebpack()
  } catch (error) {
    loggerError(error as Error)
  }
}

// rollup 构建
export const buildRollup = async () => {
  try {
    await getEslint()
    await selfBuildRollup()
  } catch (error) {
    loggerError(error as Error)
  }
}

export const checkVersion = async () => {
  await selfCheckVersion()
}
