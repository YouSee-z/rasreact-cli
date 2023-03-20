

export default {
  configFile: false, // 禁止读取 babel 配置文件
  babelrc: false, // 禁止读取 babel 配置文件
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve("@babel/preset-react")
  ],
}