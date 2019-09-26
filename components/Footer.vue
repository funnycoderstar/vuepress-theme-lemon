<template>
    <footer class="theme-footer">
        <div class="footer-inner">
            © <span class="copyrightYear">{{copyrightYear}}</span>
            <span class="author">funnycoderstar</span>
            <p>
                <span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span> &nbsp;
                <span id="busuanzi_container_site_uv">
                    本站访客数<span id="busuanzi_value_site_uv"></span>人次
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
    line-height: 2rem;

}
</style>

