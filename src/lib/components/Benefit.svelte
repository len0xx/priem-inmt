<script lang="ts">
    export let num = '0'
    export let caption = ''
</script>

<div class="stat-number">
    <h3 class="blue-text">{ num }</h3>
    <div class="divider"></div>
    { caption }
</div>

<style>
    h3 {
        margin: 0.25em 0;
        font-size: 2.5em;
    }
    .divider {
        display: block;
        position: relative;
        height: 8px;
        background-color: var(--blue);
        margin: 1em 0;
        width: 100%;
    }
</style>
