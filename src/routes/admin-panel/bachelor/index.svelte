<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const resDocuments = await fetch(apiRoute('admin/documents?type=docBachelor'))
        const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=bachelor'))
        const resOpportunities = await fetch(apiRoute('admin/opportunity'))
        const resFeaturesPromo = await fetch(apiRoute('admin/feature/?type=bachelor'))
        const resFeaturesInst = await fetch(apiRoute('admin/feature/?type=instInfo'))
        const resInfo = await fetch(apiRoute('admin/textinfo/?page=bachelor'))
    
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
    import { Document, Grid, Form, Icon, Modal, Profile, Text, Benefit, RoundButton, FileSelect, TipTap } from '$components'
    import type { DocumentI, FeatureI, OpportunityI, FeedbackI, ModalComponent } from '../../../types'
    import { blur, slide } from 'svelte/transition'

    export let pageInfo: Record<string, string> = {}
    export let documents: DocumentI[] = []
    export let feedbacks: FeedbackI[] = []
    export let featuresPromo: FeatureI[] = []
    export let featuresInst: FeatureI[] = []
    export let opportunities: OpportunityI[] = []

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
            <Grid m={3}>
                {#each featuresPromo.filter((_, i) => i < 5 || featuresExpanded) as feature, i (i)}
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
            {#if !featuresExpanded && featuresPromo.length > 6}
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
            <Grid m={3}>
                {#each featuresInst.filter((_, i) => i < 5 || featuresExpanded) as feature, i (i)}
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
            {#if !featuresExpanded && featuresInst.length > 6}
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
            <br />
            <br />
            <label>
                <span class="caption">Описание:</span><br />
                <input class="form-control" type="text" name="description" id="description" />
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные возможности</h3>
        {#if opportunities.length}
            <Grid m={3} s={1}>
                {#each opportunities.filter((_, i) => i < 6 || opportunitiesExpanded) as opportunity, i (i)}
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
            {#if !opportunitiesExpanded && opportunities.length > 6}
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
        <Form action="/api/admin/feedback/?page=bachelor" method="POST" redirect="/admin-panel/bachelor">
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
                        <button type="button" class="btn btn-outline-success" on:click={ feedbackImageModal.open }> { feedbackImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
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
            <Grid m={3} s={1} alignItems="start">
                {#each feedbacks as feedback, i (i)}
                    {#if i < 6 || feedbacksExpanded}
                        <Profile variant="white" img={ feedback.img }>
                            <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                            <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                            <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            <svelte:fragment slot="buttons">
                                <a href="/admin-panel/bachelor/feedback/update/{ feedback.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateFeedbackId(feedback.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </svelte:fragment>
                        </Profile>
                    {/if}
                {/each}
            </Grid>
            {#if !feedbacksExpanded && feedbacks.length > 6}
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
                    <input required class="form-control" type="file" name="file" id="file" />
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
</style>
