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
    import { Card, Form, Grid } from '$components'
    import type { ContactInfoI, ResponsibleI } from '../../../types'
    import { imask } from 'svelte-imask'

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    export let contactInfo: ContactInfoI
    export let responsibles: ResponsibleI[]
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Редактирование страницы контактов</h2>
        <h3>Контактные данные</h3>
        <Form
            action="/api/admin/info/contacts"
            method="POST"
            reset={false}
        >
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Контактный номер телефона:</span><br />
                    <input class="form-control" type="tel" name="tel" id="tel" use:imask={phoneMask} value={ contactInfo?.tel || '' } />
                </label>
                <label>
                    <span class="caption">Контактный адрес электронной почты:</span><br />
                    <input class="form-control" type="email" name="email" id="email"
                        placeholder="contact@urfu.ru" value={ contactInfo?.email || '' } required />
                </label>
                <label>
                    <span class="caption">Дирекция института:</span><br />
                    <input class="form-control" type="text" name="directorateAddress" id="directorateAddress"
                        placeholder="г. Екатеринбург, ул. Софьи Ковалевской, 5" value={ contactInfo?.directorateAddress || '' } required />
                </label>
                <label>
                    <span class="caption">Приёмная комиссия:</span><br />
                    <input class="form-control" type="text" name="admissionsAddress" id="admissionsAddress"
                        placeholder="г. Екатеринбург, ул. Мира, 19" value={ contactInfo?.admissionsAddress || '' } required />
                </label>
                <label>
                    <span class="caption">Ссылка ВКонтакте:</span><br />
                    <input class="form-control" type="text" name="vkUrl" id="vkUrl"
                        placeholder="https://vk.com/ural.federal.university" value={ contactInfo?.vkUrl || '' } />
                </label>
                <label>
                    <span class="caption">Ссылка Telegram:</span><br />
                    <input class="form-control" type="text" name="tgUrl" id="tgUrl"
                        placeholder="https://t.me/urfu" value={ contactInfo?.tgUrl || '' } />
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </Form>

        <h3>Ответственные лица института</h3>
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
            </Grid>
            <div class="buttons-row">
                <button class="btn btn-primary">Создать</button>
            </div>
        </Form>
        { /if }
        { #if responsibles.length }
        <h3>Опубликованные ответственные лица{ responsibles.length ? ` (${responsibles.length})` : '' }</h3>
            <Grid s={1} m={2} l={3}>
                { #each responsibles as responsible }
                    <a href="/admin-panel/contacts/responsible/update/{ responsible.id }">
                        <Card variant="white" color="custom">
                            <svelte:fragment slot="title">{ responsible.name }</svelte:fragment>
                            <svelte:fragment slot="left">{ responsible.label ? responsible.label : '' }</svelte:fragment>
                        </Card>
                    </a>
                { /each }
            </Grid>
        { :else }
            <p class="mt-3">Здесь ещё нет ответственных лиц</p>
        { /if }
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
