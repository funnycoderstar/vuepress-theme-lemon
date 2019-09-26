const path = require('path');
const removeMd = require('remove-markdown')

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
            // itemLayout: 'Post',
            // itemPermalink: '/:year/:month/:day/:slug',
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
        '@vuepress/back-to-top',
        '@vuepress/active-header-links',
        '@vuepress/plugin-nprogress',
        // '@vuepress/pwa',
        ['@vuepress/medium-zoom', true],
        ['@vuepress/search', {
            searchMaxSuggestions: 10
        }],
        [
            '@vuepress/blog',
            blogPluginOptions,
        ],
        '@vssue/vuepress-plugin-vssue': {
            // 设置 `platform` 而不是 `api`
            platform: 'github',
      
            // 其他的 Vssue 配置
            owner: 'OWNER_OF_REPO',
            repo: 'NAME_OF_REPO',
            clientId: 'YOUR_CLIENT_ID',
            clientSecret: 'YOUR_CLIENT_SECRET',
          },

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
        define: {
          THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
            ? themeConfig.paginationComponent
            : 'Pagination'
        }
    }
    /**
   * Generate summary.
   */
  if (themeConfig.summary) {
    config.extendPageData = function (pageCtx) {
      const strippedContent = pageCtx._strippedContent
      if (!strippedContent) {
        return
      }
      // 匹配第一个img链接
      const firstImgReg = /!\[.*\]\((.+)\)/; 
      const firstImgLink = pageCtx._content.match(firstImgReg);
      if(firstImgLink) {
        pageCtx.thumbnailLink = firstImgLink[1];
      }
      pageCtx.summary = removeMd(
        strippedContent
          .trim()
          .replace(/^#+\s+(.*)/, '')
          .slice(0, themeConfig.summaryLength)
      ) + ' ...'
    }
  }

    return config;
}