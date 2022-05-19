<script lang="ts">
    type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

    import Grid from '$lib/components/Grid.svelte'

    export let columns: GridSize
</script>

<Grid m={ columns }>
    <slot />
</Grid>