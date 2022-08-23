<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/text')
        const texts = (await res.json()).texts

        if (res.ok) {
            return { props: { texts } }
        }
    }
</script>

<script lang="ts">
    import { Form, Grid } from '$components'
    import type { TextI } from '../../types'

    export let texts: TextI[]

    let createError = false
    let errorText = ''

    const handleSuccess = () => {
        return
    }

    const handleError = (event: CustomEvent<{ error: string }>) => {
        createError = true
        errorText = event.detail.error
    }
</script>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Текстовые элементы</h2>
        <Form action="/api/admin/text" method="PATCH" on:success={ handleSuccess } on:error={ handleError }>
            { #if texts.length }
                <Grid className="mt-5" m={1}>
                    { #each texts as text }
                        <label>
                            <span class="caption">{ text.name }</span><br />
                            <input type="hidden" name="name" value={ text.name } required />
                            <textarea class="form-control" type="text" name="content" id="content" value={ text.content } required ></textarea>
                        </label>
                    { /each }
                </Grid>
                <br />
                <br />
                <button class="btn btn-primary">Сохранить</button>
            { :else }
                <p>Здесь еще нет текстовых блоков</p>
            { /if }
        </Form>
    </div>
</section> 