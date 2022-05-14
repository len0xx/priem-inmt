<script lang="ts">
    export let src = ''
    export let name = ''
    export let caption = ''
    export let description = ''
</script>

<div class="graduate">
    <div class="image" style="background-image: url({src})"></div>
    <div class="card-content">
        <div class="text">
            <h3 class="display-name blue-text">{ name }</h3>
            <p class="caption">{ caption }</p>
        </div>
        <p class="description">{ description }</p>
        <div class="rainbow"></div>
    </div>
</div>

<style>
    .graduate {
        background: white;
        max-width: 100%;
    }

    .graduate .image {
        display: block;
        width: 100%;
        height: 340px;
        background-position: center 0;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .graduate .card-content {
        position: relative;
        background-color: white;
    }

    @keyframes rollup {
        0% {
            height: 116px;
        }
        100% {
            height: 100%;
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: scale(0);
        }
        100% {
            opacity: 0.6;
            transform: scale(1);
        }
    }

    .graduate:hover .card-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: white;
        animation-name: rollup;
        animation-duration: 0.2s;
        animation-delay: 0.01s;
        animation-timing-function: ease-in-out;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }

    .graduate:hover .card-content .description {
        display: block;
        position: absolute;
        bottom: 1em;
        left: 0;
        padding: 0 1em;
        animation-name: fade-in;
        animation-duration: 0.2s;
        animation-delay: 0.01s;
        animation-timing-function: ease-in-out;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }

    .graduate .card-content .text {
        padding: 1em;
        padding-bottom: 2em;
    }

    .graduate .card-content h3 {
        margin: 0;
    }

    .graduate .card-content p.caption {
        margin: 0.5em 0;
    }

    .graduate .description {
        display: none;
        opacity: 0;
        transform: scale(0);
    }

    .graduate .rainbow {
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background-image: var(--rainbow-gradient);
    }
</style>
