<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Grid, Form, RoundButton, TipTap } from '$components'
    import { redirect } from '$lib/utilities'
    import { slide } from 'svelte/transition'

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    let feedbacksExpanded = false
    let mode1 = true
    let mode2 = false
    let mode3 = false
    let degree = 'Бакалавриат'
    let activeExams = [true, false, false, false, false]
    let countExams = 1

    const addExam = () => {
        let active = 1
        for (let i = 1; i < activeExams.length; i++) {
            if (!activeExams[i]) {
                activeExams[i] = true
                active++
                countExams = active
                return
            }
    
            active++
    
        }
    }

    const removeExam = () => {
        let active = 5
        for (let i = activeExams.length - 1; i >= 1; i--) {
            if (activeExams[i]) {
                activeExams[i] = false
                active--
                countExams = active
                return
            }
    
            active--
    
        }
    }

    const handleSuccess = () => {
        redirect('/admin-panel/programs')
    }
</script>

<svelte:head>
    <title>Образовательные программы</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2>Новая образовательная программа</h2>
        <Form method="POST" action="/api/admin/programs" on:success={ handleSuccess }>
            <h3>Общая информация</h3>
            <Grid m={2} ratio="2:1">
                <div>
                    <label for="title">Название</label><br />
                    <input class="form-control wide" type="text" name="title" required placeholder="Конструирование и технология электронных средств" />
                </div>
                <div>
                    <label for="degree">Уровень подготовки</label><br />
                    <select class="wide form-select" name="degree" bind:value={ degree }>
                        <option value="Бакалавриат">Бакалавриат</option>
                        <option value="Специалитет">Специалитет</option>
                        <option value="Магистратура">Магистратура</option>
                    </select>
                </div>
            </Grid>
            <h3>Подробная информация</h3>
            <Grid m={3} gap={2}>
                <div>
                    <label for="mode1">
                        Очная форма обучения
                    </label>
                    <input type="checkbox" name="mode1" id="mode1" bind:checked={ mode1 } />
                </div>
                <div>
                    <label for="mode2">
                        Очно-заочная форма обучения
                    </label>
                    <input type="checkbox" name="mode2" id="mode2" bind:checked={ mode2 } />
                </div>
                <div>
                    <label for="mode3">
                        Заочная форма обучения
                    </label>
                    <input type="checkbox" name="mode3" id="mode3" bind:checked={ mode3 } />
                </div>
                <div>
                    { #if mode1 }
                    <label for="budget1">Количество мест - Бюджет (очно)</label><br />
                    <input class="form-control wide" type="number" name="budget1" placeholder="10" required />
                    { /if }
                </div>
                <div>
                    { #if mode2 }
                    <label for="budget2">Количество мест - Бюджет (очно-заочно)</label><br />
                    <input class="form-control wide" type="number" name="budget2" placeholder="10" />
                    { /if }
                </div>
                <div>
                    { #if mode3 }
                    <label for="budget3">Количество мест - Бюджет (заочно)</label><br />
                    <input class="form-control wide" type="number" name="budget3" placeholder="10" />
                    { /if }
                </div>
                <div>
                    { #if mode1 }
                    <label for="contract1">Количество мест - Контракт (очно)</label><br />
                    <input class="form-control wide" type="number" name="contract1" placeholder="10" required />
                    { /if }
                </div>
                <div>
                    { #if mode2 }
                    <label for="contract2">Количество мест - Контракт (очно-заочно)</label><br />
                    <input class="form-control wide" type="number" name="contract2" placeholder="10" />
                    { /if }
                </div>
                <div>
                    { #if mode3 }
                    <label for="contract3">Количество мест - Контракт (заочно)</label><br />
                    <input class="form-control wide" type="number" name="contract3" placeholder="10" />
                    { /if }
                </div>
                <div>
                    { #if mode1 }
                    <label for="period1">Срок обучения (очно)</label><br />
                    <input class="form-control wide" type="text" name="period1" placeholder="2 года и 6 месяцев" />
                    { /if }
                </div>
                <div>
                    { #if mode2 }
                    <label for="period2">Срок обучения (очно-заочно)</label><br />
                    <input class="form-control wide" type="text" name="period2" />
                    { /if }
                </div>
                <div>
                    { #if mode3 }
                    <label for="period3">Срок обучения (заочно)</label><br />
                    <input class="form-control wide" type="text" name="period3" />
                    { /if }
                </div>
                <div>
                    { #if mode1 }
                    <label for="price1">Стоимость обучения (очно)</label><br />
                    <small>Только число (без слова "от" и символа рубля)</small><br />
                    <input class="form-control wide" type="text" name="price1" placeholder="170 000" />
                    { /if }
                </div>
                <div>
                    { #if mode2 }
                    <label for="price2">Стоимость обучения (очно-заочно)</label><br />
                    <small>Только число (без слова "от" и символа рубля)</small><br />
                    <input class="form-control wide" type="text" name="price2" />
                    { /if }
                </div>
                <div>
                    { #if mode3 }
                    <label for="price3">Стоимость обучения (заочно)</label><br />
                    <small>Только число (без слова "от" и символа рубля)</small><br />
                    <input class="form-control wide" type="text" name="price3" />
                    { /if }
                </div>
                <div>
                    { #if mode1 }
                    <label for="language1">Язык освоения (очно)</label><br />
                    <input class="form-control wide" type="text" name="language1" placeholder="Русский, Английский" />
                    { /if }
                </div>
                <div>
                    { #if mode2 }
                    <label for="language2">Язык освоения (очно-заочно)</label><br />
                    <input class="form-control wide" type="text" name="language2" placeholder="Русский, Английский" />
                    { /if }
                </div>
                <div>
                    { #if mode3 }
                    <label for="language3">Язык освоения (заочно)</label><br />
                    <input class="form-control wide" type="text" name="language3" placeholder="Русский, Английский" />
                    { /if }
                </div>
                <div>
                    <label for="directions">Направления подготовки (каждое с новой строки)</label><br />
                    <textarea class="form-control" name="directions" cols="30" rows="4"></textarea>
                </div>
            </Grid>
            { #if degree != 'Магистратура' }
                <h3>Экзамены</h3>
                <Grid m={1}>
                    { #each activeExams as exam, i }
                        { #if exam }
                            <div transition:slide|local={{ duration: 200 }} class="grid grid-2 m-grid-1">
                                <div>
                                    <label for="exam{ i + 1 }">Название экзамена</label><br />
                                    <input class="form-control wide" type="text" name="exam{ i + 1 }" required />
                                </div>
                                <div>
                                    <label for="result{ i + 1 }">Минимальный балл</label><br />
                                    <input class="form-control wide" type="number" name="result{ i + 1 }" required />
                                </div>
                            </div>
                        { /if }
                    { /each }
                </Grid>
                <div class="buttons-row">
                    { #if countExams < 5 }
                        <button type="button" on:click={ addExam } class="btn btn-outline-primary">Добавить экзамен</button>
                    { /if }
                    { #if countExams > 1 }
                        <button type="button" on:click={ removeExam } class="btn btn-outline-danger">Удалить экзамен</button>
                    { /if }
                </div>
            { /if }
            <h3>Руководитель программы</h3>
            <Grid m={3}>
                <div>
                    <label for="teacher_name">ФИО</label><br />
                    <input class="form-control wide" type="text" name="teacher_name" required />
                </div>
                <div>
                    <label for="teacher_caption">Учёные звания</label><br />
                    <input class="form-control wide" type="text" name="teacher_caption" required />
                </div>
                <div></div>
                <div>
                    <label for="teacher_phone">Телефон</label><br />
                    <input class="form-control wide" type="text" use:imask={ phoneMask } name="teacher_phone" />
                </div>
                <div>
                    <label for="teacher_email">Email</label><br />
                    <input class="form-control wide" type="email" name="teacher_email" />
                </div>
                <div></div>
            </Grid>
            <h3>Описание программы</h3>
            <Grid m={2} ratio="2:1">
                <TipTap name="text" />
            </Grid>
            <h3>Отзывы</h3>
            <Grid m={2} ratio="1:2">
                <div>
                    <div>
                        <label for="feedback_name1">ФИО</label><br />
                        <input class="form-control wide" type="text" name="feedback_name1" />
                    </div>
                    <div>
                        <label for="feedback_caption1">Подпись</label><br />
                        <input class="form-control wide" type="text" name="feedback_caption1" />
                    </div>
                </div>
                <div>
                    <label for="feedback_text1">Текст отзыва</label><br />
                    <textarea class="form-control" name="feedback_text1" cols="30" rows="10"></textarea>
                </div>
            </Grid>
            { #if feedbacksExpanded }
                <Grid m={2} ratio="1:2">
                    <div>
                        <div>
                            <label for="feedback_name2">ФИО</label><br />
                            <input class="form-control wide" type="text" name="feedback_name2" />
                        </div>
                        <div>
                            <label for="feedback_caption2">Подпись</label><br />
                            <input class="form-control wide" type="text" name="feedback_caption2" />
                        </div>
                    </div>
                    <div>
                        <label for="feedback_text2">Текст отзыва</label><br />
                        <textarea class="form-control" name="feedback_text2" cols="30" rows="10"></textarea>
                    </div>
                </Grid>
            { :else }
                <div class="align-center">
                    <RoundButton variant="plus" size="M" on:click={ () => feedbacksExpanded = true } />
                </div>
            { /if }
            <br /> 
            <div class="buttons-row">
                <button class="btn btn-primary">Создать</button>
            </div>
        </Form>
    </div>
</section>
