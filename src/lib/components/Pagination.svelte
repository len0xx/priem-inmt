<script lang="ts">
    import { range } from '$lib/utilities'
    import { createEventDispatcher } from 'svelte'

    export let pagesAmount = 1
    export let currentPage = 1

    const dispatch = createEventDispatcher()

    const prevPage = () => selectPage(currentPage - 1)

    const nextPage = () => selectPage(currentPage + 1)

    const selectPage = (num: number) => {
        if (num >= 1 && num <= pagesAmount) {
            currentPage = num
            dispatch('pageChange', currentPage)
        }
    }
</script>

{ #if pagesAmount > 1 }
    <nav aria-label="Навигация по странице" class="align-center">
        <ul class="pagination">
            <li class="page-item" class:disabled={ currentPage === 1 }>
                <span class="page-link" aria-label="Предыдущая страница" on:click={ prevPage }>
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
            { #each range(1, pagesAmount) as i (i) }
                { #if pagesAmount >= i }
                    <li class="page-item" class:active={ currentPage === i } on:click={ () => selectPage(i) }>
                        <span class="page-link">{ i }</span>
                    </li>
                { /if }
            { /each }
            <li class="page-item" class:disabled={ currentPage === pagesAmount }>
                <span class="page-link" aria-label="Следующая страница" on:click={ nextPage }>
                    <span aria-hidden="true">&raquo;</span>
                </span>
            </li>
        </ul>
    </nav>
{ /if }
