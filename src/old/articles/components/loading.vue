<template>
    <div class="sk-cube-grid selected">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
    </div>
</template>

<style scoped>

</style>  

<script>

    export default {
        props: ['show'],
        ready() {
            this.$on('EVENT:SHOWLOADER', function () {
                this.show = true;
            });

            this.$on('EVENT:HIDELOADER', function () {
                this.show = false;
            });            
        }
    }
</script>
