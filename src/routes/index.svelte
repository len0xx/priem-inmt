<script lang="ts">
    import { onMount } from 'svelte'
    import { imask } from 'svelte-imask'
    import Benefit from '$lib/components/Benefit.svelte'
    import Carousel from '$lib/components/Carousel.svelte'
    import Button from '$lib/components/Button.svelte'
    import Header from '$lib/components/Header.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import MobileMenu from '$lib/components/MobileMenu.svelte'
    import Preloader from '$lib/components/Preloader.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import RoundButton from '$lib/components/RoundButton.svelte'
    import NewsCard from '$lib/components/NewsCard.svelte'
    import Link from '$lib/components/Link.svelte'
    import Heading from '$lib/components/Heading.svelte'
    import Nav from '$lib/components/Nav.svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'
    import Slider from '$lib/components/Slider.svelte'
    import Slide from '$lib/components/Slide.svelte'
    import Partner from '$lib/components/Partner.svelte'
    import Grid from '$lib/components/Grid.svelte'
    import images1 from '$lib/images1'
    import images2 from '$lib/images2'
    import partners from '$lib/partners'

    // User authorization
    // import { session } from '$app/stores'
    // let user = $session.user
    // console.log(user)

    let modalHidden = true
    let menuHidden = true
    let showPreloader = true
    let pageLoaded = false

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    const openModal = () => {
        modalHidden = false
    }

    const openMenu = () => menuHidden = false

    onMount(() => {
        pageLoaded = true

        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Институт новых материалов и технологий</title>
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<MobileMenu bind:menuHidden>
    <a on:click={() => menuHidden = true} class="underlined" href="#about">Об институте</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="#enroll">Как поступить</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="#programs">Программы</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="#faq">FAQ</a><br /><br />
    <a on:click={() => menuHidden = true} class="underlined" href="#footer">Контакты</a><br /><br />
</MobileMenu>

<Modal bind:hidden={modalHidden} align="center" closable={true}>
    <Heading size={2} className="blue-text" marginTop={0}>Подать заявку</Heading>
    <form action="" method="POST" id="JSyW">
        <input name="fio" type="text" placeholder="ФИО" class="simple wide" required /><br /><br />
        <input name="email" type="email" placeholder="Email" class="simple wide" required /><br /><br />
        <input name="tel" use:imask={ phoneMask } type="tel" placeholder="Контактный телефон" class="simple wide" required /><br /><br />
        <label for="agreement4" class="checkbox-wrapper align-left">
            <input type="checkbox" name="agreement" id="agreement4" required>
            <span class="fourty-text-black">Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
        </label>
        <br />
        <br />
        <Button variant="blue">Отправить</Button>
    </form>
    <Rainbow slot="footer" size="L" />
</Modal>

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 }>
    <div class="content">
        <div class="header-layout">
            <div>
                <a href="/">
                    <img src="/img/urfu-logo-colourful.svg" alt="Логотип Уральского федерального университета">
                </a>
            </div>
            <Nav className="mobile-hide">
                <a class="underlined black" href="#about">Об институте</a>
                <a class="underlined black" href="#levels">Уровни подготовки</a>
                <a class="underlined black" href="#partners">Партнёры</a>
                <a class="underlined black" href="#schoolarship">Стипендии</a>
            </Nav>
            <div class="mobile-hide align-right">
                <Button on:click={ openModal }>Поступить</Button>
            </div>
            <div class="pc-hide">
                <svg on:click={ openMenu } width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="18" fill="white"/>
                    <rect x="12" y="12" width="4" height="4" rx="2" fill="#1E4391"/>
                    <rect x="20" y="20" width="4" height="4" rx="2" fill="#1E4391"/>
                    <rect x="20" y="12" width="4" height="4" rx="2" fill="#EF302B"/>
                    <rect x="12" y="20" width="4" height="4" rx="2" fill="#1E4391"/>
                </svg>            
            </div>
        </div>
    </div>
</Header>
<Slider let:showPrevPage let:showNextPage >
    <Slide img="/img/slide1-img.jpg">
        <Heading size={2} className="blue-text">Стань инженером будущего в Институте новых материалов и технологий УрФУ</Heading>
        <p class="heading-3">Актуальная информация о поступлении в университет в 2022 году:</p>
        <Link href="/bachelor" borderWidth={ 2 }>Бакалавриат и специалитет</Link><br /><br />
        <Link href="/master" borderWidth={ 2 }>Магистратура</Link><br />
        <svelte:fragment slot="buttons">
            <RoundButton size="M" variant="left" on:click={ showPrevPage } />
            <RoundButton size="M" variant="right" on:click={ showNextPage } />
        </svelte:fragment>
    </Slide>
    <Slide img="/img/slide2-img.jpg">
        <Heading size={2} className="blue-text">Стань инженером будущего в Институте новых материалов и технологий УрФУ</Heading>
        <p class="heading-3">Выбрать направление подготовки и зарегистрироваться в личном кабинете абитуриента можно уже сейчас:</p>
        <Link href="/bachelor" borderWidth={ 2 }>Бакалавриат и специалитет</Link><br /><br />
        <Link href="/master" borderWidth={ 2 }>Магистратура</Link><br />
        <svelte:fragment slot="buttons">
            <RoundButton size="M" variant="left" on:click={ showPrevPage } />
            <RoundButton size="M" variant="right" on:click={ showNextPage } />
        </svelte:fragment>
    </Slide>
</Slider>
<br />
<section class="info-1" id="about">
    <div class="content">
        <Grid m={2} s={1} alignItems="end">
            <div class="about-left">
                <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.5}>Об институте</Heading>
                <p id="NqY1">Институт новых материалов и технологий Уральского федерального университета – крупнейший центр высшего инженерного образования региона с 1920 года, сочетающий лучшие традиции, фундаментальную подготовку и практический междисциплинарный подход</p>
            </div>
            <div>
                <Grid m={2}>
                    <Benefit
                        num="1 642"
                        caption="Бюджетных мест в 2022 году"
                    />
                    <Benefit
                        num="158"
                        caption="Контрактных мест в 2022 году"
                    />
                </Grid>
                <div class="pc-hide">
                    <br />
                    <Button variant="wide" on:click={openModal}>Поступить</Button>
                </div>
            </div>
        </Grid>
    </div>
</section>
<section class="images-1">
    <Carousel margin={10}>
        { #each images1 as src }
            <img {src} alt={ src }>
        { /each }
    </Carousel>
</section>
<section id="levels">
    <div class="content">
        <Grid m={3} s={1}>
            <Heading size={1} className="blue-text" marginTop={0}>Уровни подготовки</Heading>
            <p class="heading-3 no-top-margin">Институт дает студентам прочные знания об устройстве современных машин и механизмов, применении новых материалов и технологий в металлургии, машиностроении, строительстве, позволяет работать над реальными проектами. </p>
            <p class="no-top-margin">Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</p>
        </Grid>
        <br />
        <Grid m={3} s={1}>
            <a href="/bachelor">
                <NewsCard img="/img/bachelor-inmt.jpg">
                    <svelte:fragment slot="title">Бакалавриат и специалитет</svelte:fragment>
                    <p class="no-margin"><span class="red-text">19</span> <span class="semi-transparent">образовательных программ</span></p>
                </NewsCard>
            </a>
            <a href="/master">
                <NewsCard img="/img/master-inmt.jpg">
                    <svelte:fragment slot="title">Магистратура</svelte:fragment>
                    <p class="no-margin"><span class="red-text">26</span> <span class="semi-transparent">образовательных программ</span></p>
                </NewsCard>
            </a>
            <a href="/postgraduate">
                <NewsCard img="/img/postgraduate-inmt.jpg">
                    <svelte:fragment slot="title">Аспирантура</svelte:fragment>
                    <p class="no-margin"><span class="red-text">21</span> <span class="semi-transparent">образовательная программа</span></p>
                </NewsCard>
            </a>
        </Grid>
    </div>
</section>
<section class="partners">
    <div class="content">
        <Grid m={2} s={1}>
            <Heading size={1} className="blue-text" marginTop={0}>Партнеры института</Heading>
        </Grid>
        <Grid m={6} s={3}>
            { #each partners as partner }
                <Partner src={ partner } />
            { /each }
        </Grid>
    </div>
</section>
<section id="schoolarships">
    <div class="content">
        <Grid m={3} s={1} gap={2}>
            <Heading size={1} className="blue-text" marginTop={0}>Именные стипендии</Heading>
            <p class="heading-3 no-top-margin">Поддержка инициатив талантливых и активных студентов от фондов, корпораций и будущих работодателей</p>
            <p>
                Стипендии назначаются дополнительно к государственной академической стипендии, а также дополнительно к повышенной государственной академической стипендии за достижения в учебной, научно-исследовательской, общественной, культурно-творческой и спортивной деятельности.
                <br /><br />
                <Button>Актуальный перечень</Button>
            </p>
        </Grid>
    </div>
</section>
<section id="student-life">
    <div class="content">
        <Grid m={2} s={1} gap={2} ratio="2:3">
            <Heading size={1} className="blue-text" marginTop={0}>Студенческая жизнь</Heading>
            <p class="heading-3 no-top-margin">Каждый студент института сможет найти дело по душе! <br /> Студенческие отряды, театры, музыкальные и танцевальные коллективы, турклуб, спортивные и киберспортивные лиги, клуб иностранных языков – это лишь малая часть студенческих возможностей в УрФУ. </p>
        </Grid>
    </div>
    <Carousel margin={10}>
        { #each images2 as src }
            <img {src} alt={ src } />
        { /each }
    </Carousel>
</section>
<Footer />
