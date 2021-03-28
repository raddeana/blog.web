<template>
<div class="infinite-list-wrapper">
    <ul
        class="list"
        v-infinite-scroll="loadList"
        :infinite-scroll-disabled="isDisabled"
    >
        <li v-for="i in count" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
</div>
</template>
<style lang="scss" scoped>
.infinite-list-wrapper {
    height: 100%;
    text-align: center;
    overflow: hidden;
    overflow-y: auto;

    .list {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        background: #fff6f6;
        color: #ff8484;
    }

    .list-item + .list-item {
        margin-top: 10px;
    }

    p {
        margin: 10px 0 0 0;
        line-height: 30px;
    }
}
</style>
<script>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

export default {
    name: 'articles',
    setup: function () {
        let count = ref(0)
        let loading = ref(false)

        let loadList = () => {
            loading.value = true

            setTimeout(() => {
              count.value += 20
              loading.value = false
            }, 1600);
        }

        onMounted(loadList);

        let noMore = computed(() => {
            return count.value >= 60;
        });

        let isDisabled = computed(() => {
            return loading.value || noMore.value;
        });

        return {
            loadList,
            loading,
            noMore,
            isDisabled,
            count
        };
    }
}
</script>