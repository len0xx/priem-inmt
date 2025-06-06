<script context="module" lang="ts">
    import { apiRoute } from '$lib/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch }) => {
        const resQuestions = await fetch(apiRoute('admin/question/?page=master'))
        const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=master'))
        const resFeaturesPromo = await fetch(apiRoute('admin/feature/?type=master'))
        const resFeaturesInst = await fetch(apiRoute('admin/feature/?type=instInfo'))
        const resInfo = await fetch(apiRoute('admin/textinfo/?page=master'))
        const resPrograms = await fetch(apiRoute('admin/programs?degree=master'))
        const resProfessions = await fetch(apiRoute('admin/profession'))
    
        const feedbacks = (await resFeedbacks.json()).feedbacks
        const questions = (await resQuestions.json()).questions
        const featuresPromo = (await resFeaturesPromo.json()).features
        const featuresInst = (await resFeaturesInst.json()).features
        const info = (await resInfo.json()).info
        const programs = (await resPrograms.json()).programs
        const professions = (await resProfessions.json()).professions

        if (resPrograms.ok && resInfo.ok && resFeaturesPromo.ok && resQuestions.ok && resFeedbacks.ok && resFeaturesInst.ok && resProfessions.ok) {
            return { props: { programs, feedbacks, questions, featuresInst, pageInfo: info, featuresPromo, professions } }
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import {
        Nav,
        Grid,
        Step,
        Link,
        Text,
        Input,
        Icon,
        Button,
        Filter,
        Switch,
        Header,
        SideBar,
        Heading,
        Partner,
        Profile,
        Benefit,
        Carousel,
        Preloader,
        Profession,
        Expandable,
        RoundButton,
        ProgramCardNew,
        SelectButton
    } from '$components'
    import { sortByName, sortByPlaces, sortByPrice } from '$lib/utilities'
    import images from '$lib/images3'
    import partners from '$lib/partners'
    import { modal, mobileMenu, commonHeaderState } from '$lib/stores'
    import { blur, fly } from 'svelte/transition'
    import type { EducationMode } from '$lib/programs'
    import type { EducationalProgram, IFeature, IFeedback, IProfession, IQuestion } from '../types'

    export let programs: EducationalProgram[] = []
    export let featuresPromo: IFeature[] = []
    export let questions: IQuestion[] = []
    export let professions: IProfession[] = []
    export let feedbacks: IFeedback[] = []
    export let pageInfo: Record<string, string> = {}

    let programsExpanded = false
    let professionsExpanded = false
    let showPreloader = true
    let pageLoaded = false
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
    let feedbacksExpanded = false
    let linkColor: 'white' | 'black' = 'white'
    let mobileFiltersVisible = false
    let mobileSearchValue = ''
    let mobileSearchInput: HTMLInputElement

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
    
    const modeToText = {
        partTime: 'Заочно',
        partFullTime: 'Очно-заочно',
        fullTime: 'Очно'
    }

    const applyFilters = (program: EducationalProgram, selectedEducationModes: EducationMode[], selectedPayModes: string[], selectedLanguages: string[], searchString: string): boolean => {
        let budgetPlaces = 0
        let paidPlaces = 0

        for (const value of Object.values(program.educationModes)) {
            budgetPlaces += value.vacantSpots.budget
            paidPlaces += value.vacantSpots.contract
        }

        const modeFilter = selectedEducationModes.length ? selectedEducationModes.filter(value => Object.keys(program.educationModes).map(key => modeToText[key]).includes(value)).length > 0 : true
        const languageFilter = selectedLanguages.length ? selectedLanguages.filter(value => Object.values(program.educationModes).map(val => val.languages).join(', ').includes(value)).length > 0 : true
        const payFilter = selectedPayModes.length ? (selectedPayModes.includes('Бюджет') ? budgetPlaces > 0 : false) || (selectedPayModes.includes('Контракт') ? paidPlaces > 0 : false) : true
        const searchFilter = searchString ? program.title.toLowerCase().includes(searchString.toLowerCase()) : true

        return modeFilter && languageFilter && payFilter && searchFilter
    }

    $: programsFiltered = programs.filter(program => applyFilters(program, educationModes, payModes, languages, search)).sort((a, b) => {
        if (selectedSort == 'name') return sortByName(a, b)
        else if (selectedSort == 'places') return sortByPlaces(a, b)
        return sortByPrice(a, b)
    })

    const resetFilters = () => {
        selectedSort = 'name'
        educationModes = []
        payModes = []
        languages = []
        search = ''
        mobileSearchValue = ''
    }

    const getSearchResults = () => {
        search = mobileSearchValue
        mobileFiltersVisible = false
    }

    const openFilters = (focusOnInput: boolean) => {
        mobileFiltersVisible = true
        if (focusOnInput) {
            setTimeout(() => mobileSearchInput.focus(), 100)
        }
    }

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
            <Nav className="mobile-hide">
                <Link color={ linkColor } lineWidth={ 3 } href="#enroll" variant="hover">Как поступить</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#calendar" variant="hover">Календарь приема</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#programs" variant="hover">Программы</Link>
            </Nav>
            <div class="mobile-hide align-right">
                <Button variant={ headerClass == 'header-scrolled' ? 'primary' : 'blue' } href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
            </div>
            <div class="pc-hide align-right">
                <Icon name="menu-icon-gray-fill" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ $mobileMenu.open }/>
            </div>
        </div>
    </div>
</Header>
<section class="promo master" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>
                { pageInfo.masterTitle }<br />
                <span class="smaller-text">{ pageInfo.masterSubtitle }</span>
            </Heading>
            <div>
                <Text className="medium" id="mnz2">
                    { pageInfo.masterText }<br /><br />
                    <Link href="#programs" variant="interactive" color="white" lineWidth={ 2 }>Смотреть программы</Link>
                </Text>
            </div>
            <div class="pc-hide">
                <Button variant="blue" className="wide" on:click={ $modal.open }>Хочу поступить</Button>
            </div>
        </Grid>
    </div>
</section>
<br />
<section id="benefits">
    <div class="content">
        <Grid m={4} s={2}>
            { #each featuresPromo as feature (feature.id) }
                <Benefit num={feature.title} caption={feature.description} />
            { /each }
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
                            <span class="blue-text">20.06 - 19.09</span>
                        { /if }
                    </p>
                    <p class="small">
                        Очно-заочная и заочная формы обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">20.06 - 29.08</span>
                        { :else }
                            <span class="blue-text">20.06 - 24.10</span>
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
                            <span class="blue-text">01.07 - 10.08</span>
                        { :else }
                            <span class="blue-text">01.07 - 10.08 и 19.08 - 25.09</span>
                        { /if }
                    </p>
                    <p class="small">
                        Очно-заочная и заочная формы обучения:<br />
                        { #if budgetMode }
                            <span class="blue-text">01.07 - 10.08 и 19.08 - 31.08</span>
                        { :else }
                            <span class="blue-text">01.07 - 10.08 и 19.08 - 29.10</span>
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
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">{ calendarMode ? 'Завершение приема оригиналов документов об образовании' : 'Завершение приема заявлений о согласии на зачисление' }</Text></div> 
                    <div class="kit-table-cell-head"><Text className="blue-text subtitle">Приказы о зачислении</Text></div> 
                </Grid>
                <Grid m={5}>
                    <div class="kit-table-cell"><Text className="subtitle">Очная форма <br /> обучения</Text></div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                20.06 — 08.08
                            { :else }
                                20.06 — 19.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                01.07 — 10.08
                            { :else }
                                01.07 — 10.08 <br />
                                19.08 — 25.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                13.08 в 17:00 (время местное)<br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                15.08 в 17:00 (время местное)
                            { :else }
                                26.09
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                14.08 <br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                16.08
                            { :else }
                                01.07 — 27.09
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
                                20.06 — 29.08
                            { :else }
                                20.06 — 24.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                01.07 — 10.08 <br />
                                19.08 — 31.08
                            { :else }
                                01.07 — 10.08 <br />
                                19.08 — 29.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                03.09 в 17:00 (время местное) <br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                05.09 в 17:00 (время местное)
                            { :else }
                                30.10
                            { /if }
                        </Text>
                    </div> 
                    <div class="kit-table-cell">
                        <Text>
                            { #if calendarMode }
                                <Text className="small" opacity={0.6} marginY={0.25}>На целевые места:</Text>
                                04.09<br />
                                <Text className="small" opacity={0.6} marginY={0.25}>Общий конкурс:</Text>
                                06.09
                            { :else }
                                01.07 — 31.10
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
        <div class="filters mobile-hide">
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
        <div class="filters filters-mobile pc-hide">
            <div class="filters-mobile__actions">
                <Link href="" className="filters-mobile__title" preventDefault={true} on:click={() => openFilters(false)}>
                    Фильтры
                    <Icon name="filter-blue-plus-icon" slot="after" width={14} height={14}/>
                </Link>
                <Link href="" className="filters-mobile__search" preventDefault={true} on:click={() => openFilters(true)}>
                    Поиск
                </Link>
            </div>
            {#if mobileFiltersVisible}
                <div class="filters-mobile__content" transition:fly={{ x: 300, duration: 200 }}>
                    <div class="filters-mobile__head">
                        <Heading size={2} className="blue-text" marginTop={0} marginBottom={0}>Фильтры</Heading>
                        <div class="close-btn">
                            <Icon name="small-close-icon" width={36} height={36} alt="Кнопка закрытия окна" on:click={() => mobileFiltersVisible = false} />    
                        </div>
                    </div>
                    <div class="filters-mobile__form">
                        <Input className="content-search__input" bind:node={ mobileSearchInput } bind:value={ mobileSearchValue } type="text" placeholder="Поиск по названию" lineWidth={ 0 } marginY={ 0 } wide={true} />
                        <Link href="" className="filters-mobile__title" preventDefault={true} on:click={ getSearchResults }>
                            Поиск
                        </Link>
                    </div>
                    <Filter hideOnBlur={false} width={275} label="Сортировка" name="sort" bind:group={ selectedSort } type="radio" options={[ { title: 'По алфавиту А-Я', value: 'name' }, { title: 'По количеству мест', value: 'places' }, { title: 'По возрастанию цены', value: 'price' } ]} />
                    <Filter hideOnBlur={false} label="Форма образования" name="educationMode" bind:group={ educationModes } type="checkbox" options={[ 'Очно', 'Очно-заочно', 'Заочно' ]} />
                    <Filter hideOnBlur={false} label="Основа обучения" name="payMode" bind:group={ payModes } type="checkbox" options={[ 'Бюджет', 'Контракт' ]} />
                    <Filter hideOnBlur={false} label="Язык освоения" name="language" bind:group={ languages } type="checkbox" options={[ 'Русский', 'Английский' ]} />
                    <div class="filters-mobile__buttons">
                        <Button size="S" on:click={ resetFilters }>Сбросить</Button>
                        <Button size="S" variant="blue" on:click={ getSearchResults }>Показать</Button>
                    </div>
                </div>
            {/if}
        </div>
        <br />
        <br />
        { #if programsFiltered.length }
            <Grid l={3} m={2} s={1}>
                { #each programsFiltered as program, i (program.id) }
                    { #if i < 6 || programsExpanded }
                        <div transition:blur={{ duration: 200 }} class="grid">
                            <ProgramCardNew on:click={ () => openProgram(i) } { program } />
                        </div>
                        { #if programActive[i] }
                            <SideBar on:close={() => closeProgram(i)} on:apply={() => {closeProgram(i); $modal.open()}} bind:hidden={programOpened[i]} {...program} />
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
                <Button className="mobile-hide" on:click={ $modal.open }>Получить консультацию</Button>
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
            <Button className="pc-hide wide" on:click={ $modal.open }>Получить консультацию</Button>
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
            { #each professions as profession, i (profession.id) }
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
        { #each professions as profession, i (profession.id) }
            { #if activeSpeciality == i }
                <Profession on:linkClicked={ $modal.open } {...profession} />
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
                        <div transition:blur={{ duration: 200 }}>
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </div>
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
                { #each questions as question, i (question.id) }
                    { #if i < 4 || faqsExpanded }
                        <div transition:blur={{ duration: 200 }}>
                            <Expandable bind:active={faqs[i]} on:click={() => toggleExpandable(i)}>
                                <svelte:fragment slot="header">{ question.text }</svelte:fragment>
                                <svelte:fragment slot="text">{ @html question.answer }</svelte:fragment>
                            </Expandable>
                        </div>
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