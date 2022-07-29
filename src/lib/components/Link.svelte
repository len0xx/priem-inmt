<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { prefetch as execPrefetch } from '$app/navigation'

    const dispatch = createEventDispatcher()

    type LinkVariant = 'regular' | 'underlined' | 'interactive' | 'hover'

    export let href = '#'
    export let title = ''
    export let target = '_SELF'
    export let color = 'var(--blue)'
    export let lineWidth = 4
    export let prefetch = false
    export let variant: LinkVariant = 'regular'
    export let className = ''
    export let preventDefault = false
    let variantClass = variant + '-variant'

    const mouseOverHandler = () => {
        if (prefetch && href && !href.startsWith('#')) execPrefetch(href)
        dispatch('mouseover')
    }

    function handleClick(event: Event) {
        if (preventDefault) {
            event.preventDefault()
            dispatch('click')
        }
    }
</script>

<a {href} {title} {target} class="kit-link {className} {variantClass}" style:color on:click={ (event) => handleClick(event) } on:mouseover={ mouseOverHandler } on:focus on:mouseleave>
    { #if $$slots.before }
        <span class="before-content">
            <slot name="before" />
        </span>
    { /if }
    <slot />
    { #if $$slots.after }
        <span class="after-content">
            <slot name="after" />
        </span>
    { /if }
    <span class="kit-link-underline" style:background-color={ color } style:height={ lineWidth + 'px' }></span>
</a>

<style>
    a.kit-link {
        display: inline-block;
        position: relative;
        color: var(--blue);
        padding-bottom: 0;
    }

    a.kit-link:not(.regular-variant) {
        padding-bottom: 4px;
    }

    a.kit-link.hover-variant .kit-link-underline {
        display: none;
    }

    a.kit-link.hover-variant:hover .kit-link-underline {
        display: inline-block;
    }

    .kit-link-underline {
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        content: '';
        transition: 0.1s ease-in-out;
        background-color: var(--blue);
    }

    a.kit-link.regular-variant > .kit-link-underline {
        display: none;
    }

    a.kit-link.interactive-variant:hover .kit-link-underline {
        width: 50%;
    }

    .after-content {
        margin-left: 0.5em;
    }
</style>