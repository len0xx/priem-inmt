<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { getBaseUrl } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const res = await fetch(`${getBaseUrl()}/api/admin/info/contacts`)
        const contactInfo = (await res.json()).contactInfo

        if (res.ok) {
            return { props: { contactInfo } }
        }
    }
</script>

<script lang="ts">
    import { Form } from '$components'
    import type { ContactInfoI } from '../../types'
    import { imask } from 'svelte-imask'

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    export let contactInfo: ContactInfoI
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
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
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
