<template>
  <main class="page">
    <slot name="top" />
      <PostHeader/>
    <Content class="theme-lemon-content" />

    <PageNav v-bind="{ sidebarItems }" />
    <MyVssue />
    <slot name="bottom" />
  </main>
</template>

<script>
import PageNav from '@theme/components/PageNav.vue'
import MyVssue from '@theme/components/MyVssue.vue'
import PostHeader from '@theme/components/PostHeader.vue'

export default {
  components: { PageNav, MyVssue, PostHeader },
  props: ['sidebarItems']
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}
</style>
