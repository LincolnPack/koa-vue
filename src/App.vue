<template>
    <div id="app" class="page-container">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    @import 'assets/styles/rest.scss';
    #app {
        
    }
    .page-container {
        margin: 0;
        padding: 0;
        width: 100%;
        height: calc(100vh);
    }
</style>