<script lang="ts">
    export let src: string
    export let size = '80%'
    export let caption = ''
    export let className = ''
</script>

<div class="kit-partner {className}" on:click>
    <div class="image" style={ `background-image: url(${ src })` } style:background-size={ size }></div>
    { #if caption }
        <div class="caption align-center">{ caption }</div>
    { /if }
</div>

<style>
    .kit-partner {
        display: grid;
        gap: 1em;
        grid-template-columns: 1fr;
        place-items: center;
        min-height: 120px;
        padding: 0.3em;
    }

    :global(.kit-partner) {
        width: 240px;
    }

    :global(.grid-container .kit-partner) {
        width: 100%;
    }

    .image {
        position: relative;
        min-height: 100px;
        width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: 80%;
    }

    /* .image > img {
        display: block;
        position: relative;
        max-height: 85%;
    } */

    @media screen and (max-width: 568px) {
        /* .image > img {
            max-width: 110px;
        } */
        .image {
            min-height: 80px;
        }
    }
</style>