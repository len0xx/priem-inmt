<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities.js'
    
    export const load: Load = async ({ fetch }) => {
        const resGraduates = await fetch(apiRoute('admin/graduate'))
        const graduates = (await resGraduates.json()).graduates

        const resPartners = await fetch(apiRoute('admin/partner'))
        const partners = (await resPartners.json()).partners

        const resCarouselAbout = await fetch(apiRoute('admin/carousel/?name=about'))
        const carouselAboutImages = (await resCarouselAbout.json()).images

        const resCarouselLife = await fetch(apiRoute('admin/carousel/?name=life'))
        const carouselLifeImages = (await resCarouselLife.json()).images

        const resFeatures = await fetch(apiRoute('admin/feature/?type=main'))
        const features = (await resFeatures.json()).features

        const resPosts = await fetch(apiRoute('admin/post'))
        const posts = (await resPosts.json()).posts

        const resVideos = await fetch(apiRoute('admin/documents?type=video'))
        const videos = (await resVideos.json()).documents

        const resInfo = await fetch(apiRoute('admin/textinfo/?page=main'))
        const info = (await resInfo.json()).info

        if (resGraduates.ok && resPartners.ok && resCarouselAbout.ok && resCarouselLife.ok && resFeatures.ok && resPosts.ok && resVideos.ok && resInfo.ok) {
            return { props: { graduates, partners, carouselAboutImages, carouselLifeImages, features, posts, videos, info } }
        }
    }
</script>

<script lang="ts">
    import { Grid, Graduate, Benefit, Modal, Form, RoundButton, FileSelect, VideoCard } from '$components'
    import { slide, blur } from 'svelte/transition'
    import { range } from '$lib/utilities.js'
    import { isMobile } from '$lib/stores.js'
    import type { GraduateI, PartnerI, PostI, CarouselI, ModalComponent, FeatureI, DocumentI } from '../../../types'

    export let posts: PostI[]

    export let graduates: GraduateI[] = []
    export let partners: PartnerI[] = []
    export let carouselAboutImages: CarouselI[] = []
    export let carouselLifeImages: CarouselI[] = []
    export let features: FeatureI[] = []
    export let videos: DocumentI[] = []
    export let info: Record<string, string> = {}

    const totalMobileObjects = 4

    let graduateImageModal: ModalComponent = null
    let graduateImageId: number = null
    let graduateImagePath: string = null

    let partnerImageModal: ModalComponent = null
    let partnerImageId: number = null
    let partnerImagePath: string = null

    let carouselAboutImageModal: ModalComponent = null
    let carouselAboutImageId: number = null
    let carouselAboutImagePath: string = null

    let carouselLifeImageModal: ModalComponent = null
    let carouselLifeImageId: number = null
    let carouselLifeImagePath: string = null

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

    let graduatesExpanded = false
    let partnersExpanded = false
    let carouselAboutExpanded = false
    let carouselLifeExpanded = false
    let featuresExpanded = false
    let postsExpanded = false

    let postImageModal: ModalComponent = null
    let postImageId: number = null
    let postImagePath: string = null
    
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

    const postImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        postImageId = event.detail.id
        postImagePath = event.detail.path
    }

    const graduateImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        graduateImageId = event.detail.id
        graduateImagePath = event.detail.path
    }

    const partnerImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        partnerImageId = event.detail.id
        partnerImagePath = event.detail.path
    }

    const carouselAboutImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        carouselAboutImageId = event.detail.id
        carouselAboutImagePath = event.detail.path
    }

    const carouselLifeImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        carouselLifeImageId = event.detail.id
        carouselLifeImagePath = event.detail.path
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
            carouselAboutImages = carouselAboutImages.filter(image => image.id !== carouselId)
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

    const resetPostImages = () => {
        postImageId = null
        postImagePath = null
    }

    const resetPartnerImages = () => {
        partnerImageId = null
        partnerImagePath = null
    }

    const resetCarouselAboutImages = () => {
        carouselAboutImageId = null
        carouselAboutImagePath = null
    }

    const resetCarouselLifeImages = () => {
        carouselLifeImageId = null
        carouselLifeImagePath = null
    }

    const showNewPost = (event: CustomEvent<{ message: string, post: PostI }>) => {
        const newPost = event.detail.post
        posts = [ ...posts, newPost ]
        resetPostImages()
    }

    const showNewPartner = (event: CustomEvent<{ message: string, partner: PartnerI }>) => {
        const newPartner = event.detail.partner
        partners = [ ...partners, newPartner ]
        resetPartnerImages()
    }

    const showNewCarouselAboutImage = (event: CustomEvent<{ message: string, image: CarouselI }>) => {
        const newImage = event.detail.image
        carouselAboutImages = [ ...carouselAboutImages, newImage ]
        resetCarouselAboutImages()
    }

    const showNewCarouselLifeImage = (event: CustomEvent<{ message: string, image: CarouselI }>) => {
        const newImage = event.detail.image
        carouselLifeImages = [ ...carouselLifeImages, newImage ]
        resetCarouselLifeImages()
    }

    const showNewFeature = (event: CustomEvent<{ message: string, feature: FeatureI }>) => {
        const newFeature = event.detail.feature
        features = [ ...features, newFeature ]
    }

    const showNewGraduate = (event: CustomEvent<{ message: string, graduate: GraduateI }>) => {
        const newGraduate = event.detail.graduate
        graduates = [ ...graduates, newGraduate ]
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

<FileSelect bind:modal={ partnerImageModal } on:save={ partnerImageSelected } />

<FileSelect bind:modal={ carouselAboutImageModal } on:save={ carouselAboutImageSelected } />

<FileSelect bind:modal={ carouselLifeImageModal } on:save={ carouselLifeImageSelected } />

<FileSelect bind:modal={ postImageModal } on:save={ postImageSelected } />

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
                        {#if postImagePath}
                            <br />
                            <img width="150px" height="150px" src={postImagePath} class="img-fluid mt-3 mb-3" alt="Изображение">   
                        {/if}                 
                        <input type="hidden" name="img" value={ postImageId }><br />
                        {#if $isMobile}
                            <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                        {:else}
                            <button type="button" class="btn btn-outline-success" on:click={ postImageModal.open }> { postImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                        {/if}
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
                {#each posts.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || postsExpanded) as post, i (i)}
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
            {#if !postsExpanded && posts.length > ($isMobile ? totalMobileObjects : 6)}
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
        <h3 class="no-top-margin">Партнеры</h3>
        <Form action="/api/admin/partner" method="POST" on:success={ showNewPartner }>
            <label>
                <span class="caption">Добавить новый логотип партнёра:</span>
                {#if partnerImagePath}
                    <br />
                    <img width="150px" height="150px" src={partnerImagePath} class="img-fluid mt-3 mb-3" alt="Логотип партнера">
                    <br />
                {/if}
                <input type="hidden" name="logo" value={ partnerImageId }><br />
                {#if $isMobile}
                    <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                {:else}
                    <button type="button" class="btn btn-outline-success" on:click={ partnerImageModal.open }> { partnerImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                {/if}
            </label>
            <br />
            <br />
            <button class="btn btn-primary">Создать</button>
        </Form>
        <h3>Опубликованные партнеры</h3>
        {#if partners.length}
            <Grid xl={4} l={3} m={2} s={1}>
                {#each partners.filter((_, i) => i < ($isMobile ? totalMobileObjects : 8) || partnersExpanded) as partner, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-img medium-card-img contain-img" style:background-image="url({ partner.logo })"></div>
                        <div class="card-body">
                            <button type="button" class="btn btn-outline-danger" on:click={() => {partnerId = partner.id; partnerModal.open()} }>Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !partnersExpanded && partners.length > ($isMobile ? totalMobileObjects : 8)}
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
        <h3 class="no-top-margin">Об институте</h3>
        <Grid m={2} s={1} ratio="2:3">
            <Form action="/api/admin/carousel/?name=about" method="POST" on:success={ showNewCarouselAboutImage }>
                <label>
                    <span class="caption">Добавить новое изображение:</span>
                    {#if carouselAboutImagePath}
                        <br />
                        <img width="150px" height="150px" src={ carouselAboutImagePath } class="img-fluid mt-3" alt="Изображение в карусели">
                        <br />
                    {/if}
                    <input type="hidden" name="img" value={ carouselAboutImageId }><br />
                    {#if $isMobile}
                        <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                    {:else}
                        <button type="button" class="btn btn-outline-success" on:click={ carouselAboutImageModal.open }> { carouselAboutImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    {/if}
                </label>
                <br />
                <br />
                <button class="btn btn-primary">Создать</button>
            </Form>
            <Form action="/api/admin/textinfo?page=main" method="PATCH" reset={false}>
                <label>
                    <span class="caption">Текст об институте:</span>
                    <textarea name="aboutInstituteText" class="form-control wide" rows="6">{ info.aboutInstituteText || '' }</textarea>
                </label>
                <br />
                <button class="btn btn-primary">Сохранить</button>
            </Form>
        </Grid>
        <h3>Опубликованные изображения:</h3>
        {#if carouselAboutImages.length}
            <Grid l={3} m={2} s={1}>
                {#each carouselAboutImages.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || carouselAboutExpanded) as image, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-img wide-card-img" style:background-image="url({ image.img })"></div>
                        <div class="card-body">
                            <button type="button" class="btn btn-outline-danger" on:click={() => {carouselId = image.id; carouselModal.open()} }>Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !carouselAboutExpanded && carouselAboutImages.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => carouselAboutExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет изображений в&nbsp;карусели</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Студенческая жизнь</h3>
        <Grid m={2} s={1} ratio="2:3">
            <Form action="/api/admin/carousel/?name=life" method="POST" on:success={ showNewCarouselLifeImage }>
                <label>
                    <span class="caption">Добавить новое изображение:</span>
                    {#if carouselLifeImagePath}
                        <br />
                        <img width="150px" height="150px" src={carouselLifeImagePath} class="img-fluid mt-3" alt="Изображение в карусели">
                        <br />
                    {/if}
                    <input type="hidden" name="img" value={ carouselLifeImageId }><br />
                    {#if $isMobile}
                        <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                    {:else}
                        <button type="button" class="btn btn-outline-success" on:click={ carouselLifeImageModal.open }> { carouselLifeImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    {/if}
                </label>
                <br />
                <br />
                <button class="btn btn-primary">Создать</button>
            </Form>
            <Form action="/api/admin/textinfo?page=main" method="PATCH" reset={false}>
                <label>
                    <span class="caption">Текст перед изображениями:</span>
                    <textarea name="studentLifeCaption" class="form-control wide" rows="6" required>{ info.studentLifeCaption || '' }</textarea>
                </label>
                <button class="btn btn-primary">Сохранить</button>
            </Form>
        </Grid>
        <h3>Опубликованные изображения:</h3>
        {#if carouselLifeImages.length}
            <Grid l={3} m={2} s={1}>
                {#each carouselLifeImages.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || carouselLifeExpanded) as image, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-img wide-card-img" style:background-image="url({ image.img })"></div>
                        <div class="card-body">
                            <button type="button" class="btn btn-outline-danger" on:click={() => {carouselId = image.id; carouselModal.open()} }>Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !carouselLifeExpanded && carouselLifeImages.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => carouselLifeExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет изображений в&nbsp;карусели</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Перечисления</h3>
        <Form action="/api/admin/feature?type=main" method="POST" on:success={ showNewFeature }>
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
            <Grid l={3} m={2} s={1}>
                {#each features.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || featuresExpanded) as feature, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
                        <div class="card-body">
                            <Benefit num={feature.title} caption={feature.description} />
                            <br />
                            <a href="/admin-panel/main/feature/update/{ feature.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateFeatureId(feature.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </div>
                    </div>
                {/each}
            </Grid>
            {#if !featuresExpanded && features.length > ($isMobile ? totalMobileObjects : 6)}
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
        <Form action="/api/admin/graduate" method="POST" on:success={ showNewGraduate }>
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
                    {#if $isMobile}
                        <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                    {:else}
                        <button type="button" class="btn btn-outline-success" on:click={ graduateImageModal.open }> { graduateImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    {/if}
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
            <Grid l={3} m={2} s={1}>
                {#each graduates.filter((_, i) => i < ($isMobile ? totalMobileObjects : 6) || graduatesExpanded) as graduate, i (i)}
                    <div transition:blur|local={{ duration: 200 }}>
                        <Graduate name={ graduate.name } src={ graduate.photo } caption={ graduate.description }>
                            <a href="/admin-panel/main/graduate/update/{ graduate.id }" class="btn btn-outline-primary btn-sm">Редактировать</a>
                            <button type="button" on:click={() => updateGraduateId(graduate.id)} class="btn btn-outline-danger btn-sm">Удалить</button>
                        </Graduate>
                    </div>
                {/each}
            </Grid>
            {#if !graduatesExpanded && graduates.length > ($isMobile ? totalMobileObjects : 6)}
                <br />
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={() => graduatesExpanded = true} />
                </div>
            {/if}
        {:else}
            <p class="mt-3">Здесь еще нет известных выпускников</p>
        {/if}
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Видеозаписи</h3>
        <Grid m={2} s={1} ratio="3:2">
            <Form action="/api/admin/video?type=video" method="POST" content="multipart/form-data" on:success={ showNewVideo }>
                <Grid m={1}>
                    <label class="wide">
                        <span class="form-label">Название видеозаписи</span>
                        <input type="text" class="form-control wide" placeholder="Название" name="title" required />
                    </label>
                    <Grid m={2}>
                        <label>
                            <span class="caption">Видеозапись</span><br />
                            <input required class="form-control" type="file" name="video" id="video" />
                        </label>
                    </Grid>
                </Grid>
                <br />
                <p class="text-muted">
                    Максимальный объем видеозаписи должен составлять не более 800 Мб
                    <br />
                    Допустимые форматы: MP4, WEBM, OGG, AVI, MOV, MPEG, MKV
                </p>
                <div class="buttons-row">
                    {#if videos.length > 3}
                        <button class="btn btn-primary" disabled>Отправить</button>
                        <p class="text-muted mt-3">На данный момент загружено максимальное количество видеозаписей – 4. Для того, чтобы загрузить новое видео, необходимо удалить одно из существующих</p>
                    {:else}
                        <button class="btn btn-primary">Отправить</button>
                    {/if}
                </div>
            </Form>
            <Form action="/api/admin/textinfo?page=main" method="PATCH" reset={false}>
                <label>
                    <span class="caption">Текст под заголовком:</span>
                    <textarea name="videoText" class="form-control wide" rows="6" required>{ info.videoText || '' }</textarea>
                </label>
                <button class="btn btn-primary">Сохранить</button>
            </Form>
        </Grid>
        <h3>Опубликованные видеозаписи</h3>
        {#if videos.length}
            <Grid s={1} m={2} l={3} xl={4}>
                {#each videos as video, i (i)}
                    <div class="card" transition:blur|local={{ duration: 200 }}>
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
