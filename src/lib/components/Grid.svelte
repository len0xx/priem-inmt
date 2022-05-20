<script lang="ts">
    type ItemsAlignment = 'end' | 'center' | 'start' | 'stretch' | 'initial' | 'inherit'
    type ContentAlignment = 'left' | 'center' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'initial' | 'inherit'
    type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    type TwoColumnsRatio = '2:1' | '1:2' | '3:1' | '1:3' | '3:2' | '2:3' | '4:1' | '1:4' | '4:3' | '3:4' | '5:1' | '5:2' | '5:3' | '5:4' | null

    export let id = ''
    export let className = ''
    export let xs: GridSize = null
    export let s: GridSize = null
    export let m: GridSize = null
    export let l: GridSize = null
    export let xl: GridSize = null
    export let ratio: TwoColumnsRatio = null
    export let gap = 1
    export let alignItems: ItemsAlignment = 'initial'
    export let justifyItems: ItemsAlignment = 'initial'
    export let alignContent: ContentAlignment = 'initial'
    export let justifyContent: ContentAlignment = 'initial'
    export let placeItems: ItemsAlignment = 'initial'
    export let placeContent: ContentAlignment = 'initial'

    const defaultSize = 6
    let smallestSize = null
    let ratioClasses = ''
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
        ratioClasses = ['grid-ratio-selected', 'grid-' + ratio.replace(':', '-')].join(' ')
    }
</script>

<div
    { id }
    style:gap={ gap + "em" }
    style:place-items={ placeItems }
    style:place-content={ placeContent }
    style:align-content={ alignContent }
    style:justify-content={ justifyContent }
    style:align-items={ alignItems }
    style:justify-items={ justifyItems }
    class="grid-container grid-gap-{gap} xsmall-viewport-{xs} small-viewport-{s} medium-viewport-{m} large-viewport-{l} xlarge-viewport-{xl} {className} {ratioClasses}"
    on:click
>
    <slot />
</div>

<style>
    .grid-container {
        display: grid;
        position: relative;
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
