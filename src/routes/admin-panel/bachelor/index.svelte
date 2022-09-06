<script context="module" lang="ts">
    import { apiRoute } from '$lib/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = async ({ fetch, session }) => {
        const resDocuments = await fetch(apiRoute('admin/documents?type=docBachelor', session.api))
        const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=bachelor', session.api))
        const resOpportunities = await fetch(apiRoute('admin/opportunity', session.api))
        const resFeaturesPromo = await fetch(apiRoute('admin/feature/?type=bachelor', session.api))
        const resFeaturesInst = await fetch(apiRoute('admin/feature/?type=instInfo', session.api))
        const resInfo = await fetch(apiRoute('admin/textinfo/?page=bachelor', session.api))
    
        const documents = (await resDocuments.json()).documents
        const feedbacks = (await resFeedbacks.json()).feedbacks
        const opportunities = (await resOpportunities.json()).opportunities
        const featuresPromo = (await resFeaturesPromo.json()).features
        const featuresInst = (await resFeaturesInst.json()).features
        const info = (await resInfo.json()).info

        if (resDocuments.ok && resFeedbacks.ok && resFeaturesPromo.ok && resFeaturesInst.ok && resOpportunities.ok && resInfo.ok) {
            return { props: { documents, feedbacks, featuresPromo, featuresInst, opportunities, pageInfo: info } }
        }
    }
</script>

<script lang="ts">
    import { Document, Grid, Form, Icon, Modal, Profile, Text, Benefit, RoundButton, FileSelect, TipTap, Switch } from '$components'
    import { blur, slide } from 'svelte/transition'
    import { isMobile } from '$lib/stores.js'
    import type { DocumentI, FeatureI, OpportunityI, FeedbackI, ModalComponent } from '../../../types'

    export let pageInfo: Record<string, string> = {}
    
    const calendar = pageInfo['bachelorCalendar'] ? JSON.parse(pageInfo['bachelorCalendar']) : null
    export let documents: DocumentI[] = []
    export let feedbacks: FeedbackI[] = []
    export let featuresPromo: FeatureI[] = []
    export let featuresInst: FeatureI[] = []
    export let opportunities: OpportunityI[] = []

    const totalMobileObjects = 4

    let isFormContract = false

    let modalDocument: ModalComponent = null
    let documentId: number
    
    let modalFeaturePromo: ModalComponent = null
    let featurePromoId:number

    let modalFeatureInst: ModalComponent = null
    let featureInstId:number

    let modalOpportunity: ModalComponent = null
    let opportunityId:number

    let modalFeedback: ModalComponent = null
    let feedbackId:number

    let feedbackImageModal: ModalComponent = null
    let feedbackImageId: number = null
    let feedbackImagePath: string = null

    let featuresExpanded = false
    let opportunitiesExpanded = false
    let documentsExpanded = false
    let feedbacksExpanded = false

    const feedbackImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        feedbackImageId = event.detail.id
        feedbackImagePath = event.detail.path
    }

    const resetFiles = () => {
        feedbackImageId = null
        feedbackImagePath = null
    }

    const updateFeaturePromoId = (id: number) => {
        featurePromoId = id
        modalFeaturePromo.open()
    }

    const updateFeatureInstId = (id: number) => {
        featureInstId = id
        modalFeatureInst.open()
    }

    const updateOpportunityId = (id: number) => {
        opportunityId = id
        modalOpportunity.open()
    }

    const updateFeedbackId = (id: number) => {
        feedbackId = id
        modalFeedback.open()
    }

    const deleteDocument = async () => {
        const res = await fetch(apiRoute(`admin/documents/${documentId}`), { method: 'DELETE' })
        if (res.ok) {
            documents = documents.filter(doc => doc.id !== documentId)
        }
        modalDocument.close()
    }

    const deleteFeaturePromo = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featurePromoId}`), { method: 'DELETE' })
        if (res.ok) {
            featuresPromo = featuresPromo.filter(feature => feature.id !== featurePromoId)
        }
        modalFeaturePromo.close()
    }

    const deleteFeatureInst = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featureInstId}`), { method: 'DELETE' })
        if (res.ok) {
            featuresInst = featuresInst.filter(feature => feature.id !== featureInstId)
        }
        modalFeatureInst.close()
    }

    const deleteOpportunity = async () => {
        const res = await fetch(apiRoute(`admin/opportunity/${opportunityId}`), { method: 'DELETE' })
        if (res.ok) {
            opportunities = opportunities.filter(opportunity => opportunity.id !== opportunityId)
        }
        modalOpportunity.close()
    }

    const deleteFeedback = async () => {
        const res = await fetch(apiRoute(`admin/feedback/${feedbackId}`), { method: 'DELETE' })
        if (res.ok) {
            feedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId)
        }
        modalFeedback.close()
    }

    const showNewDocument = (event: CustomEvent<{ message: string, document: DocumentI }>) => {
        const newDoc = event.detail.document
        documents = [ ...documents, newDoc ]
    }

    const showNewFeaturePromo = (event: CustomEvent<{ message: string, feature: FeatureI }>) => {
        const newFeature = event.detail.feature
        featuresPromo = [ ...featuresPromo, newFeature ]
    }
    
    const showNewFeatureInst = (event: CustomEvent<{ message: string, feature: FeatureI }>) => {
        const newFeature = event.detail.feature
        featuresInst = [ ...featuresInst, newFeature ]
    }

    const showNewOpportunity = (event: CustomEvent<{ message: string, opportunity: OpportunityI }>) => {
        const newOpportunity = event.detail.opportunity
        opportunities = [ ...opportunities, newOpportunity ]
    }

    const showNewFeedback = (event: CustomEvent<{ message: string, feedback: FeedbackI }>) => {
        const newFeedback = event.detail.feedback
        feedbacks = [ ...feedbacks, newFeedback ]
        resetFiles()
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
                        documents: {
                            exams: !isFormContract ? formDataJson.budgetDocumentsFullTimeExams : calendar?.budget.fullTime.documents.exams || '',
                            tests: !isFormContract ? formDataJson.budgetDocumentsFullTimeTests : calendar?.budget.fullTime.documents.tests || ''
                        },
                        tests: {
                            computer: !isFormContract ? formDataJson.budgetTestsFullTimeComputer : calendar?.budget.fullTime.tests.computer || '',
                            professional: !isFormContract ? formDataJson.budgetTestsFullTimeProfessional : calendar?.budget.fullTime.tests.professional || ''
                        },
                        completion: {
                            priority: !isFormContract ? formDataJson.budgetCompletionFullTimePriority : calendar?.budget.fullTime.completion.priority || '',
                            main: !isFormContract ? formDataJson.budgetCompletionFullTimeMain : calendar?.budget.fullTime.completion.main || ''
                        },
                        orders: {
                            special: !isFormContract ? formDataJson.budgetOrdersFullTimeSpecial : calendar?.budget.fullTime.orders.special || '',
                            main: !isFormContract ? formDataJson.budgetOrdersFullTimeMain : calendar?.budget.fullTime.orders.main || ''
                        }
                    },
                    partTime: {
                        documents: !isFormContract ? formDataJson.budgetDocumentsPartTime : calendar?.budget.partTime.documents || '',
                        tests: !isFormContract ? formDataJson.budgetTestsPartTime : calendar?.budget.partTime.tests || '',
                        completion: {
                            priority: !isFormContract ? formDataJson.budgetCompletionPartTimePriority : calendar?.budget.partTime.completion.priority || '',
                            main: !isFormContract ? formDataJson.budgetCompletionPartTimeMain : calendar?.budget.partTime.completion.main || ''
                        },
                        orders: {
                            special: !isFormContract ? formDataJson.budgetOrdersPartTimeSpecial : calendar?.budget.partTime.orders.special || '',
                            main: !isFormContract ? formDataJson.budgetOrdersPartTimeMain : calendar?.budget.partTime.orders.main || ''
                        }
                    }
                },
                contract: {
                    fullTime: {
                        documents: {
                            exams: !isFormContract ? calendar?.contract.fullTime.documents.exams || '' : formDataJson.contractDocumentsFullTimeExams,
                            tests: !isFormContract ? calendar?.contract.fullTime.documents.tests || '' : formDataJson.contractDocumentsFullTimeTests,
                        },
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
    
            const res = await fetch(apiRoute('admin/textinfo/?page=bachelor'), {
                method: 'PATCH',
                body: new URLSearchParams({ bachelorCalendar: JSON.stringify(calendarJson) }),
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

<Modal bind:this={ modalDocument } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот документ?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteDocument} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalDocument.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeaturePromo } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeaturePromo} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeaturePromo.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeatureInst } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это преимущество?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeatureInst} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeatureInst.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalOpportunity } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту возможность?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteOpportunity} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalOpportunity.close} class="btn btn-secondary">Отмена</button>
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
        <h2 class="no-top-margin">Редактирование страницы бакалавриата</h2>
        <h3>Информация в промо-блоке</h3>
        <Form action="/api/admin/textinfo?page=bachelor" method="PATCH" reset={ false }>
            <div class="grid grid-2 m-grid-1">
                <div class="grid grid-1">
                    <label>
                        <span class="caption">Заголовок:</span><br />
                        <input required class="form-control" type="text" name="bachelorTitle" value={ pageInfo.bachelorTitle || '' }>
                    </label>
                    <label>
                        <span class="caption">Подзаголовок:</span><br />
                        <input required class="form-control" type="text" name="bachelorSubtitle" value={ pageInfo.bachelorSubtitle || '' }>
                    </label>
                </div>
                <div>
                    <label>
                        <span class="caption">Сопровождающий текст:</span>
                        <textarea class="form-control" name="bachelorText" value={ pageInfo.bachelorText || '' }></textarea>
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
        <Form action="/api/admin/feature?type=bachelor" method="POST" on:success={ showNewFeaturePromo }>
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
        { #if featuresPromo.length }
            <Grid l={3} m={2} s={1}>
                {#each featuresPromo.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || featuresExpanded) as feature, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-body">
                            <Benefit num={feature.title} caption={feature.description} />
                            <br />
                            <a href="/admin-panel/bachelor/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateFeaturePromoId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !featuresExpanded && featuresPromo.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => featuresExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет перечислений</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Календарь приёма</h3>
        <Form method="PATCH" action="/api/admin/textinfo?page=bachelor" reset={ false }>
            <Grid l={2} m={1}>
                <div>
                    <span>Основной текстовый блок</span>
                    <TipTap name="bachelorCalendarTextMain" content={pageInfo.bachelorCalendarTextMain || ''} />
                </div>
                <div>
                    <span>Текстовый блок вступительных испытаний</span>
                    <TipTap name="bachelorCalendarTextDescription" content={pageInfo.bachelorCalendarTextDescription || ''} />
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
                            <Grid l={4} m={2} s={1}>
                                <div>
                                    <h4>Приём документов</h4>
                                    <div>
                                        <span class="documents">По результатам ЕГЭ:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control mb-0" type="text" name="budgetDocumentsFullTimeExams" value={calendar?.budget.fullTime.documents.exams || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control mb-0" type="text" name="contractDocumentsFullTimeExams" value={calendar?.contract.fullTime.documents.exams || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                    <br />
                                    <div>
                                        <span class="documents">По вступительным испытаниям:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control mb-0" type="text" name="budgetDocumentsFullTimeTests" value={calendar?.budget.fullTime.documents.tests || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control mb-0" type="text" name="contractDocumentsFullTimeTests" value={calendar?.contract.fullTime.documents.tests || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Вступительные испытания</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="tests">В форме компьютерного тестирования:</span><br />
                                            <input class="form-control" type="text" name="budgetTestsFullTimeComputer" value={calendar?.budget.fullTime.tests.computer || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="tests">Экзамены творческой и профессиональной направленности:</span><br />
                                            <input class="form-control" type="text" name="budgetTestsFullTimeProfessional" value={calendar?.budget.fullTime.tests.professional || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {:else}
                                        <label>
                                            <span class="tests">Период:</span><br />
                                            <textarea class="form-control" type="text" name="contractTestsFullTime" value={calendar?.contract.fullTime.tests || ''} on:input={removeInvalidClass} />
                                        </label>
                                    {/if}
                                </div>
                                <div>
                                    <h4>Завершение приёма</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="completion">Этап приоритетного зачисления:</span><br />
                                            <input class="form-control" type="text" name="budgetCompletionFullTimePriority" value={calendar?.budget.fullTime.completion.priority || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="completion">Этап зачисления на основные конкурсные места:</span><br />
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
                                            <span class="orders">Особые права; без экзаменов; на целевые места:</span><br />
                                            <input class="form-control" type="text" name="budgetOrdersFullTimeSpecial" value={calendar?.budget.fullTime.orders.special || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="orders">Этап зачисления на основные конкурсные места:</span><br />
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
                            <Grid l={4} m={2} s={1}>
                                <div>
                                    <h4>Приём документов</h4>
                                    <div>
                                        <span class="documents">Период:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control mb-0" type="text" name="budgetDocumentsPartTime" value={calendar?.budget.partTime.documents || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control mb-0" type="text" name="contractDocumentsPartTime" value={calendar?.contract.partTime.documents || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Вступительные испытания</h4>
                                    <div>
                                        <span class="tests">Период:</span><br />
                                        {#if !isFormContract}
                                            <textarea class="form-control mb-0" type="text" name="budgetTestsPartTime" value={calendar?.budget.partTime.tests || ''} on:input={removeInvalidClass} />
                                        {:else}
                                            <textarea class="form-control mb-0" type="text" name="contractTestsPartTime" value={calendar?.contract.partTime.tests || ''} on:input={removeInvalidClass} />
                                        {/if}
                                    </div>
                                </div>
                                <div>
                                    <h4>Завершение приёма</h4>
                                    {#if !isFormContract}
                                        <label>
                                            <span class="completion">Этап приоритетного зачисления:</span><br />
                                            <input class="form-control" type="text" name="budgetCompletionPartTimePriority" value={calendar?.budget.partTime.completion.priority || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="completion">Этап зачисления на основные конкурсные места:</span><br />
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
                                            <span class="orders">Особые права; без экзаменов; на целевые места:</span><br />
                                            <input class="form-control" type="text" name="budgetOrdersPartTimeSpecial" value={calendar?.budget.partTime.orders.special || ''} on:input={removeInvalidClass} />
                                        </label>
                                        <br />
                                        <br />
                                        <label>
                                            <span class="orders">Этап зачисления на основные конкурсные места:</span><br />
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
                            Произошла ошибка при обновлении
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
    <!-- <div class="white-block-wide">
        <h3 class="no-top-margin">Алгоритм поступления</h3>
        <Form action="/api/admin/textinfo?page=bachelor" method="PATCH" reset={ false }>
            <div class="grid grid-2 m-grid-1">
                <span class="caption">Второй текстовый блок:</span><br />
                <TipTap name="algorithmSecond" />
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
    </div>
    <br /> -->
    <div class="white-block-wide">
        <h3 class="no-top-margin">Информация об&nbsp;институте</h3>
        <Form action="/api/admin/textinfo?page=bachelor" method="PATCH" reset={ false }>
            <div class="grid grid-1">
                <label>
                    <span class="caption">Заголовок:</span><br />
                    <input class="form-control" type="text" name="instInfoTitle" value={ pageInfo.instInfoTitle || '' } required />
                </label>
                <div>
                    <span class="caption">Текст справа:</span><br />
                    <TipTap name="instInfoText1" content={ pageInfo.instInfoText1 || '' } />
                </div>
                <div>
                    <span class="caption">Текст внизу:</span><br />
                    <TipTap name="instInfoText2" content={ pageInfo.instInfoText2 || '' } />
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
        <h3>Преимущества института</h3>
        <Form action="/api/admin/feature?type=instInfo" method="POST" on:success={ showNewFeatureInst }>
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
        <h3>Опубликованные преимущества</h3>
        { #if featuresInst.length }
            <Grid l={3} m={2} s={1}>
                {#each featuresInst.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || featuresExpanded) as feature, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-body">
                            <Benefit num={feature.title} caption={feature.description} />
                            <br />
                            <a href="/admin-panel/bachelor/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateFeatureInstId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !featuresExpanded && featuresInst.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => featuresExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет преимуществ</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Студенческие возможности</h3>
        <Form action="/api/admin/opportunity" method="POST" on:success={ showNewOpportunity }>
            <label>
                <span class="caption">Название:</span><br />
                <input class="form-control" type="text" name="title" id="title" required />
            </label>
            <br /><br />
            <label>
                <span class="caption">Описание:</span><br />
                <input class="form-control" type="text" name="description" id="description" />
            </label>
            <br /><br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные возможности</h3>
        {#if opportunities.length}
            <Grid l={3} m={2} s={1}>
                {#each opportunities.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || opportunitiesExpanded) as opportunity, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-body">
                            <div class="align-center" style:min-width="200px">
                                <Icon name="blue-star" width={40} height={40} alt="star" />
                                <Text className="semi-bold subtitle">{ opportunity.title }</Text>
                                <Text className="semi-bold small" opacity={0.6}>{ opportunity.description }</Text>
                            </div>
                            <br />
                            <a href="/admin-panel/bachelor/opportunity/update/{ opportunity.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateOpportunityId(opportunity.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !opportunitiesExpanded && opportunities.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => opportunitiesExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет возможностей</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Отзывы</h3>
        <Form action="/api/admin/feedback/?page=bachelor" method="POST" on:success={ showNewFeedback }>
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Автор:</span><br />
                        <input class="form-control" type="text" name="name" id="name" required />
                    </label>
                    <br /><br />
                    <label>
                        <span class="caption">Описание:</span><br />
                        <input class="form-control" type="text" name="description" id="description" />
                    </label>
                    <br /><br />
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
            <Grid l={3} m={2} s={1} alignItems="start">
                {#each feedbacks.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || feedbacksExpanded) as feedback, i (i)}
                    <div transition:blur|local={{ duration: 200 }}>
                        <Profile variant="grey" img={ feedback.img }>
                            <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                            <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                            <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            <svelte:fragment slot="buttons">
                                <a href="/admin-panel/bachelor/feedback/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
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
        <h3 class="no-top-margin">Загрузка документов</h3>
        <Form action="/api/admin/documents?type=docBachelor" method="POST" content="multipart/form-data" on:success={ showNewDocument }>
            <label class="wide">
                <span class="form-label">Название документа</span>
                <input type="text" class="form-control wide" placeholder="Название" name="title" required />
            </label>
            <br />
            <br />
            <Grid m={3}>
                <label>
                    <span class="caption">Документ</span><br />
                    <input required class="form-control" type="file" name="file" id="file" accept=".pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg, .png, .svg"/>
                </label>
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Отправить</button>
            </div>
        </Form>
        <h3>Загруженные документы</h3>
        {#if documents.length}
            {#each documents.filter((_, i) => i < 5 || documentsExpanded) as document, i (i)}
                { @const parts = document.src.split('.') }
                { @const extensionLength = parts.length }
                { @const extension = extensionLength > 1 ? parts[parts.length - 1] : '' }

                <div class="document-row" transition:slide|local={{ duration: 200 }}>
                    <Document filename={ document.title } { extension } link={ document.src } />
                    <button type="button" on:click={() => { documentId = document.id; modalDocument.open() } } class="btn btn-outline-danger btn-sm">Удалить</button>
                </div>
            {/each}
            {#if !documentsExpanded && documents.length > 5}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => documentsExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет документов</p>
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
