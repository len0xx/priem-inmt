<script lang="ts">
    import { fade, fly } from 'svelte/transition'

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
    <div class="mobile-menu" in:fly={{ x: 300, duration: 300 }} out:fade={{ duration: 100 }}>
        <div class="close-btn">
            <svg on:click={() => visible = false} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="18" fill="#1E4391"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.2929 13.2929C13.6834 12.9024 14.3166 12.9024 14.7071 13.2929L18 16.5858L21.2929 13.2929C21.6834 12.9024 22.3166 12.9024 22.7071 13.2929C23.0976 13.6834 23.0976 14.3166 22.7071 14.7071L19.4142 18L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L18 19.4142L14.7071 22.7071C14.3166 23.0976 13.6834 23.0976 13.2929 22.7071C12.9024 22.3166 12.9024 21.6834 13.2929 21.2929L16.5858 18L13.2929 14.7071C12.9024 14.3166 12.9024 13.6834 13.2929 13.2929Z" fill="white"/>
            </svg>        
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
