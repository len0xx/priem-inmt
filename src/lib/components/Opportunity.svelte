<script lang="ts">
    import { Icon, Text } from '.'

    export let title: string
    export let description: string
</script>

<div class="kit-opportunity-block align-center">
    <Icon name="blue-star" width={40} height={40} alt="star" />
    <Text className="semi-bold subtitle">{ title }</Text>
    <Text className="semi-bold small" opacity={0.6}>{ description }</Text>
</div>

<style>
    .kit-opportunity-block {
        min-width: 200px;
    }

    :global(.horizontal-scroll .kit-opportunity-block) {
        display: inline-block;
        position: relative;
        vertical-align: top;
        max-width: 320px;
    }

    :global(.horizontal-scroll .kit-opportunity-block:not(:last-child)) {
        margin-right: 1em;
    }
</style>
