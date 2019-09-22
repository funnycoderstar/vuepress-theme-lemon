module.exports = {
    title: '木子星兮', 
    description: '木子星兮的博客',
    head: [
        ['link', { rel: 'icon', href: 'https://cdn.wangyaxing.cn/icon-128x128.png' }],
    ],
    theme: require.resolve('../../'),
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { 
                text: '博文', 
                items: [
                    {
                        text: 'CSS',
                        link: '/CSS/'
                    },
                    {
                        text: 'JavaScript',
                        link: '/JavaScript/'
                    },
                    {
                        text: 'HTTP',
                        link: '/HTTP/'
                    },
                ]
        },
            { text: '关于', link: '/About/' },
            { text: '标签', link: '/tags/' },
            { text: '归档', link: '/categories/' },
        ],
        sidebar: {
            '/_posts/': [
                {
                    title: '基础',
                    collapsable: true,
                    children:[
                        'basic/js入门1',
                        'basic/js入门2',
                      ]
                }
            ],

        }
    },
}