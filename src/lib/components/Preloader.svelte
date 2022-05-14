<script lang="ts">
    export let invisible: boolean
</script>

<section class="preloader" class:x-invisible={invisible}>
    <img src="/img/preloader.svg" alt="Preloader">
</section>

<style>
    .preloader {
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
    .preloader img {
        animation-name: rotation;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-direction: normal;
        animation-iteration-count: infinite;
    }
    :global(.preloader.x-invisible) {
        opacity: 0;
    }
</style>
