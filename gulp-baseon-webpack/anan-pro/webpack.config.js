const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const htmlWebpackPlugin= new HtmlWebpackPlugin({
    template:path.join(__dirname,"./src/index.html"),
    filename:"index.html"
})
module.exports={
    mode:"production",
    plugins:[
        htmlWebpackPlugin
    ],
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },{
                test:/\.css$/,
                use:["style-loader","css-loader"]
            },{
                test:/\.scss$/,
                use:["style-loader","css-loader?modules=true&localIdentName=[path][name]-[local]-[hash:5]","sass-loader"]
            },//打包处理scss文件的loader ,用问号追加参数，其中有个固定的参数 叫modules 表示为普通的css样式表启用模块化
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
            
        ]
    },
    resolve: {
        extensions: [".js",".jsx",".json"],//这几个文件的后缀名，可以省略不写
        alias:{//别名符号配置
            "@": path.join(__dirname,"./src")
        }
    }
}