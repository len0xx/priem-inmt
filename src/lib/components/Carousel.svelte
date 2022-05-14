<script lang="ts">
    import { onMount } from 'svelte'
    import RoundButton from './RoundButton.svelte'

    export let margin = 10          // Margin between the children
    export let className = ''

    let childSize = 750             // Size of the children
    let dx = childSize + margin     // Distance between the children

    let carousel: HTMLElement
    let translate = 765
    let index = 1
    let allowShift = true
    let bias = 0
    $: innerWidth = 0

    function checkIndex() {
        // Minus two because we have added two more elements to the carousel
        const length = carousel.children.length - 2
        if (index == -1) index = length - 1

        if (index == length) index = 0

        translate = -1 * index * dx
        updateTranslation()
    }

    function watchForShift() {
        setTimeout(() => {
            carousel.classList.remove('shifting')
            allowShift = true
            checkIndex()
        }, 200)
    }

    function swipeLeft() {
        carousel.classList.add('shifting')

        if (allowShift) {
            index--
            translate = -1 * index * dx
            updateTranslation()
            watchForShift()
        }
    
        allowShift = false
    }

    function swipeRight() {
        carousel.classList.add('shifting')

        if (allowShift) {
            index++
            translate = -1 * index * dx
            updateTranslation()
            watchForShift()
        }
    
        allowShift = false
    }

    function resizeHandler() {
        const parent = carousel.parentElement as HTMLElement
        innerWidth = parent.clientWidth
        childSize = (carousel.children[0] as HTMLElement).offsetWidth
        dx = childSize + (margin > 4 ? margin : 4)
        const y = -(dx - innerWidth) / 2
        const dx2 = Math.ceil(y / dx) * dx
        bias = y - dx2
        translate = -dx
        updateTranslation()
    }

    const updateTranslation = () => carousel.style.left = (bias + translate) + 'px'

    onMount(() => {
        resizeHandler()

        for (let i = 0; i < carousel.children.length; i++) {
            (carousel.children[i] as HTMLElement).style.marginRight = margin + 'px'
        }
    
        const firstNode = carousel.children[0]
        const lastNode = carousel.children[carousel.children.length - 1]

        const cloneFirst = firstNode.cloneNode(true)
        const cloneLast = lastNode.cloneNode(true)

        // Clone first and last slide to make the seamless infinite scroll
        carousel.appendChild(cloneFirst)
        carousel.insertBefore(cloneLast, firstNode)

        // Wait for the children to load properly
        setTimeout(resizeHandler, 1000)
        setTimeout(updateTranslation, 1500)
    })
</script>

<svelte:window on:resize={resizeHandler} />

<div class="kit-carousel-wrapper {className}">
    <div class="kit-carousel" bind:this={carousel}>
        <slot />
    </div>
    <div class="buttons">
        <RoundButton variant="left" on:click={swipeLeft} />
        <RoundButton variant="right" on:click={swipeRight} />
    </div>
</div>

<style>
    .kit-carousel {
        white-space: nowrap;
        -ms-overflow-style: none;
        scrollbar-height: none;
        overflow-x: unset;
    }
    
    :global(.kit-carousel.shifting) {
        transition: 0.2s ease-in-out;
    }
    
    .kit-carousel::-webkit-scrollbar {
        display: none;
    }
    :global(.kit-carousel > div) {
        display: inline-block;
        position: relative;
        white-space: normal;
        height: auto;
        vertical-align: middle;
    }

    :global(.kit-carousel > div > img) {
        display: block;
        max-width: min(90vw, 750px);
        height: auto;
    }

    .buttons {
        text-align: center;
        padding: 2em 0;
    }
</style>
