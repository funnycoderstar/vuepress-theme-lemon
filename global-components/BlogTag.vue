<template>
<div class="blog-tag" v-if="tags.length">
    <router-link class="meta-tag meta" v-for="(tag, tagIndex) in tags" :key="tagIndex" :to="`/tag/${tag}`" :style="getTagStyles(tag) ">
        <i class="iconfont icon2 tagIcon"></i>
        {{tag}}
    </router-link>
</div>
</template>

<script>
import randomColor from 'randomcolor';
export default {
    name: 'BlogTag',
    props: {
        tags: {
            default: [],
        }
    },
     methods: {
        getTagStyles(tag) {
            const color =  randomColor({ seed: tag, luminosity: 'dark'})
            return {color};
        }
    },
}
</script>

<style lang="stylus">
  .blog-tag
    display inline-flex
    transition: background-color .3s
    transition all .5s
    .tagIcon 
        font-size 14px
        margin-top 4px;
</style>
