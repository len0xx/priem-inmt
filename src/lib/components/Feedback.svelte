<script lang="ts">
    export let img = ''
    export let name = ''
    export let description = ''
</script>

<div class="feedback grid grid-2">
    <img class="feedback-image" src={ img } alt={ name }>
    <div class="feedback-heading">
        <h4 class="feedback-title subtitle blue-text no-margin">{ name }</h4>
        <p class="feedback-subheading no-margin">{ @html description }</p>
    </div>
    <p class="feedback-text no-margin">
        <slot />
    </p>
</div>

<style>
    .feedback {
        border: 1px solid rgba(34, 34, 34, 0.05);
        border-radius: 2px;
        padding: 1.25em;
        grid-template-columns: 64px 1fr;
    }

    .feedback-image {
        border-radius: 50%;
    }

    .feedback-title {
        margin-bottom: 0.3em;
    }

    .feedback-subheading,
    .feedback-text {
        font-size: calc(var(--text-size) * 0.875);
        line-height: 1.4;
    }

    .feedback-text {
        opacity: 0.6;
        grid-column: 1/3;
    }
</style>