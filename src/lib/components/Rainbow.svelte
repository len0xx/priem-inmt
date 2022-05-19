<script lang="ts">
    export let size: 'S' | 'M' | 'L' = 'S'
    export let fixed: 'top' | 'bottom' | null = null
    export let width = '100%'
    export let transition = 'none'
    export let className = ''
    let sizeClass = size == 'S' ? 'small' : size == 'M' ? 'medium' : 'large'
</script>

<div class="kit-rainbow {sizeClass} {className}" class:fixedTop={ fixed == 'top' } class:fixedBottom={ fixed == 'bottom' } style:width style:transition on:click></div>

<style>
    :root {
        --rainbow-gradient: linear-gradient(270deg, #FF2D7F -0.71%, #FB3727 47.63%, #FEEA0F 100%);
    }

    .kit-rainbow {
        display: block;
        position: relative;
        width: 100%;
        height: 20px;
        background: var(--rainbow-gradient);
    }

    .kit-rainbow.fixedTop {
        position: absolute;
        top: 0;
        left: 0;
    }
    .kit-rainbow.fixedBottom {
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .kit-rainbow.small {
        height: 7px;
    }
    .kit-rainbow.medium {
        height: 14px;
    }
    .kit-rainbow.large {
        height: 20px;
    }
</style>