<script lang="ts">
    export let type = 'submit'
    export let variant = 'primary'
    export let href = ''
    export let className = ''
    export let size: 'S' | 'M' | 'L' = 'M'

    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    let pressed = false

    const handleMouseDown = () => pressed = true

    const handleMouseUp = () => pressed = false

    const handleClick = () => {
        dispatch('click')
        if (href) window.location.href = href
    }
    let sizeClass = size === 'S' ? 'small' : size === 'L' ? 'large' : 'medium'
</script>

<button {type} class="kit-button variant-{variant} {className} {sizeClass}" class:pressed on:click={ handleClick } on:mousedown={ handleMouseDown } on:mouseup={ handleMouseUp }>
    <slot></slot>
</button>

<style>
    button.kit-button {
        background-color: var(--red);
        color: #FFFFFF;
        box-shadow: none;
        cursor: pointer;
        padding: 0.75em 2em;
        border-radius: 1em;
        font-weight: 500;
        border: none;
        transition: 0.2s ease-in-out;
    }
    button.small {
        border-radius: 1em;
        padding: 0.8em 2.1em;
    }
    button.medium {
        border-radius: 1.2em;
        padding: 1.2em 3.5em;
    }
    button.large {
        border-radius: 1.5em;
        padding: 1.5em 5.5em;
    }
    button:hover {
        background-color: var(--red-darken);
    }
    button.pressed {
        background-color: var(--red-darken-2);
    }
    button.variant-blue {
        background-color: var(--blue);
    }
    button.variant-blue:hover {
        background-color: var(--blue-darken);
    }
    button.variant-blue.pressed {
        background-color: var(--blue-darken-2);
    }
    button.wide {
        width: 100%;
    }
</style>
