<template>
    <footer class="theme-footer">
        <div class="footer-inner">
            © <span class="copyrightYear">{{copyrightYear}}</span>
            <span class="author">funnycoderstar</span>
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

<style lang="less">
.theme-footer {
    text-align: center;
    height: 2rem;
    line-height: 2rem;

}
</style>

