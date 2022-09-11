<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { Text } from '.'

    export let title: string
    export let description: string
    export let minsalary = 0
    export let duties: string[] = []

    const dispatch = createEventDispatcher()

    const linkClicked = () => dispatch('linkClicked')
</script>

<div class="profession grid grid-3">
    <h2 class="red-text no-top-margin">Кто такой и чем занимается { title.toLocaleLowerCase() }?</h2>
    <div>
        <h3 class="no-top-margin">{ description }</h3>
        <h3>Зарплата: от { minsalary } ₽ на руки</h3>
        <Text opacity={0.6}>по данным портала hh.ru</Text>
        <p><a href="#reg" class="link blue-color" on:click|preventDefault={ linkClicked }>Получить консультацию</a></p>
    </div>
    <div>
        <h3 class="no-top-margin">Функции:</h3>
        <ul>
            { #each duties as duty }
                <li>{ duty }</li>
            { /each }
        </ul>
    </div>
</div>
