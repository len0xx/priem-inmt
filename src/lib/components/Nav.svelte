<script lang="ts">
    export let className = ''
</script>

<nav class={className}>
    <slot></slot>
</nav>

<style>
    :global(nav a:not(:first-of-type)) {
        margin-left: 1em;
    }
    :global(nav a:not(:last-of-type)) {
        margin-right: 1em;
    }
    :global(nav a.underlined) {
        padding-bottom: 4px;
        border-bottom: 2px solid rgba(255, 255, 255, 0);
    }
    :global(nav a.underlined.black) {
        border-bottom: 2px solid rgba(0, 0, 0, 0);
    }
    :global(nav a.underlined:hover) {
        border-bottom: 2px solid rgba(255, 255, 255, 1);
    }
    :global(nav a.underlined.black:hover) {
        border-bottom: 2px solid rgba(0, 0, 0, 1);
    }
</style>
