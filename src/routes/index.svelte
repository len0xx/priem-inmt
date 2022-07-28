<script lang="ts">
    import { onMount } from 'svelte'
    import {
        Nav,
        Grid,
        Link,
        Text,
        Modal,
        Input,
        Slide,
        Button,
        Header,
        Slider,
        Heading,
        Rainbow,
        Partner,
        Benefit,
        Graduate,
        AjaxForm,
        Carousel,
        NewsCard,
        Preloader,
        VideoCard,
        MobileMenu,
        RoundButton
    } from '$lib/components'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import images1 from '$lib/images1'
    import images2 from '$lib/images2'
    import partners from '$lib/partners'
    import graduates from '$lib/graduates'

    let modalVisible = false
    let menuVisible = true
    let showPreloader = true
    let pageLoaded = false
    let additional = false
    let formSubmitted = false
    let formSuccess = false
    
    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    const formEndpoint = 'https://fgaouvo.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.site.form.fill'

    const openModal = () => modalVisible = true

    const openMenu = () => menuVisible = true

    const closeMenu = () => menuVisible = false

    const resetFormResults = (): void => {
        setTimeout(() => {
            formSubmitted = false
            formSuccess = false
        }, 10 * 1000)
    }

    const handleSuccess = (): void => {
        formSubmitted = true
        formSuccess = true
        resetFormResults()
    }

    const handleError = (): void => {
        formSubmitted = true
        formSuccess = false
        resetFormResults()
    }

    onMount(() => {
        pageLoaded = true

        setTimeout(() => showPreloader = false, 150)
    })

    beforeNavigate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
    })
    
    afterNavigate(() => {
        document.documentElement.style.scrollBehavior = 'smooth'
    })

    const range = (start: number, end: number) => {
        const result = []
        for (let i = start; i <= end; i++) {
            result.push(i)
        }
        return result
    }

    const getSequentialPartialIndexes = (arr: Array<unknown>, size: number): Array<Array<number>> => {
        let result = []
        let i = 0
        while (i < arr.length) {
            const end = (i + size - 1) < arr.length ? (i + size - 1) : arr.length - 1
            result.push(range(i, end))
            i += size
        }
        return result
    }
</script>

<svelte:head>
    <title>Институт новых материалов и технологий</title>
    <meta property="og:image" content="https://inmt-priem.urfu.ru/img/snippet-inmt.jpg" />
    <meta property="vk:image" content="https://inmt-priem.urfu.ru/img/snippet-inmt.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<MobileMenu bind:visible={ menuVisible }>
    <a sveltekit:prefetch on:click={ closeMenu } class="underlined" href="/bachelor">Бакалавриат и специалитет</a><br /><br />
    <a sveltekit:prefetch on:click={ closeMenu } class="underlined" href="/master">Магистратура</a><br /><br />
    <a sveltekit:prefetch on:click={ closeMenu } class="underlined" target="_BLANK" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a><br /><br />
    <a sveltekit:prefetch on:click={ closeMenu } class="underlined" href="/accommodation">Поселение</a><br /><br />
    <a sveltekit:prefetch on:click={ closeMenu } class="underlined" href="/contacts">Контакты</a><br /><br />
</MobileMenu>

<Modal bind:visible={modalVisible} align="center" closable={true}>
    <Heading size={2} className="blue-text" marginTop={0}>Получить консультацию</Heading>
    <AjaxForm action={ formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false } id="JSyW">
        <Text className="subtitle">Специалисты института свяжутся с вами в ближайшее время</Text>
        <Input name="fio" marginY={0.5} type="text" placeholder="ФИО" wide required={ true } /><br /><br />
        <Input name="email" marginY={0.5} type="email" placeholder="Email" wide required={ true } /><br /><br />
        <Input name="phone" marginY={0.5} mask={ phoneMask } type="tel" placeholder="Контактный телефон" wide required={ true } /><br /><br />
        <Input name="message" marginY={0.5} type="text" placeholder="Сообщение" wide /><br /><br />
        <label for="agreement4" class="checkbox-wrapper align-left">
            <Input type="checkbox" name="agreement" id="agreement4" required={ true } />
            <span class="fourty-text-black">Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
        </label>
        <br />
        <br />
        <Button variant="blue">Отправить</Button>
    </AjaxForm>
    { #if formSubmitted }
        <br />
        <div class="align-center">
            { #if formSuccess }
                Спасибо! Ваша заявка отправлена
            { :else }
                Кажется, произошла ошибка при отправке формы. Свяжитесь, пожалуйста, с нами по почте: <a href="mailto:ok.inmt@urfu.ru">ok.inmt@urfu.ru</a>
            { /if }
        </div>
    { /if }
    <Rainbow slot="footer" size="L" />
</Modal>

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 }>
    <div class="content">
        <div class="header-layout">
            <div>
                <a sveltekit:reload href="/">
                    <img src="/img/urfu-logo-colourful.svg" alt="Логотип Уральского федерального университета">
                </a>
            </div>
            <div class="mobile-hide">
                <img src="/img/menu-icon-gray.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ () => additional = true }>
            </div>
            <Nav className="mobile-hide">
                <Link color="black" lineWidth={ 3 } href="#about" variant="hover">Об институте</Link>
                <Link color="black" lineWidth={ 3 } href="#levels" variant="hover">Уровни подготовки</Link>
                <Link color="black" lineWidth={ 3 } href="#partners" variant="hover">Партнёры</Link>
                <Link color="black" lineWidth={ 3 } href="#schoolarship" variant="hover">Стипендии</Link>
            </Nav>
            <div class="mobile-hide align-right">
                <Button href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
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
                <Link color="black" lineWidth={ 3 } href="/bachelor" prefetch variant="hover">Бакалавриат и специалитет</Link>
                <Link color="black" lineWidth={ 3 } href="/master" prefetch variant="hover">Магистратура</Link>
                <Link color="black" lineWidth={ 3 } href="https://aspirant.urfu.ru/ru/aspirantura/" target="_BLANK" prefetch variant="hover">Аспирантура</Link>
                <Link color="black" lineWidth={ 3 } href="/accommodation" prefetch variant="hover">Поселение</Link>
                <Link color="black" lineWidth={ 3 } href="/contacts" prefetch variant="hover">Контакты</Link>
            </Nav>
            <div class="mobile-hide align-right">
                <Link color="var(--red)" variant="interactive" lineWidth={ 3 } on:click={ openModal }>Хочу поступить</Link>
            </div>
        </div>
    </div>
</Header>
<div class="escape-header">
    <Slider let:showPrevPage let:showNextPage duration={ 15 }>
        <Slide img="/img/slide1-img.jpg">
            <Heading size={2} className="white-text">Институт новых материалов и технологий УрФУ</Heading>
            <Text className="heading-3">Актуальная информация о поступлении в университет в 2022 году:</Text>
            <Link href="/bachelor" on:click={ () => console.log('clicked') } variant="interactive" color="white" lineWidth={ 2 }>Бакалавриат и специалитет</Link><br /><br />
            <Link href="/master" on:click={ () => console.log('clicked') } variant="interactive" color="white" lineWidth={ 2 }>Магистратура</Link><br />
            <svelte:fragment slot="buttons">
                <RoundButton theme="bright" size="M" variant="left" on:click={ showPrevPage } />
                <RoundButton theme="bright" size="M" variant="right" on:click={ showNextPage } />
            </svelte:fragment>
        </Slide>
        <Slide img="/img/slide2-img.jpg">
            <Heading size={2} className="white-text">Старт приема документов – 20 июня</Heading>
            <Text className="heading-3">Выбрать направление подготовки и зарегистрироваться в личном кабинете абитуриента можно уже сейчас:</Text>
            <Link href="/bachelor" variant="interactive" color="white" lineWidth={ 2 }>Бакалавриат и специалитет</Link><br /><br />
            <Link href="/master" variant="interactive" color="white" lineWidth={ 2 }>Магистратура</Link><br />
            <svelte:fragment slot="buttons">
                <RoundButton theme="bright" size="M" variant="left" on:click={ showPrevPage } />
                <RoundButton theme="bright" size="M" variant="right" on:click={ showNextPage } />
            </svelte:fragment>
        </Slide>
    </Slider>
    <br />
    <section class="info-1" id="about">
        <div class="content">
            <Grid m={2} s={1} alignItems="end">
                <div class="about-left">
                    <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.5}>Об институте</Heading>
                    <Text id="NqY1">Институт новых материалов и технологий Уральского федерального университета – крупнейший центр высшего инженерного образования региона с 1920 года, сочетающий лучшие традиции, фундаментальную подготовку и практический междисциплинарный подход</Text>
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
                <Text className="heading-3" marginTop={0}>Институт дает студентам прочные знания об устройстве современных машин и механизмов, применении новых материалов и технологий в металлургии, машиностроении, строительстве, позволяет работать над реальными проектами. </Text>
                <Text marginTop={0} className="mobile-hide">Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
            </Grid>
            <br />
            <Grid m={3} s={1}>
                <a href="/bachelor">
                    <NewsCard img="/img/bachelor-inmt.jpg">
                        <svelte:fragment slot="title">Бакалавриат и специалитет</svelte:fragment>
                        <Text marginY={0}><span class="red-text">19</span> <span class="semi-transparent">образовательных программ</span></Text>
                    </NewsCard>
                </a>
                <a href="/master">
                    <NewsCard img="/img/master-inmt.jpg">
                        <svelte:fragment slot="title">Магистратура</svelte:fragment>
                        <Text marginY={0}><span class="red-text">26</span> <span class="semi-transparent">образовательных программ</span></Text>
                    </NewsCard>
                </a>
                <a href="https://aspirant.urfu.ru/ru/aspirantura/" target="_BLANK">
                    <NewsCard img="/img/postgraduate-inmt.jpg">
                        <svelte:fragment slot="title">Аспирантура</svelte:fragment>
                        <Text marginY={0}><span class="red-text">21</span> <span class="semi-transparent">образовательная программа</span></Text>
                    </NewsCard>
                </a>
            </Grid>
            <Text marginBottom={0} marginTop={1.5} className="pc-hide">Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
        </div>
    </section>
    <section id="partners">
        <div class="content">
            <Grid m={2} s={1}>
                <Heading size={1} className="blue-text" marginTop={0}>Партнеры института</Heading>
            </Grid>
        </div>
        <Carousel margin={0} className="mobile-hide">
            { #each getSequentialPartialIndexes(partners, 6) as range }
                <div class="fill-width">
                    <div class="content">
                        <Grid s={3} m={6} className="my-4" alignItems="start">
                            { #each range as i }
                                <Partner src={partners[i]} />
                            { /each }
                        </Grid>
                    </div>
                </div>
            { /each }
        </Carousel>
        <Carousel margin={15} className="pc-hide">
            { #each partners as partner }
                <div>
                    <Partner src={partner} />
                </div>
            { /each }
        </Carousel>
    </section>
    <section id="graduates">
        <div class="content">
            <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.5}>Известные выпускники</Heading>
        </div>
        <Carousel margin={0} className="mobile-hide">
            { @const grad = graduates.filter(graduate => graduate.src.length) }
            { #each getSequentialPartialIndexes(grad, 6) as range }
                <div class="fill-width">
                    <div class="content">
                        <Grid s={3} m={6} className="my-4" alignItems="stretch">
                            { #each range as i }
                            { @const graduate = grad[i] }
                                <Graduate headingSize={4} size="S" {...graduate} />
                            { /each }
                        </Grid>
                    </div>
                </div>
            { /each }
        </Carousel>
        <div class="content pc-hide">
            <div class="mobile-horizontal-scroll">
                { #each graduates.filter(graduate => graduate.src.length) as graduate }
                    <Graduate headingSize={4} inline size="M" {...graduate} />
                { /each }
            </div>
        </div>
    </section>
    <section id="students">
        <div class="content">
            <Grid m={2} s={1} ratio="1:2">
                <div>
                    <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.75}>Институт глазами студентов</Heading>
                    <Text id="jz91" marginTop={0}>Наши студенты рассказывают об учебе, лабораторных и курсовых работах, студенческой жизни и, как проходит их обучение в Институте новых материалов и технологий</Text>
                    <Button className="mobile-hide" on:click={ openModal }>Получить консультацию</Button>
                </div>
                <Grid m={4} className="mobile-horizontal-scroll">
                    <VideoCard src="/video/first.mp4" />
                    <VideoCard src="/video/second.mp4" />
                    <VideoCard src="/video/third.mp4" />
                    <VideoCard src="/video/fourth.mp4" />
                </Grid>
            </Grid>
            <br class="pc-hide" />
            <br class="pc-hide" />
            <Button className="pc-hide wide" on:click={ openModal }>Поступить</Button>
        </div>
    </section>
    <section id="schoolarship">
        <div class="content">
            <Grid m={3} s={1} gap={2}>
                <Heading size={1} className="blue-text" marginTop={0}>Именные стипендии</Heading>
                <Text className="heading-3" marginTop={0}>Поддержка инициатив талантливых и активных студентов от фондов, корпораций и будущих работодателей</Text>
                <Text marginTop={0}>
                    Стипендии назначаются дополнительно к государственной академической стипендии, а также дополнительно к повышенной государственной академической стипендии за достижения в учебной, научно-исследовательской, общественной, культурно-творческой и спортивной деятельности.
                    <br /><br />
                    <Button className="mobile-hide" href="https://urfu.ru/ru/students/study/scholarships/imennye-stipendii/" target="_BLANK">Актуальный перечень</Button>
                    <Button className="wide pc-hide" href="https://urfu.ru/ru/students/study/scholarships/imennye-stipendii/" target="_BLANK">Актуальный перечень</Button>
                </Text>
            </Grid>
        </div>
    </section>
    <section id="student-life">
        <div class="content">
            <Grid m={2} s={1} gap={2} ratio="2:3">
                <Heading size={1} className="blue-text" marginTop={0}>Студенческая жизнь</Heading>
                <Text className="heading-3" marginTop={0}>Каждый студент института сможет найти дело по душе! <br /> Студенческие отряды, театры, музыкальные и танцевальные коллективы, турклуб, спортивные и киберспортивные лиги, клуб иностранных языков – это лишь малая часть студенческих возможностей в УрФУ. </Text>
            </Grid>
        </div>
        <Carousel margin={10}>
            { #each images2 as src }
                <img {src} alt={ src } />
            { /each }
        </Carousel>
    </section>
</div>
