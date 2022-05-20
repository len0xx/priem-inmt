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
    import SideBar from '$lib/components/SideBar.svelte'
    import Benefit from '$lib/components/Benefit.svelte'
    import Heading from '$lib/components/Heading.svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'
    import Partner from '$lib/components/Partner.svelte'
    import Profile from '$lib/components/Profile.svelte'
    import Divider from '$lib/components/Divider.svelte'
    import Carousel from '$lib/components/Carousel.svelte'
    import Announce from '$lib/components/Announce.svelte'
    import Document from '$lib/components/Document.svelte'
    import Preloader from '$lib/components/Preloader.svelte'
    import MobileMenu from '$lib/components/MobileMenu.svelte'
    import RoundButton from '$lib/components/RoundButton.svelte'
    import SelectButton from '$lib/components/SelectButton.svelte'
    import images from '$lib/images3'
    import partners from '$lib/partners'
    import programs from '$lib/programs'
    import documents from '$lib/documents'

    // User authorization
    // import { session } from '$app/stores'
    // let user = $session.user
    // console.log(user)

    let modalVisible = false
    let programsExpanded = false
    let menuHidden = true
    let showPreloader = true
    let calendarMode = true
    let pageLoaded = false
    let additional = false
    let headerClass = ''
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
    <title>Бакалавриат – Институт новых материалов и технологий</title>
    <meta property="og:image" content="/img/snippet-bachelor.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<MobileMenu bind:menuHidden>
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/bachelor">Бакалавриат и специалитет</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/master">Магистратура</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" target="_BLANK" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/accommodation">Поселение</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/contacts">Контакты</a><br /><br />
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
                <a class="underlined" href="#calendar">Календарь приема</a>
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
                <a sveltekit:prefetch class="underlined" href="/bachelor">Бакалавриат и специалитет</a>
                <a sveltekit:prefetch class="underlined" href="/master">Магистратура</a>
                <a sveltekit:prefetch target="_BLANK" class="underlined" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a>
                <a sveltekit:prefetch class="underlined" href="/accommodation">Поселение</a>
                <a sveltekit:prefetch class="underlined" href="/contacts">Контакты</a>
            </Nav>
            <div class="mobile-hide align-right">
                <Link color="var(--red)" variant="interactive" lineWidth={ 3 } on:click={ openModal }>Хочу поступить</Link>
            </div>
        </div>
    </div>
</Header>
<section class="promo bachelor" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>Бакалавриат <br /> и специалитет<br /><span class="smaller-text">Институт новых материалов <br /> и технологий</span></Heading>
            <div>
                <Text className="medium" id="mnz2">
                    Институт новых материалов и технологий Уральского федерального университета – один из крупнейших центров высшего инженерного образования региона с 1920 года, сочетающий фундаментальную подготовку и практический междисциплинарный подход<br /><br />
                    <Link href="#programs" color="white" variant="interactive" lineWidth={ 2 }>Смотреть программы</Link>
                </Text>
            </div>
            <div class="pc-hide">
                <Button variant="blue" className="wide" on:click={ openModal }>Хочу поступить</Button>
            </div>
        </Grid>
    </div>
</section>
<br />
<br />
<section id="algorithm">
    <div class="content">
        <Grid m={3} s={1} gap={3}>
            <div>
                <Heading size={1} className="blue-text" marginTop={0}>Алгоритм поступления</Heading>
                <Text className="heading-3">Первый шаг к поступлению –<br />
                    регистрация в личном кабинете<br />
                    абитуриента
                </Text>
            </div>
            <div>
                <Text className="semi-bold subtitle">Способы подачи документов:</Text>
                <ul style:max-width="max(80%, 300px)">
                    <li>Лично по адресу г. Екатеринбург, ул. Мира, 19 или в филиалах УрФУ в городах Нижний Тагил, Каменск-Уральский, Верхняя Салда, Краснотурьинск</li>
                    <li>Через личный кабинет абитуриента УрФУ <Link href="https://priem.urfu.ru" target="_BLANK" color="var(--blue)" variant="interactive" lineWidth={ 2 }>priem.urfu.ru</Link></li>
                    <li>Через сервис «Поступление в вуз онлайн» на портале Госуслуг</li>
                    <li>По почте</li>
                </ul>
            </div>
            <div>
                <Text className="semi-bold subtitle">Для подачи заявления необходимо подготовить полный пакет документов:</Text>
                <ul>
                    <li>Паспорт (страница с фото и пропиской)</li>
                    <li>Документ об образовании (аттестат/диплом)</li>
                    <li>СНИЛС (при наличии бумажного документа)</li>
                    <li>Документы об индивидуальных достижениях (при наличии)</li>
                    <li>Документы, подтверждающие особые права (при наличии)</li>
                    <li>Приписное удостоверение или военный билет (для юношей, поступающих на очную форму обучения)</li>
                </ul>
            </div>
        </Grid>
    </div>
</section>
<section class="blue-block" id="enroll">
    <div class="content">
        <Grid m={4} className="mobile-horizontal-scroll">
            <div class="numbered-section">
                <img src="/img/section-1-alt.svg" alt="1">
                <div>
                    <Text className="subtitle" color="white" marginTop={0}>Выбор направлений подготовки</Text>
                    <Text>Каталог образовательных программ</Text>
                    <Text><Link href="#programs" color="white" lineWidth={2} variant="interactive">Смотреть программы</Link></Text>
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-2-alt.svg" alt="2">
                <div>
                    <Text className="subtitle" color="white" marginTop={0}>Подача документов</Text>
                    <Text>Подайте документы любым удобным способом и предоставьте согласие о зачислении</Text>
                    <Text><Link href="https://priem.urfu.ru/#/" target="_BLANK" color="white" lineWidth={2} variant="interactive">Регистрация</Link></Text>
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-3-alt.svg" alt="3">
                <div>
                    <Text className="subtitle" color="white" marginTop={0}>Вступительные испытания</Text>
                    <Text opacity={0.6} className="small">По результатам ЕГЭ:</Text>
                    <Text>Результаты ЕГЭ автоматически загружаются в конкурсные списки после подачи документов. </Text>
                    <Text opacity={0.6} className="small">По вступительным испытаниям:</Text>
                    <Text>Прохождение вступительных испытаний предусмотрено Правилами приема для отдельных категорий поступающих*</Text>
                    <Text><Link href="#calendar" color="white" lineWidth={2} variant="interactive">Расписание экзаменов</Link></Text>
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-4-alt.svg" alt="4">
                <div>
                    <Text className="subtitle" color="white" marginTop={0}>Зачисление</Text>
                    <Text>Для абитуриентов, поступающих на контрактную форму, необходимо заключить договор и оплатить первый семестр</Text>
                </div>
            </div>
        </Grid>
    </div>
</section>
<section id="programs">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Образовательные программы</Heading>
        <Grid l={3} m={2} s={1}>
            { #each programs.filter(program => program.degree == 'Бакалавриат' || program.degree == 'Специалитет') as program, i }
                { #if i < 6 || programsExpanded }
                    <Card variant="grey" color="custom" on:click={() => openProgram(i)}>
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
<section id="benefits">
    <div class="content">
        <Grid l={4} m={2} s={1}>
            <Benefit num="1 228" caption="Бюджетных мест по программам бакалавриата и специалитета" />
            <Benefit num="123" caption="Контрактных мест по программам бакалавриата и специалитета" />
            <Benefit num="20 июня" caption="Начало приема документов в приемной комиссии УрФУ" />
        </Grid>
    </div>
</section>
<section id="calendar">
    <div class="content">
        <Grid m={3} s={1} gap={2}>
            <Heading size={1} marginTop={0} className="blue-text">Календарь приёма</Heading>
            <Text marginTop={0} className="heading-3">Обратите внимание, что ключевые даты приема отличаются для бюджетной и контрактной основы обучения</Text>
            <Text marginTop={0}>*  Вступительные испытания, проводимые Уральским федеральным университетом — это испытания для категорий поступающих без ЕГЭ: иностранные граждане, инвалиды, поступающие на базе среднего и высшего профессионального образования.</Text>
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
                                <Text className="small" opacity={0.6} marginY={0.6}>По результатам ЕГЭ:</Text>
                                20.06 — 25.07 <br />
                                <Text className="small" opacity={0.6} marginY={0.6}>По вступительным испытаниям:</Text>
                                20.06 — 16.07
                            { :else }
                                <Text className="small" opacity={0.6} marginY={0.6}>По результатам ЕГЭ:</Text>
                                20.06 — 23.09 <br />
                                <Text className="small" opacity={0.6} marginY={0.6}>По вступительным испытаниям:</Text>
                                20.06 — 23.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.6}>В форме компьютерного тестирования:</Text>
                                04.07 — 26.07 <br />
                                <Text className="small" opacity={0.6} marginY={0.6}>Экзамены творческой и профессиональной направленности:</Text>
                                18.07 — 26.07
                            { :else }
                                04.07 — 26.07 <br />
                                09.08 — 20.08 <br />
                                29.08 — 24.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.6}>Этап приоритетного зачисления:</Text>
                                28.07 в 18:00 <br />
                                <Text className="small" opacity={0.6} marginY={0.6}>Этап зачисления на основные конкурсные места:</Text>
                                03.08 в 18:00
                            { :else }
                                26.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.6}>Особые права; без экзаменов; <br /> на целевые места:</Text>
                                30.07 <br />
                                <Text className="small" opacity={0.6} marginY={0.6}>На основные конкурсные места:</Text>
                                09.08
                            { :else }
                                21.06 — 26.09
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
                                20.06 — 16.08
                            { :else }
                                20.06 — 28.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                04.07 — 26.07 <br />
                                09.08 — 20.08
                            { :else }
                                04.07 — 26.07 <br />
                                09.08 — 20.08 <br />
                                29.08 — 29.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.6}>Этап приоритетного зачисления:</Text>
                                22.08 в 17:00 <br />
                                <Text className="small" opacity={0.6} marginY={0.6}>Этап зачисления на основные конкурсные места:</Text>
                                25.08 в 18:00
                            { :else }
                                01.11
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.6}>Особые права; без экзаменов; <br /> на целевые места:</Text>
                                23.08<br />
                                <Text className="small" opacity={0.6} marginY={0.6}>На основные конкурсные места:</Text>
                                26.08
                            { :else }
                                21.06 — 01.11
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
<br />
<br />
<Announce image="/img/image26.jpg">
    <svelte:fragment slot="first">
        <Heading size={1} marginTop={0} marginBottom={0.5}>Вступительные испытания</Heading>
        <div style:width="50%"><Text className="heading-3">для поступающих на базе среднего профессионального образования</Text></div>
    </svelte:fragment>
    <svelte:fragment slot="second">
        <Text>Выпускники колледжей и техникумов имеют возможность поступить на очную или заочную формы обучения по программам бакалавриата и специалитета на бюджетной или контрактной основе</Text>
        <Divider height={2} color="white" marginY={1.5} />
        <Text opacity={0.4}>Ознакомиться с перечнем вступительных испытаний для абитуриентов на базе среднего профессионального образования для поступления в УрФУ в 2022 году можно в документе</Text>
        <Link color="white" lineWidth={ 2 } variant="interactive" href="https://urfu.ru/ru/applicant/docs-abiturient/demo-exams/">Демо-варианты</Link> <br /><br /><br />
        <Button on:click={ openModal }>Поступить</Button>
    </svelte:fragment>
</Announce>
<br />
<br />
<section id="student-life">
    <div class="content">
        <Grid m={2} s={1} gap={2}>
            <div style:width="75%"><Heading size={1} className="blue-text" marginTop={0}>Получите фундаментальное инженерное образование</Heading></div>
            <Text className="heading-3" marginTop={0}>Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
            <div style:width="75%">
                <Text className="heading-3" marginTop={0}>Институт новых материалов и технологий:</Text>
                <ul>
                    <li>Осуществляет обучение по образовательным программам высшего образования в области материаловедения, металлургии, машиностроения, строительной индустрии</li>
                    <li>Осуществляет фундаментальные и прикладные научные исследования</li>
                    <li>Выполняет научно-исследовательские работы по заказу предприятий</li>
                </ul>
            </div>
            <Grid m={2} s={1}>
                <Benefit num="5 000+" caption="Студентов" />
                <Benefit num="30" caption="Кафедр, 21 - выпускающая и 9 - базовых" />
                <Benefit num="19" caption="Учебных и научных лабораторий" />
                <Benefit num="93,3%" caption="Трудоустроенных выпускников по специальности" />
            </Grid>
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
            <Heading size={1} className="blue-text">Наши студенты проходят практику на предприятиях партнерах института</Heading>
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
<section id="student-life">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Студенческие <br /> возможности</Heading>
        <div class="mobile-horizontal-scroll">
            <Grid l={6}>
                <div class="align-center" style:min-width="200px">
                    <img src="/img/blue-star.svg" alt="star">
                    <Text className="semi-bold subtitle">Общежитие</Text>
                    <Text className="semi-bold small" opacity={0.6}>Иногородние студенты, обучающиеся по очной форме, могут получить место в общежитии на время обучения</Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <img src="/img/blue-star.svg" alt="star">
                    <Text className="semi-bold subtitle">Военная кафедра</Text>
                    <Text className="semi-bold small" opacity={0.6}>Студенты могут пройти обучение на офицеров и сержантов запаса во время получения основной специальности в ИНМТ </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <img src="/img/blue-star.svg" alt="star">
                    <Text className="semi-bold subtitle">Студенческие организации</Text>
                    <Text className="semi-bold small" opacity={0.6}>Найти занятие по душе сможет каждый. Более 30 организаций и клубов по интересам доступны студентам вуза </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <img src="/img/blue-star.svg" alt="star">
                    <Text className="semi-bold subtitle">Стипендии</Text>
                    <Text className="semi-bold small" opacity={0.6}>Дополнительная поддержка талантливых студентов за научную, общественную и творческую деятельность </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <img src="/img/blue-star.svg" alt="star">
                    <Text className="semi-bold subtitle">Наука</Text>
                    <Text className="semi-bold small" opacity={0.6}>Современные лаборатории и опытные профессора помогут начать успешную карьеру в науке </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <img src="/img/blue-star.svg" alt="star">
                    <Text className="semi-bold subtitle">Спорт</Text>
                    <Text className="semi-bold small" opacity={0.6}>Привычные занятия физкультурой можно заменить любимым видом спорта и присоединиться к одной из 20 сборных команд вуза</Text>
                </div>
            </Grid>
        </div>
    </div>
    <br />
    <br />
    <img src="/img/pano.jpg" alt="">
    <br />
    <br />
    <br />
</section>
<section id="consult" class="blue-block">
    <div class="content">
        <Grid m={2} s={1} alignItems="start">
            <Heading size={1} marginTop={0}>Получите консультацию <br /> по поступлению</Heading>
            <Text className="heading-3" opacity={0.4} marginTop={0}>Вы узнаете особенности направлений подготовки
                и образовательных программ, проходные баллы
                и познакомитесь с перечнем изучаемых дисциплин</Text>
        </Grid>
        <Grid m={4} s={2} xs={1}>
            <Input className="white" type="text" name="fio" placeholder="ФИО" wide />
            <Input className="white" type="email" name="email" placeholder="Email" wide />
            <Input className="white" type="tel" name="phone" placeholder="Телефон" wide />
            <Input className="white" type="text" name="message" placeholder="Сообщение" wide />
        </Grid>
        <br />
        <Grid m={2} s={1} alignItems="center">
            <div style:width="70%">
                <label for="agreement5" class="checkbox-wrapper align-left white-text">
                    <Input type="checkbox" name="agreement" id="agreement5" required={ true } />
                    <span class="fourty-text">Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
                </label>
            </div>
            <div class="align-right">
                <Button>Отправить</Button>
            </div>
        </Grid>
        <br />
        <br />
    </div>
</section>
<section id="feedbacks">
    <div class="content">
        <Heading size={1} className="blue-text">Отзывы выпускников</Heading>
        <Grid m={3} s={1} alignItems="start">
            <Grid m={1} alignItems="start">
                <Profile>
                    <svelte:fragment slot="name">Адыев Эдуард</svelte:fragment>
                    <svelte:fragment slot="description">Выпускник 2019 года</svelte:fragment>
                    <svelte:fragment slot="text">Обучение в бакалаврите по ОП 22.03.02 "Металлургия" позволило получить очень обширные знания от материаловедения до расчетов деталей на прочность и экономики. Главное чему научился во время обучения это понимание того, что неважно делаешь ли ты ошибки, а главное уметь их находить и исправлять. От обучения остались только положительные впечатления. Преподаватели отзывчивые и всегда готовы помочь. Обучение позволило стать востребованным специалистом и получить должность руководителя в подразделении крупного машиностроительного предприятия МЗиК, в котором  на тот момент я только начинал работать</svelte:fragment>
                </Profile>
                <Profile img="/img/avatars/bachelor/Рейш.png">
                    <svelte:fragment slot="name">Рейш Юлия</svelte:fragment>
                    <svelte:fragment slot="description">Выпускник 2019 года</svelte:fragment>
                    <svelte:fragment slot="text">В 2021 году я закончила ИНМТ по специальности Конструкторско-технологическое обеспечение машиностроительных производств. 4 года обучения в этом институте были лучшими в моей жизни! Качественное образование по направлению позволило мне устроиться в крупнейшую компанию по разработке и поставке программного обеспечения в сфере автоматизации проектной и производственной деятельности - АСКОН. Сейчас я работаю Менеджером по автоматизации конструторско-технологической подготовки производства и занимаюсь продажей и внедрением отечественного инженерного ПО на предприятия, и я очень люблю свою работу. Обучение в ИНМТ также возможно совмещать с научной или внеучебной деятельностью, что позволяет приобрести дополнительные компетенции для дальнейшего профессионального и личного развития. ИНМТ - это институт, который помог мне открыть и использовать по максимуму мои лучшие стороны.</svelte:fragment>
                </Profile>
            </Grid>
            <Grid m={1} alignItems="start">
                <Profile img="/img/avatars/bachelor/Волгутов.png">
                    <svelte:fragment slot="name">Волгутов Андрей</svelte:fragment>
                    <svelte:fragment slot="description">Выпускник 2019 года</svelte:fragment>
                    <svelte:fragment slot="text">Закончил кафедру «Химической технологии керамики и огнеупоров» ИНМТ в 2020 году. Основной целью высшего образования для меня является получение профессиональных навыков для построения рабочей карьеры. Данная образовательная программа дает такую возможность. Здесь можно получить отличные знания и навыки по техническим наукам. В этом помогают хорошо проработанный учебный план и отличный преподавательский состав. Преподаватели всегда готовы помочь с вопросами по учебной деятельности. С начальных курсов обучения можно также начать исследовательскую деятельность. Кафедра сотрудничает со многим предприятиями, где можно проходить практику и впоследствии трудоустроиться. С полученными знаниями мне легко удалось поступить в магистратуруограммы</svelte:fragment>
                </Profile>
                <Profile img="/img/avatars/bachelor/Скляр.png">
                    <svelte:fragment slot="name">Скляр Марина</svelte:fragment>
                    <svelte:fragment slot="description">Выпускник 2021 года</svelte:fragment>
                    <svelte:fragment slot="text">УрФУ - отличный ВУЗ, всегда был и остаётся востребованным не только для российской молодежи, но и для молодежи разных стран, что делает его довольно престижным. Причина этого - богатая история, знаменитые выпускники, высококлассный преподавательский коллектив, оснащённость кабинетов, лабораторий, применение в обучении передовых научных достижений и методов, возможность заниматься спортом, наличие новых общежитий со всеми удобствами и, конечно же, студенческая романтика, молодежная атмосфера. При обучении в нем получаешь основной фундамент знаний по выбранному направлению и не только по нему, умение анализировать поставленные задачи и варианты способов их решения. Совокупность всего этого становится хорошим трамплином для построения дальнейшей карьеры.</svelte:fragment>
                </Profile>
            </Grid>
            <Grid m={1} alignItems="start">
                <Profile img="/img/avatars/bachelor/Бушуева.png">
                    <svelte:fragment slot="name">Бушуева Наталья</svelte:fragment>
                    <svelte:fragment slot="description">Выпускник 2020 года</svelte:fragment>
                    <svelte:fragment slot="text">Обучение на ОП 22.03.02 "Металлургия" открыло для меня необъятный горизонт возможностей. За время обучения в бакалавриате студент может познакомиться с деятельностью всех направлений металлургической специальности и выбрать то, что ему подходит для дальнейшего обучения на следующих ступенях образования или в рамках бакалавриата. Например, после распределения на 3 курсе я попала на направление, которое мне хотелось поменять. Деканат и кафедра пошли мне на встречу и помогли с переходом на другое направление. Также, руководство кафедры помогает с организацией практики в желаемом месте ее прохождения. В стремлении заняться научной деятельностью мне всегда оказывалась поддержка со стороны профессорского состава моей кафедры обработки металлов давлением. Я регулярно отправляюсь на различные научные мероприятия и это действительно очень интересно. Так за 3 года моей научной деятельности по специальности я посетила уже 12 городов страны, собрала портфолио из 13 публикаций в различных изданиях, в т.ч. Scopus, вошла в состав научной группы по гранту от РНФ. Кроме этого, стала участником 9 стипендиальных программ. И хочу и дальше продолжать развиваться в этом направлении, поступить в аспирантуру на кафедру обработки металлов давлением, получить звание кандидата наук</svelte:fragment>
                </Profile>
            </Grid>
        </Grid>
    </div>
</section>
<section id="documents">
    <div class="content">
        <Grid m={2} s={1} ratio="2:3">
            <Heading size={1} className="blue-text" marginTop={0}>Полезные <br /> документы</Heading>
            <Grid m={1}>
                { #each documents as document }
                    <Document { ...document } />
                { /each }
            </Grid>
        </Grid>
    </div>
</section>
