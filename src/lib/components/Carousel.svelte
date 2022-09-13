<script lang="ts">
    import { onMount } from 'svelte'
    import RoundButton from './RoundButton.svelte'

    export let margin = 10 // Margin between the children
    export let className = ''
    export let displayButtons = true

    let childSize = 750 // Size of the children
    let dx = childSize + margin // Distance between the children

    let carousel: HTMLElement
    let translate = 765
    let index = 1
    let allowShift = true
    let bias = 0
    let innerWidth = 0
    let shifting = false

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
            shifting = false
            allowShift = true
            checkIndex()
        }, 200)
    }

    function swipeLeft() {
        shifting = true

        if (allowShift) {
            index--
            translate = -1 * index * dx
            updateTranslation()
            watchForShift()
        }
    
        allowShift = false
    }

    function swipeRight() {
        shifting = true

        if (allowShift) {
            index++
            translate = -1 * index * dx
            updateTranslation()
            watchForShift()
        }
    
        allowShift = false
    }

    function resizeHandler() {
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

        document.addEventListener('DOMContentLoaded', () => {
            // Wait for the children to load properly
            setTimeout(resizeHandler, 1000)
            setTimeout(updateTranslation, 1500)
        })
    })
</script>

<svelte:window bind:innerWidth on:resize={ resizeHandler } />

<div class="kit-carousel-wrapper { className }">
    <div class="kit-carousel-svelte" class:shifting bind:this={ carousel }>
        <slot />
    </div>
    { #if displayButtons }
        <div class="buttons">
            <RoundButton variant="left" on:click={ swipeLeft } />
            <RoundButton variant="right" on:click={ swipeRight } />
        </div>
    { /if }
</div>

<style>
    .kit-carousel-svelte {
        white-space: nowrap;
        -ms-overflow-style: none;
        overflow-x: unset;
        position: relative;
    }
    
    :global(.kit-carousel-svelte.shifting) {
        transition: 0.2s ease-in-out;
    }
    
    .kit-carousel-svelte::-webkit-scrollbar {
        display: none;
    }
    :global(.kit-carousel-svelte > div) {
        display: inline-block;
        position: relative;
        white-space: normal;
        height: auto;
        vertical-align: middle;
    }

    :global(.kit-carousel-svelte > div > img) {
        display: block;
        max-width: min(90vw, 750px);
        height: auto;
    }

    :global(.kit-carousel-svelte > div > .slide-img) {
        display: block;
        min-height: 400px;
        min-width: min(90vw, 750px);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 6px;
    }

    @media screen and (max-width: 768px) {
        :global(.kit-carousel-svelte > div > .slide-img) {
            min-height: 0;
            min-width: 0;
            height: 51vw;
            width: 78vw;
        }
    }

    .buttons {
        text-align: center;
        padding: 2em 0;
        position: relative;
    }
</style>
