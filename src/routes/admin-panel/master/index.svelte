<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=master'))
        const resProfessions = await fetch(apiRoute('admin/profession/'))
        const resQuestions = await fetch(apiRoute('admin/question/?page=master'))
        const resFeaturesPromo = await fetch(apiRoute('admin/feature/?type=master'))
        const resInfo = await fetch(apiRoute('admin/textinfo/?page=master'))
        const resSpecialistFeatures = await fetch(apiRoute('admin/feature/?type=specialist'))

        const feedbacks = (await resFeedbacks.json()).feedbacks
        const professions = (await resProfessions.json()).professions
        const questions = (await resQuestions.json()).questions
        const featuresPromo = (await resFeaturesPromo.json()).features
        const info = (await resInfo.json()).info
        const specialistFeatures = (await resSpecialistFeatures.json()).features

        if (resFeedbacks.ok && resProfessions.ok && resQuestions.ok && resFeaturesPromo.ok && resInfo.ok && resSpecialistFeatures.ok) {
            return { props: { feedbacks, professions, questions, featuresPromo, pageInfo: info, specialistFeatures } }
        }
    }
</script>
<script lang="ts">
    import { Form, Grid, Modal, Benefit, RoundButton, Profile, FileSelect, TipTap, Switch } from '$components'
    import { range } from '$lib/utilities'
    import { slide, blur } from 'svelte/transition'
    import { isMobile } from '$lib/stores.js'
    import type { FeatureI, FeedbackI, ProfessionI, QuestionI, ModalComponent } from '../../../types'

    export let pageInfo: Record<string, string> = {}
    const calendar = pageInfo['masterCalendar'] ? JSON.parse(pageInfo['masterCalendar']) : null
    export let feedbacks: FeedbackI[] = []
    export let professions: ProfessionI[] = []
    export let questions: QuestionI[] = []
    export let featuresPromo: FeatureI[] = []
    export let specialistFeatures: FeatureI[] = []

    const totalMobileObjects = 4

    let isFormContract = false

    let featuresPromoExpanded = false
    let questionsExpanded = false
    let professionsExpanded = false
    let feedbacksExpanded = false
    let specialistFeaturesExpanded = false

    let questionModal: ModalComponent = null
    let professionModal: ModalComponent = null

    let modalFeature: ModalComponent = null
    let featureId:number

    let modalFeatureSpec: ModalComponent = null
    let featureSpecId:number

    let modalFeedback: ModalComponent = null
    let feedbackId:number

    let feedbackImageModal: ModalComponent = null
    let feedbackImageId: number = null
    let feedbackImagePath: string = null


    let duties = 1
    const addDuty = () => duties++
    const removeDuty = () => duties--

    let questionId: number
    let professonId: number

    const updateQuestionId = (id: number) => {
        questionId = id
        questionModal.open()
    }

    const updateProfessionId = (id: number) => {
        professonId = id
        professionModal.open()
    }

    const updateFeatureId = (id: number) => {
        featureId = id
        modalFeature.open()
    }

    const updateFeatureSpecId = (id: number) => {
        featureSpecId = id
        modalFeatureSpec.open()
    }

    const updateFeedbackId = (id: number) => {
        feedbackId = id
        modalFeedback.open()
    }

    const feedbackImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        feedbackImageId = event.detail.id
        feedbackImagePath = event.detail.path
    }

    const resetFiles = () => {
        feedbackImageId = null
        feedbackImagePath = null
    }

    const removeQuestion = async () => {
        const res = await fetch(apiRoute(`admin/question/${questionId}`), { method: 'DELETE' })
        if (res.ok) {
            questions = questions.filter(question => question.id !== questionId)
        }
        questionModal.close()
    }

    const removeProfession = async () => {
        const res = await fetch(apiRoute(`admin/profession/${professonId}`), { method: 'DELETE' })
        if (res.ok) {
            professions = professions.filter(profession => profession.id !== professonId)
        }
        professionModal.close()
    }

    const deleteFeaturePromo = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featureId}`), { method: 'DELETE' })
        if (res.ok) {
            featuresPromo = featuresPromo.filter(feature => feature.id !== featureId)
        }
        modalFeature.close()
    }
    const deleteFeatureSpec = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featureSpecId}`), { method: 'DELETE' })
        if (res.ok) {
            specialistFeatures = specialistFeatures.filter(feature => feature.id !== featureSpecId)
        }
        modalFeatureSpec.close()
    }

    const deleteFeedback = async () => {
        const res = await fetch(apiRoute(`admin/feedback/${feedbackId}`), { method: 'DELETE' })
        if (res.ok) {
            feedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId)
        }
        modalFeedback.close()
    }

    const showNewFeaturePromo = (event: CustomEvent<{ message: string, feature: FeatureI }>) => {
        const newFeature = event.detail.feature
        featuresPromo = [ ...featuresPromo, newFeature ]
    }

    const showNewFeatureSpec = (event: CustomEvent<{ message: string, feature: FeatureI }>) => {
        const newFeature = event.detail.feature
        specialistFeatures = [ ...specialistFeatures, newFeature ]
    }

    const showNewProfession = (event: CustomEvent<{ message: string, profession: ProfessionI }>) => {
        const newProfession = event.detail.profession
        professions = [ ...professions, newProfession ]
    }

    const showNewFeedback = (event: CustomEvent<{ message: string, feedback: FeedbackI }>) => {
        const newFeedback = event.detail.feedback
        feedbacks = [ ...feedbacks, newFeedback ]
        resetFiles()
    }

    const showNewQuestion = (event: CustomEvent<{ message: string, question: QuestionI }>) => {
        const newQuestion = event.detail.question
        questions = [ ...questions, newQuestion ]
    }

    let calendarSubmitted = false
    let calendarSuccess = false
    let calendarError = false
    let calendarErrorMessage = ''
    let calendarJson = {}

    const isFilledIn = (value: File | string) => !!value

    const removeInvalidClass = (e: Event) => {
        const target = e.target as HTMLFormElement
        const input = document.getElementsByName(target.name)[0]
        input.classList.remove('is-invalid')
    }

    const calendarSubmit = async (e: Event) => {
        const formData = new FormData(e.target as HTMLFormElement)
        const formDataJson = Object.fromEntries(formData.entries())

        let notFilledInputs = 0

        for ( let field of formData ) {
            const [key, value] = field
            const input = document.getElementsByName(key)[0]

            if (!isFilledIn(value)) {
                input.classList.add('is-invalid')
                notFilledInputs++
            } else {
                input.classList.remove('is-invalid')
            }
        }
    
        calendarError = notFilledInputs > 0
        calendarErrorMessage = 'Необходимо заполнить поля для всех форм обучения'

        if (!calendarError) {
            calendarJson = {
                textMain: formDataJson.textMain,
                textDescription: formDataJson.textDescription,
                budget: {
                    fullTime: {
                        documents: !isFormContract ? formDataJson.budgetDocumentsFullTime : calendar?.budget.fullTime.documents || '',
                        tests: !isFormContract ? formDataJson.budgetTestsFullTime : calendar?.budget.fullTime.tests || '',
                        completion: {
                            target: !isFormContract ? formDataJson.budgetCompletionFullTimeTarget : calendar?.budget.fullTime.completion.target || '',
                            main: !isFormContract ? formDataJson.budgetCompletionFullTimeMain : calendar?.budget.fullTime.completion.main || ''
                        },
                        orders: {
                            target: !isFormContract ? formDataJson.budgetOrdersFullTimeTarget : calendar?.budget.fullTime.orders.target || '',
                            main: !isFormContract ? formDataJson.budgetOrdersFullTimeMain : calendar?.budget.fullTime.orders.main || ''
                        }
                    },
                    partTime: {
                        documents: !isFormContract ? formDataJson.budgetDocumentsPartTime : calendar?.budget.partTime.documents || '',
                        tests: !isFormContract ? formDataJson.budgetTestsPartTime : calendar?.budget.partTime.tests || '',
                        completion: {
                            target: !isFormContract ? formDataJson.budgetCompletionPartTimeTarget : calendar?.budget.partTime.completion.target || '',
                            main: !isFormContract ? formDataJson.budgetCompletionPartTimeMain : calendar?.budget.partTime.completion.main || ''
                        },
                        orders: {
                            target: !isFormContract ? formDataJson.budgetOrdersPartTimeTarget : calendar?.budget.partTime.orders.target || '',
                            main: !isFormContract ? formDataJson.budgetOrdersPartTimeMain : calendar?.budget.partTime.orders.main || ''
                        }
                    }
                },
                contract: {
                    fullTime: {
                        documents: !isFormContract ? calendar?.contract.fullTime.documents || '' : formDataJson.contractDocumentsFullTime,
                        tests: !isFormContract ? calendar?.contract.fullTime.tests || '' : formDataJson.contractTestsFullTime,
                        completion: !isFormContract ? calendar?.contract.fullTime.completion || '' : formDataJson.contractCompletionFullTime,
                        orders: !isFormContract ? calendar?.contract.fullTime.orders || '' : formDataJson.contractOrdersFullTime
                    },
                    partTime: {
                        documents: !isFormContract ? calendar?.contract.partTime.documents || '' : formDataJson.contractDocumentsPartTime,
                        tests: !isFormContract ? calendar?.contract.partTime.tests || '' : formDataJson.contractTestsPartTime,
                        completion: !isFormContract ? calendar?.contract.partTime.completion || '' : formDataJson.contractCompletionPartTime,
                        orders: !isFormContract ? calendar?.contract.partTime.orders || '' : formDataJson.contractOrdersPartTime
                    }
                }
            }
    
            const res = await fetch(apiRoute('admin/textinfo/?page=master'), {
                method: 'PATCH',
                body: new URLSearchParams({ masterCalendar: JSON.stringify(calendarJson) }),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
            })

            if (res.ok === true) {
                calendarSubmitted = true
                calendarSuccess = true
            }
            else if (res.ok === false) {
                calendarSubmitted = true
                calendarSuccess = false
            }
        }
    }
    
    const handleForm = (event: CustomEvent) => {
        isFormContract = event.detail.state
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ feedbackImageModal } on:save={ feedbackImageSelected } />

<Modal bind:this={ questionModal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот ответ на вопрос?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeQuestion} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={questionModal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ professionModal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту профессию?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeProfession} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={questionModal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeature } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeaturePromo} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeature.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeatureSpec } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeatureSpec} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeatureSpec.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeedback } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот отзыв?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeedback} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeedback.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы магистратуры</h2>
        <h3>Информация в промо-блоке</h3>
        <Form action="/api/admin/textinfo?page=master" method="PATCH" reset={ false }>
            <div class="grid grid-2 m-grid-1">
                <div class="grid grid-1">
                    <label>
                        <span class="caption">Заголовок:</span><br />
                        <input required class="form-control" type="text" name="masterTitle" value={ pageInfo.masterTitle || '' }>
                    </label>
                    <label>
                        <span class="caption">Подзаголовок:</span><br />
                        <input required class="form-control" type="text" name="masterSubtitle" value={ pageInfo.masterSubtitle || '' }>
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Сопровождающий текст:</span>
                        <textarea class="form-control" name="masterText" value={ pageInfo.masterText || '' }></textarea>
                    </label>
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Перечисления</h3>
        <Form action="/api/admin/feature?type=master" method="POST" on:success={ showNewFeaturePromo }>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Заголовок:</span><br />
                    <input required class="form-control" type="text" name="title">
                </label>
                <label>
                    <span class="caption">Подпись:</span><br />
                    <input required class="form-control" type="text" name="description">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные перечисления</h3>
        {#if featuresPromo.length}
            <Grid l={3} m={2} s={1}>
                {#each featuresPromo.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || featuresPromoExpanded) as feature, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-body">
                            <Benefit num={feature.title} caption={feature.description} />
                            <br />
                            <a href="/admin-panel/master/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateFeatureId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !featuresPromoExpanded && featuresPromo.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => featuresPromoExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет перечислений</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Календарь приёма</h3>
        <Form method="PATCH" action="/api/admin/textinfo?page=master" reset={ false }>
            <Grid m={2} s={1}>
                <div>
                    <span>Основной текстовый блок</span>
                    <TipTap name="masterCalendarTextMain" content={pageInfo.masterCalendarTextMain || ''} />
                </div>
                <div>
                    <span>Текстовый блок вступительных испытаний</span>
                    <TipTap name="masterCalendarTextDescription" content={pageInfo.masterCalendarTextDescription || ''} />
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
        <br />
        <form on:submit|preventDefault={calendarSubmit}>
            <Switch left="Бюджет" right="Контракт" on:change={handleForm} />
            <br />
            <div class="accordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Очная форма обучения ({!isFormContract ? 'Бюджет' : 'Контракт'})
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <Grid m={4} s={1}>
                                <div>
                                    <h4>Приём документов</h4>
                                    <div>
                                        <span class="documents">Период:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control" type="text" name="budgetDocumentsFullTime" value={calendar?.budget.fullTime.documents || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control" type="text" name="contractDocumentsFullTime" value={calendar?.contract.fullTime.documents || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Вступительные испытания</h4>
                                    <div>
                                        <span class="documents">Период:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control" type="text" name="budgetTestsFullTime" value={calendar?.budget.fullTime.tests || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control" type="text" name="contractTestsFullTime" value={calendar?.contract.fullTime.tests || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Завершение приёма</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="completion">На целевые места:</span><br />
                                            <input class="form-control" type="text" name="budgetCompletionFullTimeTarget" value={calendar?.budget.fullTime.completion.target || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="completion">Общий конкурс:</span><br />
                                            <input class="form-control" type="text" name="budgetCompletionFullTimeMain" value={calendar?.budget.fullTime.completion.main || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {:else}
                                        <label>
                                            <span class="completion">Период:</span><br />
                                            <textarea class="form-control" type="text" name="contractCompletionFullTime" value={calendar?.contract.fullTime.completion || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {/if}
                                </div>
                                <div>
                                    <h4>Приказы о зачислении</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="orders">На целевые места:</span><br />
                                            <input class="form-control" type="text" name="budgetOrdersFullTimeTarget" value={calendar?.budget.fullTime.orders.target || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="orders">Общий конкурс:</span><br />
                                            <input class="form-control" type="text" name="budgetOrdersFullTimeMain" value={calendar?.budget.fullTime.orders.main || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {:else}
                                        <label>
                                            <span class="orders">Период:</span><br />
                                            <textarea class="form-control" type="text" name="contractOrdersFullTime" value={calendar?.contract.fullTime.orders || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {/if}
                                </div>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                          Очно-заочная и заочная формы обучения ({!isFormContract ? 'Бюджет' : 'Контракт'})
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                            <Grid m={4} s={1}>
                                <div>
                                    <h4>Приём документов</h4>
                                    <div>
                                        <span class="documents">Период:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control" type="text" name="budgetDocumentsPartTime" value={calendar?.budget.partTime.documents || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control" type="text" name="contractDocumentsPartTime" value={calendar?.contract.partTime.documents || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Вступительные испытания</h4>
                                    <div>
                                        <span class="documents">Период:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control" type="text" name="budgetTestsPartTime" value={calendar?.budget.partTime.tests || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control" type="text" name="contractTestsPartTime" value={calendar?.contract.partTime.tests || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Завершение приёма</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="completion">На целевые места:</span><br />
                                            <input class="form-control" type="text" name="budgetCompletionPartTimeTarget" value={calendar?.budget.partTime.completion.target || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="completion">Общий конкурс:</span><br />
                                            <input class="form-control" type="text" name="budgetCompletionPartTimeMain" value={calendar?.budget.partTime.completion.main || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {:else}
                                        <label>
                                            <span class="completion">Период:</span><br />
                                            <textarea class="form-control" type="text" name="contractCompletionPartTime" value={calendar?.contract.partTime.completion || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {/if}
                                </div>
                                <div>
                                    <h4>Приказы о зачислении</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="orders">На целевые места:</span><br />
                                            <input class="form-control" type="text" name="budgetOrdersPartTimeTarget" value={calendar?.budget.partTime.orders.target || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="orders">Общий конкурс:</span><br />
                                            <input class="form-control" type="text" name="budgetOrdersPartTimeMain" value={calendar?.budget.partTime.orders.main || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {:else}
                                        <label>
                                            <span class="orders">Период:</span><br />
                                            <textarea class="form-control" type="text" name="contractOrdersPartTime" value={calendar?.contract.partTime.orders || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {/if}
                                </div>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            {#if calendarSubmitted}
                <div class="alerts mt-4" transition:blur|local={{ duration: 200 }}>
                    { #if calendarSuccess }
                        <div transition:blur|local={{ duration: 200 }} class="alert alert-success mb-0" role="alert">
                            Данные успешно обновлены
                        </div>
                    { :else }
                        <div transition:blur|local={{ duration: 200 }} class="alert alert-danger mb-0" role="alert">
                            Произошла ошибка
                        </div>
                    {/if}
                </div>
            {/if}
            {#if calendarError}
                <div class="alerts mt-4" transition:blur|local={{ duration: 200 }}>
                    <div transition:blur|local={{ duration: 200 }} class="alert alert-danger mb-0" role="alert">
                        Произошла ошибка: {calendarErrorMessage}
                    </div>
                </div>
            {/if}
        </form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Профессии</h3>
        <Form action="/api/admin/profession" method="POST" reset={ true } on:success={ showNewProfession }>
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Название:</span><br />
                        <input class="form-control" type="text" name="title" id="title" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <textarea class="form-control no-margin" type="text" name="description" id="description" rows="4" required ></textarea>
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Минимальная заработная плата:</span><br />
                        <input class="form-control" type="number" name="minsalary" id="minsalary" required />
                    </label>
                </div>
                <div>
                    <span class="caption">Функции специалиста:</span>
                    <br />
                    { #each range(1, duties) as i }
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Функция</span>
                            <input type="text" name="duty{i}" class="form-control">
                        </div>
                        <br />
                    { /each }
                    { #if duties < 10 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-primary btn-sm" on:click={ addDuty }>Добавить функцию</button> 
                    { /if }
                    { #if duties > 1 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-danger btn-sm" on:click={ removeDuty }>Убрать функцию</button>
                    { /if }
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные профессии</h3>
        {#if professions.length}
            <Grid l={3} m={2} s={1}>
                {#each professions.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || professionsExpanded) as profession, i (i)}
                        <div class="card" transition:blur|local={{ duration: 200 }}>
                            <div class="card-body">
                                <h4 class="card-title">{ profession.title }</h4>
                                <p class="card-text">{ profession.description }</p>
                                <a href="/admin-panel/master/profession/update/{ profession.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateProfessionId(profession.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </div>
                        </div>
                {/each}
            </Grid>
            {#if !professionsExpanded && professions.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => professionsExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет профессий</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Информационный блок</h3>
        <Form method="PATCH" action="/api/admin/textinfo?page=master" reset={ false }>
            <label>
                <span class="heading">Заголовок:</span><br />
                <input class="form-control" type="text" name="specialistTitle" value={ pageInfo.specialistTitle || '' } required />
            </label>
            <br />
            <br />
            <Grid m={2} s={1}>
                <div>
                    <span>Навыки выпускников</span>
                    <TipTap name="specialistSkills" content={ pageInfo.specialistSkills || '' } />
                </div>
                <div>
                    <span>Возможности студентов</span>
                    <TipTap name="specialistOpportunities" content={ pageInfo.specialistOpportunities || '' } />
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
        <br />
        <h4 class="no-top-margin">Преимущества</h4>
        <Form action="/api/admin/feature?type=specialist" method="POST" on:success={ showNewFeatureSpec }>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Заголовок:</span><br />
                    <input required class="form-control" type="text" name="title">
                </label>
                <label>
                    <span class="caption">Подпись:</span><br />
                    <input required class="form-control" type="text" name="description">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h4>Опубликованные преимущества</h4>
        {#if specialistFeatures.length}
            <Grid l={3} m={2} s={1}>
                {#each specialistFeatures.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || specialistFeaturesExpanded) as feature, i (i)}
                        <div class="card" transition:blur|local={{ duration: 200 }}>
                            <div class="card-body">
                                <Benefit num={feature.title} caption={feature.description} />
                                <br />
                                <a href="/admin-panel/master/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateFeatureSpecId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </div>
                        </div>
                {/each}
            </Grid>
            {#if !specialistFeaturesExpanded && specialistFeatures.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => specialistFeaturesExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет преимуществ</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Отзывы</h3>
        <Form action="/api/admin/feedback/?page=master" method="POST" on:success={ showNewFeedback }>
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Добавить новое изображение:</span>
                        {#if feedbackImagePath}
                            <br />
                            <img width="150px" height="150px" src={feedbackImagePath} class="img-fluid mt-3" alt="Изображение">
                            <br />
                        {/if}
                        <input type="hidden" name="img" value={ feedbackImageId }><br />
                        {#if $isMobile}
                            <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                        {:else}
                            <button type="button" class="btn btn-outline-success" on:click={ feedbackImageModal.open }> { feedbackImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                        {/if}
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Текст отзыва:</span><br />
                        <textarea class="form-control" name="text" id="text" rows="4" required></textarea>
                    </label>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные отзывы</h3>
        {#if feedbacks.length}
            <Grid xl={3} l={2} m={1} s={1}>
                {#each feedbacks.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || feedbacksExpanded) as feedback, i (i)}
                    <div transition:blur|local={{ duration: 200 }}>
                        <Profile variant="grey" img={ feedback.img }>
                            <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                            <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                            <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            <svelte:fragment slot="buttons">
                                <a href="/admin-panel/master/feedback/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateFeedbackId(feedback.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </svelte:fragment>
                        </Profile>
                    </div>
                {/each}
            </Grid>
            {#if !feedbacksExpanded && feedbacks.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => feedbacksExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет отзывов</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Ответы на&nbsp;вопросы</h3>
        <Form method="POST" action="/api/admin/question/?page=master" on:success={ showNewQuestion }>
            <Grid m={1}>
                <label>
                    <span class="question">Вопрос:</span><br />
                    <input required class="form-control wide" type="text" name="question" />
                </label>
                <label>
                    <span class="answer">Ответ:</span><br />
                    <textarea required class="form-control wide" type="text" name="answer" />
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные ответы на вопросы</h3>
        {#if questions.length}
            <Grid l={3} m={2} s={1}>
                {#each questions.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || questionsExpanded) as question, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-body">
                            <h4 class="card-title">{ question.text }</h4><br />
                            <a href="/admin-panel/master/question/update/{ question.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateQuestionId(question.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !questionsExpanded && questions.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => questionsExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет созданных вопросов</p>
        {/if}
    </div>
</section>

<style>
    label {
        width: 100%;
    }

    textarea.form-control:not(.fixed-width), input.form-control:not(.fixed-width) {
        min-width: 0;
    }
</style>