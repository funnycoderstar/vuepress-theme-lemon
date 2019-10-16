<template>
    <div class="Toc-wrap">
        <ul>
            <li
                v-for="(item, index) in allHeaders"
                :key="index"
                :class="{ active: currentIndex === index }"
            >
                <router-link
                    :to="`#${item.id}`"
                    :style="{ marginLeft: item.nodeName.substring(1) * 1.2 + 'em' }"
                    >{{ item.textContent.substring(2) }}</router-link
                >
            </li>
        </ul>
    </div>
</template>

<script>
import { debounce } from '../util';
export default {
    data() {
        return {
            allHeaders: [],
            currentIndex: 0,
            allH: [],
            scrollTop: 0,
        };
    },
    mounted() {
        this.getAllHeaders();
        const hash = decodeURIComponent(this.$route.hash);
        if (hash) {
            const index = this.allHeaders.findIndex(
                (item) => item.id === decodeURIComponent(this.$route.hash).substring(1),
            );
            this.currentIndex = index;

            const currentHeader = document.querySelector(decodeURIComponent(this.$route.hash));
            function doScroll() {
                setTimeout(() => {
                    currentHeader.scrollIntoView();
                });
            }
            if (document.readyState === 'complete') {
                doScroll();
            } else {
                window.addEventListener('load', doScroll);
            }
        }
        window.addEventListener(
            'scroll',
            debounce(() => {
                this.getCurrentIndex();
            }, 20),
        );
    },

    methods: {
        getScrollTop() {
            return (
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0
            );
        },
        getAllHeaders() {
            const headers = document
                .querySelector('.theme-lemon-content')
                .querySelectorAll('h1, h2, h3, h4, h5, h6');
            this.allHeaders = [].slice.call(headers);
            this.allH = [];
            this.allHeaders.forEach((element) => {
                this.allH.push(element.offsetTop);
            });
        },
        getCurrentIndex() {
            this.scrollTop = this.getScrollTop() + 20;
            for (let i = 0; i < this.allH.length; i++) {
                if (
                    this.scrollTop > this.allH[i] &&
                    (i + 1 === this.allH.length || this.scrollTop <= this.allH[i + 1])
                ) {
                    this.currentIndex = i;
                    break;
                }
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.getCurrentIndex);
        },
    },
};
</script>

<style lang="stylus">
.Toc-wrap {
  max-width: 20rem;
  position: fixed;
  right: 2rem;
  top: $navbarHeight;
  font-size: 13px;

  li {
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-left: 2px solid $borderColor;

    a {
      color: $textColor;
      font-weight: normal;
    }
  }

  li.active {
    a {
      color: $accentColor;
    }

    border-color: $accentColor;
  }
}
@media (max-width: $MQMobile)
  .Toc-wrap
    display: none;
   
</style>
