<script lang="ts">
    export let label: string
    export let name: string
    export let type: 'checkbox' | 'radio'
    export let group: any = undefined
    export let width = 150
    export let options: any[]

    import plusIcon from '$lib/img/filter-plus-icon.svg'
    import minusIcon from '$lib/img/filter-minus-icon.svg'
    import plusActiveIcon from '$lib/img/filter-blue-plus-icon.svg'
    import minusActiveIcon from '$lib/img/filter-blue-minus-icon.svg'

    let display = false
    let labelButton: HTMLSpanElement
    let filterContent: HTMLDivElement

    $: selected = group.length > 0

    const handleWindowClick = (event: Event) => {
        if (
            !labelButton.contains(event.target as Node) &&
            !labelButton.isSameNode(filterContent) &&
            !filterContent.contains(event.target as Node)
        ) display = false
    }
</script>

<span class="kit-filter-button">
    <span class="kit-filter-label semi-bold subtitle" class:selected bind:this={ labelButton } on:click={ () => display = !display }>
        { label }
        { #if !display }
            <img class="kit-filter-icon" src={ selected ? plusActiveIcon : plusIcon } alt="plus-icon">
        { :else }
            <img class="kit-filter-icon" src={ selected ? minusActiveIcon : minusIcon } alt="minus-icon">
        { /if }
    </span>
    <div class="kit-filter-content" style:display={ display ? 'block' : 'none' } style:min-width={ width + 'px' } bind:this={ filterContent }>
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
</span>

<svelte:window on:click={ handleWindowClick }></svelte:window>

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
</style>