<script lang="ts">
    import { onMount } from 'svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'

    let Slider // for saving Carousel component class
    let slider: HTMLElement & { goToPrev: ({}) => void, goToNext: ({}) => void } // for calling methods of the slider instance
    let sliderDuration = 7 * 1000
    let sliderShifting = true
    let sliderProgress = '0%'

    let showPrevPage = () => slider.goToPrev({ animate: true })

    let showNextPage = () => slider.goToNext({ animate: true })

    const sliderPageChanged = () => {
        sliderShifting = false
        sliderProgress = '0%'
        setTimeout(() => sliderShifting = true, 600)
        setTimeout(() => sliderProgress = '100%', 650)
    }

    onMount(async () => {
        const module = await import('svelte-carousel')
        Slider = module.default

        setTimeout(() => sliderProgress = '100%', 200)
    })
</script>

<svelte:component 
    this={ Slider }
    arrows={ false }
    swiping={ false }
    autoplay={ true }
    bind:this={ slider }
    autoplayDuration={ sliderDuration }
    on:pageChange={ sliderPageChanged }
>
    <slot {showPrevPage} {showNextPage} />
    <div slot="dots"></div>
</svelte:component>
<Rainbow
    bind:width={ sliderProgress }
    transition={ sliderShifting ? ((sliderDuration + 500) / 1000 + 's linear') : 'none' }
    size="S"
/>
