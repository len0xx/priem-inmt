<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    let state = false
    const dispatch = createEventDispatcher()

    function changeState() {
        state = !state
        dispatch('change', { state })
    }

    function setState(s: boolean) {
        if (state != s) {
            state = s
            dispatch('change', { state })
        }
    }
</script>

<span class="budget heading-3" class:blue-text={!state} class:grey-text={state} on:click={() => setState(false)}>Бюджет</span>
<div class="toggler" class:toggled={state} on:click={changeState}>
    <span class="switch"></span>
</div>
<span class="contract heading-3" class:blue-text={state} class:grey-text={!state} on:click={() => setState(true)}>Контракт</span>

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
