<template>
  <div class="archives-wrap content-wraper">
    <div class="archives-content">
      <div class="posts-collapse">
      <span class="archive-move-on"></span>
      <span class="archive-page-counter">好! 目前共计 {{ArchivesListCount}} 篇文章。 继续努力。</span>
      <div v-for="(item, index) in ArchivesList" :key="index">
        <div class="collection-title">
          <h1>
              {{item.year}}
          </h1>
        </div>
        <article class="post post-type-tags" v-for="(article, subIndex) in item.articleList" :key="subIndex">
          <header
            class="post-header"
            style="opacity: 1; display: block; transform: translateY(0px);"
          >
            <h2 class="post-title">
              <router-link
                class="post-title-link"
                :to="article.link"
                itemprop="url"
              >
                <span itemprop="name">{{article.title}}</span>
              </router-link>
            </h2>
            <div class="post-meta">
              <time
                class="post-time"
                itemprop="dateCreated"
                datetime="2018-06-19T20:29:59+08:00"
                content="2018-06-19"
              >{{article.time}}</time>
            </div>
          </header>
        </article>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
    name: "Archives",
    data() {
        return {
            ArchivesList: [
                {
                    year: "",
                    articleList: [],
                },
            ],
            ArchivesListCount: 0,
        };
    },
    created() {
        const result = this.$site.pages.filter(item => item.pid === "post");
        let arr = [];
        for (let i = 0; i < result.length; i++) {
            if(result[i].title) {
                const updataTime = result[i].frontmatter.date ? result[i].frontmatter.date: result[i].lastUpdated;
                 const item = {
                    title: result[i].title,
                    link: result[i].path,
                    updateTime: dayjs(updataTime).format("YYYY.MM.DD HH:mm"),
                    time: dayjs(updataTime).format("MM-DD"),
                    year: dayjs(updataTime).year(),
                };
                arr.push(item);
            }
           
        }
        arr.sort((a, b) => {
            return a.updateTime > b.updateTime ? -1 : 1;
        });
        this.ArchivesListCount = arr.length;
        this.ArchivesList = [];
        const data = this.groupBy(arr, "year");
        for (let [key, value] of Object.entries(data)) {
            const item = {
                year: key,
                articleList: value,
            };
            this.ArchivesList.push(item);
        }
        this.ArchivesList.sort((a, b) => {
            return a.year > b.year ? -1 : 1;
        });
    },
    methods: {
        groupBy(objectArray, property) {
            return objectArray.reduce(function(acc, obj) {
                var key = obj[property];
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {});
        },
    },
};
</script>

<style lang="stylus">
.archives-wrap {
  .archives-content {
      margin: 30px 0;
  }
  .posts-collapse .archive-move-on {
    position: absolute;
    top: 11px;
    left: 0;
    margin-left: -6px;
    width: 10px;
    height: 10px;
    opacity: 0.5;
    background: #555;
    border: 1px solid #fff;
    border-radius: 50%;
  }

  .archive-page-counter {
    position: relative;
    top: 3px;
    left: 20px;
  }


.posts-collapse::after {
  content: ' ';
  position: absolute;
  top: 20px;
  left: 0;
  margin-left: -2px;
  width: 4px;
  height: 100%;
  background: #f5f5f5;
  z-index: -1;
}

.posts-collapse {
  position: relative;
  z-index: $postsCollapseIndex;

  .collection-title {
    opacity: 1;
    display: block;
    transform: translateX(0px);
    position: relative;
    margin: 60px 0;

    small {
      color: #bbb;
      margin-left: 5px;
      font-size: 80%;
    }
  }
}

.posts-collapse .collection-title::before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 50%;
  margin-left: -4px;
  margin-top: -4px;
  width: 8px;
  height: 8px;
  background: #bbb;
  border-radius: 50%;
}

.posts-collapse .collection-title h1, .posts-collapse .collection-title h2 {
  margin-left: 20px;
}

.posts-collapse .post-header {
  position: relative;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  transition-property: border;
  border-bottom: 1px dashed #ccc;
}

.posts-collapse .post-header:hover {
  border-bottom-color: #666;
}

.posts-collapse .post-title {
  margin-left: 60px;
  font-size: 16px;
  font-weight: 400;
  line-height: inherit;
  border: 0;
  padding-bottom: 0;
}

.posts-collapse .post-header:hover::before {
  background: #222;
}

.posts-collapse .post-meta {
  position: absolute;
  font-size: 12px;
  left: 20px;
  top: 5px;
}

.posts-collapse .post-header::before {
  content: ' ';
  position: absolute;
  left: 0;
  top: 12px;
  width: 6px;
  height: 6px;
  margin-left: -4px;
  background: #bbb;
  border-radius: 50%;
  border: 1px solid #fff;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  transition-property: background;
}

.posts-collapse .post-title a {
  color: #666;
  border-bottom: none;
  text-decoration: none;
}

.posts-collapse .post {
  margin: 30px 0;
}
}
</style>



