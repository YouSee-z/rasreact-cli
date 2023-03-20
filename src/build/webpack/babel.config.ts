
export default {
  loader: 'babel-loader?cacheDirectory=true',
  options: {
    configFile: false, // 禁止读取 babel 配置文件
    babelrc: false, // 禁止读取 babel 配置文件
    presets: [
      require.resolve('@babel/preset-env'),
      [
        require.resolve("@babel/preset-react"),
        {
          "runtime": "automatic"
        }
      ],
      [
        require.resolve("@babel/preset-typescript"),
        {
          "isTSX": true,
          "allExtensions": true
        }
      ],
    ],
  },
}