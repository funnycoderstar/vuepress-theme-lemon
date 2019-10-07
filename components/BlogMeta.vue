<template>
    <div class="blog-meta">
        <BlogTag :tags="tags"></BlogTag>
        <span
            class="meta-read meta leancloud-visitors"
            :data-flag-title="$page.title"
        >
            <i class="iconfont iconyanjing"></i>
            <i class="leancloud-visitors-count">{{counter ? counter : ''}}</i>
        </span>
        <span class="meta-time meta">
            <i class="iconfont iconriqi"></i>
            {{ time }}
        </span>
        <span class="pageCount">
            <i class="iconfont iconfilewordo"></i>
            {{ textCount }}</span
        >
        <span class="pageReadingTime">
            <i class="iconfont iconshijian"></i>
            {{ readingTime }}
        </span>
    </div>
</template>

<script>
export default {
    props: {
        tags: {},
        time: {},
        textCount: {},
        readingTime: {},
        /**
         * 首页阅读数通过 props 获取
         * 文章页阅读数是 Valion 动态修改 dom
         */
        counter: {
            type: Number,
            default: 0,
        }
    },
};
</script>

<style lang="stylus">
.blog-meta {
    color: #999;
    margin-top: 15px;
    font-size: 0.9rem;

    a {
        color: #999;
    }

    span {
        margin-right: 10px;
    }

    .iconai-eye {
        font-size: 1.2rem;
        color: #f5f5f5;
        margin-top: 2px;
    }

    .meta {
        margin-right: 10px;

        i {
            margin-right: 2px;
        }
    }

    .meta-tag:hover {
        color: $accentColor;
    }
}
</style>

