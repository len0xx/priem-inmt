<script context="module" lang="ts">
    import { apiRoute } from '$lib/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch, session }) => {
        const resOpportunities = await fetch(apiRoute('admin/opportunity', session.api))
        // const resDocuments = await fetch(apiRoute('admin/documents?type=docBachelor'))
        // const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=bachelor'))
        // const resFeaturesPromo = await fetch(apiRoute('admin/feature/?type=bachelor'))
        // const resFeaturesInst = await fetch(apiRoute('admin/feature/?type=instInfo'))
        // const resInfo = await fetch(apiRoute('admin/textinfo/?page=bachelor'))
    
        // const documents = (await resDocuments.json()).documents
        // const feedbacks = (await resFeedbacks.json()).feedbacks
        const opportunities = (await resOpportunities.json()).opportunities
        // const featuresPromo = (await resFeaturesPromo.json()).features
        // const featuresInst = (await resFeaturesInst.json()).features
        // const info = (await resInfo.json()).info

        if (resOpportunities.ok) {
            return { props: { opportunities } }
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
        Header,
        SideBar,
        Benefit,
        Heading,
        Partner,
        Profile,
        Divider,
        AjaxForm,
        Carousel,
        Announce,
        Document,
        Preloader,
        Opportunity,
        RoundButton,
        ProgramCard,
        SelectButton,
        ScrollingPhoto,
    } from '$components'
    import { sortByName, sortByPlaces, sortByPrice } from '$lib/utilities'
    import programs, { type EducationMode, type Program } from '$lib/programs'
    import images from '$lib/images3'
    import partners from '$lib/partners'
    import documents from '$lib/documents'
    import { formEndpoint, modal, mobileMenu, commonHeaderState } from '$lib/stores'
    import { bachelor as feedbacks } from '$lib/feedback'
    import { blur, fly } from 'svelte/transition'
    import type { OpportunityI } from 'src/types'

    export let opportunities: OpportunityI[] = []

    let linkColor: 'white' | 'black' = 'white'
    let programsExpanded = false
    let showPreloader = true
    let calendarMode = true
    let pageLoaded = false
    let headerClass = ''
    let programActive: boolean[] = []
    let programOpened: boolean[] = []
    let educationModes: EducationMode[] = []
    let payModes: string[] = []
    let languages: string[] = []
    let exams: string[] = []
    let selectedSort = 'name'
    let search = ''
    let formSubmitted = false
    let formSuccess = false
    let feedbacksExpanded = false
    let mobileFiltersVisible = false
    let mobileSearchValue = ''
    let mobileSearchInput: HTMLInputElement

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
    
    const resetFormResults = () => {
        setTimeout(() => {
            formSubmitted = false
            formSuccess = false
        }, 10 * 1000)
    }

    const handleSuccess = () => {
        formSubmitted = true
        formSuccess = true
        resetFormResults()
    }

    const handleError = () => {
        formSubmitted = true
        formSuccess = false
        resetFormResults()
    }

    const applyFilters = (program: Program, selectedEducationModes: EducationMode[], selectedPayModes: string[], selectedLanguages: string[], selectedExams: string[], searchString: string): boolean => {
        const budgetPlaces = program.vacantSpots.reduce((acc: number, cur: string[]) => acc + +cur[0], 0)
        const paidPlaces = program.vacantSpots.reduce((acc: number, cur: string[]) => acc + +cur[1], 0)

        const degreeFilter = ['Бакалавриат', 'Специалитет'].includes(program.degree)
        const modeFilter = selectedEducationModes.length ? selectedEducationModes.filter(value => program.educationModes.includes(value)).length > 0 : true
        const languageFilter = selectedLanguages.length ? selectedLanguages.filter(value => program.languages.includes(value)).length > 0 : true
        const payFilter = selectedPayModes.length ? (selectedPayModes.includes('Бюджет') ? budgetPlaces > 0 : false) || (selectedPayModes.includes('Контракт') ? paidPlaces > 0 : false) : true
        const examsFilter = program.exams && selectedExams.length ? selectedExams.filter(value => program.exams.map(exam => exam.title).includes(value)).length > 0 : true
        const searchFilter = searchString ? program.title.toLowerCase().includes(searchString.toLowerCase()) : true

        return modeFilter && languageFilter && payFilter && examsFilter && degreeFilter && searchFilter
    }

    $: programsFiltered = programs.filter(
        program => applyFilters(program, educationModes, payModes, languages, exams, search)
    ).sort(
        (a, b) => {
            if (selectedSort == 'name') return sortByName(a, b)
            else if (selectedSort == 'places') return sortByPlaces(a, b)
            return sortByPrice(a, b)
        }
    )

    const resetFilters = () => {
        selectedSort = 'name'
        educationModes = []
        payModes = []
        languages = []
        exams = []
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
        setTimeout(() => {
            showPreloader = false
            headerClass = ''
        }, 250)
    })
</script>

<svelte:head>
    <title>Бакалавриат – Институт новых материалов и технологий</title>
    <meta property="og:image" content="https://inmt-priem.urfu.ru/img/snippet-bachelor.jpg" />
    <meta property="vk:image" content="https://inmt-priem.urfu.ru/img/snippet-bachelor.jpg" />
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
                    <Icon name="menu-icon-gray" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={() => $commonHeaderState = true }/>
                { :else }
                    <Icon name="menu-icon-white" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={() => $commonHeaderState = true }/>
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
                <Button variant="blue" className="wide" on:click={ $modal.open }>Хочу поступить</Button>
            </div>
        </Grid>
    </div>
</section>
<br />
<br />
<section id="benefits">
    <div class="content">
        <Grid l={4} m={2}>
            <Benefit num="1 128" caption="Бюджетных мест по программам бакалавриата и специалитета" />
            <Benefit num="123" caption="Контрактных мест по программам бакалавриата и специалитета" />
            <Benefit num="20 июня" caption="Начало приема документов в приемной комиссии УрФУ" />
        </Grid>
    </div>
</section>
<section id="programs">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.75}>
            { #if search }
                Поиск по запросу {search}
            { :else }
                Образовательные программы
            { /if }
        </Heading>
        <div class="filters mobile-hide">
            <div class="left">
                <Filter label="Форма образования" name="educationMode" bind:group={ educationModes } type="checkbox" options={[ 'Очно', 'Очно-заочно', 'Заочно' ]} />
                <Filter label="Основа обучения" name="payMode" bind:group={ payModes } type="checkbox" options={[ 'Бюджет', 'Контракт' ]} />
                <Filter label="Язык освоения" name="language" bind:group={ languages } type="checkbox" options={[ 'Русский', 'Английский' ]} />
                <Filter label="Экзамены" name="exams" bind:group={ exams } type="checkbox" options={[ 'Русский язык', 'Математика', 'Физика', 'Информатика и ИКТ', 'Химия', 'Творческое испытание' ]} />
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
                    <Filter hideOnBlur={false} label="Экзамены" name="exams" bind:group={ exams } type="checkbox" options={[ 'Русский язык', 'Математика', 'Физика', 'Информатика и ИКТ', 'Химия', 'Творческое испытание' ]} />
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
                        <div transition:blur={{ duration: 200 }}>
                            <ProgramCard on:click={ () => openProgram(i) } { program } />
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
<section id="algorithm">
    <div class="content">
        <Grid m={3} s={1} gap={3}>
            <div>
                <Heading size={1} className="blue-text" marginTop={0}>Алгоритм поступления</Heading>
                <Text className="heading-3">
                    Первый шаг к поступлению –<br />
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
            <Step num={1} textColor="white" title="Выбор направлений подготовки" color="white" fillPoints={true}>
                <svelte:fragment slot="first">
                    <Text marginTop={0}>Каталог образовательных программ</Text>
                    <Text><Link href="#programs" color="white" lineWidth={2} variant="interactive">Смотреть программы</Link></Text>
                </svelte:fragment>
            </Step>
            <Step num={2} textColor="white" title="Подача документов" color="red" fillPoints={true}>
                <svelte:fragment slot="first">
                    <Text marginTop={0}>Подайте документы любым удобным способом и предоставьте согласие о зачислении</Text>
                    <Text><Link href="https://priem.urfu.ru/#/" target="_BLANK" color="white" lineWidth={2} variant="interactive">Регистрация</Link></Text>
                </svelte:fragment>
            </Step>
            <Step num={3} textColor="white" title="Вступительные испытания" color="white" fillPoints={true}>
                <svelte:fragment slot="first">
                    <Text opacity={0.6} className="small" marginTop={0}>По результатам ЕГЭ:</Text>
                    <Text marginBottom={0}>Результаты ЕГЭ автоматически загружаются в конкурсные списки после подачи документов. </Text>
                </svelte:fragment>
                <svelte:fragment slot="second">
                    <Text opacity={0.6} className="small" marginTop={0}>По вступительным испытаниям:</Text>
                    <Text>Прохождение вступительных испытаний предусмотрено Правилами приема для отдельных категорий поступающих*</Text>
                    <Text marginBottom={0}><Link href="#calendar" color="white" lineWidth={2} variant="interactive">Расписание экзаменов</Link></Text>
                </svelte:fragment>
            </Step>
            <Step num={4} textColor="white" title="Зачисление" color="white" fillPoints={true}>
                <svelte:fragment slot="first">
                    <Text marginTop={0}>Для абитуриентов, поступающих на контрактную форму, необходимо заключить договор и оплатить первый семестр</Text>
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
        <Button className="mobile-hide" href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
        <Button className="pc-hide wide" href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
    </div>
</section>
<br />
<br />
<Announce image="/img/image26.jpg">
    <svelte:fragment slot="first">
        <Heading size={1} marginTop={0} marginBottom={0.5}>Вступительные испытания</Heading>
        <div id="Z1mn"><Text className="heading-3">для поступающих на базе среднего профессионального образования</Text></div>
    </svelte:fragment>
    <svelte:fragment slot="second">
        <Text>Выпускники колледжей и техникумов имеют возможность поступить на очную или заочную формы обучения по программам бакалавриата и специалитета на бюджетной или контрактной основе</Text>
        <Divider className="mobile-hide" height={2} color="white" marginY={1.5} />
        <Text opacity={0.4}>Ознакомиться с перечнем вступительных испытаний для абитуриентов на базе среднего профессионального образования для поступления в УрФУ в 2022 году можно в документе</Text>
        <Link color="white" lineWidth={ 2 } variant="interactive" target="_BLANK" href="https://urfu.ru/ru/applicant/docs-abiturient/demo-exams/">Демо-варианты</Link> <br /><br /><br />
        <Button className="mobile-hide" on:click={ $modal.open }>Получить консультацию</Button>
        <Button className="pc-hide wide" on:click={ $modal.open }>Получить консультацию</Button>
    </svelte:fragment>
</Announce>
<br />
<br />
<section id="student-life">
    <div class="content">
        <Grid m={2} s={1} gap={2}>
            <div class="s75wp"><Heading size={1} className="blue-text" marginTop={0}>Получите фундаментальное инженерное образование</Heading></div>
            <Text className="heading-3" marginTop={0}>Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
            <div class="s75wp">
                <Text className="heading-3" marginTop={0}>Институт новых материалов и технологий:</Text>
                <ul>
                    <li>Осуществляет обучение по образовательным программам высшего образования в области материаловедения, металлургии, машиностроения, строительной индустрии</li>
                    <li>Осуществляет фундаментальные и прикладные научные исследования</li>
                    <li>Выполняет научно-исследовательские работы по заказу предприятий</li>
                </ul>
            </div>
            <Grid m={2} s={1} className="mobile-hide">
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
                { #each opportunities as opportunity (opportunity.id) }
                    <Opportunity {...opportunity} />
                { /each }
                <!-- <div class="align-center" style:min-width="200px">
                    <Icon name="blue-star" width={40} height={40} alt="star" />
                    <Text className="semi-bold subtitle">Общежитие</Text>
                    <Text className="semi-bold small" opacity={0.6}>Иногородние студенты, обучающиеся по очной форме, могут получить место в общежитии на время обучения</Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <Icon name="blue-star" width={40} height={40} alt="star" />
                    <Text className="semi-bold subtitle">Военная кафедра</Text>
                    <Text className="semi-bold small" opacity={0.6}>Студенты могут пройти обучение на офицеров и сержантов запаса во время получения основной специальности в ИНМТ </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <Icon name="blue-star" width={40} height={40} alt="star" />
                    <Text className="semi-bold subtitle">Студенческие организации</Text>
                    <Text className="semi-bold small" opacity={0.6}>Найти занятие по душе сможет каждый. Более 30 организаций и клубов по интересам доступны студентам вуза </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <Icon name="blue-star" width={40} height={40} alt="star" />
                    <Text className="semi-bold subtitle">Стипендии</Text>
                    <Text className="semi-bold small" opacity={0.6}>Дополнительная поддержка талантливых студентов за научную, общественную и творческую деятельность </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <Icon name="blue-star" width={40} height={40} alt="star" />
                    <Text className="semi-bold subtitle">Наука</Text>
                    <Text className="semi-bold small" opacity={0.6}>Современные лаборатории и опытные профессора помогут начать успешную карьеру в науке </Text>
                </div>
                <div class="align-center" style:min-width="200px">
                    <Icon name="blue-star" width={40} height={40} alt="star" />
                    <Text className="semi-bold subtitle">Спорт</Text>
                    <Text className="semi-bold small" opacity={0.6}>Привычные занятия физкультурой можно заменить любимым видом спорта и присоединиться к одной из 20 сборных команд вуза</Text>
                </div> -->
            </Grid>
        </div>
    </div>
    <br />
    <br />
    <ScrollingPhoto src="/img/pano.jpg" />
    <br />
    <br />
    <br />
</section>
<section id="consult" class="blue-block">
    <div class="content">
        <Grid m={2} s={1} alignItems="start">
            <Heading size={1} marginTop={0}>Получите консультацию <br /> по поступлению</Heading>
            <Text className="heading-3" opacity={0.4} marginTop={0}>
                Вы узнаете особенности направлений подготовки
                и образовательных программ, проходные баллы
                и познакомитесь с перечнем изучаемых дисциплин
            </Text>
        </Grid>
        <AjaxForm action={ $formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false }>
            <Grid m={4} s={2} xs={1}>
                <Input className="white" type="text" name="fio" placeholder="ФИО" wide />
                <Input className="white" type="email" name="email" placeholder="Email" wide />
                <Input className="white" type="tel" name="phone" mask={ phoneMask } placeholder="Телефон" wide />
                <Input className="white" type="text" name="message" placeholder="Сообщение" wide />
            </Grid>
            <br />
            <Grid m={2} s={1} alignItems="center">
                <div id="zv61">
                    <label for="agreement5" class="checkbox-wrapper align-left white-text">
                        <Input type="checkbox" name="agreement" id="agreement5" required={ true } />
                        <span class="fourty-text">Нажимая кнопку «Получить консультацию», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
                    </label>
                </div>
                <br class="pc-hide" />
                <div class="align-right">
                    <Button className="mobile-hide">Получить консультацию</Button>
                    <Button className="pc-hide wide">Получить консультацию</Button>
                </div>
            </Grid>
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
        <br />
        <br />
    </div>
</section>
<section id="feedbacks">
    <div class="content">
        <Heading size={1} className="blue-text">Отзывы выпускников</Heading>
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
