<template>
    <div class="post-container">
        <div class="post-block">
            <div v-for="(article, index) in articlesList" :key="index" class="post-item" @click="handlePage(article.link)" >
                <article >
                    <h3 class="post-item-title">
                        {{article.title}}
                    </h3>
                    <div class="post-item-abstract">
                        {{article.abstract}}
                    </div>
                    <div class="post-item-meta">
                        <span class="meta-tag meta" v-for="(tag, tagIndex) in article.tags" :key="tagIndex" @click.stop="handleTagPage(tag)">
                            <i class="iconfont icon2"></i>
                            {{tag}}
                        </span>
                        <span class="meta-read meta">
                            <i class="iconfont iconai-eye"></i>
                            {{article.readCount}}
                        </span>
                        <span class="meta-time meta">
                            <i class="iconfont iconshijian"></i>
                            {{article.time}}
                        </span>
                    </div>
                </article>
            </div>
            <!-- <router-link  >
                
            </router-link> -->
        </div>
    </div>
</template>

<script>
import dayjs  from 'dayjs';
export default {
    name: 'Post',
    computed: {
        articlesList() {
            const result = this.$pagination.pages.filter(item => item.pid === 'post');
            let arr = [];
            for(let i = 0; i < result.length; i++) {
                if(result[i].title) {
                    const updataTime = result[i].frontmatter.date ? result[i].frontmatter.date: result[i].lastUpdated;
                    const item = {
                        title: result[i].title,
                        link: result[i].regularPath,
                        abstract: result[i].summary,
                        time: dayjs(updataTime).format('YYYY.MM.DD HH:mm'),
                        tags: result[i].frontmatter.tags ? (Array.isArray(result[i].frontmatter.tags) ? result[i].frontmatter.tags: [result[i].frontmatter.tags]) : [],
                        readCount: 100,
                    }
                    arr.push(item);
                }
            
            };
            arr.sort((a,b) => {
                return a.time > b.time ? -1 : 1;
            })
           
            return arr;
        }
    },
    methods: {
        handlePage(path) {
            console.log(777, path);
            this.$router.push(path)
        },
        handleTagPage(tag) {
            const path = `/tag/${tag}`;
            this.$router.push(path)
        }
    }
}
</script>

<style lang="stylus">
.post-container {
    padding $navbarHeight 2rem 0
    max-width $contentWidth
    margin 0px auto
    display block
    .post-block {
        cursor pointer
        color: $textColor;
        .post-item-abstract {
            font-weight normal;
        }
        .post-item {
            display block;
            width: 100%;
            color: $textColor;
            padding-bottom: 20px;
            border-bottom: 1px solid $borderColor;
            word-wrap: break-word;
            .post-item-meta {
                color: #999;
                margin-top: 15px;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                a {
                    color #999
                }
                 .meta {
                    margin-right: 10px;
                    display: flex;
                    align-items: center;
                    i {
                        margin-right: 2px;
                    }
                }
                .meta-tag {
                    i {
                        font-size: 1rem;
                    }
                }
                .meta-tag:hover {
                    color: $accentColor
                }
            }
           

        }
    }
}
</style>



