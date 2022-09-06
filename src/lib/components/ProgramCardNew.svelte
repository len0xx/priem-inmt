<script lang="ts">
    import { beforeUpdate } from 'svelte'
    import { Card, SelectButton } from '.'
    import type { EducationalProgram } from 'src/types'

    export let program: EducationalProgram

    let activeMode = 0

    enum EduMode {
        'fullTime' = 'Очно',
        'partFullTime' = 'Очно-заочно',
        'partTime' = 'Заочно'
    }

    beforeUpdate(() => {
        const modesLength = Object.keys(program.educationModes).length
        if (activeMode >= modesLength) activeMode = 0
    })
</script>

<Card variant="grey" color="custom" on:click className="gh7u">
    <svelte:fragment slot="header">
        { #each Object.keys(program.educationModes) as mode, i }
            <SelectButton size="S" variant={ activeMode == i ? 'active' : 'default' } on:click={ () => activeMode = i } color="blue">{ EduMode[mode] }</SelectButton>
        { /each }
    </svelte:fragment>
    <svelte:fragment slot="title">{ program.title }</svelte:fragment>
    <svelte:fragment slot="text">Направления: { program.directions.join(', ') }</svelte:fragment>
    <span slot="left" class="semi-bold">
        <span class="red-text">{ program.educationModes[Object.keys(program.educationModes)[activeMode]].vacantSpots.budget }</span>&nbsp;<span class="fourty-text-black" style:margin-right="1em">бюджет</span>
        <span class="blue-text">{ program.educationModes[Object.keys(program.educationModes)[activeMode]].vacantSpots.contract }</span>&nbsp;<span class="fourty-text-black">контракт</span>
    </span>
    <svelte:fragment slot="right">от { program.educationModes[Object.keys(program.educationModes)[activeMode]].price }₽</svelte:fragment>
</Card>

<style>
    :global(.gh7u) {
        cursor: default !important;
    }
</style>