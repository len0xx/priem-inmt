<script lang="ts">
    import Progress from '$lib/components/Progress.svelte'
    export let invisible: boolean
    export let className = ''
</script>

<section class="kit-preloader {className}" class:x-invisible={invisible}>
    <Progress />
</section>

<style>
    .kit-preloader {
        display: grid;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        min-height: 100vh;
        background-color: white;
        z-index: 999;
        place-items: center;
        place-content: center;
        transition: 0.1s ease-in-out;
    }
    .kit-preloader.x-invisible {
        opacity: 0;
    }
</style>
