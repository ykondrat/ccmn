
<template>
    <div class = 'main'>
        <h1>Analytics</h1>
        <bar v-bind:post="post"></bar>
    </div>
</template>

<script>
import Bar from './charts/Bar';


export default {
    name: 'Main',
    data () {
        return {
            post: [1, 2, 3, 4, 5, 6, 7],
            msg: 'Welcome to Your Vue.js App'
        }
    },
    components: {
        'bar': Bar
    }
}
</script>

<style scoped>

</style>
