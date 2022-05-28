<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import plusIcon from '$lib/img/plus-icon.svg'
    import leftIcon from '$lib/img/left-arrow.svg'
    import rightIcon from '$lib/img/right-arrow.svg'
    import upIcon from '$lib/img/up-arrow.svg'
    import downIcon from '$lib/img/down-arrow.svg'
    import plusBrightIcon from '$lib/img/bright-plus-icon.svg'
    import leftBrightIcon from '$lib/img/bright-left-arrow.svg'
    import rightBrightIcon from '$lib/img/bright-right-arrow.svg'
    import upBrightIcon from '$lib/img/bright-up-arrow.svg'
    import downBrightIcon from '$lib/img/bright-down-arrow.svg'

    const sizes = ['S', 'M', 'L', 'XL'] as const
    const sizeNames = ['small', 'medium', 'large', 'xlarge'] as const
    type Size = typeof sizes[number]

    export let variant = 'plus'
    export let theme: 'bright' | 'dark' = 'dark'
    export let size: Size = 'M'
    export let className = ''
    export let transparent = true
    export let animate = true

    let pressed = false
    if (transparent) className += ' transparent-bg'
    const dispatch = createEventDispatcher()
    
    let sizeClass = sizeNames[sizes.indexOf(size)]

    const icons = [
        {
            name: 'plus',
            icon: plusIcon,
            brightIcon: plusBrightIcon
        },
        {
            name: 'left',
            icon: leftIcon,
            brightIcon: leftBrightIcon
        },
        {
            name: 'right',
            icon: rightIcon,
            brightIcon: rightBrightIcon
        },
        {
            name: 'up',
            icon: upIcon,
            brightIcon: upBrightIcon
        },
        {
            name: 'down',
            icon: downIcon,
            brightIcon: downBrightIcon
        }
    ]

    let icon = icons.find(icon => icon.name == variant)[theme == 'bright' ? 'brightIcon' : 'icon']

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
    class="kit-round-button {sizeClass} {className} theme-{theme}"
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

    button.kit-round-button.theme-bright.transparent-bg {
        background-color: rgba(255, 255, 255, 0.2);
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

    button.kit-round-button.xlarge {
        width: 100px;
        height: 100px;
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

    button.kit-round-button.theme-bright.transparent-bg:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    button.kit-round-button.pressed {
        background-color: rgb(224, 230, 238);
        transform: scale(1.1);
    }

    button.kit-round-button.transparent-bg.pressed {
        background-color: #102c6828;
    }

    button.kit-round-button.theme-bright.transparent-bg.pressed {
        background-color: rgba(255, 255, 255, 0.4);
    }

    button.kit-round-button:not(:last-of-type) {
        margin-right: 1em;
    }
</style>