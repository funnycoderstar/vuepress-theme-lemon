<template>
    <div class="content-wraper home-container">
        <Post />
        <div class="home-sidebar">
            <!-- <SiteInfo/> -->
             <HotPages/>
        </div>
       
    </div>
</template>

<script>
import Post from '@theme/components/Post.vue'
import HotPages from '@theme/components/HotPages.vue';
import SiteInfo from '@theme/components/SiteInfo.vue';
export default {
    name: 'Home',
    components: {
        Post,
        HotPages,
        SiteInfo,
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
        padding-left: 2rem;
        padding-right: 2rem;
        max-width: 960px;
        .home-sidebar {
            width: 30rem;
            margin-left: 2rem;
        }
    }
@media (max-width: $MQMobile) {
    .home-container {
        .home-sidebar {
            display none
        }
    }
}

   
</style>


