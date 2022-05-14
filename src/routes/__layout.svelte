<script lang="ts">

    import RoundButton from '$lib/components/RoundButton.svelte'

    let showScrollTop = false
    const scrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'})

    function handleScrolling() {
        const currentScroll = window.scrollY
        showScrollTop = currentScroll > 500
    }
</script>

<svelte:window on:scroll={ handleScrolling }></svelte:window>

<main>
    <div id="scroll-up" style:display={ showScrollTop ? 'block' : 'none' }>
        <RoundButton variant="up" size="M" on:click={ scrollTop } transparent={ false } />
    </div>
    <slot />
</main>

<style>
    main {
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 92px;
    }
</style>
