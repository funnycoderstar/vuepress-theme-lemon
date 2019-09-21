<template>
    <transition
    name="dropdown"
    @enter="setHeight"
    >
    <slot/>
    </transition>
</template>
<script>
export default {
    name: 'DropdownTransition',
    methods: {
        setHeight(items) {
            items.style.height = items.scrollHeight + 'px';
        },
        unseHeight(items) {
            items.style.height = '';
        }
    }
}
</script>

<style lang="less">
.dropdown-enter, .dropdown-leave-to {
    height: 0 !important;
}
</style>

