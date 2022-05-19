<script lang="ts">
    type LinkVariant = 'regular' | 'underlined' | 'interactive'

    export let href = ''
    export let title = ''
    export let target = '_SELF'
    export let color = 'var(--blue)'
    export let lineWidth = 4
    export let variant: LinkVariant = 'regular'
    export let className = ''

    className = className.length ? [className, variant + '-variant'].join(' ') : variant + '-variant'
</script>

<a {href} {title} {target} class="kit-link {className}" style:color on:click on:mouseover on:focus on:mouseleave>
    <slot />
    <span class="kit-link-underline" style:background-color={ color } style:height={ lineWidth + 'px' }></span>
</a>

<style>
    a.kit-link {
        display: inline-block;
        position: relative;
        color: var(--blue);
        padding-bottom: 0;
    }

    a.kit-link.underlined-variant,
    a.kit-link.interactive-variant {
        padding-bottom: 4px;
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
</style>