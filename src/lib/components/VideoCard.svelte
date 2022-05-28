<script lang="ts">
    export let name = ''
    export let position = ''
    export let description = ''
    export let src = ''

    let video: HTMLVideoElement

    let videoPlaying = false
    const toggleVideo = () => {
        if (src) {
            if (!videoPlaying) {
                video.play()
                videoPlaying = true
            }
            else {
                video.pause()
                videoPlaying = false
            }
        }
    }
</script>

<div class="video-card">
    <div class="img" on:click={ toggleVideo }>
        <!-- svelte-ignore a11y-media-has-caption -->
        <video class="lazy" loop playsinline bind:this={ video } width="100%">
            <source data-src={ src } type="video/mp4">
        </video>
        { #if !videoPlaying }
            <img src="/img/play-icon.svg" alt="Play">
        { /if }
    </div>
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
        min-height: 226px;
        min-width: 239px;
        background: #C4C4C4;
        margin-bottom: 1em;
        cursor: pointer;
    }

    .video-card .img > * {
        grid-row: 1;
        grid-column: 1;
    }

    .video-card .img video {
        object-fit: cover;
        max-width: 239px;
    }

    .video-card .img img {
        transition: 0.1s ease-in-out;
        transform: scale(1);
    }

    .video-card:hover .img img {
        transform: scale(1.2);
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
