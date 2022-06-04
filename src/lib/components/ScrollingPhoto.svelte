<script lang="ts">
    import { onMount } from 'svelte'
    import { RoundButton } from '.'

    export let src: string

    type OS = 'Mac OS' | 'Windows' | 'Linux' | 'Android' | 'iOS' | 'Other'

    function DetectOS(): OS {
        let userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os: OS = 'Other'

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS'
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS'
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows'
        } else if (/Android/.test(userAgent)) {
            os = 'Android'
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux'
        }

        return os
    }

    let os = 'iOS'

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

    onMount(() => {
        os = DetectOS()
    })

    const swipeLeft = () => {
        if (left + dx < -50) {
            left += dx
        }
    }
    const swipeRight = () => {
        console.log(image.offsetWidth)
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
