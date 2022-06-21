<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { Text } from '.'

    export let title = ''
    export let description = ''
    export let functions: string[] = []

    const dispatch = createEventDispatcher()

    const linkClicked = () => dispatch('linkClicked')
</script>

<div class="profession grid grid-3">
    <h2 class="red-text no-top-margin">Кто такой и чем занимается { title.toLocaleLowerCase() }?</h2>
    <div>
        <h3 class="no-top-margin">{ @html description }</h3>
        <Text opacity={0.6}>по данным портала hh.ru</Text>
        <p><a href="#reg" class="link blue-color" on:click|preventDefault={ linkClicked }>Получить консультацию</a></p>
    </div>
    <div>
        <h3 class="no-top-margin">Функции:</h3>
        <ul>
            { #each functions as func }
                <li>{ func }</li>
            { /each }
        </ul>
    </div>
</div>
