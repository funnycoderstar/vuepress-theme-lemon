<template>
    <div class="hot-pages-wrap">
        <h3>热门文章</h3>
        <ul>
            <li v-for="(page, index) in hotPagesList" :key="index">
                <router-link :to="page.url || '/'" class="tag-item" >{{page.title}}({{page.time}})</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'HotPages',
    data() {
        return {
            hotPagesList: []
        }
    },
    mounted() {
        let query = new AV.Query('Counter');//表名
        query.descending('time'); //结果按阅读次数降序排序
        query.limit(5);  //最终只返回5条结果
        query.find().then( response => {
            this.hotPagesList = [];
            response.forEach((item) => {
                this.hotPagesList.push(item.attributes);
            })
            // console.log(66666, response);
        })
        .catch( error => {
            console.log(error);
        });
    },
}
</script>



