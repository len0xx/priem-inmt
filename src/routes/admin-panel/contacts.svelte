<script context="module" lang="ts">
    // import { sendNodeAJAX } from '../../../shared/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = ({ session }) => {
        const loggedIn = !!(session.loggedIn)

        if (!loggedIn) {
            return {
                status: 302,
                redirect: '/admin-panel/auth/login'
            }
        }

        // const basicInfo = await sendNodeAJAX(
        //     `http://${url.hostname}/api/info`,
        //     'GET',
        //     { csrf: session.csrfToken },
        //     { cookie: `csrf=${session.csrfToken}` }
        // )

        return {
            props: {}
        }
    }
</script>

<script lang="ts">
    // export let user = undefined
    // export let info = {}
</script>

<svelte:head>
    <title>Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <!-- <p>Добро пожаловать, { user ? user.fullname : 'undefined' }! <a href="/admin-panel/logout">Выйти</a></p> -->
        <h3>Контактные данные</h3>
        <form action="/api/admin/info/contacts" method="POST">
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Контактный номер телефона:</span><br />
                    <input class="form-control" type="tel" name="tel" id="tel" />
                </label>
                <label>
                    <span class="caption">Контактный адрес электронной почты:</span><br />
                    <input class="form-control" type="email" name="email" id="email"
                        placeholder="contact@urfu.ru" />
                </label>
                <label>
                    <span class="caption">Дирекция института:</span><br />
                    <input class="form-control" type="text" name="directorateAddress" id="directorateAddress"
                        placeholder="г. Екатеринбург, ул. Софьи Ковалевской, 5" />
                </label>
                <label>
                    <span class="caption">Приёмная комиссия:</span><br />
                    <input class="form-control" type="text" name="admissionsAddress" id="admissionsAddress"
                        placeholder="г. Екатеринбург, ул. Мира, 19" />
                </label>
                <label>
                    <span class="caption">Ссылка ВКонтакте:</span><br />
                    <input class="form-control" type="text" name="vkUrl" id="vkUrl"
                        placeholder="https://vk.com/ural.federal.university" />
                </label>
                <label>
                    <span class="caption">Ссылка Telegram:</span><br />
                    <input class="form-control" type="text" name="tgUrl" id="tgUrl"
                        placeholder="https://t.me/urfu" />
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
        </form>
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
