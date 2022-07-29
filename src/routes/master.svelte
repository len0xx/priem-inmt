<script lang="ts">
    import { onMount } from 'svelte'
    import { blur } from 'svelte/transition'
    import {
        Nav,
        Grid,
        Step,
        Link,
        Text,
        Modal,
        Input,
        Button,
        Filter,
        Switch,
        Header,
        SideBar,
        Heading,
        Rainbow,
        Partner,
        Profile,
        Benefit,
        AjaxForm,
        Carousel,
        Preloader,
        Profession,
        Expandable,
        MobileMenu,
        RoundButton,
        ProgramCard,
        SelectButton
    } from '$lib/components'
    import { sortByName, sortByPlaces, sortByPrice } from '$lib/utilities'
    import programs, { type EducationMode, type Program } from '$lib/programs'
    import images from '$lib/images3'
    import partners from '$lib/partners'
    import professions from '$lib/professions'
    import faqText from '$lib/faqs'
    import { master as feedbacks } from '$lib/feedback'
    import { formEndpoint } from '$lib/stores'

    let modal: {
        open: () => void,
        close: () => void
    } = undefined
    let programsExpanded = false
    let professionsExpanded = false
    let menuVisible = false
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
    let educationModes: EducationMode[] = []
    let payModes: string[] = []
    let languages: string[] = []
    let selectedSort = 'name'
    let search = ''
    let formSubmitted = false
    let formSuccess = false
    let feedbacksExpanded = false
    let linkColor: 'white' | 'black' = 'white'

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

    const openMenu = () => menuVisible = true

    const closeMenu = () => menuVisible = false

    const handleScrollUp = () => {
        setTimeout(() => {
            headerClass = ''
            linkColor = 'white'
        }, 250)
    }

    const handleScrollDown = () => {
        setTimeout(() => {
            headerClass = 'header-scrolled'
            linkColor = 'black'
        }, 200)
    }
    
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

    const applyFilters = (program: Program, selectedEducationModes: EducationMode[], selectedPayModes: string[], selectedLanguages: string[], searchString: string): boolean => {
        const budgetPlaces = program.vacantSpots.reduce((acc: number, cur: string[]) => acc + +cur[0], 0)
        const paidPlaces = program.vacantSpots.reduce((acc: number, cur: string[]) => acc + +cur[1], 0)

        const degreeFilter = ['Магистратура'].includes(program.degree)
        const modeFilter = selectedEducationModes.length ? selectedEducationModes.filter(value => program.educationModes.includes(value)).length > 0 : true
        const languageFilter = selectedLanguages.length ? selectedLanguages.filter(value => program.languages.includes(value)).length > 0 : true
        const searchFilter = searchString ? program.title.toLowerCase().includes(searchString.toLowerCase()) : true
        const payFilter = selectedPayModes.length ? (selectedPayModes.includes('Бюджет') ? budgetPlaces > 0 : false) || (selectedPayModes.includes('Контракт') ? paidPlaces > 0 : false) : true

        return modeFilter && languageFilter && payFilter && degreeFilter && searchFilter
    }

    $: programsFiltered = programs.filter(program => applyFilters(program, educationModes, payModes, languages, search)).sort((a, b) => {
        if (selectedSort == 'name') return sortByName(a, b)
        else if (selectedSort == 'places') return sortByPlaces(a, b)
        return sortByPrice(a, b)
    })

    onMount(() => {
        pageLoaded = true
        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Магистратура – Институт новых материалов и технологий</title>
    <meta property="og:image" content="https://inmt-priem.urfu.ru/img/snippet-master.jpg" />
    <meta property="vk:image" content="https://inmt-priem.urfu.ru/img/snippet-master.jpg" />
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

<Modal bind:this={ modal } align="center" closable={true}>
    <Heading size={2} className="blue-text" marginTop={0}>Получить консультацию</Heading>
    <AjaxForm action={ $formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false } id="JSyW">
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

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 } transparent={ true } className={ headerClass } on:scroll-up={ handleScrollUp } on:scroll-down={ handleScrollDown }>
    <div class="content">
        <div class="header-layout { headerClass == 'header-scrolled' ? 'black' : 'white' }">
            <div>
                <a sveltekit:reload href="/">
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
                <Link color={ linkColor } lineWidth={ 3 } href="#enroll" variant="hover">Как поступить</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#dates" variant="hover">Календарь приема</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#programs" variant="hover">Программы</Link>
            </Nav>
            <div class="mobile-hide align-right">
                <Button variant={ headerClass == 'header-scrolled' ? 'primary' : 'blue' } href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
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
                <Link color="var(--red)" variant="interactive" lineWidth={ 3 } on:click={ modal.open }>Хочу поступить</Link>
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
                <Button variant="blue" className="wide" on:click={ modal.open }>Хочу поступить</Button>
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
            <Step num={1} title="Узнайте о поступлении" color="blue">
                <p slot="first" class="no-margin"><a href="/docs/doc3.pdf" target="_BLANK">Правила приема</a></p>
                <svelte:fragment slot="second">
                    <p>Сроки подачи документов</p>
                    <p class="small">
                        Очная форма обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">20.06 - 08.08</span>
                        { :else }
                            <span class="blue-text">20.06 - 23.09</span>
                        { /if }
                    </p>
                    <p class="small">
                        Очно-заочная и заочная формы обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">20.06 - 08.08</span>
                        { :else }
                            <span class="blue-text">20.06 - 28.10</span>
                        { /if }
                    </p>
                </svelte:fragment>
            </Step>
            <Step num={2} title="Выберите образовательную программу" color="blue">
                <svelte:fragment slot="first">
                    <p>Каталог образовательных программ</p>
                    <p><a href="#programs" class="link blue-color">Смотреть программы</a></p>
                </svelte:fragment>
            </Step>
            <Step num={3} title="Подайте документы" color="red">
                <svelte:fragment slot="first">
                    <p>Подать документы онлайн через личный кабинет абитуриента</p>
                    <p><a href="https://priem.urfu.ru/#/" target="_BLANK" class="link blue-color">Регистрация</a></p>
                </svelte:fragment>
            </Step>
            <Step num={4} title="Пройдите вступительные испытания" color="blue">
                <p slot="first" class="no-margin">Период сдачи вступительных испытаний</p>
                <svelte:fragment slot="second">
                    <p class="small">
                        Очная форма обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">04.07 - 13.08</span>
                        { :else }
                            <span class="blue-text">04.07 - 13.08 и 22.08 - 24.09</span>
                        { /if }
                    </p>
                    <p class="small">
                        Очно-заочная и заочная формы обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">04.07 - 13.09 и 22.08 - 12.09</span>
                        { :else }
                            <span class="blue-text">04.07 - 13.08 и 22.08 - 29.10</span>
                        { /if }
                    </p>
                </svelte:fragment>
            </Step>
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
                                20.06 — 23.09
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
        <Button className="mobile-hide" href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
        <Button className="pc-hide wide" href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
    </div>
</section>
<section id="programs">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.75}>Образовательные программы</Heading>
        <div class="filters">
            <div class="left">
                <Filter label="Форма образования" name="educationMode" bind:group={ educationModes } type="checkbox" options={[ 'Очно', 'Очно-заочно', 'Заочно' ]} />
                <Filter label="Основа обучения" name="payMode" bind:group={ payModes } type="checkbox" options={[ 'Бюджет', 'Контракт' ]} />
                <Filter label="Язык освоения" name="language" bind:group={ languages } type="checkbox" options={[ 'Русский', 'Английский' ]} />
            </div>
            <div class="right">
                <Filter width={275} label="Сортировка" name="sort" bind:group={ selectedSort } type="radio" options={[ { title: 'По алфавиту А-Я', value: 'name' }, { title: 'По количеству мест', value: 'places' }, { title: 'По возрастанию цены', value: 'price' } ]} />
                <Input className="blue-placeholder" bind:value={ search } type="text" placeholder="Поиск по названию" lineWidth={ 0 } marginY={ 0 } />
            </div>
        </div>
        <br />
        <br />
        { #if programsFiltered.length }
            <Grid l={3} m={2} s={1}>
                { #each programsFiltered as program, i (program.id) }
                    { #if i < 6 || programsExpanded }
                        <div transition:blur={{ duration: 200 }}>
                            <ProgramCard on:click={ () => openProgram(i) } { program } />
                        </div>
                        { #if programActive[i] }
                            <SideBar on:close={() => closeProgram(i)} on:apply={() => {closeProgram(i); modal.open()}} bind:hidden={programOpened[i]} {...program} />
                        { /if }
                    { /if }
                { /each }
            </Grid>
            { #if !programsExpanded && programsFiltered.length > 6 }
                <br />
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="XL" on:click={() => programsExpanded = true} />
                </div>
            { /if }
        { :else }
            <Text>Не удалось найти образовательные программы по Вашему запросу. Попробуйте изменить запрос</Text>
        { /if }
    </div>
</section>
<section id="carousel">
    <div class="content">
        <Grid m={3} s={1}>
            <div>
                <Heading size={1} marginTop={0} className="blue-text">Станьте ценным специалистом современной компании</Heading>
                <Button className="mobile-hide" on:click={ modal.open }>Получить консультацию</Button>
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
            <br class="pc-hide" />
            <br class="pc-hide" />
            <Button className="pc-hide wide" on:click={ modal.open }>Получить консультацию</Button>
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
            <h1 class="no-top-margin blue-text">Кем работают <br /> выпускники?</h1>
            <h3 class="no-top-margin">Выпускники нашей магистратуры смогут развиваться и работать в любом направлении, смежномразработкой и проектированием </h3>
        </Grid>
        <div class="pills">
            { #each professions as profession, i }
                { #if i < 4 || professionsExpanded }
                    <SelectButton variant={ activeSpeciality == i ? 'active' : 'default' } on:click={ () => activeSpeciality = i }>{ profession.title }</SelectButton>
                { /if }
            { /each }
            { #if professionsExpanded }
                <SelectButton variant="fill" color="blue" on:click={ () => professionsExpanded = !professionsExpanded }>Меньше</SelectButton>
            { :else }
                <SelectButton variant="fill" color="blue" on:click={ () => professionsExpanded = !professionsExpanded }>Больше</SelectButton>
            { /if }
        </div>
        <br />
        <br />
        { #each professions as profession, i }
            { #if activeSpeciality == i }
                <Profession on:linkClicked={ modal.open } {...profession} />
            { /if }
        { /each }
    </div>
</section>
<section id="feedbacks">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Отзывы выпускников</Heading>
        <Grid m={3} s={1} alignItems="start" className="mobile-hide">
            <Grid m={1} alignItems="start">
                { #each feedbacks.filter((_, i) => i % 3 == 0) as feedback }
                    <Profile img={ feedback.img }>
                        <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                        <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                        <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                    </Profile>
                { /each }
            </Grid>
            <Grid m={1} alignItems="start">
                { #each feedbacks.filter((_, i) => i % 3 == 1) as feedback }
                    <Profile img={ feedback.img }>
                        <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                        <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                        <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                    </Profile>
                { /each }
            </Grid>
            <Grid m={1} alignItems="start">
                { #each feedbacks.filter((_, i) => i % 3 == 2) as feedback }
                    <Profile img={ feedback.img }>
                        <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                        <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                        <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                    </Profile>
                { /each }
            </Grid>
        </Grid>
        <div class="pc-hide">
            <Grid m={3} s={1} alignItems="start">
                { #each feedbacks as feedback, i }
                    { #if i < 3 || feedbacksExpanded }
                        <Profile img={ feedback.img }>
                            <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                            <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                            <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                        </Profile>
                    { /if }
                { /each }
            </Grid>
            { #if !feedbacksExpanded }
                <br />
                <div class="align-center">
                    <RoundButton size="L" on:click={ () => feedbacksExpanded = true } />
                </div>
            { /if }
        </div>
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