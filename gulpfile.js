const gulp = require("gulp")
const typescript = require("gulp-typescript")

gulp.task("typescript",()=>{
	return gulp.src("./src/**/*.ts")
	.pipe(typescript({
		target: "ES6",
		module: "commonjs"
	}))
	.pipe(gulp.dest("./build"))
})

gulp.task("default",["typescript"])

gulp.task("watch",["typescript"],()=>{
	gulp.watch("./src/**/*.ts",["typescript"])
})