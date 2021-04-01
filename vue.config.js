module.exports = {

    transpileDependencies: ['vue-class-component'],
    configureWebpack: {
        performance: {
            hints: 'warning',
            // 入口起点的最大体积
            maxEntrypointSize: 50000000,
            // 生成文件的最大体积
            maxAssetSize: 30000000,
            // 只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js')
            }
        }
    },
    assetsDir: 'static',
    publicPath: process.env.NODE_ENV === 'production'
    ? './tsEchartsMap/'
    : '/tsEchartsMap/',
    outputDir: 'dist',
    devServer: {
        // hot:true,
        // host: 'localhost',
        port: 8888,
        open: true,
        // https: false
    }
}