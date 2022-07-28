<script lang="ts">
    type ImageExtension = 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp'

    export let id: string = undefined
    export let name: string
    export let alt: string = undefined
    export let width = 32
    export let height = 32
    export let node: HTMLElement = undefined
    export let className = ''
    export let extension: ImageExtension = 'svg'
    export let path = '/img/icons/'

    $: src = path + name + '.' + extension
</script>

<img
    {id}
    {src}
    {alt}
    style:--icon-width={ width + 'px' }
    style:--icon-height={ height + 'px' }
    class="kit-icon { className }"
    bind:this={ node }
    on:click
    on:focus
    on:blur
    on:mouseover
    on:mouseup
/>

<style>
    .kit-icon {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        width: var(--icon-width);
        height: var(--icon-height);
    }
</style>
