## target

```js
target:"web" //默认值
```

设置打包结果最终要运行的环境，常用值有

- web: 打包后的代码运行在web环境中
- node：打包后的代码运行在node环境中
- 其他：https://www.webpackjs.com/configuration/target/

### 生产环境去除log

```
//build
terserOptions: {
   compress: {
    //生产环境时移除console
    drop_console: true,
    drop_debugger: true,
   },
  }
```

### 打包路径配置

```
//build
	rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          console.log(assetInfo);
          if (assetInfo.type === 'asset' && /\.(jpg|png|gif|svg)$/i.test(assetInfo.name)) {
            return 'static/img/[name]-[hash].[ext]';
          } if (assetInfo.type === 'asset' && /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)) {
            return 'static/fonts/[name].[hash][ext]';
          }
          return 'static/[ext]/name1-[hash].[ext]';
        },
        manualChunks: {
          'echarts': ['echarts']
        },
      }
    },
```

