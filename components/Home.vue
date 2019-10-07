<template>
    <div class="content-wraper home-container">
        <Post />
        <HotPages/>
    </div>
</template>

<script>
import HotPages from '@theme/components/HotPages.vue';
import Post from '@theme/components/Post.vue'
export default {
    name: 'Home',
    components: {
        HotPages,
        Post,
    },
    data() {
        return {
            
        }
    },
    
}
</script>

<style lang="stylus">
    .home-container {
        display: flex;
        padding: $navbarHeight 2rem 0;
        margin: 0px auto;
        max-width: 960px;
    }
</style>


