<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import plusIcon from '$lib/img/plus-icon.svg'
    import leftIcon from '$lib/img/left-arrow.svg'
    import rightIcon from '$lib/img/right-arrow.svg'
    import upIcon from '$lib/img/up-arrow.svg'
    import downIcon from '$lib/img/down-arrow.svg'

    export let variant = 'plus'
    export let size: 'S' | 'M' | 'L' = 'M'
    export let className = ''
    export let transparent = true
    export let animate = true

    let pressed = false
    if (transparent) className += ' transparent-bg'
    const dispatch = createEventDispatcher()
    
    let sizeClass = size === 'S' ? 'small' : size === 'L' ? 'large' : 'medium'

    let icon = plusIcon
    if (variant === 'left') {
        icon = leftIcon
    } else if (variant === 'right') {
        icon = rightIcon
    } else if (variant === 'up') {
        icon = upIcon
    } else if (variant === 'down') {
        icon = downIcon
    }

    const handleMouseDown = () => {
        pressed = animate && true
        dispatch('mousedown')
    }

    const handleMouseUp = () => {
        pressed = animate && false
        dispatch('mouseup')
    }
</script>

<button
    class="kit-round-button {sizeClass} {className}"
    class:pressed
    on:click
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:focus
    on:blur
    on:mouseover
    on:mouseleave
>
    <img src={icon} alt="icon">           
</button>

<style>
    button.kit-round-button {
        display: inline-grid;
        place-content: center;
        place-items: center;
        background-color: rgb(246, 246, 246);
        line-height: 1;
        border: unset;
        border-radius: 50%;
        transition: 0.1s ease-in-out;
        transform: scale(1);
        vertical-align: middle;
        cursor: pointer;
    }

    button.kit-round-button.transparent-bg {
        background-color: #1E43910A;
    }

    button.kit-round-button.small {
        width: 42px;
        height: 42px;
    }

    button.kit-round-button.medium {
        width: 64px;
        height: 64px;
    }

    button.kit-round-button.large {
        width: 80px;
        height: 80px;
    }

    button.kit-round-button > img {
        max-width: 32px;
        max-height: 32px;
    }

    button.kit-round-button:hover {
        background-color: rgb(233, 236, 243);
    }

    button.kit-round-button.transparent-bg:hover {
        background-color: #1E43911A;
    }

    button.kit-round-button.pressed {
        background-color: rgb(224, 230, 238);
        transform: scale(1.1);
    }

    button.kit-round-button.transparent-bg.pressed {
        background-color: #102c6828;
    }

    button.kit-round-button:not(:last-of-type) {
        margin-right: 1em;
    }
</style>