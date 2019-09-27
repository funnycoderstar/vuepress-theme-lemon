<template>
    <footer class="theme-footer">
        <div class="footer-inner">
            © <span class="copyrightYear">{{copyrightYear}}</span>
            <span class="author"> <i class="iconfont iconfl-renyuan"></i>funnycoderstar</span> |
             <span class="author">Powered by 
                 <a href="https://github.com/funnycoderstar/vuepress-theme-lemon" target="_blank">vuepress-theme-lemon</a>
            </span>
            <p>
                <span id="busuanzi_container_site_pv"><i class="iconfont iconai-eye"></i><span id="busuanzi_value_site_pv"></span></span> &nbsp;
                <span id="busuanzi_container_site_uv">
                    <i class="iconfont iconfl-renyuan"></i><span id="busuanzi_value_site_uv"></span>
                </span>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            copyrightYear: ''
        }
    },
    created() {
        this.copyrightYear = (new Date()).getFullYear();
    }
}
</script>

<style lang="stylus">
.theme-footer {
    text-align: center;
    height: 2rem;
    .footer-inner {
        i {
            color: $textColor;
        }
    }

}
</style>

