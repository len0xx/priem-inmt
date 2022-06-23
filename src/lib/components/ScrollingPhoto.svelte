<script lang="ts">
    import { onMount } from 'svelte'
    import { RoundButton } from '.'
    import { DetectOS, type OS } from '$lib/utilities'

    export let src: string

    let os: OS = 'iOS'

    let image: HTMLImageElement
    const startingScroll = 500
    const startingOffset = -50
    const prescaler = 1.5
    const dx = 150
    let left = startingOffset
    $: transform = left + 'px'
    
    const scrollHandler = () => {
        if (os != 'Android' && os != 'iOS') {
            const top = image.getBoundingClientRect().top
            if (top < startingScroll) {
                left = startingOffset + (top - startingScroll) * prescaler
            }
        }
    }

    onMount(() => os = DetectOS())

    const swipeLeft = () => {
        if (left + dx < -50) {
            left += dx
        }
    }
    const swipeRight = () => {
        if (left - dx > -1 * image.offsetWidth + window.innerWidth - 50) {
            left -= dx
        }
    }
</script>

<svelte:window on:scroll={ scrollHandler }></svelte:window>

<div class="kit-scrolling-photo">
    <img { src } style:transform="translateX({ transform })" bind:this={ image } alt="">
    <div class="align-center my-4 pc-hide">
        <RoundButton variant="left" on:click={ swipeLeft } />
        <RoundButton variant="right" on:click={ swipeRight } />
    </div>
</div>

<style>
    img {
        transition: 0.1s ease-in-out;
        min-width: 100vw;
        min-height: 700px;
        max-width: unset !important;
    }
    
    @media screen and (max-width: 768px) {
        img {
            transition: 0.2s ease-in-out;
            min-height: 450px !important;
            max-height: 450px !important;
        }
    }
</style>
