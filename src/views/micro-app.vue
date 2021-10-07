<template>
<div id="micro-app" class="micro-app"></div>
</template>
<style lang="scss" scoped>
</style>
<script>
import { loadMicroApp } from 'qiankun';

export default {
    mounted () {
        loadMicroApp({
            name: 'voyage',
            entry: '//localhost:8081/',
            container: '#micro-app',
        });
    }
}
</script>