<template>
    <section
        style="border-top: 2px solid #eaecef;padding-top:1rem;margin-top:2rem;"
    >
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
            document.getElementsByClassName("leancloud-visitors")[0].id =
                window.location.pathname;
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
            avatar: "mm",
            placeholder: "添加评论",
        });
    },
};
</script>
