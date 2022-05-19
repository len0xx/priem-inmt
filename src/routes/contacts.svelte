<script lang="ts">
    import { onMount } from 'svelte'
    import Nav from '$lib/components/Nav.svelte'
    import Grid from '$lib/components/Grid.svelte'
    import Link from '$lib/components/Link.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Input from '$lib/components/Input.svelte'
    import Button from '$lib/components/Button.svelte'
    import Header from '$lib/components/Header.svelte'
    import Heading from '$lib/components/Heading.svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'
    import Graduate from '$lib/components/Graduate.svelte'
    import Preloader from '$lib/components/Preloader.svelte'
    import MobileMenu from '$lib/components/MobileMenu.svelte'

    // User authorization
    // import { session } from '$app/stores'
    // let user = $session.user
    // console.log(user)

    let modalVisible = false
    let menuHidden = true
    let showPreloader = true
    let pageLoaded = false
    let additional = false
    let headerClass = ''

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    const openModal = () => {
        modalVisible = true
    }

    const openMenu = () => menuHidden = false

    const handleScrollUp = () => {
        headerClass = ''
    }

    const handleScrollDown = () => {
        setTimeout(() => headerClass = 'header-scrolled', 200)
    }

    onMount(() => {
        pageLoaded = true

        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Контакты – Институт новых материалов и технологий</title>
    <meta property="og:image" content="/img/snippet-contacts.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<MobileMenu bind:menuHidden>
    <a on:click={() => menuHidden = true} class="underlined" href="/bachelor">Бакалавриат и специалитет</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="/master">Магистратура</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" target="_BLANK" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="/accommodation">Поселение</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="/contacts">Контакты</a><br /><br />
</MobileMenu>

<Modal bind:visible={modalVisible} align="center" closable={true}>
    <Heading size={2} className="blue-text" marginTop={0}>Подать заявку</Heading>
    <form action="" method="POST" id="JSyW">
        <Input name="fio" type="text" placeholder="ФИО" wide required={ true } /><br /><br />
        <Input name="email" type="email" placeholder="Email" wide required={ true } /><br /><br />
        <Input name="tel" mask={ phoneMask } type="tel" placeholder="Контактный телефон" wide required={ true } /><br /><br />
        <label for="agreement4" class="checkbox-wrapper align-left">
            <Input type="checkbox" name="agreement" id="agreement4" required={ true } />
            <span class="fourty-text-black">Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
        </label>
        <br />
        <br />
        <Button variant="blue">Отправить</Button>
    </form>
    <Rainbow slot="footer" size="L" />
</Modal>

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 } transparent={ true } className={ headerClass } on:scroll-up={ handleScrollUp } on:scroll-down={ handleScrollDown }>
    <div class="content">
        <div class="header-layout { headerClass == 'header-scrolled' ? 'black' : 'white' }">
            <div>
                <a href="/">
                    { #if headerClass == 'header-scrolled' }
                        <img src="/img/urfu-logo-colourful.svg" alt="Логотип Уральского федерального университета">
                    { :else }
                        <img src="/img/logo_urfu.svg" alt="Логотип Уральского федерального университета">
                    { /if }
                </a>
            </div>
            <div class="mobile-hide">
                { #if headerClass == 'header-scrolled' }
                    <img src="/img/menu-icon-gray.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ () => additional = true }>
                { :else }
                    <img src="/img/menu-icon-white.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ () => additional = true }>
                { /if }
            </div>
            <div class="pc-hide align-right">
                <img src="/img/menu-icon-gray-fill.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ openMenu }>        
            </div>
        </div>
    </div>
</Header>
<Header hideOnScrollDown={ false } showOnScrollUp={ false } className="additional-header { additional ? 'opened' : '' }">
    <div class="content">
        <div class="header-layout">
            <div>
                <img src="/img/red-close.svg" class="menu-button" alt="Кнопка закрытия навигации" on:click={ () => additional = false }>
            </div>
            <Nav className="mobile-hide">
                <a class="underlined black" href="/bachelor">Бакалавриат и специалитет</a>
                <a class="underlined black" href="/master">Магистратура</a>
                <a target="_BLANK" class="underlined black" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a>
                <a class="underlined black" href="/accommodation">Поселение</a>
                <a class="underlined black" href="/contacts">Контакты</a>
            </Nav>
            <div class="mobile-hide align-right">
                <Link color="var(--red)" variant="interactive" lineWidth={ 3 } on:click={ openModal }>Хочу поступить</Link>
            </div>
        </div>
    </div>
</Header>
<section class="promo contacts" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>Контакты<br /><span class="smaller-text">Институт новых материалов <br /> и технологий</span></Heading>
            <div class="align-right">
                <Link href="#programs" variant="interactive" color="white" lineWidth={ 2 }>Обратная связь</Link>
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
