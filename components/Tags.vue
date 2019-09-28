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
            <router-link :to="tag.link" v-for="(tag, index) in tagList" :key="index" class="tag-item" :style="getTagStyles(tag.count, tag.color) ">{{tag.tagName}}({{tag.count}})</router-link>
        </div>
    </div>
</template>

<script>
import randomColor from 'randomcolor';
export default {
    name: '',
    data() {
        return {
            tagLevelList: [1, 1.2, 1.5, 1.8, 2.0, 2.4, 3.0]
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
            
            let level = 0;
            if(value > 1 && value <= 2 ) {
                level = 0;
            }
            if(value > 1 && value <= 5) {
                level = 1;
            }
            if(value > 5 && value <= 10) {
                level = 2;
            }
            if(value > 5 && value <= 10) {
                level = 3;
            }
            if(value > 10 && value <= 20) {
                level = 4;
            }
            if(value > 20 && value <= 40) {
                level = 5;
            }
            if(value > 50) {
                level = 6;
            }
            return { fontSize: this.tagLevelList[level] + 'rem', color, borderColor: color};
        },
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




