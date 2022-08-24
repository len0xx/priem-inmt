<script lang="ts">
    import { sendFormPostRequest } from '$lib/utilities'

    let form: HTMLFormElement

    const handleSubmit = async (event: Event) => {
        event.preventDefault()
        const data = new FormData(form)
        const response = await sendFormPostRequest('http://localhost:8080/api/upload', data)
    }
</script>

<svelte:head>
    <title>ИНМТ – Панель администратора</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Панель администрирования сайта ИНМТ</h2>
        <h3>Партнеры</h3>
        <form bind:this={ form } method="POST" on:submit={ handleSubmit }>
            <div class="grid grid-2 m-grid-1">
                <label>
                    <span class="caption">Логотип</span><br />
                    <input required class="form-control" type="file" name="logo" id="logo"
                        accept="application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpg,image/jpeg,image/png">
                </label>
            </div>
            <br />
            <button class="btn btn-primary">Сохранить</button>
            <button class="btn btn-success" type="button">Добавить</button>
        </form>
    </div>
</section>

<style>
    label {
        width: 100%;
    }
</style>
