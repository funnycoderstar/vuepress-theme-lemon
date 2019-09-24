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
            <a :href="tag.link" v-for="(tag, index) in tagList" :key="index" class="tag-item" :style="getTagStyles(tag.count, tag.color) ">{{tag.tagName}}({{tag.count}})</a>
        </div>
    </div>
</template>

<script>
import randomColor from 'randomcolor';
export default {
    name: '',
    data() {
        return {
        }
    },
    computed: {
        tagList() {
            const result = this.$site.pages.filter(item => item.pid === 'post');
            const obj = {};
            for(let i = 0; i < result.length; i++) {
                const current = result[i].frontmatter;
                if(current.tags) {
                    if(Array.isArray(current.tags)) {
                        for(let j = 0; j < current.tags.length; j++) {
                            if(obj[current.tags[j]]) {
                            obj[current.tags[j]]++;
                        } else {
                            obj[current.tags[j]] = 1;
                        }
                        }
                    } else {
                        if(obj[current.tags]) {
                            obj[current.tags]++;
                        } else {
                            obj[current.tags] = 1;
                        }
                    }
                }
            }
            let arr = [];
            for (let [key, value] of Object.entries(obj)) {
                const item = {
                    tagName: key,
                    count: value,
                    color: randomColor({ seed: key, luminosity: 'dark'}),
                    link: `/tag/${key}/`
                }
                arr.push(item);
            }
            return arr;
        }
    },
    methods: {
        getTagStyles(count, color) {
            const value = Number(count);
            // let color = '#999';
            // if(value > 1 && value <= 2 ) {
            //     color = '#666'
            // }
            // if(value > 1 && value <= 5) {
            //     color = '#333'
            // }
            // if(value > 5) {
            //     color = '#000'
            // }
            return { fontSize: 1 + value / 10 + 'rem', color, borderColor: color};
            
        }
    },
}
</script>

<style lang="stylus">
    .tags {
        max-width: $contentWidth;
        margin: 0 auto;
        padding $navbarHeight 0;
        position: relative;
        text-align center;
        min-height: calc(100vw - 30rem);
        .tag-cloud-tags {
            margin-top: 20px;
            .tag-item {
                display inline-block
                margin-right: 2rem;
                font-size: 2rem;
                padding: 1rem 0;
                font-size: 0.8rem;
                color: #b1b1b1;
                border-bottom: 1px solid #b1b1b1;
                
            }
            .tag-item:hover {
                color: $accentColor !important;
                border-color: $accentColor !important;
            }
            
        }
    }
</style>




