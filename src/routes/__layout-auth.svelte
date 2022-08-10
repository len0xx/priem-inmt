<!-- <script context="module" lang="ts">
    export async function load({ session }) {
        return {
            props: {
                info: 'Hello!'
            }
        }
    }
</script> -->

<script lang="ts">
    import { ScrollToTop, Header, Link } from '$lib/components'

    // export let info: string

    const TECH_SUPPORT_EMAIL = 'contact@len0xx.space'
</script>

<svelte:head>
    <link rel="stylesheet" href="/admin.css">
</svelte:head>

<main>
    <Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 }>
        <div class="content">
            <div class="admin-header-layout">
                <a href="/">
                    <img src="/img/urfu-logo-colourful.svg" alt="УрФУ">
                </a>
            </div>
        </div>
    </Header>
    <ScrollToTop />

    <div class="panel-content">
        <slot />
        <footer class="admin-panel-footer">
            <div>ФГАОУ ВО «УрФУ имени первого Президента России Б.Н. Ельцина» | Все права защищены { new Date().getFullYear() }</div>
            <div>
                В случае технических неполадок обращайтесь по адресу:
                <Link lineWidth={ 2 } variant="interactive" href="mailto:{ TECH_SUPPORT_EMAIL }">{ TECH_SUPPORT_EMAIL }</Link>
            </div>
        </footer>
    </div>
</main>

<style>
    main {
        display: block;
        position: relative;
        box-sizing: border-box;
        padding-top: 75px;
    }

    .panel-content {
        display: block;
        position: relative;
        padding: 4em 0;
    }
</style>
