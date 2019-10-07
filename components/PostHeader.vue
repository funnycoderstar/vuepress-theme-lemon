<template>
    <div class="post-content-header">
        <h1 class="post-title">
            {{$page.title}}
        </h1>
        <div class="post-content">
            <BlogMeta
                :title="$page.title"
                :tags="tags"
                :time="time"
                :textCount="$page.textCount"
                :readingTime="$page.readingTime"
            />
        </div>
        
    </div>
</template>

<script>
import dayjs  from 'dayjs';
import BlogMeta from './BlogMeta.vue';
export default {
    components: {
        BlogMeta
    },
    computed: {
        tags() {
            const currentTags = this.$page.frontmatter.tags;
            return currentTags ? (Array.isArray(currentTags) ? currentTags: [currentTags]) : [];
        },
        time() {
            const updataTime = this.$page.frontmatter.date ? this.$page.frontmatter.date: this.$page.lastUpdated;
            return dayjs(updataTime).format('YYYY.MM.DD');
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
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: center;
                a {
                    color #999
                }
                span {
                    margin-right: 10px;
                }
                .iconai-eye {
                    font-size: 1.2rem;
                    color: #f5f5f5
                    margin-top:2px;
                }
                 .meta {
                    margin-right: 10px;
                    i {
                        margin-right: 2px;
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
      .pageCount {
          display none
      }
      .pageReadingTime {
          display none
      }
  }
    
</style>