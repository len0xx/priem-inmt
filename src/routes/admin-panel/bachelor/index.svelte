<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const resDocuments = await fetch(apiRoute('admin/documents?type=docBachelor'))
        const resFeedbacks = await fetch(apiRoute('admin/feedback/?page=bachelor'))
        const resOpportunities = await fetch(apiRoute('admin/opportunity'))
        const resFeatures = await fetch(apiRoute('admin/feature/?page=bachelor'))
    
        const documents = (await resDocuments.json()).documents
        const feedbacks = (await resFeedbacks.json()).feedbacks
        const opportunities = (await resOpportunities.json()).opportunities
        const features = (await resFeatures.json()).features

        if (resDocuments.ok && resFeedbacks.ok && resFeatures.ok && resOpportunities.ok) {
            return { props: { documents, feedbacks, features, opportunities } }
        }
    }
</script>
<script lang="ts">
    import { Document, Grid, Form, Icon, Modal, Profile, Text, Benefit, RoundButton, FileSelect } from '$components'
    import type { DocumentI, FeatureI, OpportunityI, FeedbackI, ModalComponent } from '../../../types'
    import { slide } from 'svelte/transition'

    export let documents: DocumentI[] = []
    export let feedbacks: FeedbackI[] = []
    export let features: FeatureI[] = []
    export let opportunities: OpportunityI[] = []

    let modalDocument: ModalComponent = null
    let documentId: number
    
    let modalFeature: ModalComponent = null
    let featureId:number

    let modalOpportunity: ModalComponent = null
    let opportunityId:number

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

    const updateFeatureId = (id: number) => {
        featureId = id
        modalFeature.open()
    }

    const updateOpportunityId = (id: number) => {
        opportunityId = id
        modalOpportunity.open()
    }

    const deleteDocument = async () => {
        const res = await fetch(apiRoute(`admin/documents/${documentId}`), { method: 'DELETE' })
        if (res.ok) {
            documents = documents.filter(doc => doc.id !== documentId)
        }
        modalDocument.close()
    }

    const deleteFeature = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featureId}`), { method: 'DELETE' })
        if (res.ok) {
            features = features.filter(feature => feature.id !== featureId)
        }
        modalFeature.close()
    }

    const deleteOpportunity = async () => {
        const res = await fetch(apiRoute(`admin/opportunity/${opportunityId}`), { method: 'DELETE' })
        if (res.ok) {
            opportunities = opportunities.filter(opportunity => opportunity.id !== opportunityId)
        }
        modalOpportunity.close()
    }

    const handleSuccess = (event: CustomEvent<{ message: string, document: DocumentI }>) => {
        const doc = event.detail.document
        documents = [ ...documents, doc ]
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

<Modal bind:this={ modalFeature } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeature} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeature.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalOpportunity } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту возможность?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteOpportunity} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalOpportunity.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы бакалавриата</h2>
        <h3 class="no-top-margin">Перечисления</h3>
        <Form action="/api/admin/feature?page=bachelor" method="POST" redirect="/admin-panel/bachelor">
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
        {#if features.length}
            <Grid m={3}>
                {#each features as feature, i (i)}
                    {#if i < 6 || featuresExpanded}
                        <div class="card">
                            <div class="card-body">
                                <Benefit num={feature.title} caption={feature.description} />
                                <a href="/admin-panel/bachelor/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                                <button type="button" on:click={() => updateFeatureId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !featuresExpanded && features.length > 6}
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
        <h3 class="no-top-margin">Студенческие возможности</h3>
        <Form action="/api/admin/opportunity" method="POST" redirect="/admin-panel/bachelor">
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
            <Grid m={4} s={1}>
                {#each opportunities as opportunity, i (i)}
                    {#if i < 8 || opportunitiesExpanded}
                        <div class="card">
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
                    {/if}
                {/each}
            </Grid>
            {#if !opportunitiesExpanded && opportunities.length > 8}
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
            <Grid className="mt-5" m={3} s={1} alignItems="start">
                {#each feedbacks as feedback, i (i)}
                    {#if i < 6 || feedbacksExpanded}
                        <a href="/admin-panel/bachelor/feedback/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
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
        <Form action="/api/admin/documents?type=docBachelor" method="POST" content="multipart/form-data" on:success={ handleSuccess }>
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
            {#each documents as document, i (i)}
                {#if i < 5 || documentsExpanded}
                    { @const parts = document.src.split('.') }
                    { @const extensionLength = parts.length }
                    { @const extension = extensionLength > 1 ? parts[parts.length - 1] : '' }

                    <div class="document-row" transition:slide|local={{ duration: 200 }}>
                        <Document filename={ document.title } { extension } link={ document.src } />
                        <button type="button" on:click={() => { documentId = document.id; modalDocument.open() } } class="btn btn-outline-danger btn-sm">Удалить</button>
                    </div>
                {/if}
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
