const path = require('path');

// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: '../pages/feature',
    },
    {
      path: '/JM',
      component: '../layouts/index',
      routes: [
        { path: './personalCenter', component: '../pages/personal/center' },
        { path: './personalSetting', component: '../pages/personal/setting' },
        { path: './home', component: '../pages/home' },
        {
          path: './recruitment',
          routes: [
            { path: './jobDemand/detail', component: '../pages/recruitment/jobDemand/detail' },
            {
              path: './jobDemand',
              component: '../pages/recruitment/jobDemand',
            },
          ],
        },
      ],
    },
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      // pathRewrite: { "^/api": "" }, // 如果后端路由带/api，则不需要该字段，否则打开该行
    },
  },
  // 别名
  alias: {
    '@': path.resolve(__dirname, 'src'),
    assets: path.resolve(__dirname, 'src/assets'),
    components: path.resolve(__dirname, 'src/components'),
    utils: path.resolve(__dirname, 'src/utils'),
    constants: path.resolve(__dirname, 'src/utils/constants'),
    actions: path.resolve(__dirname, 'src/pages/actions'),
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'JM',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
};
