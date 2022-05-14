<script lang="ts">
    export let extension = 'pdf'
    export let filename = ''
    export let src = ''
</script>

<div class="document-item">
    <div class="extension { extension }">.{ extension }</div>
    <h4 class="no-margin"><a href={ src }>{ filename }.{ extension }</a></h4>
</div>

<style>
    .document-item {
        display: grid;
        grid-template-columns: 70px 1fr;
        gap: 2em;
        padding: 2.5em 0;
        position: relative;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
    }

    .document-item:first-of-type {
        border-top: 2px solid rgba(0, 0, 0, 0.1);
    }

    .document-item .extension {
        display: inline-block;
        position: relative;
        padding: 0.5em;
        background: var(--red);
        color: white;
        align-self: start;
        line-height: 1;
        text-align: center;
    }

    .document-item .extension.docx {
        background: var(--blue);
    }

    .document-item .extension.xlsx {
        background: var(--green);
    }

    .document-item a {
        color: black;
    }

    .document-item a:link:hover {
        color: var(--blue);
        text-decoration: underline;
    }
</style>
