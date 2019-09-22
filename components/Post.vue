<template>
    <div class="post-container">
        <div class="post-block">
            <a  v-for="(article, index) in articlesList" :key="index" class="post-item" :href="article.link">
            <article >
                <h3 class="post-item-title">
                    {{article.title}}
                </h3>
                <div class="post-item-abstract">
                    {{article.abstract}}
                </div>
                <div class="post-item-meta">
                    <span class="meta-tag meta" v-for="(tag, tagIndex) in article.tags" :key="tagIndex">
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
        </a>
        </div>

        
    </div>
</template>

<script>
import dayjs  from 'dayjs';
export default {
    name: 'Post',
    data() {
        return {
            articlesList: [],
        }
    },
    created() {
        const result = this.$site.pages.filter(item => item.pid === 'post');
        console.log(1111,  result);
        let arr = [];
        for(let i = 0; i < result.length; i++) {
            const item = {
                title: result[i].title,
                link: result[i].regularPath,
                abstract: '',
                time: dayjs(result[i].frontmatter.date).format('YYYY.MM.DD HH:mm'),
                tags: result[i].frontmatter.tags ? (Array.isArray(result[i].frontmatter.tags) ? result[i].frontmatter.tags: [result[i].frontmatter.tags]) : [],
                readCount: 100,
            }
            arr.push(item);
        };
        arr.sort((a,b) => {
            return a.time > b.time ? -1 : 1;
        })
        this.articlesList = arr;
    },
}
</script>

<style lang="stylus">
.post-container {
    padding $navbarHeight 2rem 0
    max-width 960px
    margin 0px auto
    display block
    .post-block {
        display block;
        cursor pointer
        color: $textColor;
        .post-item-abstract {
            font-weight normal;
        }
        .post-item {
            width: 100%;
            color: $textColor;
            // padding: 15px 2px 20px 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
            word-wrap: break-word;
            .post-item-title {

            }
            .post-item-meta {
                color:  #999;
                margin-top: 15px;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
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
            }
           

        }
    }
}
</style>



