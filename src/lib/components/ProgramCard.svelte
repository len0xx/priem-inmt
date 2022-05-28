<script lang="ts">
    import { beforeUpdate } from 'svelte'
    import Card from './Card.svelte'
    import SelectButton from './SelectButton.svelte'

    export let program: any

    let activeMode = 0

	beforeUpdate(() => {
        const modesLength = program.educationModes.length
        if (activeMode >= modesLength) activeMode = 0
	})
</script>

<Card variant="grey" color="custom" on:click>
    <svelte:fragment slot="header">
        { #each program.educationModes as mode, i }
            <SelectButton size="S" variant={ activeMode == i ? 'active' : 'default' } on:click={ () => activeMode = i } color="blue">{ mode }</SelectButton>
        { /each }
    </svelte:fragment>
    <svelte:fragment slot="title">{ program.title }</svelte:fragment>
    <svelte:fragment slot="text">Направления: { program.directions.join(', ') }</svelte:fragment>
    <span slot="left" class="semi-bold">
        <span class="red-text">{ program.vacantSpots[activeMode][0] }</span> <span class="fourty-text-black">бюджет</span>
        <span class="blue-text" style:margin-left="1em">{ program.vacantSpots[activeMode][1] }</span> <span class="fourty-text-black">контракт</span>
    </span>
    <svelte:fragment slot="right">от { program.price[activeMode] }₽</svelte:fragment>
</Card>
