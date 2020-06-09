const path = require("path");
module.exports = {
  runtimeCompiler: true,
  // 部署应用时的基本 URL
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",

  // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",

  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  // assetsDir: '',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  // indexPath: 'index.html',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  // filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: true,

  configureWebpack: config => {
    // if (process.env.NODE_ENV === "production") {
    //   // 为生产环境修改配置...
    //   config.mode = "production";
    // } else {
    //   // 为开发环境修改配置...
    //   config.mode = "development";
    // }
    // Object.assign(config, {
    // 开发生产共同配置
    config.resolve = {
      extensions: [".js", ".json", ".vue"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@p": path.resolve(__dirname, "./src/pages")
      } // 别名配置
      // }
    };
  },

  // 是否使用包含运行时编译器的 Vue 构建版本
  // runtimeCompiler: false,

  // Babel 显式转译列表
  // transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  // crossorigin: '',

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: false,

  // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象

  // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
  chainWebpack: config => {
    // const svgRule = config.module.rule("svg");
    // svgRule.uses.clear();
    // svgRule
    //   .use("svg-sprite-loader")
    //   .loader("svg-sprite-loader")
    //   .options({
    //     symbolId: "icon-[name]",
    //     include: ["./src/icons"]
    //   });
    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },

  // css的处理
  css: {
    // 当为true时，css文件名可省略 module 默认为 false
    // modules: false,
    requireModuleExtension: true,
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    // 默认生产环境下是 true，开发环境下是 false
    extract: true,
    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,
    //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
    loaderOptions: {
      sass: {
        prependData: `@import "./src/styles/main.scss";`
      },
      css: {},
      less: {}
    }
  },

  // 所有 webpack-dev-server 的选项都支持
  devServer: {
    open: false, // 编辑完成是否打开网页
    host: "0.0.0.0", // 指定使用的地址，默认localhost 0.0.0.0代表可以被外界访问
    port: 8080, //访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      // "/qyq": {
      //   // target: "http://192.168.1.142:8081", //API服务器的地址
      //   target: "http://192.168.1.151:9000", //API服务器的地址
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/qyq": ""
      //   },
      "/api": {
        // target: "http://192.168.1.151:9001", //API服务器的地址
        // target: "http://192.168.1.205:9000", //API服务器的地址
        target: "http://2449i4t062.zicp.vip:11770", //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/hr": {
        // target: "http://192.168.1.142:8081", //API服务器的地址
        target: "http://192.168.1.198:8091", //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          "^/hr": ""
        }
      },
      "/zxy": {
        // target: "http://192.168.1.142:8081", //API服务器的地址
        target: "http://localhost:8085", //API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          "^/zxy": ""
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
    // before: app => {}
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require("os").cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
};
