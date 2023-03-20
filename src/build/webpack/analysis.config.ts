const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin; //代码分析

export const getAnalysisPlugin = () => {
  return [new BundleAnalyzerPlugin()];
};
