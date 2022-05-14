<script lang="ts">
    export let name = ''
    export let position = ''
    export let description = ''
    export let src = ''
</script>

<div class="video-card">
    <div class="img" style="background-image: url({ src })"><img src="/img/play-icon.svg" alt="Play"></div>
    <h4 class="blue-text">{ name }</h4>
    <p class="position">{ @html position }</p>
    { #if description }
        <p class="description">{ @html description }</p>
    { /if }
</div>

<style>
    .video-card .img {
        display: grid;
        position: relative;
        place-items: center;
        place-content: center;
        min-height: 426px;
        background: #C4C4C4;
        margin-bottom: 1em;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        .video-card .img {
            min-width: 220px;
        }
    }

    .video-card p.description {
        color: rgba(0, 0, 0, .6);
    }
</style>
