<template>
    <div>
         <Vssue :title="$page.title" :options="options" class="vssue-warp"/>
    </div>
</template>
<script>
import { VssueComponent } from "vssue";
import GithubV3 from "@vssue/api-github-v3";
import 'vssue/dist/vssue.css'
export default {
    components: {
        Vssue: VssueComponent,
    },
    computed: {
        options() {
            return {
                api: GithubV3,
                locale: 'zh',
                owner: 'funnycoderstar',
                repo: 'gitment-blog',
                clientId: 'f1898d8e3b95cd8b8131',
                clientSecret: 'c19e60db0e8b085f5d15130b254f07089437467d',
            }
      }
    }
}
</script>
<style lang="stylus">
.vssue-warp {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 2.5rem;
}
</style>

