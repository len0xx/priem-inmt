<script>
    import { AjaxForm } from '$components'
    import { range } from '$lib/utilities'

    let links = 1

    const addLink = () => links++

    const removeLink = () => links--
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Публикации на главной странице</h2>
        <h3>Создать новую публикацию</h3>
        <AjaxForm action="/api/admin/post" method="POST">
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
                </div>
                <div id="vs2f">
                    { #each range(1, links) as _, i }
                        <div class="input-group">
                            <span class="input-group-text">Ссылка</span>
                            <input type="text" aria-label="Текст ссылки" name="link_text{ i }" placeholder="Текст ссылки" class="form-control">
                            <input type="text" aria-label="URL" name="link_url{ i }" placeholder="URL" class="form-control">
                        </div>
                        <br />
                    { /each }
                    { #if links < 5 }
                        <button type="button" class="btn btn-primary" on:click={ addLink }>Добавить ссылку</button>
                    { /if }
                    { #if links > 1 }
                        <button type="button" class="btn btn-danger" on:click={ removeLink }>Убрать ссылку</button>
                    { /if }
                </div>
            </div>
            <br />
            <button class="btn btn-primary">Создать</button>
        </AjaxForm>
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
