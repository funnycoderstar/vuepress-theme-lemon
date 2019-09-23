<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>
    <Home v-if="$page.frontmatter.home"/>
    <Post v-if="shouldShowPost"/>
    <Category v-if="shouldShowCategory"/>
    <TagsPost v-if="shouldShowTagPost && !shouldShowTags"/>
    <PostHeader v-if="shouldShowPostContent"/>
    <Tags v-if="shouldShowTags"/>
    <Page
      :sidebar-items="sidebarItems"
    >
      <slot
        name="page-top"
        slot="top"
      />
      <slot
        name="page-bottom"
        slot="bottom"
      />
    </Page>
    <div class="pagination-wrap">
        <component  v-if="shouldShowPost" :is="paginationComponent"></component>
    </div>
    
    <Footer></Footer>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import Category from '@theme/components/Category.vue'
import Tags from '@theme/components/Tags.vue'
import Footer from '@theme/components/Footer.vue'
import Post from '@theme/components/Post.vue'
import TagsPost from '@theme/components/TagsPost.vue'
import PostHeader from '@theme/components/PostHeader.vue'
import { resolveSidebarItems } from '../util'
import { Pagination, SimplePagination } from '@vuepress/plugin-blog/lib/client/components'

export default {
  components: { Home, Page, Sidebar, Navbar, Category, Tags, Footer, Post, TagsPost, PostHeader},

  data () {
    return {
      isSidebarOpen: false,
      paginationComponent: null
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    },
    shouldShowCategory() {
      const { frontmatter } = this.$page
      return (
        frontmatter.layoutType
        && frontmatter.layoutType === 'category'
      )
    },
    shouldShowTags() {
      const { frontmatter } = this.$page
      return (
        frontmatter.layoutType
        && frontmatter.layoutType === 'tags'
      )
    },
    shouldShowPost() {
      const { frontmatter } = this.$page
      return (
        frontmatter.title
        && /post/gi.test(frontmatter.title)
      )
    },
    shouldShowTagPost() {
      const { regularPath } = this.$page
      return (
        regularPath
        && regularPath.slice(1, 4) === 'tag'
      )
    },
    shouldShowPostContent() {
      return this.$page.pid && this.$page.pid === 'post'
    },
  },
  created() {
    this.paginationComponent = this.getPaginationComponent()
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  methods: {
    getPaginationComponent() {
        const n = THEME_BLOG_PAGINATION_COMPONENT;
        if (n === 'Pagination') {
          return Pagination
        }

        if (n === 'SimplePagination') {
          return SimplePagination
        }

        return Vue.component(n) || Pagination
      },
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>
