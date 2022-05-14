<script lang="ts">
    export let img = ''
</script>

<div class="grid grid-2 m-grid-1 slider-slide">
    <div class="grid">
        <div class="slide-content">
            <slot />
        </div>
        <div class="buttons-bottom">
            <slot name="buttons" />
        </div>
    </div>
    <div class="slide-img" style:background-image="url({ img })"></div>
</div>

<style>
    .slider-slide > *:first-child {
        padding-left: var(--content-padding-x);
    }

    .slider-slide .slide-content {
        max-width: 85%;
    }

    @media screen and (min-width: 1600px) {
        .slider-slide .slide-content {
            max-width: 74%;
        }
    }

    .buttons-bottom {
        align-self: end;
        padding-bottom: 1em;
    }

    .slider-slide .slide-img {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
