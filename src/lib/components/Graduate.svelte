<script lang="ts">
    import Heading from "./Heading.svelte"
    import Rainbow from "./Rainbow.svelte"
    import Text from "./Text.svelte"

    type Size = 'S' | 'M' | 'L'

    export let src = ''
    export let name: string
    export let caption = ''
    export let inline: boolean = false
    export let description = ''
    export let size: Size = 'L'
    export let headingSize: 1 | 2 | 3 | 4 | 5 | 6 = 3

    let displayClass = inline ? 'inline-display' : ''
</script>

<div class="graduate {displayClass}">
    <div class="image size-{size}" style="background-image: url({src})"></div>
    <div class="card-content">
        <div class="text">
            <Heading size={ headingSize } className="blue-text" marginY={0.5}>{ name }</Heading>
            <div style:width="80%">
                { #if caption }
                    <Text className="caption" marginY={0.5} opacity={0.8}>{ caption }</Text>
                { /if }
                { #if description }
                    <Text className="description" marginBottom={0} opacity={0.6}>{ description }</Text>
                { /if }
            </div>
        </div>
    </div>
    <Rainbow size="S" fixed="bottom" />
</div>

<style>
    .graduate {
        position: relative;
        background: #F6F6F6;
        max-width: 100%;
    }

    :global(.graduate.inline-display) {
        display: inline-block;
        vertical-align: top;
        min-height: 500px;
    }

    :global(.graduate.inline-display:not(:last-child)) {
        margin-right: 1em;
    }

    .graduate .image {
        display: block;
        position: relative;
        width: 100%;
        height: 340px;
        min-width: 240px;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #C4C4C4;
    }

    .graduate .image.size-S {
        height: 240px;
    }

    .graduate .image.size-M {
        height: 290px;
    }

    .graduate .image.size-L {
        height: 340px;
    }

    .graduate .card-content {
        position: relative;
        background-color: #F6F6F6;
    }

    .graduate .card-content .text {
        padding: 1em;
        padding-bottom: 2em;
    }
</style>
