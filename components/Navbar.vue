<template>
    <header class="nav-bar">
            <router-link
            :to="$localePath"
            class="home-link"
            >
            <img
                class="logo"
                v-if="$site.themeConfig.logo"
                :src="$withBase($site.themeConfig.logo)"
                :alt="$siteTitle"
            >
            <span
                ref="siteName"
                class="site-name"
                v-if="$siteTitle"
                :class="{ 'can-hide': $site.themeConfig.logo }"
            >{{ $siteTitle }}</span>
            </router-link>
            
        <div
            class="links"
            :style="linksWrapMaxWidth ? {
                'max-width': linksWrapMaxWidth + 'px'
            } : {}"
            >
            <SearchBox v-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false"/>
            <NavLinks class="can-hide"/>
        </div>
    </header>
</template>

<script>
import SearchBox from '@SearchBox';
import NavLinks from '@theme/components/NavLinks.vue'

export default {
    components: { SearchBox, NavLinks },
    data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING
          - (this.$refs.siteName && this.$refs.siteName.offsetWidth || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  }
}
function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="less">
@import url('../styles/index.less');
// @navbar-vertical-padding = 0.7rem;
// @navbar-horizontal-padding = 1.5rem;
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    right: 0;
    height: 3.6rem;
    background-color: #fff;
    box-sizing: border-box;
    border-bottom: 1px solid #eaecef;
    padding: .7rem 1.5rem;
    line-height: 2.2rem;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03), 0 6px 6px rgba(0, 0, 0, 0.05);
    transition: all 1s cubic-bezier(.25, .8, .25, 1);
    .site-name {
        font-size: 1.3rem;
        font-weight: 600;
        color: #2c3e50;
        position: relative;
    }
    .links {
        padding-left: 1.5rem;
        box-sizing: border-box;
        background-color: white;
        white-space: nowrap;
        font-size: 0.9rem;
        position: absolute;
        right: 0.7rem;
        top: 0.5rem;
        line-height: 2.2rem;
        display: flex;
    }
}
@media  (max-width: 700px) {
    .can-hide {
        display: none;
    }
}

</style>


