<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/profession')
        const professions = (await res.json()).professions

        if (res.ok) {
            return { props: { professions } }
        }
    }
</script>

<script lang="ts">
    import { Card, Grid } from '$components'
    // import type { ProfessionI } from '../../../types'

    export let professions
    // export let professions: ProfessionI[]
</script>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Профессии</h2>
        <a href="/admin-panel/professions/new"><button type="button" class="btn btn-outline-primary">Создать новую профессию</button></a>
        { #if professions.length }
            <Grid className="mt-5" m={3} s={1}>
                { #each professions as profession, i (i) }
                    <div>
                        <a href="/admin-panel/professions/update/{ profession.id }">
                            <Card>
                                <span slot="title">{ profession.title }</span>
                            </Card>
                        </a>
                    </div>
                { /each }
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет профессий</p>
        { /if }
    </div>
</section>