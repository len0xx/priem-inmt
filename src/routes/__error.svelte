<script context="module" lang="ts">
    /** @type {import('@sveltejs/kit').ErrorLoad} */
    export function load({ error, status }) {
        return {
            props: {
                message: error.message,
                status
            }
        }
    }
</script>

<script lang="ts">
    export let message: string
    export let status: number
</script>

<svelte:head>
    <title>Ошибка {status}</title>
    <style>
        body {
            background: rgb(239, 242, 245);
        }
    </style>
</svelte:head>

<section class="error-wrapper">
    <div>
        <div class="white-block">
            <h1>Ошибка { status }</h1>
            <p><b>{ message }</b></p>
            <p><a sveltekit:prefetch href="/">Перейти на главную</a></p>
        </div>
        <div class="rainbow"></div>
    </div>
</section>

<style>
    section.error-wrapper {
        display: grid;
        position: relative;
        place-content: center;
        place-items: center;
        min-height: 50vh;
        width: 100%;
    }

    section.error-wrapper .white-block {
        min-width: min(50vw, 450px);
        max-width: max(70vw, 900px);
        border-radius: 0;
    }

    .rainbow {
        display: block;
        position: relative;
        width: 100%;
        height: 8px;
        background-image: var(--rainbow-gradient);
    }

    a {
        color: blue;
    }

    a:hover {
        text-decoration: underline;
    }
</style>
