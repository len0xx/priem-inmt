<script lang="ts">
    import { Icon, ScrollToTop, Header, Link } from '$components'
    import { page } from '$app/stores'

    // User authorization
    import { session } from '$app/stores'
    let user = $session.user

    $: URL = $page.url.pathname
    const BASE_URL = '/admin-panel'
    const MAIN_URL = BASE_URL + '/main'
    const PROGRAMS_URL = BASE_URL + '/programs'
    const BACHELOR_URL = BASE_URL + '/bachelor'
    const MASTER_URL = BASE_URL + '/master'
    const ACCOMMODATION_URL = BASE_URL + '/accommodation'
    const CONTACTS_URL = BASE_URL + '/contacts'
    const FILES_URL = BASE_URL + '/media'
    // const TEXTS_URL = BASE_URL + '/texts'

    const TECH_SUPPORT_EMAIL = 'contact@len0xx.space'

    let fullAside = false
    let prevScroll = 0
    let hideAfter = 90
    const scrollHandler = () => {
        const currentScroll = window.scrollY
        currentScroll > hideAfter ? fullAside = true : fullAside = false
        if (currentScroll > prevScroll && currentScroll > hideAfter) {
            fullAside = true
        } else {
            if (currentScroll < prevScroll) {
                fullAside = false
            }
        }
        prevScroll = currentScroll
    }

    let openAside = false

</script>

<svelte:head>
    <link rel="stylesheet" href="/admin.css" />
</svelte:head>

<svelte:window on:scroll={scrollHandler} />

<main>
    <Header hideOnScrollDown={true} showOnScrollUp={true} hideAfter={90}>
        <div class="content">
            <div class="admin-header-layout mobile-hide">
                <a href="/">
                    <img src="/img/urfu-logo-colourful.svg" alt="УрФУ" />
                </a>
                <div />
                <div class="align-right">
                    {#if user}
                        Добро пожаловать, {user.firstName} <br />
                        <a href="/admin-panel-auth/logout">Выйти</a>
                    {/if}
                </div>
            </div>
            <div class="admin-header-layout pc-hide">
                <a href="/">
                    <img src="/img/urfu-logo-colourful.svg" alt="УрФУ" />
                </a>
                <div class="pc-hide align-right">
                    <Icon name="menu-icon-gray-fill" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={() => openAside = true }/>
                </div>
            </div>
        </div>
    </Header>

    <ScrollToTop />

    <aside class="left-menu {fullAside ? 'full' : ''} {openAside ? 'mobile-open' : ''}">
        <div class="left-menu-close close-btn pc-hide">
            <Icon name="small-close-icon" width={36} height={36} alt="Кнопка закрытия окна" on:click={() => openAside = false} />      
        </div>
        <div class="left-menu-user align-left pc-hide"> 
            {#if user}          
                <p>Добро пожаловать, {user.firstName}</p>
                <a class="btn btn-outline-danger" href="/admin-panel-auth/logout">Выйти</a>
            {/if}
        </div>
        <nav class="left-menu-nav">
            <!-- <a
                href={BASE_URL}
                class:active={URL === BASE_URL}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Общая информация</a
            > -->
            <a
                href={MAIN_URL}
                class:active={URL.startsWith(MAIN_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Главная страница</a
            >
            <a
                href={PROGRAMS_URL}
                class:active={URL.startsWith(PROGRAMS_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Образовательные программы</a
            >
            <a
                href={BACHELOR_URL}
                class:active={URL.startsWith(BACHELOR_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Бакалавриат и специалитет</a
            >
            <a
                href={MASTER_URL}
                class:active={URL.startsWith(MASTER_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Магистратура</a
            >
            <a
                href={ACCOMMODATION_URL}
                class:active={URL.startsWith(ACCOMMODATION_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Поселение</a
            >
            <a
                href={CONTACTS_URL}
                class:active={URL.startsWith(CONTACTS_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Контакты</a
            >
            <a
                href={FILES_URL}
                class:active={URL.startsWith(FILES_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Файлы</a
            >
            <!-- <a
                href={TEXTS_URL}
                class:active={URL.startsWith(TEXTS_URL)}
                sveltekit:prefetch
                class="menu-item"
                on:click={() => openAside = false}>Текстовые элементы</a
            > -->
        </nav>
    </aside>
    <div class="panel-content">
        <slot />
        <footer class="admin-panel-footer">
            <div>
                ФГАОУ ВО «УрФУ имени первого Президента России Б.Н. Ельцина» |
                Все права защищены {new Date().getFullYear()}
            </div>
            <div>
                В случае технических неполадок обращайтесь по адресу:
                <Link
                    lineWidth={2}
                    variant="interactive"
                    href="mailto:{TECH_SUPPORT_EMAIL}"
                    >{TECH_SUPPORT_EMAIL}</Link
                >
            </div>
        </footer>
    </div>
</main>

<style>
    main {
        position: relative;
        margin-left: 300px;
        box-sizing: border-box;
        padding-top: 75px;
    }

    .panel-content {
        display: block;
        position: relative;
        width: calc(100vw - 300px);
    }

    @media screen and (max-width: 768px) {
        main {
            margin-left: 0;
        }

        .panel-content {
            width: 100%;
        }
    }
</style>
