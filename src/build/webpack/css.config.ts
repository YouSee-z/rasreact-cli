

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

export const getCssLoaders = (dev: boolean = true) => {
  return {
    test: /\.(css|less)$/,
    use: [
      !dev && MiniCssExtractPlugin.loader,
      dev && 'style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env',
                {
                  ident: "postcss"
                },
              ],
            ],
          },
        }
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ].filter(Boolean),
  }
}

export const getCssPlugin = () => {
  return [
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      ignoreOrder: true,
    })
  ]
}
