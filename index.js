const path = require("path");
const removeMd = require("remove-markdown");

module.exports = (themeConfig, ctx) => {
    themeConfig = Object.assign(themeConfig, {
        summary: !!themeConfig.summary,
        summaryLength:
            typeof themeConfig.summaryLength === "number"
                ? themeConfig.summaryLength
                : 200,
        pwa: !!themeConfig.pwa,
    });
    const defaultBlogPluginOptions = {
        directories: [
            {
                id: "post",
                dirname: "_posts",
                path: "/",
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
                keys: ["tag", "tags"],
                path: "/tag/",
                // layout: 'Tag',  defaults to `FrontmatterKey.vue`
                frontmatter: { title: "Tag" },
                pagination: {
                    lengthPerPage: 5,
                },
            },
        ],
    };
    const { modifyBlogPluginOptions } = themeConfig;

    const blogPluginOptions =
        typeof modifyBlogPluginOptions === "function"
            ? modifyBlogPluginOptions(defaultBlogPluginOptions)
            : defaultBlogPluginOptions;
    const plugins = [
        "@vuepress/back-to-top",
        "@vuepress/active-header-links",
        "@vuepress/plugin-nprogress",
        [
            "@vuepress/pwa",
            {
                serviceWorker: true,
                popupComponent: "MySWUpdatePopup",
                updatePopup: {
                    message: "发现新内容可用",
                    buttonText: "刷新",
                },
            },
        ],
        ["@vuepress/medium-zoom", true],
        [
            "@vuepress/search",
            {
                searchMaxSuggestions: 10,
            },
        ],
        ["@vuepress/blog", blogPluginOptions],
        [],
    ];
    const config = {
        alias() {
            const { themeConfig, siteConfig } = ctx;
            // resolve algolia
            const isAlgoliaSearch =
                themeConfig.algolia ||
                Object.keys(
                    (siteConfig.locales && themeConfig.locales) || {},
                ).some(base => themeConfig.locales[base].algolia);
            return {
                "@AlgoliaSearchBox": isAlgoliaSearch
                    ? path.resolve(__dirname, "components/AlgoliaSearchBox.vue")
                    : path.resolve(__dirname, "noopModule.js"),
            };
        },
        plugins,
        define: {
            THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
                ? themeConfig.paginationComponent
                : "Pagination",
        },
    };
    /**
     * Generate summary.
     */
    if (themeConfig.summary) {
        config.extendPageData = function(pageCtx) {
            const strippedContent = pageCtx._strippedContent;
            if (!strippedContent) {
                return;
            }
            /**
             * 匹配第一个img链接
             */ 
            const firstImgReg = /!\[.*\]\((.+)\)/;
            const firstImgLink = pageCtx._content.match(firstImgReg);
            if (firstImgLink) {
                pageCtx.thumbnailLink = firstImgLink[1];
            }

            /**
             * 统计文章字数和阅读时间
             */ 
            let {_strippedContent: content} = pageCtx;
            /** 去除空白字符 */
            content = content.replace(/\s/g, '');
            /** 计算图片数量 */
            const imageRegex = /!\[.*?\]\(.*?\)/g;
            const matchImageResult = content.match(imageRegex);
            const imageCount = matchImageResult ? matchImageResult.length : 0;
            /** 去除图片 */
            content = content.replace(imageRegex, '');
            /** 字数 */
            pageCtx.textCount = content.length;
            /** 阅读时间 */
            const readingTime = Math.ceil(pageCtx.textCount / 8 + imageCount * 3 + (imageCount <= 10 ? (20 - imageCount) * imageCount / 2 : 0));
            pageCtx. readingTime = Math.ceil(readingTime / 60) + 'min';

            /**
             * 添加文章概要，默认取 前200个字符
             */ 
            pageCtx.summary =
                removeMd(
                    strippedContent
                        .trim()
                        .replace(/^#+\s+(.*)/, "")
                        .slice(0, themeConfig.summaryLength),
                ) + " ...";
        };
    }
    return config;
};
