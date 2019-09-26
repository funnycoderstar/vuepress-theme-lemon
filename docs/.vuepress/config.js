module.exports = {
    title: '木子星兮', 
    description: '木子星兮的博客',
    head: [
        ['link', { rel: 'icon', href: 'https://cdn.wangyaxing.cn/icon-128x128.png' }],
    ],
    theme: require.resolve('../../'),
    themeConfig: {
        lastUpdated: 'Last Updated',
        summary: true,
        nav: [
            { text: '首页', link: '/' },
            { text: '归档', link: '/categories/' },
            { text: '标签', link: '/tags/' },
            { text: '关于', link: '/About/' },
            { 
                text: '更多', 
                items: [
                    {
                        text: '算法',
                        link: 'https://wangyaxing.cn/leetcode/'
                    },
                    {
                        text: '前端总结',
                        link: 'https://wangyaxing.cn/summary/'
                    },
                    {
                        text: 'Github',
                        link: 'https://github.com/funnycoderstar'
                    },
                ]
        },
        ],
        // sidebar: {
        //     '/_posts/': [
        //         {
        //             title: '基础',
        //             collapsable: true,
        //             children:[
        //                 'basic/js入门1',
        //                 'basic/js入门2',
        //               ]
        //         }
        //     ],

        // }
    },
}