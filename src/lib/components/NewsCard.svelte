<script lang="ts">
    export let img = ''
    export let title = ''
</script>

<div class="news-card">
    <div class="cover" style="background-image: url({img})"><div class="rainbow"></div></div>
    <div class="news-content">
        <h3 class="blue-text no-top-margin">{ title }</h3>
        <slot />
    </div>
</div>

<style>
    .news-card {
        border: 1px solid rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .cover {
        display: block;
        position: relative;
        max-width: 100%;
        height: 260px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
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
        padding: 1em;
        padding-bottom: 1.5em;
    }
</style>