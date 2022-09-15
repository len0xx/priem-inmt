<script lang="ts">
    import { range } from '$lib/utilities'
    import { createEventDispatcher } from 'svelte'

    export let pagesAmount = 1
    export let currentPage = 1
    export let className = ''
    export let id: string = undefined
    export let node: HTMLElement = undefined

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
    <nav aria-label="Навигация по странице" class={ className } { id } bind:this={ node }>
        <ul class="pagination">
            <li class="page-item" class:disabled={ currentPage === 1 }>
                <span class="page-link" aria-label="Предыдущая страница" on:click={ prevPage }>
                    <span aria-hidden="true">&laquo;</span>
                </span>
            </li>
            { #if pagesAmount < 6 }
                <!-- Страниц мало, рендерим все, что есть -->
                { #each range(1, pagesAmount) as i (i) }
                    <li class="page-item" class:active={ currentPage === i } on:click={ () => selectPage(i) }>
                        <span class="page-link">{ i }</span>
                    </li>
                { /each }
            { :else }
                { #if currentPage < 2 }
                    <!-- Страниц много, но мы находимся в начале -->
                    { #each range(1, 5) as i (i) }
                        <li class="page-item" class:active={ currentPage === i } on:click={ () => selectPage(i) }>
                            <span class="page-link">{ i }</span>
                        </li>
                    { /each }
                    <li class="disabled page-item">
                        <span class="page-link">...</span>
                    </li>
                    <li class="page-item" on:click={ () => selectPage(pagesAmount) }>
                        <span class="page-link">{ pagesAmount }</span>
                    </li>
                { :else if currentPage > pagesAmount - 1 }
                    <!-- Страниц много, но мы находимся в конце -->
                    <li class="page-item" on:click={ () => selectPage(1) }>
                        <span class="page-link">{ 1 }</span>
                    </li>
                    <li class="disabled page-item">
                        <span class="page-link">...</span>
                    </li>
                    { #each range(pagesAmount - 3, pagesAmount) as i (i) }
                        <li class="page-item" class:active={ currentPage === i } on:click={ () => selectPage(i) }>
                            <span class="page-link">{ i }</span>
                        </li>
                    { /each }
                { :else }
                    <!-- Страниц много, но мы находимся в середине -->
                    <li class="page-item" on:click={ () => selectPage(1) }>
                        <span class="page-link">{ 1 }</span>
                    </li>
                    <li class="disabled page-item">
                        <span class="page-link">...</span>
                    </li>
                    { #each range(currentPage - 1, currentPage + 1) as i (i) }
                        <li class="page-item" class:active={ currentPage === i } on:click={ () => selectPage(i) }>
                            <span class="page-link">{ i }</span>
                        </li>
                    { /each }
                    <li class="disabled page-item">
                        <span class="page-link">...</span>
                    </li>
                    <li class="page-item" on:click={ () => selectPage(pagesAmount) }>
                        <span class="page-link">{ pagesAmount }</span>
                    </li>
                { /if }
            { /if }
            <li class="page-item" class:disabled={ currentPage === pagesAmount }>
                <span class="page-link" aria-label="Следующая страница" on:click={ nextPage }>
                    <span aria-hidden="true">&raquo;</span>
                </span>
            </li>
        </ul>
    </nav>
{ /if }
