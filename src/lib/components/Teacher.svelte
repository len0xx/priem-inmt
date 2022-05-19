<script lang="ts">
    import Grid from "./Grid.svelte"
    import Heading from "./Heading.svelte"
    import Rainbow from "./Rainbow.svelte"
    import Text from "./Text.svelte"

    export let image = ''
</script>
<div class="kit-teacher">
    <Grid m={2} gap={0}>
        <div class="teacher-img" style:background-image="url({ image })"></div>
        <Grid m={1} className="teacher-info" alignContent="space-between">
            <div>
                <Heading size={3} className="blue-text" marginY={0}><slot name="name" /></Heading>
                <Text opacity={0.6} marginY={0.2}><slot name="description" /></Text>
            </div>
            <Text className="kit-teacher-footer" opacity={0.6}><slot name="footer" /></Text>
        </Grid>
    </Grid>
    <Rainbow size="M" fixed="bottom" />
</div>

<style>
    .kit-teacher {
        background-color: #F6F6F6;
    }

    .teacher-img {
        min-height: 466px;
        display: block;
        position: relative;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }

    :global(.teacher-info) {
        padding: 1em;
    }

    :global(.kit-teacher-footer) {
        justify-self: end;
    }
</style>