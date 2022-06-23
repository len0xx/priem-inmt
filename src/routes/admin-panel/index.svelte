<script context="module" lang="ts">
    // import { sendNodeAJAX } from '../../../shared/utilities'
    
    export async function load({ session }) {
        const loggedIn = !!(session.loggedIn)

        if (!loggedIn) {
            return {
                status: 302,
                redirect: '/admin-panel/login'
            }
        }

        // const basicInfo = await sendNodeAJAX(
        //     `http://${url.hostname}/api/info`,
        //     'GET',
        //     { csrf: session.csrfToken }, 
        //     { cookie: `csrf=${session.csrfToken}` }
        // )

        return {
            props: {
                user: session.user
            }
        }
    }
</script>

<script lang="ts">
    export let user = undefined

    // export let info = {}
</script>

<svelte:head>
    <title>Панель администратора</title>
</svelte:head>

<div class="content">
    <section class="form">
        <div class="white-block">
            <h2 class="no-top-margin">Панель администрирования сайта УралЭНИН</h2>
            <p>Добро пожаловать, { user.fullname }! <a href="/admin-panel/logout">Выйти</a></p>
            <h3>Основная информация о сайте</h3>
            <form action="/api/admin/info/main" method="POST">
                <label>
                    <span class="caption">Заголовок в промо-блоке:</span><br>
                    <input required class="form-control" type="text" name="title" id="title" placeholder="Заголовок" value="">
                </label>
                <br>
                <label>
                    <span class="caption">Сопровождающий текст:</span><br>
                    <input required class="form-control" type="text" name="caption" id="caption" placeholder="Сопровождающий текст" value="">
                </label>
                <br>
                <button class="btn btn-primary">Сохранить</button>
            </form>
            <br>
            <h3>Информация о поступлении</h3>
            <form action="/api/admin/info/main" method="POST">
                <label>
                    <span class="caption">Заголовок:</span><br>
                    <input class="form-control" type="text" name="title" id="title" placeholder="Заголовок">
                </label>
                <br>
                <h4>Сроки подачи документов</h4>
                <div class="grid grid-2">
                    <label>
                        <span class="caption">[Бюджет] Очная форма обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                    <label>
                        <span class="caption">[Бюджет] Очно-заочная и заочная формы обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                    <label>
                        <span class="caption">[Бюджет] Очная форма обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                    <label>
                        <span class="caption">[Бюджет] Очно-заочная и заочная формы обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                </div>
                <h4>Период сдачи вступительных испытаний</h4>
                <div class="grid grid-2">
                    <label>
                        <span class="caption">[Контракт] Очная форма обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                    <label>
                        <span class="caption">[Контракт] Очно-заочная и заочная формы обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                    <label>
                        <span class="caption">[Контракт] Очная форма обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                    <label>
                        <span class="caption">[Контракт] Очно-заочная и заочная формы обучения:</span><br>
                        <input class="form-control" type="text" name="caption" id="caption" placeholder="20.06 - 08.08">
                    </label>
                </div>
                <br>
                <button class="btn btn-primary">Сохранить</button>
            </form>
            <h3>Контактные данные</h3>
            <form action="/api/admin/info/main" method="POST">
                <div class="grid grid-2">
                    <label>
                        <span class="caption">Контактный номер телефона:</span><br>
                        <input class="form-control" type="tel" name="contact-phone" id="contact-phone">
                    </label>
                    <label>
                        <span class="caption">Контактный адрес электронной почты:</span><br>
                        <input class="form-control" type="email" name="contact-email" id="contact-email" placeholder="contact@urfu.ru">
                    </label>
                    <label>
                        <span class="caption">Дирекция института:</span><br>
                        <input class="form-control" type="text" name="direction" id="direction" placeholder="г. Екатеринбург, ул. Софьи Ковалевской, 5">
                    </label>
                    <label>
                        <span class="caption">Приёмная комиссия:</span><br>
                        <input class="form-control" type="text" name="priem" id="priem" placeholder="г. Екатеринбург, ул. Мира, 19">
                    </label>
                    <label>
                        <span class="caption">Ссылка ВКонтакте:</span><br>
                        <input class="form-control" type="text" name="vk" id="vk" placeholder="https://vk.com/ural.federal.university">
                    </label>
                    <label>
                        <span class="caption">Ссылка Telegram:</span><br>
                        <input class="form-control" type="text" name="telegram" id="telegram" placeholder="https://t.me/urfu">
                    </label>
                </div>
                <br>
                <button class="btn btn-primary">Сохранить</button>
            </form>
        </div>
    </section>
</div>

<style>
    section.form {
        padding: 2em 0;
    }

    a:link {
        color: var(--blue);
    }

    a:link:hover {
        text-decoration: underline;
    }

    label {
        width: 100%;
    }
</style>
