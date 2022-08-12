<script lang="ts">
    import { fly } from 'svelte/transition'
    import { Icon } from '.'

    let visible = false

    export const open = () => {
        if (visible) return
        visible = true
    }

    export const close = () => {
        if (!visible) return
        visible = false
    }
</script>

{#if visible}
    <div class="mobile-menu" transition:fly={{ x: 300, duration: 300 }}>
        <div class="close-btn">
            <Icon name="small-close-icon" width={36} height={36} alt="Кнопка закрытия окна" on:click={() => visible = false} />      
        </div>
        <nav>
            <slot />
        </nav>
        <div class="rainbow"></div>
    </div>
{/if}

<style>
    .mobile-menu {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 100;
        padding: 2em 1em;
        background-color: white;
        visibility: visible;
        overflow-y: auto;
    }

    .mobile-menu .close-btn {
        display: block;
        position: absolute;
        top: 1em;
        right: 1em;
        width: 36px;
        height: 36px;
    }

    .mobile-menu nav {
        display: block;
        padding-top: 3em;
    }

    :global(.mobile-menu nav > a) {
        margin: 0;
        font-size: 2em;
    }

    .mobile-menu .rainbow {
        display: block;
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>
