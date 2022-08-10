<script lang="ts">
    import { ScrollToTop, Header, Link } from '$lib/components'
    import { page } from '$app/stores'
    
    // User authorization
    import { session } from '$app/stores'
    let user = $session.user

    $: url = $page.url.pathname
    const BASE_URL = '/admin-panel'
    const MAIN_URL = BASE_URL + '/main'
    const PROGRAMS_URL = BASE_URL + '/programs'
    const BACHELOR_URL = BASE_URL + '/bachelor'
    const MASTER_URL = BASE_URL + '/master'
    const ACCOMMODATION_URL = BASE_URL + '/accommodation'
    const CONTACTS_URL = BASE_URL + '/contacts'

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
                <div></div>
                <div class="align-right">
                    { #if user }
                        Добро пожаловать, { user.firstName } <br />
                        <a href="/admin-panel/auth/logout">Выйти</a>
                    { /if }
                </div>
            </div>
        </div>
    </Header>
    
    <ScrollToTop />

    <aside class="left-menu">
        <nav>
            <a href={ BASE_URL } class:active={ url === BASE_URL } sveltekit:prefetch class="menu-item">Общая информация</a>
            <a href={ MAIN_URL } class:active={ url.startsWith(MAIN_URL) } sveltekit:prefetch class="menu-item">Главная страница</a>
            <a href={ PROGRAMS_URL } class:active={ url.startsWith(PROGRAMS_URL) } sveltekit:prefetch class="menu-item">Образовательные программы</a>
            <a href={ BACHELOR_URL } class:active={ url.startsWith(BACHELOR_URL) } sveltekit:prefetch class="menu-item">Бакалавриат и специалитет</a>
            <a href={ MASTER_URL } class:active={ url.startsWith(MASTER_URL) } sveltekit:prefetch class="menu-item">Магистратура</a>
            <a href={ ACCOMMODATION_URL } class:active={ url.startsWith(ACCOMMODATION_URL) } sveltekit:prefetch class="menu-item">Поселение</a>
            <a href={ CONTACTS_URL } class:active={ url.startsWith(CONTACTS_URL) } sveltekit:prefetch class="menu-item">Контакты</a>
        </nav>
    </aside>
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
        display: grid;
        position: relative;
        grid-template-columns: 300px 1fr;
        box-sizing: border-box;
        padding-top: 75px;
    }

    .panel-content {
        display: block;
        position: relative;
        width: calc(100vw - 300px);
    }
</style>
