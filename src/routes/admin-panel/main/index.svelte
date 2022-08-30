<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities.js'
    
    export const load: Load = async ({ fetch }) => {
        const resGraduates = await fetch(apiRoute('admin/graduate'))
        const graduates = (await resGraduates.json()).graduates

        const resPartners = await fetch(apiRoute('admin/partner'))
        const partners = (await resPartners.json()).partners

        const resCarousel = await fetch(apiRoute('admin/carousel/?name=about'))
        const carouselImages = (await resCarousel.json()).images

        const resCarouselLife = await fetch(apiRoute('admin/carousel/?name=life'))
        const carouselLifeImages = (await resCarouselLife.json()).images

        const resFeatures = await fetch(apiRoute('admin/feature/?type=main'))
        const features = (await resFeatures.json()).features

        const resPosts = await fetch(apiRoute('admin/post'))
        const posts = (await resPosts.json()).posts

        const resVideos = await fetch(apiRoute('admin/documents?type=video'))
        const videos = (await resVideos.json()).documents

        if (resGraduates.ok && resPartners.ok && resCarousel.ok && resCarouselLife.ok && resFeatures.ok && resPosts.ok && resVideos.ok) {
            return { props: { graduates, partners, carouselImages, carouselLifeImages, features, posts, videos } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Graduate, Benefit, Modal, Form, RoundButton, FileSelect, VideoCard } from '$components'
    import { slide, blur } from 'svelte/transition'
    import { range } from '$lib/utilities.js'
    import type { GraduateI, PartnerI, PostI, CarouselI, ModalComponent, FeatureI, DocumentI } from '../../../types'

    export let posts: PostI[]

    export let graduates: GraduateI[] = []
    export let partners: PartnerI[] = []
    export let carouselImages: CarouselI[] = []
    export let carouselLifeImages: CarouselI[] = []
    export let features: FeatureI[] = []
    export let videos: DocumentI[] = []

    let graduateImageModal: ModalComponent = null
    let graduateImageId: number = null
    let graduateImagePath: string = null

    let partnersImageModal: ModalComponent = null
    let partnersImageId: number = null
    let partnersImagePath: string = null

    let carouselImageModal: ModalComponent = null
    let carouselImageId: number = null
    let carouselImagePath: string = null

    let partnerModal: ModalComponent = null
    let partnerId: number = null

    let carouselModal: ModalComponent = null
    let carouselId: number = null

    let modalFeature: ModalComponent = null
    let featureId:number

    let modalGraduate: ModalComponent = null
    let graduateId:number

    let modalVideo: ModalComponent = null
    let videoId:number

    let famousExpanded = false
    let partnersExpanded = false
    let carouselExpanded = false
    let carouselLifeExpanded = false
    let featuresExpanded = false
    let postsExpanded = false

    let fileModal: ModalComponent = null
    let fileId: number = null
    let filePath: string = null
    
    let links = 1
    let deleteId = 0
    let modal: ModalComponent = null

    const addLink = () => links++

    const removeLink = () => links--

    const deletePost = async (id: number) => {
        const res = await fetch(apiRoute(`admin/post/${id}`), { method: 'DELETE' })
        if (res.ok) {
            posts = posts.filter(post => post.id !== id)
        }
        modal.close()
    }

    const fileSelected = (event: CustomEvent<{id: number, path: string}>) => {
        fileId = event.detail.id
        filePath = event.detail.path
    }

    const graduateImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        graduateImageId = event.detail.id
        graduateImagePath = event.detail.path
    }

    const partnersImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        partnersImageId = event.detail.id
        partnersImagePath = event.detail.path
    }

    const carouselImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        carouselImageId = event.detail.id
        carouselImagePath = event.detail.path
    }

    const updateFeatureId = (id: number) => {
        featureId = id
        modalFeature.open()
    }

    const updateGraduateId = (id: number) => {
        graduateId = id
        modalGraduate.open()
    }

    const updateVideoId = (id: number) => {
        videoId = id
        modalVideo.open()
    }

    const removePartner = async () => {
        const res = await fetch(apiRoute(`admin/partner/${partnerId}`), { method: 'DELETE' })
        if (res.ok) {
            partners = partners.filter(partner => partner.id !== partnerId)
        }
        partnerModal.close()
    }

    const removeCarouselImage = async () => {
        const res = await fetch(apiRoute(`admin/carousel/${carouselId}`), { method: 'DELETE' })
        if (res.ok) {
            carouselImages = carouselImages.filter(image => image.id !== carouselId)
            carouselLifeImages = carouselLifeImages.filter(image => image.id !== carouselId)
        }
        carouselModal.close()
    }

    const deleteFeature = async () => {
        const res = await fetch(apiRoute(`admin/feature/${featureId}`), { method: 'DELETE' })
        if (res.ok) {
            features = features.filter(feature => feature.id !== featureId)
        }
        modalFeature.close()
    }

    const deleteGraduate = async () => {
        const res = await fetch(apiRoute(`admin/graduate/${graduateId}`), { method: 'DELETE' })
        if (res.ok) {
            graduates = graduates.filter(graduate => graduate.id !== graduateId)
        }
        modalGraduate.close()
    }

    const deleteVideo = async () => {
        const res = await fetch(apiRoute(`admin/video/${videoId}`), { method: 'DELETE' })
        if (res.ok) {
            videos = videos.filter(video => video.id !== videoId)
        }
        modalVideo.close()
    }

    const resetFiles = () => {
        fileId = null
        filePath = null
    }

    const showNewPost = (event: CustomEvent<{ message: string, post: PostI }>) => {
        const newPost = event.detail.post
        posts = [ ...posts, newPost ]
        resetFiles()
    }

    const showNewVideo = (event: CustomEvent<{ message: string, document: DocumentI }>) => {
        const newVideo = event.detail.document
        videos = [ ...videos, newVideo ]
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ graduateImageModal } on:save={ graduateImageSelected } />

<FileSelect bind:modal={ partnersImageModal } on:save={ partnersImageSelected } />

<FileSelect bind:modal={ carouselImageModal } on:save={ carouselImageSelected } />

<FileSelect bind:modal={ fileModal } on:save={ fileSelected } />

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту публикацию?</p>
    <div class="buttons-row">
        <button type="button" on:click={ () => deletePost(deleteId) } class="btn btn-danger">Удалить</button>
        <button type="button" on:click={ modal.close } class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ partnerModal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этот логотип партнёра?</p>
    <div class="buttons-row">
        <button type="button" on:click={removePartner} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={() => partnerModal.close()} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ carouselModal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это изображение в карусели?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeCarouselImage} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={() => carouselModal.close()} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalFeature } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это перечисление?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteFeature} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalFeature.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalGraduate } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить этого известного выпускника?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteGraduate} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalGraduate.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<Modal bind:this={ modalVideo } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить это видео?</p>
    <div class="buttons-row">
        <button type="button" on:click={deleteVideo} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modalVideo.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование главной страницы</h2>
        <h3>Основная информация о сайте</h3>
        <form action="/api/admin/info/main" method="POST">
            <label>
                <span class="caption">Заголовок в промо-блоке:</span><br />
                <input required class="form-control" type="text" name="title" id="title" placeholder="Заголовок" />
            </label>
            <br />
            <br />
            <label>
                <span class="caption">Сопровождающий текст:</span><br />
                <input required class="form-control" type="text" name="caption" id="caption" placeholder="Сопровождающий текст" />
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Публикации</h3>
        <Form action="/api/admin/post" method="POST" on:success={ showNewPost }>
            <div class="grid grid-2 m-grid-1">
                <div>
                    <label>
                        <span class="caption">Заголовок:</span><br />
                        <input class="form-control" type="text" name="title" id="title" />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Текст:</span><br />
                        <textarea class="form-control" name="text" cols="30" rows="4"></textarea>
                    </label>
                    <br />
                    <label>
                        <span class="caption">Изображение:</span>
                        {#if filePath}
                            <br />
                            <img width="150px" height="150px" src={filePath} class="img-fluid mt-3 mb-3" alt="Изображение">   
                        {/if}                 
                        <input type="hidden" name="img" value={ fileId }><br />
                        <button type="button" class="btn btn-outline-success" on:click={ fileModal.open }> { fileId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    </label>
                </div>
                <div id="vs2f">
                    { #each range(1, links) as i }
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Ссылка</span>
                            <input type="text" aria-label="Текст ссылки" name="link_text{ i }" placeholder="Текст ссылки" class="form-control">
                            <input type="text" aria-label="URL" name="link_url{ i }" placeholder="URL" class="form-control">
                        </div>
                        <br />
                    { /each }
                    { #if links < 5 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-primary" on:click={ addLink }>Добавить ссылку</button>
                    { /if }
                    { #if links > 1 }
                        <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-danger" on:click={ removeLink }>Убрать ссылку</button>
                    { /if }
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные публикации</h3>
        {#if posts.length}
            <Grid l={3} m={2} s={1}>
                {#each posts.filter((_, i) => i < 6 || postsExpanded) as post, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        {#if post.img}
                            <div class="card-img wide-card-img" style:background-image="url({ post.img })"></div>
                        {/if}
                        <div class="card-body">
                            <h4 class="card-title">{ post.title }</h4> 
                            <p class="card-text">{ post.text }</p>
                            <a href="/admin-panel/main/posts/update/{ post.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button class="btn btn-outline-danger btn-sm" on:click={ () => { deleteId = post.id; modal.open() } }>Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !postsExpanded && posts.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => postsExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет публикаций</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Информация о поступлении</h3>
        <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">Бюджет/Контракт</label>
        </div>
        <br />
        <form action="/api/admin/info/main" method="POST">
            <label>
                <span class="caption">Заголовок:</span><br />
                <input class="form-control" type="text" name="title" id="title" placeholder="Заголовок" />
            </label>
            <br />
            <h4>Сроки подачи документов</h4>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
            </div>
            <h4>Период сдачи вступительных испытаний</h4>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">Очная форма обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
                <label>
                    <span class="caption">Очно-заочная и заочная формы обучения:</span><br />
                    <input class="form-control" type="text" name="caption" id="caption"
                        placeholder="20.06 - 08.08" />
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Партнеры</h3>
        <Form action="/api/admin/partner" method="POST" redirect="/admin-panel/main">
            <label>
                <span class="caption">Добавить новый логотип партнёра:</span>
                {#if partnersImagePath}
                    <br />
                    <img width="150px" height="150px" src={partnersImagePath} class="img-fluid mt-3 mb-3" alt="Логотип партнера">
                    <br />
                {/if}
                <input type="hidden" name="logo" value={ partnersImageId }><br />
                <button type="button" class="btn btn-outline-success" on:click={ partnersImageModal.open }> { partnersImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные партнеры</h3>
        {#if partners.length}
            <Grid m={5}>
                {#each partners as partner, i (i)}
                    {#if i < 10 || partnersExpanded}
                        <div class="card">
                            <div class="card-img medium-card-img contain-img" style:background-image="url({ partner.logo })"></div>
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-danger" on:click={() => {partnerId = partner.id; partnerModal.open()} }>Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !partnersExpanded && partners.length > 10}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => partnersExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет партнеров института</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Изображения в карусели "Об институте"</h3>
        <Form action="/api/admin/carousel/?name=about" method="POST" redirect="/admin-panel/main">
            <Grid m={2}>
                <label>
                    <span class="caption">Добавить новое изображение:</span>
                    {#if carouselImagePath}
                        <br />
                        <img width="150px" height="150px" src={carouselImagePath} class="img-fluid mt-3" alt="Изображение в карусели">
                        <br />
                    {/if}
                    <input type="hidden" name="img" value={ carouselImageId }><br />
                    <button type="button" class="btn btn-outline-success" on:click={ carouselImageModal.open }> { carouselImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные изображения:</h3>
        {#if carouselImages.length}
            <Grid m={3}>
                {#each carouselImages as image, i (i)}
                    {#if i < 6 || carouselExpanded}
                        <div class="card">
                            <div class="card-img wide-card-img" style:background-image="url({ image.img })"></div>
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-danger" on:click={() => {carouselId = image.id; carouselModal.open()} }>Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !carouselExpanded && carouselImages.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => carouselExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет изображений в карусели</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Изображения в карусели "Студенческая жизнь"</h3>
        <Form action="/api/admin/carousel/?name=life" method="POST" redirect="/admin-panel/main">
            <Grid m={2}>
                <label>
                    <span class="caption">Добавить новое изображение:</span>
                    {#if carouselImagePath}
                        <br />
                        <img width="150px" height="150px" src={carouselImagePath} class="img-fluid mt-3" alt="Изображение в карусели">
                        <br />
                    {/if}
                    <input type="hidden" name="img" value={ carouselImageId }><br />
                    <button type="button" class="btn btn-outline-success" on:click={ carouselImageModal.open }> { carouselImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </label>
            </Grid>
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные изображения:</h3>
        {#if carouselLifeImages.length}
            <Grid m={3}>
                {#each carouselLifeImages as image, i (i)}
                    {#if i < 6 || carouselLifeExpanded}
                        <div class="card">
                            <div class="card-img wide-card-img" style:background-image="url({ image.img })"></div>
                            <div class="card-body">
                                <button type="button" class="btn btn-outline-danger" on:click={() => {carouselId = image.id; carouselModal.open()} }>Удалить</button>
                            </div>
                        </div>
                    {/if}
                {/each}
            </Grid>
            {#if !carouselLifeExpanded && carouselLifeImages.length > 6}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => carouselLifeExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет изображений в карусели</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Перечисления</h3>
        <Form action="/api/admin/feature?type=main" method="POST" redirect="/admin-panel/main">
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
                                <br />
                                <a href="/admin-panel/main/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
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
        <h3 class="no-top-margin">Известные выпускники</h3>
        <Form action="/api/admin/graduate" method="POST" redirect="/admin-panel/main">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">ФИО</span><br />
                    <input required class="form-control" type="text" name="name">
                </label>
                <label>
                    <span class="caption">Год выпуска</span><br />
                    <input required class="form-control" type="number" name="graduateYear">
                </label>
                <label>
                    <span class="caption">Описание</span><br />
                    <input required class="form-control" type="text" name="description">
                </label>
                <label>
                    <span class="caption">Фотография:</span>
                    <input type="hidden" name="photo" value={ graduateImageId }><br />
                    <button type="button" class="btn btn-outline-success" on:click={ graduateImageModal.open }> { graduateImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </label>
            </div>
            <br />
            {#if graduateImagePath}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={graduateImagePath} class="img-fluid mb-3" alt="Фотография известного выпускника"><br />   
            {/if}
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные известные выпускники</h3>
        {#if graduates.length}
            <Grid m={4}>
                {#each graduates as student, i (i)}
                    {#if i < 8 || famousExpanded}
                        <Graduate name={ student.name } src={ student.photo } caption={ student.description }>
                            <a href="/admin-panel/main/graduate/update/{ student.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateGraduateId(student.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </Graduate>
                    {/if}
                {/each}
            </Grid>
            {#if !famousExpanded && graduates.length > 8}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => famousExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет известных выпускников</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Видеозаписи</h3>
        <p class="text-muted">Максимальный объем видеозаписи должен составлять не более 800 Мб<br />Допустимые форматы: MP4, WEBM, OGG, AVI, MOV, MPEG, MKV</p>
        <Form action="/api/admin/video?type=video" method="POST" content="multipart/form-data" on:success={ showNewVideo }>
            <label class="wide">
                <span class="form-label">Название видеозаписи</span>
                <input type="text" class="form-control wide" placeholder="Название" name="title" required />
            </label>
            <br />
            <br />
            <Grid m={2}>
                <label>
                    <span class="caption">Видеозапись</span><br />
                    <input required class="form-control" type="file" name="video" id="video" />
                </label>
            </Grid>
            <div class="buttons-row">
                {#if videos.length > 3}
                    <button class="btn btn-primary" disabled>Отправить</button>
                    <p class="text-muted mt-3">На данный момент загружено максимальное количество видеозаписей – 4. Для того, чтобы загрузить новое видео, необходимо удалить одно из существующих</p>
                {:else}
                    <button class="btn btn-primary">Отправить</button>
                {/if}
            </div>
        </Form>
        <h3>Опубликованные видеозаписи</h3>
        {#if videos.length}
            <Grid m={4}>
                {#each videos as video, i (i)}
                    <div class="card">
                        <div class="card-body">
                            <VideoCard name={video.title} src={video.src} />
                            <button type="button" on:click={() => updateVideoId(video.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
        {:else}
            <p class="mt-3">Здесь еще нет загруженных видеозаписей</p>
        {/if}
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
