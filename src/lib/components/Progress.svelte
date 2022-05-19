<script lang="ts">
    import progress from '$lib/img/progress.svg'
    export let className = ''
    export let size: 'S' | 'M' | 'L' = 'M'
    export let speed: 1 | 2 | 3 = 2
    let sizeClass = size === 'S' ? 'small' : size === 'L' ? 'large' : 'medium'
</script>

<img class="kit-progress {className} size-{sizeClass} speed-{speed}" src={progress} alt="Progress" on:click>

<style>
    @keyframes rotation {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(359deg)
        }
    }
    
    .kit-progress {
        display: inline-block;
        vertical-align: middle;
        animation-name: rotation;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-direction: normal;
        animation-iteration-count: infinite;
    }
    .kit-progress.size-small {
        height: 40px;
        width: 40px;
    }
    .kit-progress.size-medium {
        height: 60px;
        width: 60px;
    }
    .kit-progress.size-large {
        height: 80px;
        width: 80px;
    }
    .kit-progress.speed-1 {
        animation-duration: 2s;
    }
    .kit-progress.speed-2 {
        animation-duration: 1s;
    }
    .kit-progress.speed-3 {
        animation-duration: 0.5s;
    }
</style>
