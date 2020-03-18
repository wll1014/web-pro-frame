const { src, dest } = require('gulp');
const babel = require("gulp-babel")
function process_src (){
    return src('src/*.js')
    .pipe(babel())
    .pipe(dest('dist/'))
}

exports.default = process_src