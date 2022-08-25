<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const resContactInfo = await fetch(apiRoute('admin/info/contacts'))
        const resResponsibles = await fetch(apiRoute('admin/responsible'))

        const contactInfo = (await resContactInfo.json()).contactInfo
        const responsibles = (await resResponsibles.json()).responsibles

        if (resContactInfo.ok && resResponsibles.ok) {
            return { props: { contactInfo, responsibles } }
        }
    }
</script>

<script lang="ts">
    import { Form, Grid, Graduate, FileSelect, RoundButton } from '$components'
    import type { ContactInfoI, ResponsibleI, ModalComponent } from '../../../types'
    import { imask } from 'svelte-imask'
    import { slide, blur } from 'svelte/transition'
    import { range } from '$lib/utilities'

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    export let contactInfo: ContactInfoI = null
    export let responsibles: ResponsibleI[]

    let responsibleImageModal: ModalComponent = null
    let responsibleImageId: number = null
    let responsibleImagePath: string = null

    let responsiblesExpanded = false

    let links = contactInfo ? contactInfo.links.length : 1
    const addLink = () => links++
    const removeLink = () => links--
    

    const responsibleImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        responsibleImageId = event.detail.id
        responsibleImagePath = event.detail.path
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<FileSelect bind:modal={ responsibleImageModal } on:save={ responsibleImageSelected } />

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы контактов</h2>
        <h3>Контактные данные</h3>
        <Form
            action="/api/admin/info/contacts"
            method="POST"
            reset={false}
            redirect="/admin-panel/contacts"
        >
            <Grid m={2} s={1}>
                <div>
                    <label>
                        <span class="caption">Контактный номер телефона:</span><br />
                        <input class="form-control" type="tel" name="tel" id="tel" use:imask={phoneMask} placeholder="+7 (912) 635-52-97" value={ contactInfo?.tel || '' } />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Контактный адрес электронной почты:</span><br />
                        <input class="form-control" type="email" name="email" id="email"
                            placeholder="contact@urfu.ru" value={ contactInfo?.email || '' } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Адрес дирекции института:</span><br />
                        <input class="form-control" type="text" name="directorateAddress" id="directorateAddress"
                            placeholder="г. Екатеринбург, ул. Софьи Ковалевской, 5" value={ contactInfo?.directorateAddress || '' } required />
                    </label>
                    <br />
                    <br />
                    <label>
                        <span class="caption">Адрес приемной комиссии:</span><br />
                        <input class="form-control" type="text" name="admissionsAddress" id="admissionsAddress"
                            placeholder="г. Екатеринбург, ул. Мира, 19" value={ contactInfo?.admissionsAddress || '' } required />
                    </label>
                </div>
                <div id="vs2f">
                    { #each range(1, links) as i }
                        { @const link = contactInfo ? contactInfo.links[i - 1] : null}
                        <div class="input-group" transition:slide|local={{ duration: 200 }}>
                            <span class="input-group-text">Ссылка</span>
                            <input type="text" aria-label="Текст ссылки" name="link_text{ i }" placeholder="Текст ссылки" class="form-control" value={ link?.text || null }>
                            <input type="text" aria-label="URL" name="link_url{ i }" placeholder="URL" class="form-control" value={ link?.url || null }>
                        </div>
                        <br />
                    { /each }
                    <div class="buttons-row no-top-margin">
                        { #if links < 3 }
                            <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-primary btn-sm" on:click={ addLink }>Добавить ссылку</button>
                        { /if }
                        { #if links > 1 }
                            <button transition:blur|local={{ duration: 200 }} type="button" class="btn btn-outline-danger btn-sm" on:click={ removeLink }>Убрать ссылку</button>
                        { /if }
                    </div>
                </div>
            </Grid>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>
    </div>
    <br />
    <div class="white-block-wide">
        <h3 class="no-top-margin">Ответственные лица института</h3>
        { #if responsibles.length < 10 }
        <Form method="POST" action="/api/admin/responsible" reset={ true } redirect="/admin-panel/contacts">
            <Grid m={2}>
                <div>
                    <label for="name">ФИО ответственного лица</label><br />
                    <input class="form-control wide" type="text" name="name" required />
                </div>
                <div>
                    <label for="label">Подпись</label><br />
                    <input class="form-control wide" type="text" name="label" required />
                </div>
                <div>
                    <label for="phone">Номер телефона</label><br />
                    <input
                        class="form-control wide"
                        type="text" 
                        use:imask={ phoneMask }
                        name="phone" required 
                    />
                </div>
                <div>
                    <label for="email">Адрес электронной почты</label><br />
                    <input class="form-control wide" type="email" name="email" required />
                </div>
                <div>
                    <label for="img">Фотография:</label>
                    <input type="hidden" name="img" value={ responsibleImageId }><br />
                    <button type="button" class="btn btn-outline-primary" on:click={ responsibleImageModal.open }> { responsibleImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                </div>
            </Grid>
            <br />
            {#if responsibleImagePath}
                <p>Предпросмотр:</p>
                <img width="150px" height="150px" src={responsibleImagePath} class="img-fluid" alt="Фотография ответственного лица"><br />   
            {/if}
            <button class="btn btn-primary">Создать</button>
        </Form>
        { /if }
        <h4>Созданные ответственные лица</h4>
        {#if responsibles.length}
        <Grid m={4}>
            {#each responsibles as responsible, i (i)}
                {#if i < 8 || responsiblesExpanded}
                    <a href="/admin-panel/contacts/responsible/update/{ responsible.id }">
                        <Graduate name={ responsible.name } src={ responsible.img } caption={ responsible.label } />
                    </a>
                {/if}
            {/each}
        </Grid>
        {#if !responsiblesExpanded && responsibles.length > 8}
            <br />
            <div class="align-center">
                <RoundButton variant="plus" size="M" on:click={() => responsiblesExpanded = true} />
            </div>
        {/if}
    {:else}
        <p class="mt-3">Здесь еще нет известных выпускников</p>
    {/if}
    </div>
</section>

<style>
    label {
        width: 100%;
    }
    #vs2f {
        padding-top: 24px;
    }
</style>
