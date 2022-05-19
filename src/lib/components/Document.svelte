<script lang="ts">
    import Heading from './Heading.svelte'

    export let extension: string
    export let filename: string
    export let link = ''
    export let className = ''
</script>

<div class="kit-document {className}" on:click>
    <div class="extension { extension }">.{ extension }</div>
    <Heading size={4} marginY={0}>
        { #if link }
            <a target="_BLANK" href={ link }>
                { filename }.{ extension }
            </a>
        { :else }
            { filename }.{ extension }
        { /if }
    </Heading>
</div>

<style>
    .kit-document {
        display: grid;
        grid-template-columns: 70px 1fr;
        gap: 2em;
        padding: 2.5em 0;
        position: relative;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        align-items: center;
    }

    .kit-document:first-of-type {
        border-top: 2px solid rgba(0, 0, 0, 0.1);
    }

    .kit-document .extension {
        display: inline-block;
        position: relative;
        padding: 0.5em;
        background: var(--red);
        color: white;
        align-self: start;
        line-height: 1;
        text-align: center;
        cursor: default;
    }

    .kit-document .extension.doc,
    .kit-document .extension.docx {
        background: var(--blue);
    }

    .kit-document .extension.xls,
    .kit-document .extension.xlsx {
        background: var(--green);
    }

    .kit-document a {
        color: black;
    }

    .kit-document a:hover {
        color: var(--blue);
        text-decoration: underline;
    }
</style>
