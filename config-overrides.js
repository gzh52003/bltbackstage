const path = require('path')
// module.exports = function(config,env){
//     console.log('env',env);
//     console.log(config);

//     // 修改webpack配置
//     config.resolve.alias['@'] = path.resolve(__dirname,'src')

//     return config
// }
const {override,addDecoratorsLegacy,addWebpackAlias,fixBabelImports,useBabelRc,disableEsLint} = require('customize-cra')


module.exports = override(
    // 支持装饰器
    addDecoratorsLegacy(), 
    // 配置路径别名
    addWebpackAlias({
        '@':path.join(__dirname,'src'), // D:\app\xx, /app/xxx
        '#': path.join(__dirname,'src/components'),
        '~': path.join(__dirname,'src/views')
    }), // 添加路径别名

    // ui框架按需加载
    fixBabelImports('import',{
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css" // `style: true` 会加载 less 文件
    }),

    // 使用.babelrc配置
    // useBabelRc(),

    // 禁用eslint
    disableEsLint()
)