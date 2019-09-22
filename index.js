const path = require('path');

module.exports = (themeConfig, ctx) =>  {
    themeConfig = Object.assign(
        themeConfig,
        {
          summary: !!themeConfig.summary,
          summaryLength: typeof themeConfig.summaryLength === 'number' ? themeConfig.summaryLength : 200,
          pwa: !!themeConfig.pwa,
        }
      )
    const defaultBlogPluginOptions = {
        directories: [
          {
            id: 'post',
            dirname: '_posts',
            path: '/',
            // layout: 'IndexPost', defaults to `Layout.vue`
            itemLayout: 'Post',
            itemPermalink: '/:year/:month/:day/:slug',
            pagination: {
              lengthPerPage: 5,
            },
          },
        ],
        frontmatters: [
          {
            id: "tag",
            keys: ['tag', 'tags'],
            path: '/tag/',
            // layout: 'Tag',  defaults to `FrontmatterKey.vue`
            frontmatter: { title: 'Tag' },
            pagination: {
              lengthPerPage: 5
            }
          },
        ]
      }
      const { modifyBlogPluginOptions } = themeConfig

  const blogPluginOptions = typeof modifyBlogPluginOptions === 'function'
    ? modifyBlogPluginOptions(defaultBlogPluginOptions)
    : defaultBlogPluginOptions
    const plugins =  [
        '@vuepress/plugin-nprogress',
        ['@vuepress/medium-zoom', true],
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        [
            '@vuepress/blog',
            blogPluginOptions,
          ],

    ]
    const config = {
        alias () {
            const { themeConfig, siteConfig } = ctx
            // resolve algolia
            const isAlgoliaSearch = (
              themeConfig.algolia
              || Object.keys(siteConfig.locales && themeConfig.locales || {})
                .some(base => themeConfig.locales[base].algolia)
            )
            return {
              '@AlgoliaSearchBox': isAlgoliaSearch
                ? path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
                : path.resolve(__dirname, 'noopModule.js')
            }
          },
        plugins,
    }
    return config;
}