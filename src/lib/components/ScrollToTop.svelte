<script>
    import RoundButton from './RoundButton.svelte'

    let display = false
    const scrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'})

    function handleScrolling() {
        const currentScroll = window.scrollY
        display = currentScroll > 500
    }
</script>

<svelte:window on:scroll={ handleScrolling }></svelte:window>

<div id="scroll-to-top" style:display={ display ? 'block' : 'none' }>
    <RoundButton variant="up" size="M" on:click={ scrollTop } transparent={ false } />
</div>

<style>
    #scroll-to-top {
        display: block;
        position: fixed;
        bottom: 2em;
        left: 1.5em;
        z-index: 10;
    }
</style>
