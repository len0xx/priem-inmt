<script lang="ts">
    import { fade, slide } from 'svelte/transition'
    import plusIcon from '$lib/img/filter-plus-icon.svg'
    import minusIcon from '$lib/img/filter-minus-icon.svg'
    import plusActiveIcon from '$lib/img/filter-blue-plus-icon.svg'
    import minusActiveIcon from '$lib/img/filter-blue-minus-icon.svg'
    import { clickOutside } from '$lib/actions'

    export let label: string
    export let name: string
    export let type: 'checkbox' | 'radio'
    export let group: string | string[]
    export let width = 150
    export let hideOnBlur = true
    export let options: string[] | { value: string, title: string }[]

    let ready = false
    let display = false
    let clientWidth: number = undefined
    $: selected = group.length > 0
    $: mobileScreen = clientWidth < 768
    $: transitionFunction = mobileScreen ? slide : fade

    const handleClickOutside = () => {
        if (ready && hideOnBlur) {
            display = false
            ready = false
        }
    }

    const handleLabelClick = () => {
        // Если не использовать переменную ready, то контент вообще не откроется
        if (display) ready = false
        else setTimeout(() => ready = true, 100)

        display = !display
    }
</script>

<svelte:window bind:innerWidth={ clientWidth } />

<span class="kit-filter-button" use:clickOutside={ handleClickOutside }>
    <span class="kit-filter-label semi-bold subtitle" class:selected on:click={ handleLabelClick }>
        { label }
        { #if !display }
            <img class="kit-filter-icon" src={ selected ? plusActiveIcon : plusIcon } alt="plus-icon">
        { :else }
            <img class="kit-filter-icon" src={ selected ? minusActiveIcon : minusIcon } alt="minus-icon">
        { /if }
    </span>
    { #if display }
        <div class="kit-filter-content" style:min-width={ width + 'px' } transition:transitionFunction={{ duration: 100 }}>
            { #each options as option }
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>
                    { #if type == 'checkbox' }
                        <input type="checkbox" bind:group { name } value={ typeof option == 'string' ? option : option.value }/>
                    { :else }
                        <input type="radio" bind:group { name } value={ typeof option == 'string' ? option : option.value }/>
                    { /if }
                    <span>{ typeof option == 'string' ? option : option.title }</span>
                </label><br />
            { /each }
        </div>
    { /if }
</span>

<style>
    .kit-filter-button {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        margin-right: 2em;
    }

    .kit-filter-label {
        cursor: pointer;
    }

    .kit-filter-label.selected {
        color: var(--blue);
    }

    .kit-filter-icon {
        display: inline-block;
        vertical-align: middle;
        margin-left: 0.5em;
        margin-bottom: 0.2em;
    }

    .kit-filter-button > .kit-filter-content {
        display: block;
        position: absolute;
        width: fit-content;
        background-color: white;
        color: black;
        padding: 1em;
        z-index: 14;
        top: 150%;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.125);
    }

    @media screen and (min-width: 768px) {
        .kit-filter-button > .kit-filter-content {
            max-width: 30vw;
        }
    }

    @media screen and (max-width: 768px) {
        .kit-filter-button {
            width: 100%;
            margin-bottom: 2em;
            margin-right: 0;
        }
        .kit-filter-label {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
        }
        .kit-filter-icon {
            margin: 0;
        }
        .kit-filter-button > .kit-filter-content {
            position: static;
            box-shadow: none;
            padding: 0;
            padding-top: 1em;
            width: 100%;
        }
    }
</style>