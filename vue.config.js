var webpack = require('webpack')
module.exports = {
  configureWebpack: {
    externals: {
      'returnCitySN': 'returnCitySN'
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  transpileDependencies: ['vuex-persist'],
  publicPath: '/console/',
  outputDir: process.env.outputDir
}
