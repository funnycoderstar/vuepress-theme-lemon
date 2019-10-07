<template>
    <section class="comments-wrap">
        <h3>
            <a href="javascript:;"></a>
            评 论：
        </h3>
        <div id="vcomments"></div>
    </section>
</template>

<script>
import Valine from 'valine';

export default {
    name: "Valine",
    mounted: function() {
        if (typeof window !== "undefined") {
            document.getElementsByClassName("leancloud-visitors")[0].id = window.location.pathname;
            this.window = window;
            window.AV = require("leancloud-storage");
        }

        new Valine({
            el: "#vcomments",
            appId: "nafsOjKsupw2WaoYYfMKGfpk-gzGzoHsz",
            appKey: "E9brQ6aYGz9rkmgiiC0hyfSG",
            notify: false,
            verify: false,
            path: window.location.pathname,
            visitor: true,
            avatar: "wavatar",
            placeholder: "添加评论",
        });
    },
};
</script>

<style lang="stylus">
    .comments-wrap {
        border-top: 1px solid #eaecef;
        margin: 2rem 2.5rem;
        .v .vwrap .vheader .vinput:focus {
            border-bottom-color: $accentColor;
        }
        .v .vlist .vcard .vh .vmeta .vat  {
            color: $accentColor;
        }
        .info {
            display: none;
        }
        .v .vlist .vcard .vhead .vnick:hover {
            color: $accentColor;
        }
    }
</style>

