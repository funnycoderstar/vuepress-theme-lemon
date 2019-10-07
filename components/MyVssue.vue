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
            const {locale, owner, repo, clientId, clientSecret} = this.$themeConfig.vssue;
            return {
                api: GithubV3,
                locale,
                owner,
                repo,
                clientId,
                clientSecret,
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
    a {
        color: $accentColor !important
    }
}
</style>

