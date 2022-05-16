<script lang="ts">
    import Grid from './Grid.svelte'

    export let img = ''
</script>

<Grid m={2} className="kit-slide">
    <Grid m={1}>
        <div class="kit-slide-content">
            <slot />
        </div>
        <div class="kit-buttons">
            <slot name="buttons" />
        </div>
    </Grid>
    <div class="kit-slide-img" style:background-image="url({ img })"></div>
</Grid>

<style>
    :global(.kit-slide > *:first-child) {
        padding-left: var(--content-padding-x);
    }

    :global(.kit-slide .kit-slide-content) {
        max-width: 85%;
    }

    @media screen and (min-width: 1600px) {
        :global(.kit-slide .kit-slide-content) {
            max-width: 74%;
        }
    }

    .kit-buttons {
        align-self: end;
        padding: 1em 0;
    }

    :global(.kit-slide .kit-slide-img) {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
