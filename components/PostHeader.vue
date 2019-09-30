<template>
    <div class="post-content-header">
        <h1 class="post-title">
            {{$page.title}}
        </h1>
        <div class="post-content">
            <div class="post-item-meta">
                <BlogTag :tags="tags"></BlogTag>
                <span id="busuanzi_container_page_pv" class="meta-read meta">
                    <i class="iconfont iconai-eye"></i><span id="busuanzi_value_page_pv"></span>
                </span>
                <span class="meta-time meta">
                    <i class="iconfont iconshijian"></i>
                    {{time}}
                </span>
                <span>字数: {{$page.textCount}}</span>
                <span>预计阅读时间: {{$page.readingTime}}</span>
            </div>
        </div>
        
    </div>
</template>

<script>
import dayjs  from 'dayjs';
export default {
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
         max-width $contentWidth
         text-align center
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
                span {
                    margin-right: 10px;
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