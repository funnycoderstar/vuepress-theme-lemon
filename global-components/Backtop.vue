<template>
<transition name="fade">
  <div class="back-top-wrap" @click="handleBackTop"  v-if="show">
    <i class="iconfont iconxiangshang_jiantou"></i>
  </div>
</transition>
</template>

<script>
export default {
    props: {
        threshold: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            scrollTop: 0,
        }
    },
    mounted() {
        this.scrollTop = this.getScrollTop()
        window.addEventListener('scroll',() => {
            this.scrollTop = this.getScrollTop();
        })
    },
    methods: {
        getScrollTop () {
            return window.pageYOffset
                || document.documentElement.scrollTop
                || document.body.scrollTop || 0
        },
        handleBackTop() {
            window.scrollTo({ top: 0, behavior: "smooth" });
            this.scrollTop = 0
        }
    },
    computed: {
        show () {
            return this.scrollTop > this.threshold
        }
    }
};
</script>

<style lang="stylus">
.back-top-wrap {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  position: fixed;
  right: 1.5rem;
  bottom: 2rem;
  z-index: 1001;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  padding: 12px;
  background-color: $accentColor;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
  cursor: pointer;

  .iconxiangshang_jiantou {
    color: #fff;
    font-size: 28px;
  }
}
.back-top-wrap:hover {
  color: lighten($accentColor, 30%);
}

.back-top-wrap:hover {
  color: lighten($accentColor, 30%);
}

@media (max-width: 959px) {
  .back-top-wrap {
    display: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


