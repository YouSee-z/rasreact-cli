

import webpack, { Stats } from 'webpack';
import { getCwdPath, loggerTiming, loggerError, loggerInfo, loggerSuccess } from '@/util'
import { loadFile } from '@/util/file'
import { getProConfig } from './webpack.pro.config'
import { getDevConfig } from './webpack.dev.config'
import { getCssLoaders, getCssPlugin } from './css.config'
import cacheConfig from './cache.config';
import { loadConfig } from '@/util/config';
import handleStats from "@/util/handleStats";
import { getAnalysisPlugin } from "@/build/webpack/analysis.config";
const openBrowser = require('react-dev-utils/openBrowser')
const clearConsole = require('react-dev-utils/clearConsole');

const WebpackDevServer = require('webpack-dev-server')

/**
 * @description:
 * @param {*} webpack 构建
 * @return {*}
 */
export const buildWebpack = (options: { analysis?: true } = {}) => {
  const { analysis } = options;

  loggerTiming('WEBPACK BUILD');

  const rewriteConfig = loadConfig();

  // TODO replace webpack-merge on webpack5
  const webpackConfig = getProConfig({
    ...rewriteConfig,
    cssLoader: getCssLoaders(false),
    plugins: [
      ...getCssPlugin(),
      ...(analysis ? getAnalysisPlugin() : []),
      ...(rewriteConfig.plugins || []),
    ],
    ...cacheConfig
  })

  // const compiler = webpack(smp.wrap(webpackConfig));
  const compiler = webpack(webpackConfig);

  try {
    compiler.run((err: any, stats: any) => {
      if (err) {
        loggerError(err);
      } else {
        handleStats(stats);
        loggerSuccess('WEBPACK SUCCESS!');
      }
      compiler.close(() => {
        loggerInfo('WEBPACK GENERATE CACHE');
      });
      loggerTiming('WEBPACK BUILD', false);
    });
  } catch (error) {
    loggerError(error as string | undefined)
  }
}

/**
 * @description: 
 * @param {*} webpack 开发环境
 * @return {*}
 */
export const devServerWebpack = () => {

  loggerTiming('WEBPACK DEV');

  const rewriteConfig = loadConfig();

  const webpackConfig = getDevConfig({
    cssLoader: getCssLoaders(true),
    ...rewriteConfig,
    ...cacheConfig
  })

  let firstOpen = false

  const host = webpackConfig?.devServer?.host || 'localhost'
  const port = webpackConfig?.devServer?.port || 8000
  const https = webpackConfig?.devServer?.https ? 'https' : 'http'
  const url = `${https}://${host}:${port}`

  const compiler = webpack(webpackConfig);

  const devServerOptions = {
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'error',
    },
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: false,
    ...webpackConfig?.devServer
  };

  const server = new WebpackDevServer(devServerOptions, compiler);

  compiler.hooks.done.tap('done', stats => {
    if (firstOpen) return
    clearConsole();
    loggerTiming('WEBPACK DEV', false);
    loggerInfo(`Starting server on ${url}`);
    openBrowser(url)
    firstOpen = true
  })

  server.start(() => { });
}
