<template>
  <div class="category content-wraper">
    <div class="posts-collapse">
      <div>
        <div class="collection-title">
          <h1 :style="{color: currentColor}">
            {{currentTag}}
            <small>标签</small>
          </h1>
        </div>
        <article class="post post-type-tags" v-for="(article, subIndex) in tagList" :key="subIndex">
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
</template>

<script>
import randomColor from 'randomcolor';
import dayjs from "dayjs";
export default {
    name: "Category",
    data() {
        return {
            currentTag: '',
            currentColor: '',
        };
    },
    computed: {
        tagList() {
            const regularPath = decodeURIComponent(this.$page.regularPath)
            this.currentTag = regularPath.slice(5, regularPath.length - 1);
            this.currentColor = randomColor({ seed: this.currentTag, luminosity: 'dark'});
            const result = this.$site.pages.filter(item => item.pid === "post");
            let arr = [];
            for (let i = 0; i < result.length; i++) {
                if(result[i].title) {
                    if(result[i].frontmatter.tags) {
                        if((Array.isArray(result[i].frontmatter.tags) && result[i].frontmatter.tags.includes(this.currentTag)) || (!Array.isArray(result[i].frontmatter.tags) && result[i].frontmatter.tags === this.currentTag)) {
                            const item = {
                                title: result[i].title,
                                link: result[i].path,
                                updateTime: dayjs(result[i].frontmatter.date).format("YYYY.MM.DD HH:mm"),
                                time: dayjs(result[i].frontmatter.date).format("MM-DD"),
                            };
                            arr.push(item);
                        }
                    }
                }
            }
            arr.sort((a, b) => {
                return a.updateTime > b.updateTime ? -1 : 1;
            });
            return arr;
        }
    },
};
</script>

<style lang="stylus">
.category {
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
    margin: 50px 0;

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



