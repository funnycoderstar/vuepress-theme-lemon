<template>
  <div class="theme-container">
    <Navbar @toggle-sidebar="toggleSidebar"/>
    <Content/>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "@theme/components/Navbar.vue";
import Footer from "@theme/components/Footer.vue";
export default {
    components: {
        Navbar,
        Footer,
    },
    data () {
        return {
            isSidebarOpen: false,
            shouldShowNavBar: true,
        }
    },
    // computed: {
    //     shouldShowNavBar() {
    //         const { themeConfig } = this.$site;
    //         const { frontmatter } = this.$page;
    //         if (frontmatter.navbar === false || themeConfig.navbar === false) {
    //             return false;
    //         }
    //         return (
    //             this.$title ||
    //             themeConfig.logo ||
    //             themeConfig.repo ||
    //             themeConfig.nav ||
    //             this.$themeLocaleConfig.nav
    //         );
    //     },
    // },
    mounted() {
         console.log(555, this.$site);
        this.$router.afterEach(() => {
            this.isSidebarOpen = false;
        });
    },
    methods: {
        toggleSidebar(to) {
            this.isSidebarOpen =
                typeof to === "boolean" ? to : !this.isSidebarOpen;
            this.$emit("toggle-sidebar", this.isSidebarOpen);
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

