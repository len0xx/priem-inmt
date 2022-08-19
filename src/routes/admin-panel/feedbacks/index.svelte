<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/Feedback')
        const feedbacks = (await res.json()).feedbacks

        if (res.ok) {
            return { props: { feedbacks } }
        }
    }
</script>

<script lang="ts">
    import { Profile, Grid } from '$components'
    import type { FeedbackI } from '../../../types'

    export let feedbacks: FeedbackI[]
</script>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Отзывы</h2>
        <a href="/admin-panel/feedbacks/new"><button type="button" class="btn btn-outline-primary">Создать новый отзыв</button></a>
        { #if feedbacks.length }
            <Grid className="mt-5" m={3} s={1} alignItems="start">
                <Grid m={1} alignItems="start">
                    { #each feedbacks.filter((_, i) => i % 3 == 0) as feedback }
                        <a href="/admin-panel/feedbacks/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
                <Grid m={1} alignItems="start">
                    { #each feedbacks.filter((_, i) => i % 3 == 1) as feedback }
                        <a href="/admin-panel/feedbacks/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
                <Grid m={1} alignItems="start">
                    { #each feedbacks.filter((_, i) => i % 3 == 2) as feedback }
                        <a href="/admin-panel/feedbacks/update/{ feedback.id }">
                            <Profile img={ feedback.img }>
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.description }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        </a>
                    { /each }
                </Grid>
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет отзывов</p>
        { /if }
    </div>
</section>