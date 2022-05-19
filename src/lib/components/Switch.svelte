<script lang="ts">
    export let className = ''
    export let left = ''
    export let right = ''

    import { createEventDispatcher } from 'svelte'

    let state = false
    const dispatch = createEventDispatcher()

    function setState(s: boolean) {
        if (state != s) {
            state = s
            dispatch('change', { state })
        }
    }

    const toggleState = () => setState(!state)
</script>

<div class="kit-switch {className}" on:focus on:blur on:mouseover on:mouseleave on:mouseup on:mousedown>
    { #if left }
        <span class="heading-3" class:blue-text={!state} class:grey-text={state} on:click={() => setState(false)}>{ left }</span>
    { /if }
    <div class="toggler" class:toggled={state} on:click={toggleState}>
        <span class="switch"></span>
    </div>
    { #if right }
        <span class="heading-3" class:blue-text={state} class:grey-text={!state} on:click={() => setState(true)}>{ right }</span>
    { /if }
</div>

<style>
    .toggler {
        display: inline-block;
        position: relative;
        margin: 0 1em;
        border-radius: 20em;
        width: 54px;
        height: 26px;
        background-color: var(--blue);
        cursor: pointer;
        padding: 4px;
        transition: 0.1s ease-in-out;
    }

    span.heading-3 {
        cursor: pointer;
    }

    .toggler .switch {
        display: inline-block;
        position: relative;
        background-color: white;
        width: 18px;
        height: 18px;
        border-radius: 50%;
    }

    .toggler.toggled {
        padding-left: 32px;
    }
</style>
