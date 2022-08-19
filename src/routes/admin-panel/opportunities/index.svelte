<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch }) => {
        const res = await fetch('http://localhost:8080/api/admin/Opportunity')
        const opportunities = (await res.json()).opportunities

        if (res.ok) {
            return { props: { opportunities } }
        }
    }
</script>

<script lang="ts">
    import { Grid } from '$components'
    // import type { OpportunityI } from '../../../types'

    export let opportunities
</script>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Общежития</h2>
        <a href="/admin-panel/opportunities/new"><button type="button" class="btn btn-outline-primary">Создать новое общежитие</button></a>
        { #if opportunities.length }
            <Grid className="mt-5" m={4} s={1}>
                { #each opportunities as opportunity, i (i) }
                    <div>
                        <a href="/admin-panel/opportunities/update/{ opportunity.id }">
                            
                        </a>
                    </div>
                { /each }
            </Grid>
        { :else }
            <p class="mt-3">Здесь еще нет возможностей</p>
        { /if }
    </div>
</section> 