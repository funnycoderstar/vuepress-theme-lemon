<template>
  <SWUpdatePopup v-if="isShowPop">
    <div
      slot-scope="{ enabled, reload, message, buttonText }"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
      <button @click="close">关闭</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  data() {
    return {
      isShowPop: true
    }
  },
  components: { SWUpdatePopup },
  methods: {
    close() {
      this.isShowPop = false;
    }
  }
}
</script>

<style>
.my-sw-update-popup {
  position: fixed;
    right: 0;
    top: 5em;
    padding: 1em;
    border: 1px solid #3eaf7c;
    border-radius: 3px;
    background: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,.5);
    text-align: center;
    z-index: 2;
}

.my-sw-update-popup button {
  margin-top: .5em;
  padding: .25em 0.5em;
}
</style>