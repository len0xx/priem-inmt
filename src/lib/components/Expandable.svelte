<script lang="ts">
    import { Text, Heading } from '.'
    import Icon from '$lib/components/Icon.svelte'
    import { slide } from 'svelte/transition'

    export let active = false
    export let className = ''
</script>

<div class="kit-expandable {className}" class:active on:click>
    <div class="block-content">
        <div>
            <Heading size={ 3 } className="blue-text"><slot name="header"></slot></Heading>
            {#if active}
                <div class="text" transition:slide={{ duration: 200 }}>
                    <Text marginY={ 0 }>
                        <slot name="text" />
                    </Text>
                </div>
            {/if}
        </div>
        <div class="icon">
            { #if active }
                <Icon name="minus" width={28} height={4} alt="Иконка минус" />
            { :else }
                <Icon name="plus" width={28} height={28} alt="Иконка плюс" />
            { /if }           
        </div>
    </div>
</div>

<style>
    .kit-expandable {
        padding: 1.2em 0;
        border-width: 2px;
        border-style: solid;
        border-top-color: transparent;
        border-bottom-color: var(--light-grey);
        border-right-width: 0;
        border-left-width: 0;
        cursor: pointer;
    }

    .kit-expandable .block-content {
        display: grid;
        position: relative;
        gap: 2em;
        grid-template-columns: 1fr 50px;
    }

    .kit-expandable .block-content .icon {
        justify-self: end;
        align-self: center;
    }

    .kit-expandable:first-of-type {
        border-top-color: var(--light-grey);
    }

    :global(.kit-expandable > h4) {
        margin-top: 0.5em;
    }

    :global(.kit-expandable p) {
        margin: 0;
        transition: 0.1s ease-in-out;
    }

    .kit-expandable.active {
        border-top-color: var(--blue);
        border-bottom-color: var(--blue);
    }

    /* :global(.kit-expandable:not(.active) p) {
        transform: rotateX(90deg);
        height: 0px;
    }
    :global(.kit-expandable.active p) {
        transform: rotateX(0);
        height: auto;
    } */
</style>
