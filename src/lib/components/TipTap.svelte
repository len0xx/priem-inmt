<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import { Editor } from '@tiptap/core'
    import Document from '@tiptap/extension-document'
    import Text from '@tiptap/extension-text'
    import Paragraph from '@tiptap/extension-paragraph'
    import Heading from '@tiptap/extension-heading'
    import HardBreak from '@tiptap/extension-hard-break'
    import Bold from '@tiptap/extension-bold'
    import Italic from '@tiptap/extension-italic'
    import Image from '@tiptap/extension-image'
    import Underline from '@tiptap/extension-underline'
    import Placeholder from '@tiptap/extension-placeholder'
    import ListItem from '@tiptap/extension-list-item'
    import BulletList from '@tiptap/extension-bullet-list'
    import CharacterCount from '@tiptap/extension-character-count'
    import Link from '@tiptap/extension-link'
    import type { HTMLContent } from '@tiptap/core'

    export let name = ''
    export let content = ''
    let value: HTMLContent

    let element: HTMLElement
    let editor: Editor
    let chars = 0, words = 0
    const limit = 10000

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                Text,
                Heading,
                Document,
                Paragraph,
                Underline,
                HardBreak,
                ListItem,
                BulletList,
                Italic,
                Image,
                Bold,
                Link,
                Placeholder.configure({
                    placeholder: 'Начните писать...',
                }),
                CharacterCount.configure({
                    limit
                })
            ],
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor
                value = editor.getHTML()
                chars = editor.storage.characterCount.characters()
                words = editor.storage.characterCount.words()
            },
        })

        if (content) editor.commands.setContent(content)
    })

    onDestroy(() => editor ? editor.destroy() : null)
</script>

<style>
    .editor {
        margin: 10px 0;
        padding: 1em;
        border-radius: 4px;
        border: 1px solid #ced4da;
        background: white;
    }

    .tiptap-buttons {
        margin-bottom: 1em;
    }

    :global(.editor .tiptap-editor img) {
        max-width: 100%;
    }

    :global(.editor .tiptap-editor a:link) {
        text-decoration: underline;
        cursor: pointer;
    }

    :global(.editor .tiptap-editor a:link:hover) {
        color: rgb(40, 40, 255);
    }

    :global(.editor .tiptap-editor h1, h2, h3, h4, h5, h6) {
        margin: 1em 0;
    }

    :global(.ProseMirror p.is-editor-empty:first-child::before) {
        color: #AAAAAA;
        content: attr(data-placeholder);
        float: left;
        height: 0;
        transition: 0.1s ease-in-out;
        pointer-events: none;
    }

    :global(.ProseMirror) {
        outline: none;
    }

    :global(.ProseMirror p.is-editor-empty:first-child:hover::before) {
        color: #444444;
    }

    .character-count {
        color: #AAAAAA;
        margin-top: 0.6em;
        cursor: default;
        transition: 0.1s ease-in-out;
    }

    .character-count:hover {
        color: #888888;
    }

    button {
        padding: 6px 10px;
        border-radius: 4px;
        cursor: pointer;
        border: none;
        background: rgb(240, 240, 240);
        line-height: 1;
    }

    button:not(:first-of-type) {
        margin-left: 0.15em;
    }

    button:not(:last-of-type) {
            margin-right: 0.15em;
    }

    button:not(.active) {
            background: rgb(220, 220, 220);
    }

    button:not(:first-of-type) {
        margin-left: 0.15em;
    }

    svg {
        fill: #000000;
    }

    button.active {
        background-color: #000000;
    }

    button.active svg {
        fill: #ffffff;
    }

</style>

<div class="editor">
    <div class="tiptap-buttons">
        {#if editor }
            <button
                on:click|preventDefault={() => editor.chain().focus().setParagraph().run()}
                class:active={editor.isActive('paragraph')}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" class="bi bi-paragraph" viewBox="0 0 16 16">
                    <path d="M10.5 15a.5.5 0 0 1-.5-.5V2H9v12.5a.5.5 0 0 1-1 0V9H7a4 4 0 1 1 0-8h5.5a.5.5 0 0 1 0 1H11v12.5a.5.5 0 0 1-.5.5z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M11 7h2v10h-2v-4H7v4H5V7h2v4h4V7zm6.57 0c-.594.95-1.504 1.658-2.57 2v1h2v7h2V7h-1.43z"/></g></svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M9 7h2v10H9v-4H5v4H3V7h2v4h4V7zm8 8c.51-.41.6-.62 1.06-1.05.437-.4.848-.828 1.23-1.28.334-.39.62-.82.85-1.28.2-.39.305-.822.31-1.26.005-.44-.087-.878-.27-1.28-.177-.385-.437-.726-.76-1-.346-.283-.743-.497-1.17-.63-.485-.153-.99-.227-1.5-.22-.36 0-.717.033-1.07.1-.343.06-.678.158-1 .29-.304.13-.593.295-.86.49-.287.21-.56.437-.82.68l1.24 1.22c.308-.268.643-.502 1-.7.35-.2.747-.304 1.15-.3.455-.03.906.106 1.27.38.31.278.477.684.45 1.1-.014.396-.14.78-.36 1.11-.285.453-.62.872-1 1.25-.44.43-.98.92-1.59 1.43-.61.51-1.41 1.06-2.16 1.65V17h8v-2h-4z"/></g></svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                class:active={editor.isActive('heading', { level: 3 })}
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M14.11 14.218c.355.287.75.523 1.17.7.434.18.9.273 1.37.27.484.017.965-.086 1.4-.3.333-.146.55-.476.55-.84.003-.203-.05-.403-.15-.58-.123-.19-.3-.34-.51-.43-.32-.137-.655-.228-1-.27-.503-.073-1.012-.106-1.52-.1v-1.57c.742.052 1.485-.07 2.17-.36.37-.164.615-.525.63-.93.026-.318-.12-.627-.38-.81-.34-.203-.734-.3-1.13-.28-.395.013-.784.108-1.14.28-.375.167-.73.375-1.06.62l-1.22-1.39c.5-.377 1.053-.68 1.64-.9.608-.224 1.252-.336 1.9-.33.525-.007 1.05.05 1.56.17.43.1.84.277 1.21.52.325.21.595.495.79.83.19.342.287.73.28 1.12.01.48-.177.943-.52 1.28-.417.39-.916.685-1.46.86v.06c.61.14 1.175.425 1.65.83.437.382.68.94.66 1.52.005.42-.113.835-.34 1.19-.23.357-.538.657-.9.88-.408.253-.853.44-1.32.55-.514.128-1.04.192-1.57.19-.786.02-1.57-.106-2.31-.37-.59-.214-1.126-.556-1.57-1l1.12-1.41zM9 11H5V7H3v10h2v-4h4v4h2V7H9v4z"/></g></svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                class:active={editor.isActive('heading', { level: 4 })}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M11 17H9v-4H5v4H3V7h2v4h4V7h2v10zm10-2h-1v2h-2v-2h-5v-2l4.05-6H20v6h1v2zm-3-2V9l-2.79 4H18z"/></g></svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleBold().run()}
                class:active={editor.isActive('bold') ? 'is-active' : ''}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-type-bold" viewBox="0 0 16 16">
                    <path d="M8.21 13c2.106 0 3.412-1.087 3.412-2.823 0-1.306-.984-2.283-2.324-2.386v-.055a2.176 2.176 0 0 0 1.852-2.14c0-1.51-1.162-2.46-3.014-2.46H3.843V13H8.21zM5.908 4.674h1.696c.963 0 1.517.451 1.517 1.244 0 .834-.629 1.32-1.73 1.32H5.908V4.673zm0 6.788V8.598h1.73c1.217 0 1.88.492 1.88 1.415 0 .943-.643 1.449-1.832 1.449H5.907z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleItalic().run()}
                class:active={editor.isActive('italic') ? 'is-active' : ''}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-type-italic" viewBox="0 0 16 16">
                    <path d="M7.991 11.674 9.53 4.455c.123-.595.246-.71 1.347-.807l.11-.52H7.211l-.11.52c1.06.096 1.128.212 1.005.807L6.57 11.674c-.123.595-.246.71-1.346.806l-.11.52h3.774l.11-.52c-1.06-.095-1.129-.211-1.006-.806z"/>
                </svg>
            </button>
            <button
                on:click|preventDefault={() => editor.chain().focus().toggleBulletList().run()}
                class:active={editor.isActive('bulletList') ? 'is-active' : ''}
            >
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="0" fill="none" width="24" height="24"/><g><path d="M9 19h12v-2H9v2zm0-6h12v-2H9v2zm0-8v2h12V5H9zm-4-.5c-.828 0-1.5.672-1.5 1.5S4.172 7.5 5 7.5 6.5 6.828 6.5 6 5.828 4.5 5 4.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm0 6c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5z"/></g></svg>
            </button>
        {/if}
    </div>
    <div class="tiptap-editor" bind:this={element} />
    <div class="character-count">
        { chars }/{ limit } символов
        <br>
        { words } слов
    </div>
    <textarea style="display: none" {name}>{ value }</textarea>  
</div>
