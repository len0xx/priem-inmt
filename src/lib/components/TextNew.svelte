<script lang="ts">
    import { computePadding } from '$lib/utilities'
    import type { Align, Padding } from 'urfu-ui-kit'
    
    const defaultMargin = { x: 0, y: 1 }

    export let id: string = undefined
    export let node: HTMLElement = undefined
    export let align: Align = 'unset'
    export let className = ''
    export let color = ''
    export let opacity = 1
    export let inline = false
    export let maxWidth = ''
    export let lineHeight = 1.4
    export let margin: Padding = defaultMargin

    $: inlineClass = inline ? 'inline-paragraph' : ''
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<p
    {id}
    bind:this={ node }
    class="kit-text-component { className } { inlineClass }"
    style:opacity
    style:--text-component-color={color}
    style:--local-align={ align }
    style:margin={ computePadding({ ...defaultMargin, ...margin }) }
    style:--local-max-width={ maxWidth }
    style:--local-line-height={ lineHeight }
    on:click
    on:mousedown
    on:mouseup
    on:mouseover
    on:mouseleave
    on:keydown
    on:keyup
    on:keypress
>
    <slot />
</p>

<style>
    p.kit-text-component {
        display: block;
        position: relative;
        color: var(--text-component-color);
        text-align: var(--local-align);
        max-width: var(--local-max-width);
        line-height: var(--local-line-height);
    }

    p.inline-paragraph {
        display: inline-block;
    }
</style>
