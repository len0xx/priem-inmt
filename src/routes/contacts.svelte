<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch, session }) => {
        const resResponsibles = await fetch(apiRoute('admin/responsible', session.api))
        const resInfo = await fetch(apiRoute('admin/textinfo/?page=contacts', session.api))

        const responsibles = (await resResponsibles.json()).responsibles
        const info = (await resInfo.json()).info

        if (resInfo.ok && resResponsibles.ok) {
            return { props: { pageInfo: info, responsibles } }
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
    import type { IResponsible } from '../types'

    export let responsibles: IResponsible[] = []
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
                <a data-sveltekit-reload href="/">
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
{ #if pageInfo?.contactsTitle }
    <section class="promo contacts" id="beginning">
        <div class="content">
            <Grid m={1} l={2} ratio="5:3" alignItems="end">
                <Heading size={1} marginY={0}>
                    { pageInfo.contactsTitle }<br />
                    { #if pageInfo.contactsSubtitle }
                        <span class="smaller-text">{ pageInfo.contactsSubtitle }</span>
                    { /if }
                </Heading>
                <div class="align-right">
                    <Link on:click={ $modal.open } href="" preventDefault={ true } variant="interactive" color="white" lineWidth={ 2 }>Получить консультацию</Link>
                </div>
            </Grid>
        </div>
    </section>
{ /if }
{ #if responsibles?.length }
    <br />
    <section id="contacts">
        <div class="content">
            <Heading size={1} className="blue-text">Ответственные <br /> лица института</Heading>
            <Grid m={4} s={1}>
                { #each responsibles as responsible, i (i) }
                    <Graduate name={ responsible.name } caption={ responsible.label } description={ [responsible.email, responsible.phone].join('<br>') } src={ responsible.img } />
                { /each }
            </Grid>
        </div>
    </section>
{ /if }
<br />
