<script lang="ts">
    export let variant = 'default'
</script>

<div class="pill {variant}" on:click>
    <slot></slot>
</div>

<style>
    .pill {
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

    .pill:not(.blue):hover {
        border-color: var(--red);
        color: var(--red);
    }

    .pill.active {
        border-color: var(--red);
        color: var(--red);
        cursor: default;
    }

    .pill.blue {
        background-color: var(--blue);
        border-color: var(--blue);
        color: white;
    }

    .pill.blue:hover {
        background-color: var(--blue-darken);
        border-color: var(--blue-darken);
    }
</style>
