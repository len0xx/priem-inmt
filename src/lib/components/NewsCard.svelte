<script lang="ts">
    import Heading from './Heading.svelte'

    export let img = ''
</script>

<div class="news-card">
    <div class="cover-wrapper">
        <div class="cover" style="background-image: url({img})"><div class="rainbow"></div></div>
    </div>
    <div class="news-content">
        <Heading size={3} className="blue-text" marginTop={0}>
            <slot name="title" />
        </Heading>
        <slot />
    </div>
</div>

<style>
    .news-card {
        display: block;
        position: relative;
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
        overflow: hidden;
    }

    .cover-wrapper {
        display: block;
        position: relative;
        width: 100%;
        height: 260px;
    }
    
    .cover-wrapper .cover {
        display: block;
        position: absolute;
        width: 100%;
        height: 260px;
        top: 0;
        left: 0;
        background-position: center;
        background-size: 100%;
        background-repeat: no-repeat;
        transition: 0.1s ease-in-out;
        transform: scale(1);
        z-index: 0;
    }

    .news-card:hover .cover {
        transform: scale(1.05);
    }

    .news-card .cover .rainbow {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: var(--rainbow-gradient);
        opacity: 0;
        transition: 0.1s ease-in-out;
    } 

    .news-card:hover .cover .rainbow {
        opacity: 1;
    } 

    .news-content {
        background-color: white;
        z-index: 1;
        padding: 1em;
        padding-bottom: 1.5em;
    }
</style>