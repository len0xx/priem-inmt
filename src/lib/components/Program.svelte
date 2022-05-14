<script lang="ts">
    export let title = ''
    export let description = ''
    export let price = ''
    export let vacantSpots = [0, 0]
</script>

<div class="program">
    <div class="radial-icon"></div>
    <div class="top">
        <h3 class="no-top-margin">{ title }</h3>
        { #if description }
            <p class="description">{ description }</p>
        { /if }
    </div>
    <div class="bottom">
        <div class="left">
            <p class="vacant-spots no-margin">
                { #if vacantSpots[0] }
                    <span class="red-text">{ vacantSpots[0] }</span> <span class="semi-transparent">бюджет</span>
                { /if }
                { #if vacantSpots[1] }
                    <span class="blue-text">{ vacantSpots[1] }</span> <span class="semi-transparent">контракт</span>
                { /if }
            </p>
        </div>
        <div class="right">
            { #if price }
                <p class="price no-margin">{ price }</p>
            { /if }
        </div>
    </div>
</div>

<style>
    .program {
        display: grid;
        grid-template-columns: 1fr;
        padding: 1em;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        background: #F6F6F6;
        overflow: hidden;
        cursor: pointer;
    }

    .program * {
        transition: 0.2s ease-in-out;
    }

    .program .radial-icon {
        display: block;
        position: absolute;
        top: 1em;
        right: 1em;
        width: 20px;
        height: 20px;
        background-image: url(/img/radial-gradient.png);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .program:hover .radial-icon {
        transform: translateY(2em) scale(23) rotate(200deg);
    }

    .program h3 {
        margin-right: 2em;
    }

    .program .top {
        align-self: start;
    }

    .program .bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-self: end;
    }

    .program .bottom > .left .blue-text {
        margin-left: 1em;
    }

    .program .bottom > .right {
        text-align: right;
    }

    .program .description {
        opacity: 0.4;
        font-size: 0.9em;
        margin-bottom: 1.5em;
    }

    .program:hover .price {
        color: white;
    }

    .program .price {
        color: var(--blue);
    }
</style>