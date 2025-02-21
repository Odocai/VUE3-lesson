// 这个文件会帮我们打包packages下的模块，最终打包出js文件

// node dev.js (要打包的名字 -f 打包的格式) === argv

// SyntaxError: Cannot use import statement outside a module
// node不能直接执行es6语法
// 解决方案： 1 文件名改为.mjs; 2 package.json中type改为“module”
import minimist from 'minimist';  //解析命令行参数
import {resolve, dirname} from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import esbuild from 'esbuild'; //开发用，生产用rollup


// node中的命令函参数通过process 来获取 process.argv
const args = minimist(process.argv.slice(2));

const target = args._[0] || "reactivity"; //打包哪个项目
const format = args.f || 'iife'; //打包后的模块化规范
// console.log(target, format);

// node中esm模块没有__dirname
const __filename = fileURLToPath(import.meta.url); //获取文件的绝对路径 file:XXXXX -> /XXX/XXX
const __dirname = dirname(__filename); //获取文件所在的文件夹路径
const require = createRequire(import.meta.url);

// 入口文件 根据命令行提供的路径进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);

const pkg = require(`../packages/${target}/package.json`);

// console.log("Entry file:", entry);

// 根据需要进行打包
esbuild.context({
    entryPoints: [entry], //入口
    outfile:resolve(__dirname,`../packages/${target}/dist/${target}.js`),//出口
    bundle: true, //reactivity -> shared 会打包到一起
    platform: "browser", // 打包后给浏览器使用
    sourcemap: true, //可以调试原代码
    format, //cjs esm iife(iife必须有名字，内部是返回一个自执行函数，此时用package.json的buildOptions的name)
    globalName:pkg.buildOptions?.name
}).then((ctx) => {
    console.log("start dev");
    return ctx.watch(); // 确保调用 watch 或 rebuild
  }).catch((err) => {
    console.error("Build failed:", err);
  });

/**
 * 搭建vue的开发环境
 * Step1:解析命令行参数
 * Step2:配置打包参数
 **/

