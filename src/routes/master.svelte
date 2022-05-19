<script lang="ts">
    import { onMount } from 'svelte'
    import Nav from '$lib/components/Nav.svelte'
    import Grid from '$lib/components/Grid.svelte'
    import Link from '$lib/components/Link.svelte'
    import Card from '$lib/components/Card.svelte'
    import Text from '$lib/components/Text.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Input from '$lib/components/Input.svelte'
    import Button from '$lib/components/Button.svelte'
    import Header from '$lib/components/Header.svelte'
    import Switch from '$lib/components/Switch.svelte'
    import SideBar from '$lib/components/SideBar.svelte'
    import Benefit from '$lib/components/Benefit.svelte'
    import Heading from '$lib/components/Heading.svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'
    import Partner from '$lib/components/Partner.svelte'
    import Profile from '$lib/components/Profile.svelte'
    import Carousel from '$lib/components/Carousel.svelte'
    import Preloader from '$lib/components/Preloader.svelte'
    import Profession from '$lib/components/Profession.svelte'
    import Expandable from '$lib/components/Expandable.svelte'
    import MobileMenu from '$lib/components/MobileMenu.svelte'
    import RoundButton from '$lib/components/RoundButton.svelte'
    import SelectButton from '$lib/components/SelectButton.svelte'
    import images from '$lib/images3'
    import partners from '$lib/partners'
    import programs from '$lib/programs'
    import professions from '$lib/professions'
    import faqText from '$lib/faqs'

    // User authorization
    // import { session } from '$app/stores'
    // let user = $session.user
    // console.log(user)

    let modalVisible = false
    let programsExpanded = false
    let professionsExpanded
    let menuHidden = true
    let showPreloader = true
    let pageLoaded = false
    let additional = false
    let headerClass = ''
    let budgetMode = true
    let faqsExpanded = false
    let calendarMode = true
    let activeSpeciality = 0
    let faqs: boolean[] = []
    let programActive: boolean[] = []
    let programOpened: boolean[] = []

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    const openProgram = (num: number) => {
        if (!programActive[num]) {
            programActive[num] = true
            setTimeout(() => programOpened[num] = false, 10)
        }
    }

    const closeProgram = (num: number) => {
        if (programActive[num]) {
            programOpened[num] = true
            setTimeout(() => programActive[num] = false, 300)
        }
    }

    const toggleExpandable = (index: number) => {
        for (let i = 0; i < faqs.length; i++) if (i != index) faqs[i] = false
        faqs[index] = !faqs[index]
    }

    const payModeChanged = (event: CustomEvent) => {
        const { state } = event.detail
        budgetMode = !state
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
    <title>Магистратура – Институт новых материалов и технологий</title>
    <meta property="og:image" content="/img/snippet-master.jpg" />
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
            <Nav className="mobile-hide">
                <a class="underlined" href="#enroll">Как поступить</a>
                <a class="underlined" href="#dates">Календарь приема</a>
                <a class="underlined" href="#programs">Программы</a>
            </Nav>
            <div class="mobile-hide align-right">
                <Button variant={ headerClass == 'header-scrolled' ? 'primary' : 'blue' } on:click={ openModal }>Поступить</Button>
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
<section class="promo master" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>Программы магистратуры<br /><span class="smaller-text">Институт новых материалов <br /> и технологий</span></Heading>
            <div>
                <Text className="medium" id="mnz2">
                    УрФУ получил наивысшую оценку среди нестоличных вузов в рейтинге Forbes в 2021 году по показателю востребованности выпускников, который учитывает мнение 35 ведущих российских компаний.<br /><br />
                    <Link href="#programs" variant="interactive" color="white" lineWidth={ 2 }>Смотреть программы</Link>
                </Text>
            </div>
            <div class="pc-hide">
                <Button variant="blue" className="wide" on:click={ openModal }>Хочу поступить</Button>
            </div>
        </Grid>
    </div>
</section>
<br />
<section id="benefits">
    <div class="content">
        <Grid m={4} s={2}>
            <Benefit num="414" caption="Бюджетных мест по программам магистратуры" />
            <Benefit num="35" caption="Контрактных мест по программам магистратуры" />
            <Benefit num="20 июня" caption="Начало приема документов в приемной комиссии УрФУ" />
            <Benefit num="93,3% " caption="Трудоустроенных выпускников" />
        </Grid>
    </div>
</section>
<br />
<section class="howto" id="enroll">
    <div class="content">
        <Grid s={1} m={2} id="pay-toggler">
            <Heading size={1} className="blue-text" marginY={0}>Особенности поступления</Heading>
            <div>
                <br class="pc-hide" />
                <Switch on:change={ payModeChanged } left="Бюджет" right="Контракт" />
            </div>
        </Grid>
        <br /><br />
        <Grid m={4} className="mobile-horizontal-scroll">
            <div class="numbered-section">
                <img src="/img/section-1.svg" alt="1">
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Узнайте о поступлении</Text>
                    <Text><a href="/docs/doc2.pdf" target="_BLANK">Правила приема</a></Text>
                    <Text>Сроки подачи документов</Text>
                    <Text className="small">
                        Очная форма обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">20.06 - 08.08</span>
                        { :else }
                            <span class="blue-text">20.06 - 23.09</span>
                        { /if }
                    </Text>
                    <Text className="small">
                        Очно-заочная и заочная формы обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">20.06 - 08.08</span>
                        { :else }
                            <span class="blue-text">20.06 - 28.10</span>
                        { /if }
                    </Text>
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-2.svg" alt="2">
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Выберите образовательную программу</Text>
                    <Text>Каталог образовательных программ</Text>
                    <Text><a href="#programs" class="link blue-color">Смотреть программы</a></Text>
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-3.svg" alt="3">
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Подайте документы</Text>
                    <Text>Подать документы онлайн через личный кабинет абитуриента</Text>
                    <Text><a href="https://priem.urfu.ru/#/" target="_BLANK" class="link blue-color">Регистрация</a></Text>
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-4.svg" alt="4">
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Пройдите вступительные испытания</Text>
                    <Text>Период сдачи вступительных испытаний</Text>
                    <Text className="small">
                        Очная форма обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">04.07 - 13.08</span>
                        { :else }
                            <span class="blue-text">04.07 - 13.08 и 22.08 - 24.09</span>
                        { /if }
                    </Text>
                    <Text className="small">
                        Очно-заочная и заочная формы обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">04.07 - 13.09 и 22.08 - 12.09</span>
                        { :else }
                            <span class="blue-text">04.07 - 13.08 и 22.08 - 29.10</span>
                        { /if }
                    </Text>
                </div>
            </div>
        </Grid>
    </div>
</section>
<section id="calendar">
    <div class="content">
        <Grid m={3} s={1} gap={2}>
            <Heading size={1} marginTop={0} className="blue-text">Календарь приёма</Heading>
            <Text marginTop={0} className="heading-3">Обратите внимание, что ключевые даты приема отличаются для бюджетной и контрактной основы обучения</Text>
            <Text marginTop={0}>Вступительные испытания для поступающих на программы магистратуры, проводимые Уральским федеральным университетом — это конкурсный отбор, который проводится в формате компьютерного тестирования (КТ)</Text>
        </Grid>
        <div>
            <SelectButton variant={ calendarMode ? 'active' : 'default' } on:click={() => calendarMode = !calendarMode}>Бюджет</SelectButton>
            <SelectButton variant={ !calendarMode ? 'active' : 'default' } on:click={() => calendarMode = !calendarMode}>Контракт</SelectButton>
        </div>
        <br />
        <div class="tablet-horizontal-scroll">
            <div class="kit-table">
                <Grid m={5}>
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">Форма обучения</Text></div> 
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">Прием документов</Text></div> 
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">Вступительные испытания</Text></div> 
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">Завершение приема</Text></div> 
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">Приказы о зачислении</Text></div> 
                </Grid>
                <Grid m={5}>
                    <div class="kit-table-cell"><Text className="subtitle">Очная форма <br /> обучения</Text></div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                20.06 — 08.08
                            { :else }
                                20.05 — 23.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                04.07 — 13.08
                            { :else }
                                04.07 — 13.08 <br />
                                22.08 — 24.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                16.08 в 17:00 <br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                18.08 в 18:00
                            { :else }
                                26.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                17.08 <br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                19.08
                            { :else }
                                30.06 — 26.09
                            { /if }
                        </Text>
                    </div>  
                </Grid>
                <hr>
                <Grid m={5}>
                    <div class="kit-table-cell"><Text className="subtitle">Очно-заочная и заочная формы обучения</Text></div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                20.06 — 09.09
                            { :else }
                                20.06 — 28.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                04.07 — 13.09 <br />
                                22.08 — 12.09
                            { :else }
                                04.07 — 13.08 <br />
                                22.08 — 29.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                13.09 в 17:00 <br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                15.09 в 17:00
                            { :else }
                                01.11
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                14.09<br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                16.09
                            { :else }
                                30.06 — 01.11
                            { /if }
                        </Text>
                    </div> 
                </Grid>
                <hr>
            </div>
        </div>
        <br />
        <Button on:click={ openModal }>Подать документы</Button>
    </div>
</section>
<section id="programs">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Образовательные программы</Heading>
        <Grid l={3} m={2} s={1}>
            { #each programs.filter(program => program.degree == 'Магистратура') as program, i }
                { #if i < 6 || programsExpanded }
                    <Card variant="grey" color="custom" on:click={ () => openProgram(i) }>
                        <svelte:fragment slot="title">{ program.title }</svelte:fragment>
                        <svelte:fragment slot="text">Направления: { program.directions.join(', ') }</svelte:fragment>
                        <span slot="left" class="semi-bold">
                            <span class="red-text">{ program.vacantSpots[0][0] }</span> <span class="fourty-text-black">бюджет</span>
                            <span class="blue-text" style:margin-left="1em">{ program.vacantSpots[0][1] }</span> <span class="fourty-text-black">контракт</span>
                        </span>
                        <svelte:fragment slot="right">от { program.price[0] }₽</svelte:fragment>
                    </Card>
                    { #if programActive[i] }
                        <SideBar on:close={() => closeProgram(i)} on:apply={() => {closeProgram(i); openModal()}} bind:hidden={programOpened[i]} {...program} />
                    { /if }
                { /if }
            { /each }
        </Grid>
        { #if !programsExpanded }
            <br />
            <br />
            <div class="align-center">
                <RoundButton variant="plus" size="L" on:click={() => programsExpanded = true} />
            </div>
        { /if }
    </div>
</section>
<section id="carousel">
    <div class="content">
        <Grid m={3} s={1}>
            <div>
                <Heading size={1} marginTop={0} className="blue-text">Станьте ценным специалистом современной компании</Heading>
                <Button on:click={ openModal }>Поступить</Button>
            </div>
            <Text className="heading-3" marginTop={0}>Выпускники Института новых материалов и технологий способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
            <div style:opacity={0.8}>
                <Text className="heading-3" marginTop={0}>Институт дает множество возможностей для студентов:</Text>
                <ul>
                    <li>Современные лаборатории и ведущие научные школы</li>
                    <li>Хакатоны и инженерные соревнования </li>
                    <li>Стипендии и гранты талантливым студентам </li>
                    <li>Общежитие на время обучения </li>
                    <li>Развитие предпринимательских навыков «Стартап как диплом»</li>
                    <li>Нетворкинг</li>
                </ul>
            </div>
        </Grid>
        <br />
        <br />
        <Grid m={4} s={2}>
            <Benefit num="5 000+" caption="Студентов обучается в институте" />
            <Benefit num="19" caption="Учебных и научных лабораторий" />
            <Benefit num="30" caption="Кафедр, 21 - выпускающая и 9 - базовых" />
            <Benefit num="93,3%" caption="Трудоустроенных выпускников" />
        </Grid>
    </div>
    <br />
    <br />
    <br />
    <Carousel margin={10}>
        { #each images as src }
            <img {src} alt={ src } />
        { /each }
    </Carousel>
</section>
<section class="partners">
    <div class="content">
        <Grid m={2} s={1}>
            <Heading size={1} className="blue-text" marginTop={0}>Партнеры института</Heading>
        </Grid>
    </div>
    <Carousel margin={0} className="mobile-hide">
        { #each [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11], [12]] as range }
            <div class="fill-width">
                <div class="content">
                    <Grid s={2} m={6} className="my-4" alignItems="start">
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
<section class="future mobile-hide">
    <div class="content">
        <Grid m={2}>
            <h1 class="no-top-margin blue-text">Кем можно стать<br /> после выпуска?</h1>
            <h3 class="no-top-margin">Выпускники нашей магистратуры смогут развиватьсяи работать в любом направлении, смежномразработкой и проектированием</h3>
        </Grid>
        <div class="pills">
            { #each professions as profession, i }
                { #if i < 4 || professionsExpanded }
                    <SelectButton variant={ activeSpeciality == i ? 'active' : 'default' } on:click={ () => activeSpeciality = i }>{ profession.title }</SelectButton>
                { /if }
            { /each }
            { #if professionsExpanded }
                <SelectButton variant="blue" on:click={ () => professionsExpanded = !professionsExpanded }>Меньше</SelectButton>
            { :else }
                <SelectButton variant="blue" on:click={ () => professionsExpanded = !professionsExpanded }>Больше</SelectButton>
            { /if }
        </div>
        <br />
        <br />
        { #each professions as profession, i }
            { #if activeSpeciality == i }
                <Profession on:linkClicked={ openModal } {...profession} />
            { /if }
        { /each }
    </div>
</section>
<section id="feedbacks">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Отзывы выпускников</Heading>
        <Grid m={3} s={1} alignItems="start">
            <Grid m={1} alignItems="start">
                <Profile img="/img/avatars/master/Амосов.png">
                    <svelte:fragment slot="name">Амосов Никита</svelte:fragment>
                    <svelte:fragment slot="description">ИНМТ, каф. Организации машиностроительного производства, ассистент</svelte:fragment>
                    <svelte:fragment slot="text">В 2019 году я окончил обучение на кафедре Организации машиностроительного производства по программе «Инновационное развитие наукоемких производств». Читаемые дисциплины актуальны и востребованы для специалистов в области машиностроения. Преподаватели кафедры используют современные методы обучения. Полученные знания ежедневно применяются в моей рабочей деятельности. Хочу выразить искреннюю благодарность всем сотрудникам кафедры! Я с большим удовольствием вспоминаю годы обучения!</svelte:fragment>
                </Profile>
                <Profile img="/img/avatars/master/Русин.png">
                    <svelte:fragment slot="name">Русин Александр</svelte:fragment>
                    <svelte:fragment slot="description">ЗАО "Автоматизированные системы и комплексы", ведущий инженер </svelte:fragment>
                    <svelte:fragment slot="text">Учеба на кафедре "Теплофизика и информатика в металлургии" дала мне разносторонние знания и навыки как в динамично развивающейся сфере информационных систем, так и в одной из важнейших для России стратегических отраслей - металлургии. <br /> Выпускник специальности "Информационные системы и технологии" получает значительно больше путей для начала своей трудовой деятельности, нежели узконаправленные специалисты. После окончания университета у меня были знания по циклам производства в черной и цветной металлургии, автоматизации технологических процессов, управлению проектами, сетевым технологиям, программированию прикладного ПО и баз данных. Объема полученных знаний с легкостью хватит для начала работы и дальнейшего становления как специалиста в любом из этих направлений. Я же успешно продолжил работать в области автоматизации технологических процессов, побывал на многих предприятиях нашей страны, запустил в работу крупные промышленные объекты - краны выгрузки топлива из реактора АЭС, фрезерные агрегаты, печи производства извести, прокатный стан и др. Так что полученные знания даром не пропали!</svelte:fragment>
                </Profile>
            </Grid>
            <Grid m={1} alignItems="start">
                <Profile img="/img/avatars/master/Волгутов.png">
                    <svelte:fragment slot="name">Волгутов Андрей</svelte:fragment>
                    <svelte:fragment slot="description">ООО «Проектно-инжиниринговая компания «Корунд», испонительный директор </svelte:fragment>
                    <svelte:fragment slot="text">Выбор магистратуры в УрФУ по направлению организация бизнеса в машиностроении мной был сделан не случайно. К 2015 году я уже возглавлял продажи по Уральскому региону, части Поволжья и Сибири одного из крупнейших зарубежных производителей теплообменного оборудования и получил дополнительное бизнес-образование. Встал вопрос об организации собственного бизнеса, который будет построен на принципе кооперации и четком разделении производственной и коммерческой баз. Программа «Организация машиностроительного бизнеса» по кафедре «Машиностроение» на базе УрФУ имела все те переменные, которых мне не хватало в то время, чтобы сложить пазл своих компетенций в данном вопросе. Грамотно сформированный лист дисциплин при активной позиции и профессиональной подаче материала со стороны преподавательского состава, разбор кейсов из практики действующего бизнеса и проецирование успешных решений на возможные ситуации очень помогли мне в усвоении курса.</svelte:fragment>
                </Profile>
                <Profile img="/img/avatars/master/Корнев.png">
                    <svelte:fragment slot="name">Корнев Игнат</svelte:fragment>
                    <svelte:fragment slot="description">ООО "Группа "Магнезит" , инженер-технолог</svelte:fragment>
                    <svelte:fragment slot="text">Химия и технологии мне нравились с детства. Понятие о строении веществ и их превращении, применении природного сырья в различных отраслях техники - все это стало поводом поступления на кафедру химической технологии керамики и огнеупоров. В 2015 году я начал обучение в магистратуре у профессора Кащеева и всего преподавательского состава. Эти люди оставили значимый отпечаток в моей жизни, передали свой опыт и знания, которые сейчас использую на предприятии ООО "Группа "Магнезит" в своем родном городе Сатка. Без них я бы не смог показать себя как хороший специалист и химик-технолог в области производства высокоогнеупорных материалов. Желаю кафедре дальнейшего процветания и новых научных открытий! <br /> От себя скажу, что обучение на кафедре - мое лучшее время в жизни!</svelte:fragment>
                </Profile>
            </Grid>
            <Grid m={1} alignItems="start">
                <Profile img="/img/avatars/master/Деева.png">
                    <svelte:fragment slot="name">Деева Юлия</svelte:fragment>
                    <svelte:fragment slot="description">Младший научный сотрудник Института химии твердого тела УрО РАН</svelte:fragment>
                    <svelte:fragment slot="text">Одной из самых важных ступеней в жизни каждого человека является определение своего призвания. Ещё Ницше в 19 веке считал, что «Призвание есть становой хребет жизни». Поистине счастлив тот человек, чьё призвание коррелирует с полученной профессией. Я обрела своё призвание поступив, а затем и успешно окончив кафедру ХТКиО по траектории «Технология материалов электронной техники и наноэлектроники». Опыт, приобретенный в ходе обучения на данной кафедре, чрезвычайно велик и помогает справиться с решением большого спектра поставленных задач, как научных, так и производственных. Знаний и умений, которые я приобрела благодаря огромному труду, вложенному сотрудниками кафедры, более чем достаточно для успешного начала работы в научно-исследовательском институте. Я благодарна кафедре, что направили меня на практику в Институт химии твердого тела, где я и работаю по настоящий день. Поступление на кафедру ХТКиО является одним из самых важных и удачных решений в моей жизни</svelte:fragment>
                </Profile>
                <Profile img="/img/avatars/master/Свалов.png">
                    <svelte:fragment slot="name">Свалов Андрей</svelte:fragment>
                    <svelte:fragment slot="description">МУП "Водоканал", главный инженер</svelte:fragment>
                    <svelte:fragment slot="text">Во время обучения приобрёл знания по организации и эффективному управлению предприятием. Научился просчитывать финансовые риски, окупаемость и доходность инвестиций в модернизацию производственных процессов и оборудование предприятия. Приобрел навыки по организации эффективного использования имеющихся ресурсов</svelte:fragment>
                </Profile>
            </Grid>
        </Grid>
    </div>
</section>
<section class="faq" id="faq">
    <div class="content">
        <Grid m={1} l={2} gap={2} ratio="1:2">
            <Heading size={1} className="blue-text" marginTop={0}>Часто задаваемые вопросы</Heading>
            <div>
                { #each faqText as faq, i }
                    { #if i < 4 || faqsExpanded }
                        <Expandable bind:active={faqs[i]} on:click={() => toggleExpandable(i)}>
                            <svelte:fragment slot="header">{ faq.question }</svelte:fragment>
                            <svelte:fragment slot="text">{ @html faq.answer }</svelte:fragment>
                        </Expandable>
                    { /if }
                { /each }
                { #if !faqsExpanded }
                    <div class="align-center my-4">
                        <RoundButton size="L" on:click={() => faqsExpanded = true} variant="plus" />
                    </div>
                { /if }
            </div>
        </Grid>
    </div>
</section>