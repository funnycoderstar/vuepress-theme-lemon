<template>
    <div class="tags">
        <header class="tags-header">
            <h1>标签</h1>
        </header>
        <div class="tag-cloud">
            <div class="tag-cloud-title">
                目前共计 {{tagList.length}} 个标签
            </div>
        </div>
        <div class="tag-cloud-tags">
            <a :href="tag.link" v-for="(tag, index) in tagList" :key="index" class="tag-item">{{tag.tagName}}({{tag.count}})</a>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    data() {
        return {
            tagList: [
                {
                    tagName: 'HTTP',
                    count: 11,
                    link: '/tags/HTTP/'
                },
                {
                    tagName: 'HTML',
                    count: 10,
                    link: '/tags/HTML/'
                },
                {
                    tagName: 'CSS',
                    count: 6,
                    link: '/tags/CSS/'
                },
                {
                    tagName: 'JS',
                    count: 8,
                    link: '/tags/JS/'
                },
            ]
        }
    },
}
</script>

<style lang="stylus">
    .tags {
        max-width: 740px;
        margin: 0 auto;
        padding $navbarHeight 0;
        position: relative;
        text-align center;
        min-height: calc(100vw - 30rem);
        .tag-cloud-tags {
            margin-top: 20px;
            .tag-item {
                margin-right: 2rem;
                font-size: 2rem;
                padding: 1rem 0;
                font-size: 0.8rem;
                color: #b1b1b1;
                border-bottom: 1px solid #b1b1b1;
                
            }
            
            .tag-item:nth-of-type(2n+1) {
               color: $textColor;
                border-bottom: 1px solid $textColor;
            }
            .tag-item:nth-of-type(3n+1) {
                font-size: 1.5rem;
                color: #666;
                border-bottom: 1px solid #666;
            }
            .tag-item:hover {
                color: $accentColor;
                border-bottom: 1px solid $accentColor;
            }
        }
    }
</style>




