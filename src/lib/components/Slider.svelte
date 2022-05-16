<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'

    export let duration = 7
    export let swiping = false
    export let dots = false
    export let autoplay = true
    export let progressBar = true
    export let background = 'transparent'
    export let className = ''

    const dispatch = createEventDispatcher()

    let Slider // for saving Carousel component class
    let slider: HTMLElement & { goToPrev: ({}) => void, goToNext: ({}) => void } // for calling methods of the slider instance
    let sliderDuration = duration * 1000
    let sliderShifting = true
    let sliderProgress = '0%'

    let showPrevPage = () => slider.goToPrev({ animate: true })

    let showNextPage = () => slider.goToNext({ animate: true })

    const sliderPageChanged = (event: CustomEvent) => {
        if (progressBar) {
            sliderShifting = false
            sliderProgress = '0%'
            setTimeout(() => sliderShifting = true, 600)
            setTimeout(() => sliderProgress = '100%', 650)
        }
        dispatch('pageChanged', event.detail)
    }

    onMount(async () => {
        const module = await import('svelte-carousel')
        Slider = module.default

        setTimeout(() => sliderProgress = '100%', 200)
    })
</script>

<div class="kit-slider-wrapper { className }" style:background={ background }>
    <svelte:component 
        this={ Slider }
        arrows={ false }
        { dots }
        { swiping }
        { autoplay }
        bind:this={ slider }
        autoplayDuration={ sliderDuration }
        on:pageChange={ sliderPageChanged }
    >
        <slot { showPrevPage } { showNextPage } />
    </svelte:component>
    <div class="delimeter">
        <hr>
        { #if progressBar && autoplay }
            <Rainbow
                bind:width={ sliderProgress }
                transition={ sliderShifting ? ((sliderDuration + 500) / 1000 + 's linear') : 'none' }
                size="S"
            />
        { /if }
    </div>
</div>

<style>
    .kit-slider-wrapper {
        border-top: 1px solid rgba(190, 190, 190, 0.25);
    }

    hr {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 0;
        margin: 0;
        height: 1px;
        background-color: rgb(190, 190, 190);
        opacity: 0.25;
        border: 0;
        color: inherit;
    }
</style>
