module.exports = {
    base: '/',
    title: '前端踩坑笔记',
    description: '努力的人总是幸运的',
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/xxxxxxx/blog-demo',
        // 自定义仓库链接文字。
        repoLabel: 'GitHub',
        nav:[ // 导航栏配置
              
            {
              text: '基础学习',
              items: [
                  { text: 'html知识点总结', link: '/html/' },
                  { text: 'css知识点总结', link: '/css/' },
                  { text: 'js知识点总结', link: '/js/' },
                  { text: 'ts知识点总结', link: '/ts/' },
              ]
          },
          {
            text: '框架系列',
            items: [
                { text: 'vue知识点总结和源码分析', link: '/vue/' },
                { text: 'react知识点总结和远吗分析', link: '/react/' },
            ]
          },
          {
            text: '构建工具',
            items: [
                { text: 'webpack', link: '/webpack/' },
            ]
          },
          {
            text: '小程序',
            link: '/wechat/',
          },
          {
            text: '浏览器渲染',
            link: '/chrome/',
          },
         
          {
            text: 'http知识点',
            link: '/http/',
          },
          {
            text: '后端学习',
            items: [
                { text: 'node', link: '/node/' },
            ]
          },
          {
            text: '面试题总结',
            link: '/interview/',
          },
          
        ],
        sidebar: {
            '/html/': [
                {
                  title:'html知识点总结',
                  collapsable: false,
                  children:[
                    
                  ]
                }
            ],
            '/css/':[
                {
                    title:'css知识点总结',
                    collapsable: false,
                    children:[
                      '',
                      ''
                    
                    ]
                  }
            ],
            '/js/':[
              {
                  title:'js知识点总结',
                  collapsable: false,
                  children:[
                    '',
                  ]
                }
          ],
          '/ts':[
            {
                title:'ts知识点总结',
                collapsable: false,
                children:[
                  '',
                ]
            },
          ],
          '/vue':[
            {
                title:'vue知识点总结',
                collapsable: false,
                children:[
                  'hone',
                ]
            }
          ]
        }
  
    }
  }