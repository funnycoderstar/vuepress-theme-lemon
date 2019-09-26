<template>
    <div class="post-content-header">
        <h1 class="post-title">
            {{$page.title}}
        </h1>
        <div class="post-content">
            <div class="post-item-meta">
                <router-link class="meta-tag meta" v-for="(tag, tagIndex) in tags" :key="tagIndex" :to="`/tag/${tag}`">
                    <i class="iconfont icon2"></i>
                    {{tag}}
                </router-link>
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
            const updataTime = this.$page.frontmatter.date ? this.$page.frontmatter.date: this.$page.lastUpdated;
            return dayjs(updataTime).format('YYYY.MM.DD HH:mm');
        }
     },
}
</script>

<style lang="stylus">
    .post-content-header {
         padding $navbarHeight 2rem 0
         max-width $contentWidth
         margin 0px auto
         text-align center
         padding-left: $sidebarWidth;
         .post-item-meta {
                color:  #999;
                margin-top: 15px;
                font-size: 0.8rem;
                display: flex;
                align-items: center;
                justify-content: center;
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
  
@media (max-width: $MQMobile)
  .post-content-header {
      padding-left: 0;
  }
    
</style>