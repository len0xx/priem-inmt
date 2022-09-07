<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const resContactInfo = await fetch(apiRoute('admin/contactInfo'))
        const resResponsibles = await fetch(apiRoute('admin/responsible'))
        const resInfo = await fetch(apiRoute('admin/textinfo/?page=contacts'))

        const contactInfo = (await resContactInfo.json()).contactInfo
        const responsibles = (await resResponsibles.json()).responsibles
        const info = (await resInfo.json()).info

        if (resContactInfo.ok && resResponsibles.ok) {
            return { props: { contactInfo, pageInfo: info, responsibles } }
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import {
        Grid,
        Link,
        Icon,
        Header,
        Heading,
        Graduate,
        Preloader
    } from '$components'
    import { modal, mobileMenu, commonHeaderState } from '$lib/stores'

    export let pageInfo: Record<string, string> = {}

    let showPreloader = true
    let pageLoaded = false
    let headerClass = ''

    const handleScrollUp = () => {
        setTimeout(() => {
            headerClass = ''
        }, 250)
    }

    const handleScrollDown = () => {
        setTimeout(() => {
            headerClass = 'header-scrolled'
        }, 200)
    }
    
    onMount(() => {
        pageLoaded = true
        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Контакты – Институт новых материалов и технологий</title>
    <meta property="og:image" content="https://inmt-priem.urfu.ru/img/snippet-contacts.jpg" />
    <meta property="vk:image" content="https://inmt-priem.urfu.ru/img/snippet-contacts.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 } transparent={ true } className={ headerClass } on:scroll-up={ handleScrollUp } on:scroll-down={ handleScrollDown }>
    <div class="content">
        <div class="header-layout { headerClass == 'header-scrolled' ? 'black' : 'white' }">
            <div>
                <a sveltekit:reload href="/">
                    { #if headerClass == 'header-scrolled' }
                        <Icon name="urfu-logo-colourful" width={140} height={48} alt="Логотип Уральского федерального университета"/>
                    { :else }
                        <Icon name="logo_urfu" width={142} height={48} alt="Логотип Уральского федерального университета"/>
                    { /if }
                </a>
            </div>
            <div class="mobile-hide">
                { #if headerClass == 'header-scrolled' }
                    <Icon name="menu-icon-gray" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ () => $commonHeaderState = true }/>
                { :else }
                    <Icon name="menu-icon-white" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ () => $commonHeaderState = true }/>
                { /if }
            </div>
            <div class="pc-hide align-right">
                <Icon name="menu-icon-gray-fill" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ $mobileMenu.open }/>
            </div>
        </div>
    </div>
</Header>
<section class="promo contacts" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>
                { pageInfo.contactsTitle }<br />
                <span class="smaller-text">{ pageInfo.contactsSubtitle }</span>
            </Heading>
            <div class="align-right">
                <Link on:click={ $modal.open } href="" preventDefault={ true } variant="interactive" color="white" lineWidth={ 2 }>Получить консультацию</Link>
            </div>
        </Grid>
    </div>
</section>
<br />
<section id="contacts">
    <div class="content">
        <Heading size={1} className="blue-text">Ответственные <br /> лица института</Heading>
        <Grid m={4} s={1}>
            <Graduate name="Еланцев Алексей Владимирович" caption="Ответственный секретарь отборочной комиссии" description="+7 (912) 635-52-97 a.v.elantcev@urfu.ru" src="/img/elantsev.jpg" />
            <Graduate name="Хафизова Алина Руслановна" caption="Заместитель секретаря отборочной комиссии" description="+7 (909) 700-07-20 khafizova.alina@urfu.ru" src="/img/khafizova.jpg" />
            <Graduate name="Страузов Александр Михайлович" caption="Заместитель секретаря отборочной комиссии" description="a.m.strauzov@urfu.ru" src="/img/strauzov.jpg" />
            <Graduate name="Сутормина Анастасия Александровна" caption="Заместитель секретаря отборочной комиссии " description="a.a.sutormina@urfu.ru" src="/img/sutormina.jpg" />
        </Grid>
    </div>
</section>
<br />
