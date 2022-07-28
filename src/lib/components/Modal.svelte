<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { fade, blur } from 'svelte/transition'
    import { clickOutside } from '$lib/actions'
    
    type Align = 'unset' | 'inherit' | 'initial' | 'left' | 'center' | 'right'

    export let id: string = undefined
    export let node: HTMLElement = undefined
    export let align: Align = 'unset'
    export let closable = true
    export let className = ''

    let ready = false
    let visible = false
    const TRANSITION_DELAY = 100
    const TRANSITION_DURATION = 200
    const dispatch = createEventDispatcher()

    export const open = () => {
        if (visible) return
        visible = true
        setTimeout(() => ready = true, (TRANSITION_DELAY + TRANSITION_DURATION))
        dispatch('open')
    }

    export const close = () => {
        if (!visible) return
        if (closable && ready) {
            visible = false
            setTimeout(() => ready = false, (TRANSITION_DELAY + TRANSITION_DURATION))
            dispatch('close')
        }
    }

    export const toggle = () => visible ? close() : open()

    onMount(() => {
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.key == 'Escape') {
                close()
            }
        })
    })
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
{ #if visible }
    <div class="kit-modal-wrapper" in:fade="{{ duration: TRANSITION_DURATION }}" out:fade="{{ delay: TRANSITION_DELAY, duration: TRANSITION_DURATION }}">
        <div class="shadow"></div>
        <div
            {id}
            bind:this={ node }
            class="kit-modal {className}"
            style:--local-align={ align }
            on:click
            on:mouseleave
            on:mouseover
            in:blur="{{ delay: TRANSITION_DELAY, duration: TRANSITION_DURATION }}"
            out:blur="{{ duration: TRANSITION_DURATION }}"
            use:clickOutside={ close }
        >
            { #if closable }
                <div class="close" on:click={ close }>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.12756 1.09638C1.54164 0.699558 2.19901 0.713545 2.59584 1.12762L5.92734 4.60397L9.41947 1.11184C9.82501 0.706294 10.4825 0.706294 10.8881 1.11184C11.2936 1.51738 11.2936 2.1749 10.8881 2.58044L7.3647 6.10382L10.5574 9.43532C10.9542 9.8494 10.9402 10.5068 10.5261 10.9036C10.1121 11.3004 9.45469 11.2864 9.05786 10.8723L5.89576 7.57276L2.58038 10.8881C2.17484 11.2937 1.51732 11.2937 1.11178 10.8881C0.706233 10.4826 0.706233 9.82507 1.11178 9.41953L4.4584 6.07291L1.09632 2.56466C0.699497 2.15058 0.713484 1.49321 1.12756 1.09638Z" fill="#222222"/>
                    </svg>
                </div>
            { /if }
            <div class="kit-modal-content">
                <slot />
            </div>
            <div class="footer">
                <slot name="footer" />
            </div>
        </div>
    </div>
{ /if }

<style>
    .kit-modal-wrapper {
        display: grid;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        place-content: center;
        place-items: center;
        z-index: 32;
    }

    .kit-modal-wrapper .shadow {
        display: block;
        position: relative;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .kit-modal-wrapper > * {
        grid-column: 1;
        grid-row: 1;
    }

    .kit-modal-wrapper .kit-modal {
        display: block;
        position: relative;
        background-color: white;
        color: black;
        width: 750px;
        text-align: var(--local-align);
    }

    :global(.kit-modal-wrapper .kit-modal > .close) {
        display: grid;
        place-content: center;
        place-items: center;
        position: absolute;
        top: 2em;
        right: 2em;
        background: rgba(0, 0, 0, 0.05);
        cursor: pointer;
        border-radius: 50%;
        z-index: 100;
        width: 46px;
        height: 46px;
    }

    :global(.kit-modal-wrapper .kit-modal > .close:hover) {
        background: rgba(0, 0, 0, 0.1);
    }

    .kit-modal-wrapper .kit-modal > .kit-modal-content {
        padding: 4em;
    }

    @media screen and (max-width: 768px) {
        .kit-modal-wrapper .kit-modal {
            width: 90%;
        }

        .kit-modal-wrapper .kit-modal > .kit-modal-content {
            padding: 3em 1em;
        }

        :global(.kit-modal-wrapper .kit-modal > .close) {
            top: 1em;
            right: 1em;
            width: 32px;
            height: 32px;
        }
    }
</style>
