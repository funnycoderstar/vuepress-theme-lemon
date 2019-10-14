<template>
  <main class="page content-wraper">
    <slot name="top" />
      <PostHeader v-if="shouldShowPostContent"/>
      <Content class="theme-lemon-content" />
      <PageNav v-bind="{ sidebarItems }" />
      <Valine v-if="shouldShowPostContent"></Valine>
      <!-- <MyVssue  v-if="shouldShowPostContent"/> -->
    <slot name="bottom" />
    <Toc></Toc> 
  </main>
</template>

<script>
import PageNav from '@theme/components/PageNav.vue'
import MyVssue from '@theme/components/MyVssue.vue'
import PostHeader from '@theme/components/PostHeader.vue'
import Valine from '@theme/components/Valine.vue';
import Toc from '@theme/components/Toc.vue';

export default {
  components: { PageNav, MyVssue, PostHeader, Valine, Toc },
  props: ['sidebarItems'],
  computed: {
    shouldShowPostContent() {
      return this.$page.pid && this.$page.pid === 'post'
    },
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  display: block;
  .theme-lemon-content {
      img {
        width: $contentWidth
      }
  }
}
</style>
