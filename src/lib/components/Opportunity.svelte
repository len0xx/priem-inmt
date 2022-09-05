<script lang="ts">
    import { Icon, Text } from '.'

    export let title: string
    export let description: string
</script>

<div class="align-center" style:min-width="200px">
    <Icon name="blue-star" width={40} height={40} alt="star" />
    <Text className="semi-bold subtitle">{ title }</Text>
    <Text className="semi-bold small" opacity={0.6}>{ description }</Text>
</div>
