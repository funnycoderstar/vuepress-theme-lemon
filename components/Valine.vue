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
        const {appId, appKey, notify, verify, visitor, avatar, placeholder} = this.$themeConfig.valine;
        new Valine({
            el: "#vcomments",
            appId,
            appKey,
            notify,
            verify,
            path: window.location.pathname,
            visitor,
            avatar,
            placeholder,
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

