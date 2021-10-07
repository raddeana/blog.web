<template>
    <router-view />
    <div id="micro-app"></div>
</template>
<script>
import { register } from './micro-app';

export default {
    name: 'App',
    mounted () {
        register();
    }
}
</script>
