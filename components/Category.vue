<template>
<div class="category">
    <div class="posts-collapse">
    <div class="collection-title">
      <h1>
        javascript
        <small>标签</small>
      </h1>
    </div>
    <article class="post post-type-tags" itemscope itemtype="http://schema.org/Article">
      <header class="post-header" style="opacity: 1; display: block; transform: translateY(0px);">
        <h2 class="post-title">
          <a class="post-title-link" href="/2018/06/19/2018-06-19-JavaScript编码风格指南/" itemprop="url">
            <span itemprop="name">JavaScript编码风格指南</span>
          </a>
        </h2>
        <div class="post-meta">
          <time
            class="post-time"
            itemprop="dateCreated"
            datetime="2018-06-19T20:29:59+08:00"
            content="2018-06-19"
          >06-19</time>
        </div>
      </header>
    </article>
    <article class="post post-type-tags" itemscope itemtype="http://schema.org/Article">
      <header class="post-header" style="opacity: 1; display: block; transform: translateY(0px);">
        <h2 class="post-title">
          <a class="post-title-link" href="/2018/06/19/2018-06-19-JavaScript编码风格指南/" itemprop="url">
            <span itemprop="name">JavaScript编码风格指南</span>
          </a>
        </h2>
        <div class="post-meta">
          <time
            class="post-time"
            itemprop="dateCreated"
            datetime="2018-06-19T20:29:59+08:00"
            content="2018-06-19"
          >06-19</time>
        </div>
      </header>
    </article>
</div>
</div>
    
  
</template>

<script>
export default {
    name: 'Category'
};
</script>

<style lang="stylus">
.category {
    max-width: 740px;
    margin: 0 auto;
    padding $navbarHeight 0;
    position: relative;
    min-height: calc(100vw - 38rem);
}
.posts-collapse::after {
    content: " ";
    position: absolute;
    top: 20px;
    left: 0;
    margin-left: -2px;
    width: 4px;
    height: 100%;
    background: #f5f5f5;
    z-index: -1;
}
.posts-collapse {
    position: relative;
    z-index: 999;
    .collection-title {
        opacity: 1;
        display: block;
        transform: translateX(0px);
        position: relative;
        margin: 60px 0;
        
        small {
            color: #bbb;
            margin-left: 5px;
            font-size: 80%;
        }
    }
}
.posts-collapse .collection-title::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 50%;
    margin-left: -4px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    background: #bbb;
    border-radius: 50%;
}
.posts-collapse .collection-title h1,
.posts-collapse .collection-title h2 {
    margin-left: 20px;
    
}
.posts-collapse .post-header {
    position: relative;
    transition-duration: .2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: border;
    border-bottom: 1px dashed #ccc;
}
.posts-collapse .post-header:hover {
    border-bottom-color: #666;
}
.posts-collapse .post-title {
    margin-left: 60px;
    font-size: 16px;
    font-weight: 400;
    line-height: inherit;
    border: 0;
    padding-bottom: 0;
}
.posts-collapse .post-header:hover::before {
    background: #222;
}
.posts-collapse .post-meta {
    position: absolute;
    font-size: 12px;
    left: 20px;
    top: 5px;
}
.posts-collapse .post-header::before {
    content: " ";
    position: absolute;
    left: 0;
    top: 12px;
    width: 6px;
    height: 6px;
    margin-left: -4px;
    background: #bbb;
    border-radius: 50%;
    border: 1px solid #fff;
    transition-duration: .2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: background;
}
.posts-collapse .post-title a {
    color: #666;
    border-bottom: none;
    text-decoration: none;
}

.posts-collapse .post {
    margin: 30px 0;
}
</style>



