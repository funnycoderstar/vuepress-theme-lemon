<template>
  <div class="post-container">
    <div class="post-block">
      <div
        v-for="(article, index) in articlesList"
        :key="index"
        class="post-item"
        @click="handlePage(article.link)"
      >
        <article :class="{ 'page-with-img': article.thumbnailLink }">
          <h3 class="post-item-title">{{ article.title }}</h3>
          <div class="post-item-abstract">{{ article.abstract }}</div>
          <BlogMeta
            :tags="article.tags"
            :title="article.title"
            :time="article.time"
            :textCount="article.textCount"
            :readingTime="article.readingTime"
            :counter="countersMap[article.link]"
          />
        </article>
        <div v-if="article.thumbnailLink" class="thumbnail-img-wrap">
          <img :src="article.thumbnailLink" alt>
        </div>
      </div>
    </div>
    <div class="pagination-wrap">
      <component :is="paginationComponent"></component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import dayjs from 'dayjs';
import BlogMeta from './BlogMeta.vue';
import { Pagination, SimplePagination } from '@vuepress/plugin-blog/lib/client/components';
export default {
    name: 'Post',
    components: {
        BlogMeta,
    },
    data() {
        return {
            // 文章访问量, Map结构
            countersMap: {},
            paginationComponent: null,
        };
    },
    mounted() {
        this.paginationComponent = this.getPaginationComponent();
        // 使用setTimeout 解决 获取 AV的异步问题
        setTimeout( async () => {
        /**
         * 查询当前页文章的阅读量
         */
        // 当前页文章url列表
        const articleUrlList = this.articlesList.map((article) => article.link);
        const query = new AV.Query('Counter');
        try {
            // containedIn: $in 查询
            const data = await query.containedIn('url', articleUrlList).find();
            // 转 map 结构, url: 阅读量
            this.countersMap = data.reduce((r, article) => {
                const { url, time } = article.attributes;
                r[url] = time;
                return r;
            }, {});
        } catch (err) {
            console.warn('获取访问量失败', err);
        }
        })
    },
    computed: {
        articlesList() {
            const result = this.$pagination.pages.filter((item) => item.pid === 'post');
            let arr = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i].title) {
                    const { textCount, readingTime } = result[i];
                    const updataTime = result[i].frontmatter.date
                        ? result[i].frontmatter.date
                        : result[i].lastUpdated;
                    const item = {
                        title: result[i].title,
                        link: result[i].regularPath,
                        thumbnailLink: result[i].thumbnailLink || '',
                        abstract: result[i].summary,
                        time: dayjs(updataTime).format('YYYY.MM.DD'),
                        tags: result[i].frontmatter.tags
                            ? Array.isArray(result[i].frontmatter.tags)
                                ? result[i].frontmatter.tags
                                : [result[i].frontmatter.tags]
                            : [],
                        readCount: 100,
                        imgLoad: true,
                        textCount:
                            Number(textCount) > 1000 ? Number(textCount) / 100 + 'k' : textCount,
                        readingTime,
                    };
                    arr.push(item);
                }
            }
            arr.sort((a, b) => {
                return a.time > b.time ? -1 : 1;
            });

            return arr;
        },
    },
    methods: {
        handlePage(path) {
            this.$router.push(path);
        },
        handleTagPage(tag) {
            const path = `/tag/${tag}`;
            this.$router.push(path);
        },
        getPaginationComponent() {
            const n = THEME_BLOG_PAGINATION_COMPONENT;
            if (n === 'Pagination') {
                return Pagination;
            }

            if (n === 'SimplePagination') {
                return SimplePagination;
            }

            return Vue.component(n) || Pagination;
        },
    },
};
</script>

<style lang="stylus">
.post-container {
  flex: 1;
  position: relative;

  .post-block {
    cursor: pointer;
    color: $textColor;

    .post-item-abstract {
      font-weight: normal;
    }

    .post-item {
      // display flex;
      // justify-content space-between；
      align-items: center;
      width: 100%;
      color: $textColor;
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid $borderColor;
      word-wrap: break-word;
      position: relative;
      overflow: hidden;

      .thumbnail-img-wrap {
        width: 200px;
        height: 120px;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -60px;
        border: 1px solid $borderColor;
        overflow: hidden;

        & > img {
          width: 100%;
        }
      }

      .post-item-title {
        margin-top: 0;
      }

      .page-with-img {
        padding-right: 220px;
      }

      .post-item-meta {
        color: #999;
        margin-top: 15px;
        font-size: 0.9rem;

        a {
          color: #999;
        }

        .meta {
          margin-right: 10px;

          i {
            margin-right: 3px;
          }

          .iconfilewordo {
            font-size: 15px;
          }

          .iconriqi {
            font-size: 14px;
          }

          .iconshijian {
            margin-right: 0px;
          }
        }
      }
    }
  }

  .pagination-wrap {
    text-align: center;
    bottom: -4.3rem;
    position: absolute;
  }
}

@media (max-width: $MQMobile) {
  .post-container {
    .post-block {
      .post-item {
        .page-with-img {
          padding-right: 0;
        }
      }

      .thumbnail-img-wrap {
        display: none;
      }

      .pageCount {
        display: none;
      }

      .pageReadingTime {
        display: none;
      }
    }
  }
}
</style>



