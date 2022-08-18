<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/dormitory')
        const dormitories = (await res.json()).dormitories

        if (res.ok) {
            return { props: { dormitories } }
        }
    }
</script>

<script lang="ts">
    import { Graduate, Grid } from '$components'
    import type { DormitoryI } from '../../../types'

    export let dormitories: DormitoryI[]
</script>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Общежития</h2>
        <a href="/admin-panel/dormitories/new"><button type="button" class="btn btn-outline-primary">Создать новое общежитие</button></a>
        { #if dormitories.length }
            <Grid className="mt-5" m={4} s={1}>
                { #each dormitories as dormitory, i (i) }
                    <div>
                        <a href="/admin-panel/dormitories/update/{ dormitory.id }">
                            <Graduate name={ dormitory.title } src={ dormitory.img } caption={ dormitory.address } />
                        </a>
                    </div>
                { /each }
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет общежитий</p>
        { /if }
    </div>
</section>