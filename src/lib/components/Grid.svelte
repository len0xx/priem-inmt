<script lang="ts">
    type AlignItems = 'end' | 'center' | 'start' | 'stretch'
    type JustifyItems = 'left' | 'center' | 'right' | 'space-between' | 'space-around' | 'space-evenly'
    type AlignContent = AlignItems
    type JustifyContent = JustifyItems
    type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    type GapSize = 0 | 1 | 2 | 3 | 4 | 5 | 6
    type TwoColumnsRatio = '2:1' | '1:2' | '3:1' | '1:3' | '3:2' | '2:3' | '4:1' | '1:4' | '4:3' | '3:4' | '5:1' | '5:2' | '5:3' | '5:4' | null

    export let className = ''
    export let xs: GridSize = null
    export let s: GridSize = null
    export let m: GridSize = null
    export let l: GridSize = null
    export let xl: GridSize = null
    export let ratio: TwoColumnsRatio = null
    export let gap: GapSize = 1
    export let alignItems: AlignItems = 'stretch'
    export let justifyItems: JustifyItems = 'space-between'
    export let alignContent: AlignContent = 'stretch'
    export let justifyContent: JustifyContent = 'space-between'

    const defaultSize = 6
    let smallestSize = null
    if (xs !== null && smallestSize === null) smallestSize = xs
    if (s !== null && smallestSize === null) smallestSize = s
    if (m !== null && smallestSize === null) smallestSize = m
    if (l !== null && smallestSize === null) smallestSize = l
    if (xl !== null && smallestSize === null) smallestSize = xl
    if (smallestSize === null) smallestSize = defaultSize

    const getClosestSize = (arr: GridSize[], ind: 0 | 1 | 2 | 3 | 4, smallest: GridSize): GridSize => {
        for (let i = ind; i >= 0; i--) {
            if (arr[i] !== null) return arr[i]
        }
        return smallest
    }

    if (xs === null) xs = getClosestSize([xs, s, m, l, xl], 0, smallestSize)
    if (s === null) s = getClosestSize([xs, s, m, l, xl], 1, smallestSize)
    if (m === null) m = getClosestSize([xs, s, m, l, xl], 2, smallestSize)
    if (l === null) l = getClosestSize([xs, s, m, l, xl], 3, smallestSize)
    if (xl === null) xl = getClosestSize([xs, s, m, l, xl], 4, smallestSize)

    if (ratio !== null) {
        className = [className, 'grid-ratio-selected', 'grid-' + ratio.replace(':', '-')].join(' ')
    }
</script>

<div
    style:align-content={ alignContent }
    style:justify-content={ justifyContent }
    style:align-items={ alignItems }
    style:justify-items={ justifyItems }
    class="grid-container grid-gap-{gap} xsmall-viewport-{xs} small-viewport-{s} medium-viewport-{m} large-viewport-{l} xlarge-viewport-{xl} {className}"
    on:click
>
    <slot />
</div>

<style>
    .grid-container {
        display: grid;
        position: relative;
    }

    .grid-gap-0 {
        gap: 0em;
    }
    .grid-gap-1 {
        gap: 1em;
    }
    .grid-gap-2 {
        gap: 2em;
    }
    .grid-gap-3 {
        gap: 3em;
    }
    .grid-gap-4 {
        gap: 4em;
    }
    .grid-gap-5 {
        gap: 5em;
    }
    .grid-gap-6 {
        gap: 6em;
    }

    .grid-align-items-center {
        align-items: center;
    }
    .grid-align-items-end {
        align-items: end;
    }
    .grid-align-items-start {
        align-items: start;
    }
    .grid-align-items-stretch {
        align-items: stretch;
    }
    .grid-justify-items-left {
        justify-items: left;
    }
    .grid-justify-items-center {
        justify-items: center;
    }
    .grid-justify-items-right {
        justify-items: right;
    }
    .grid-justify-items-end {
        justify-items: end;
    }
    .grid-justify-items-start {
        justify-items: start;
    }
    .grid-justify-items-space-evenly {
        justify-items: space-evenly;
    }
    .grid-justify-items-space-between {
        justify-items: space-between;
    }
    .grid-justify-items-space-around {
        justify-items: space-around;
    }
    .grid-align-content-center {
        align-content: center;
    }
    .grid-align-content-end {
        align-content: end;
    }
    .grid-align-content-start {
        align-content: start;
    }
    .grid-align-content-stretch {
        align-content: stretch;
    }
    .grid-justify-content-left {
        justify-content: left;
    }
    .grid-justify-content-center {
        justify-content: center;
    }
    .grid-justify-content-right {
        justify-content: right;
    }
    .grid-justify-content-end {
        justify-content: end;
    }
    .grid-justify-content-start {
        justify-content: start;
    }
    .grid-justify-content-space-evenly {
        justify-content: space-evenly;
    }
    .grid-justify-content-space-between {
        justify-content: space-between;
    }
    .grid-justify-content-space-around {
        justify-content: space-around;
    }

    @media screen and (min-width: 1441px) {
        .xlarge-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .xlarge-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .xlarge-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .xlarge-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .xlarge-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .xlarge-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .xlarge-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .xlarge-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .xlarge-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .xlarge-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .xlarge-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .xlarge-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 1101px) and (max-width: 1440px) {
        .large-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .large-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .large-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .large-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .large-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .large-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .large-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .large-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .large-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .large-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .large-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .large-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 769px) and (max-width: 1100px) {
        .medium-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .medium-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .medium-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .medium-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .medium-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .medium-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .medium-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .medium-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .medium-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .medium-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .medium-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .medium-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 481px) and (max-width: 768px) {
        .small-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .small-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .small-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .small-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .small-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .small-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .small-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .small-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .small-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .small-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .small-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .small-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {
        .xsmall-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .xsmall-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .xsmall-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .xsmall-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .xsmall-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .xsmall-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .xsmall-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .xsmall-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .xsmall-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .xsmall-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .xsmall-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .xsmall-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }
</style>
