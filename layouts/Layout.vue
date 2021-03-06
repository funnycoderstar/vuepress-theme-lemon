<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>
    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <!-- <Sidebar
      :items="postSideBarItems"
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
    </Sidebar>-->
    <Home v-if="shouldShowPost"/>
    <Archives v-if="shouldShowArchives"/>
    <TagsPost v-if="shouldShowTagPost && !shouldShowTags"/>
    <Tags v-if="shouldShowTags"/>
    <Page :sidebar-items="sidebarItems" v-if="shouldShowPostContent || $page.path === '/about/'">
      <slot name="page-top" slot="top"/>
      <slot name="page-bottom" slot="bottom"/>
    </Page>
    <Footer></Footer>
    <Backtop/>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue';
import Page from '@theme/components/Page.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import Archives from '@theme/components/Archives.vue';
import Tags from '@theme/components/Tags.vue';
import Footer from '@theme/components/Footer.vue';
import Home from '@theme/components/Home.vue';
import TagsPost from '@theme/components/TagsPost.vue';

import { resolveSidebarItems } from '../util';
import Vue from 'vue';
import dayjs from 'dayjs';
export default {
    components: { Page, Sidebar, Navbar, Archives, Tags, Footer, Home, TagsPost },

    data() {
        return {
            isSidebarOpen: false,
        };
    },

    computed: {
        shouldShowNavbar() {
            const { themeConfig } = this.$site;
            const { frontmatter } = this.$page;
            if (frontmatter.navbar === false || themeConfig.navbar === false) {
                return false;
            }
            return (
                this.$title ||
                themeConfig.logo ||
                themeConfig.repo ||
                themeConfig.nav ||
                this.$themeLocaleConfig.nav
            );
        },

        shouldShowSidebar() {
            const { frontmatter } = this.$page;
            return !frontmatter.home && frontmatter.sidebar !== false && this.sidebarItems.length;
        },

        sidebarItems() {
            const index = this.allPostList.findIndex((item) => item.key === this.$page.key);
            const pre = this.allPostList[index - 1];
            const next = this.allPostList[index + 1];
            if (index > -1) {
                if (index === 0) {
                    return this.allPostList.length > 1 ? [this.$page, next] : [this.$page];
                }
                if (index === this.allPostList.length - 1) {
                    return [pre, this.$page];
                }
                return [pre, this.$page, next];
            } else {
                return [];
            }
            //   return resolveSidebarItems(
            //     this.$page,
            //     this.$page.regularPath,
            //     this.$site,
            //     this.$localePath
            //   )
        },
        postSideBarItems() {
            return this.shouldShowPostContent ? [this.$page] : [];
        },
        allPostList() {
            const result = this.$site.pages.filter((item) => item.pid === 'post');
            let arr = result;
            arr.sort((a, b) => {
                return a.frontmatter.date > b.frontmatter.date ? -1 : 1;
            });
            for (let i = 0; i < arr.length; i++) {
                arr[i].type = 'page';
            }
            return arr;
        },
        pageClasses() {
            const userPageClass = this.$page.frontmatter.pageClass;
            return [
                {
                    'no-navbar': !this.shouldShowNavbar,
                    'sidebar-open': this.isSidebarOpen,
                    'no-sidebar': !this.shouldShowSidebar,
                },
                userPageClass,
            ];
        },
        shouldShowArchives() {
            const { frontmatter } = this.$page;
            return frontmatter.layoutType && frontmatter.layoutType === 'Archives';
        },
        shouldShowTags() {
            const { frontmatter } = this.$page;
            return frontmatter.layoutType && frontmatter.layoutType === 'tags';
        },
        shouldShowPost() {
            const { frontmatter } = this.$page;
            return frontmatter.title && /post/gi.test(frontmatter.title);
        },
        shouldShowTagPost() {
            const { regularPath } = this.$page;
            return regularPath && regularPath.slice(1, 4) === 'tag';
        },
        shouldShowPostContent() {
            return this.$page.pid && this.$page.pid === 'post';
        },
    },
    mounted() {
        window.AV = require('leancloud-storage');
        const { appId, appKey } = this.$themeConfig.valine;
        AV.init({
            appId,
            appKey,
        });
        this.$router.afterEach(() => {
            this.isSidebarOpen = false;
        });
    },

    methods: {
        toggleSidebar(to) {
            this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen;
            this.$emit('toggle-sidebar', this.isSidebarOpen);
        },

        // side swipe
        onTouchStart(e) {
            this.touchStart = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            };
        },

        onTouchEnd(e) {
            const dx = e.changedTouches[0].clientX - this.touchStart.x;
            const dy = e.changedTouches[0].clientY - this.touchStart.y;
            if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
                if (dx > 0 && this.touchStart.x <= 80) {
                    this.toggleSidebar(true);
                } else {
                    this.toggleSidebar(false);
                }
            }
        },
    },
};
</script>
