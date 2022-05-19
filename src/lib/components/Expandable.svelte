<script lang="ts">
    import Heading from './Heading.svelte'
    import Text from './Text.svelte'

    export let active = false
    export let className = ''
</script>

<div class="kit-expandable {className}" class:active={active} on:click>
    <div class="block-content">
        <div>
            <Heading size={ 3 } className="blue-text"><slot name="header"></slot></Heading>
            <Text marginY={ 0 }><slot name="text"></slot></Text>
        </div>
        <div class="icon">
            { #if active }
                <svg width="28" height="4" viewBox="0 0 28 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 2L0 2" stroke="#1E4391" stroke-width="3"/>
                </svg>
            { :else }
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 28V0" stroke="#1E4391" stroke-width="3"/>
                    <path d="M28 14L0 14" stroke="#1E4391" stroke-width="3"/>
                </svg>
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

    :global(.kit-expandable:not(.active) p) {
        transform: rotateX(90deg);
        height: 0px;
    }
    :global(.kit-expandable.active p) {
        transform: rotateX(0);
        height: auto;
    }
</style>
