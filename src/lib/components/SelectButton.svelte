<script lang="ts">
    export let variant: 'default' | 'active' | 'blue' = 'default'
    export let className = ''
</script>

<div
    class="kit-select-button variant-{variant} {className}"
    on:click
    on:focus
    on:blur
    on:mouseover
    on:mouseleave
    on:mouseup
    on:mousedown
>
    <slot></slot>
</div>

<style>
    .kit-select-button {
        display: inline-block;
        margin-right: 1em;
        margin-bottom: 1em;
        padding: 0.7em 0.85em;
        line-height: 1.1;
        border: 2px solid;
        border-color: var(--grey);
        color: var(--grey);
        cursor: pointer;
        border-radius: 10em;
        cursor: pointer;
    }

    .kit-select-button:not(.variant-blue):hover {
        border-color: var(--red);
        color: var(--red);
    }

    .kit-select-button.variant-active {
        border-color: var(--red);
        color: var(--red);
        cursor: default;
    }

    .kit-select-button.variant-blue {
        background-color: var(--blue);
        border-color: var(--blue);
        color: white;
    }

    .kit-select-button.variant-blue:hover {
        background-color: var(--blue-darken);
        border-color: var(--blue-darken);
    }
</style>
