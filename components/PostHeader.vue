<template>
    <div class="post-content-header">
        <h1 class="post-title">
            {{$page.title}}
        </h1>
        <div class="post-content">
            <div class="post-item-meta">
                <a class="meta-tag meta" v-for="(tag, tagIndex) in tags" :key="tagIndex" :href="`/tag/${tag}`">
                    <i class="iconfont icon2"></i>
                    {{tag}}
                </a>
                <span class="meta-read meta" v-if="$page.frontmatter.readCount">
                    <i class="iconfont iconai-eye"></i>
                    {{$page.frontmatter.readCount}}
                </span>
                <span class="meta-time meta">
                    <i class="iconfont iconshijian"></i>
                    {{time}}
                </span>
            </div>
        </div>
        
    </div>
</template>

<script>
import dayjs  from 'dayjs';
export default {
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
        tags() {
            const currentTags = this.$page.frontmatter.tags;
            return currentTags ? (Array.isArray(currentTags) ? currentTags: [currentTags]) : [];
        },
        time() {
            return dayjs(this.$page.frontmatter.date).format('YYYY.MM.DD HH:mm');
        }
     },
}
</script>

<style lang="stylus">
    .post-content-header {
         padding $navbarHeight 2rem 0
         max-width 740px
         margin 0px auto
         text-align center
         .post-item-meta {
                color:  #999;
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
                        font-size: 1.2rem;
                    }
                }
                .meta-tag:hover {
                    color: $accentColor
                }
            }
    }
</style>