<script lang="ts">
    import { encodeQuery } from '../utilities'

    export let active = 0
    export let pages = 0
    export let link = ''
    export let queryParams: Record<string, string> = {}

    const applyPageNumber = (link: string, num: number) => link.replace('page={}', `page=${num}`)

    function getPages(max: number) {
        const numbers = []
        for (let i = 1; i <= max; i++) {
            numbers.push(i)
        }
        return numbers
    }

    $: queryString = encodeQuery(queryParams)
    $: if (queryString.length) {
        queryString += '&page={}'
    }
    $: if (!queryString.length) {
        queryString += 'page={}'
    }
    $: finalLink = link + '?' + queryString

    $: pageNumbers = getPages(pages)
</script>

<div class="paginator">
    { #each pageNumbers as num }
        <a href="{applyPageNumber(finalLink, num)}">
            <span class={active == num ? 'page-num active' : 'page-num'}>
                {num}
            </span>
        </a>
    { /each }
</div>

<style>
    .paginator {
        margin-top: 2em;
        text-align: center;
    }
    .paginator .page-num {
        display: inline-block;
        padding: 3px 0;
        color: black;
        min-width: 32px;
        min-height: 32px;
        text-align: center;
        border-radius: 100em;
    }
    .paginator .page-num:not(:last-of-type) {
        margin-right: 2em;
    }
    .paginator .page-num.active {
        background-color: blue;
        color: white;
    }
</style>
