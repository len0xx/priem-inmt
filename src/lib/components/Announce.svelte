<script lang="ts">
    import Grid from '$lib/components/Grid.svelte'

    export let image = ''
    export let vector = ''
    export let color = 'var(--blue)'
    export let textColor = 'white'
    export let imagePosition: 'left' | 'right' = 'right'
</script>

<section class="kit-announce mobile-hide" style:background-color={ color } style:background-image="url({ vector })" style:color={ textColor }>
    <Grid className="background" m={3} alignItems="stretch" gap={2}>
        { #if imagePosition == 'left' }
            <div class="img-block" style:background-image="url({ image })"></div>
        { /if }
        <div></div>
        <div></div>
        { #if imagePosition == 'right' }
            <div class="img-block" style:background-image="url({ image })"></div>
        { /if }
    </Grid>
    <div class="content">
        <Grid m={3} alignItems="stretch" gap={2}>
            { #if imagePosition == 'left' }
                <div></div>
            { /if }
            <div>
                <slot name="first" />
            </div>
            <div>
                <slot name="second" />
            </div>
        </Grid>
    </div>
</section>
<section class="kit-announce pc-hide" style:background-color={ color } style:color={ textColor }>
    <Grid className="background" m={1}>
        <div class="img-block" style:background-image="url({ image })"></div>
        <div class="content" style:padding-bottom="0px">
            <slot name="first" />
        </div>
        <div class="content" style:padding-top="20px">
            <slot name="second" />
        </div>
    </Grid>
</section>

<style>
    .kit-announce {
        background-position: 0 100%;
        background-repeat: no-repeat;
        background-size: 21%;
        color: white;
        display: grid;
        position: relative;
        align-content: center;
        justify-content: stretch;
        place-items: center;
        padding: 0 !important;
    }

    @media screen and (max-width: 768px) {
        .kit-announce {
            background-image: unset;
        }
    }

    @media screen and (min-width: 769px) {
        .kit-announce .content {
            min-height: 600px;
        }
    }

    :global(.kit-announce > *) {
        grid-row: 1;
        grid-column: 1;
    }

    :global(.kit-announce > .background) {
        width: 100%;
        height: 100%;
        align-items: stretch;
    }

    :global(.kit-announce > .background > .img-block) {
        background-repeat: no-repeat;
        background-position: 100% center;
        background-size: cover;
    }

    @media screen and (max-width: 768px) {
        :global(.kit-announce > .background > .img-block) {
            background-position: center 70%;
            height: 225px;
        }
    }

    .kit-announce .content {
        padding: 3em 0;
    }
</style>