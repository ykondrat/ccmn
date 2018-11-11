<template>
    <div id="app">
        <notifications group = 'error' classes = 'vue-notification error' position = 'top left'/>
        <notifications group = 'users' classes = 'vue-notification success' position = 'bottom right'/>
        <navigation />
        <transition name='moveInUp'>
            <router-view />
        </transition>
    </div>
</template>

<script>

    import Navigation from '@/components/Navigation';

    export default {
        name: 'App',
        components: {
            'navigation': Navigation
        }
    }

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
    .moveInUp-enter-active {
        animation: fadeIn 2s ease-in;
    }
    @keyframes fadeIn {
        0%{
            opacity: 0;
        }
        50%{
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
    }
    .moveInUp-leave-active {
        animation: moveInUp .3s ease-in;
    }
    @keyframes moveInUp{
        0%{
            transform: translateY(0);
        }
        100%{
            transform: translateY(-400px);
        }
    }

</style>
