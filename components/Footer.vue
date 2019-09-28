<template>
    <footer class="theme-footer">
        <p> 
            © <span>{{copyrightYear}}</span>
            <span> <i class="iconfont iconfl-renyuan"></i> <a href="https://github.com/funnycoderstar" target="_blank">木子星兮</a></span>
            <span class="power-info"> | Powered by 
                <a href="https://github.com/vuejs/vuepress" target="_blank">vuepress</a>
                |  Theme -  <a href="https://github.com/funnycoderstar/vuepress-theme-lemon" target="_blank">Lemon</a>
             </span>
        </p>
        <p class="visitors">
            总访问量<span id="busuanzi_value_site_pv"></span>次
            | 您是第<span id="busuanzi_value_site_uv"></span>个来访者
        </p>
        <p class="siteInfo">
            <span >Powered by 
                <a href="https://github.com/vuejs/vuepress" target="_blank">vuepress</a>
                |  Theme -  <a href="https://github.com/funnycoderstar/vuepress-theme-lemon" target="_blank">Lemon</a>
             </span>
        </p>
        
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
    p {
        margin: 0 
        padding:0
        text-align center
    }
    text-align: center;
    background-color: #262a30
    padding: 10px 0;
    font-size: 14px;
    color: #999;
    .siteInfo {
        display none
    }
}

@media (max-width: $MQMobile) {
    .theme-footer {
     .siteInfo {
        display block
    }
    .power-info {
        display none
    }
}
}

</style>

