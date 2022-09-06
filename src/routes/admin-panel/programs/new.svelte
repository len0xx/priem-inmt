<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Grid, Form, RoundButton, TipTap, FileSelect } from '$components'
    import { redirect } from '$lib/utilities'
    import { isMobile } from '$lib/stores'
    import { slide, blur } from 'svelte/transition'
    import { DegreeLevel } from '../../../types/enums.js'
    import type { ModalComponent } from '../../../types'

    let firstImageModal: ModalComponent = null
    let firstImageId: number = null
    let firstImagePath: string = null

    let secondImageModal: ModalComponent = null
    let secondImageId: number = null
    let secondImagePath: string = null

    let teacherImageModal: ModalComponent = null
    let teacherImageId: number = null
    let teacherImagePath: string = null

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }

    let feedbacksExpanded = false
    let mode1 = true
    let mode2 = false
    let mode3 = false
    let degree = 'Бакалавриат'
    let activeExams = [true, false, false, false, false]
    $: countExams = activeExams.filter(exam => exam).length

    const addExam = () => {
        let flag = false
        activeExams.forEach((exam, i) => {
            if (!exam && !flag) {
                activeExams[i] = true
                flag = true
            }
        })
    }

    const removeExam = (index: number) => activeExams[index] = false

    const handleSuccess = () => {
        redirect('/admin-panel/programs')
    }

    const firstImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        firstImageId = event.detail.id
        firstImagePath = event.detail.path
    }

    const secondImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        secondImageId = event.detail.id
        secondImagePath = event.detail.path
    }

    const teacherImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        teacherImageId = event.detail.id
        teacherImagePath = event.detail.path
    }
</script>

<svelte:head>
    <title>Образовательные программы</title>
</svelte:head>

<FileSelect bind:modal={ firstImageModal } on:save={ firstImageSelected } />

<FileSelect bind:modal={ secondImageModal } on:save={ secondImageSelected } />

<FileSelect bind:modal={ teacherImageModal } on:save={ teacherImageSelected } />

<section class="main-content">
    <div class="white-block-wide">
        <h2>Новая образовательная программа</h2>
        <Form method="POST" action="/api/admin/programs" on:success={ handleSuccess }>
            <h3>Общая информация</h3>
            <Grid m={2} s={1} ratio="2:1">
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
            <Grid m={3} s={1} gap={2}>
                <div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="mode1" id="mode1" bind:checked={ mode1 }>
                        <label class="form-check-label" for="mode1">Очная форма обучения</label>
                    </div>
                    { #if mode1 }
                        <br />
                        <div class="grid grid-1" transition:blur|local={{ duration: 200 }}>
                            <div>
                                <label for="budget1">Количество мест - Бюджет (очно)</label><br />
                                <input class="form-control wide" type="number" name="budget1" placeholder="10" required />
                            </div>
                            <div>
                                <label for="contract1">Количество мест - Контракт (очно)</label><br />
                                <input class="form-control wide" type="number" name="contract1" placeholder="10" required />
                            </div>
                            <div>
                                <label for="period1">Срок обучения (очно)</label><br />
                                <input class="form-control wide" type="text" name="period1" placeholder="2 года и 6 месяцев" />
                            </div>
                            <div>
                                <label for="price1">Стоимость обучения (очно)</label><br />
                                <small>Только число (без слова "от" и символа рубля)</small><br />
                                <input class="form-control wide" type="text" name="price1" placeholder="170 000" />
                            </div>
                            <div>
                                <label for="language1">Язык освоения (очно)</label><br />
                                <input class="form-control wide" type="text" name="language1" placeholder="Русский, Английский" />
                            </div>
                        </div>
                    { /if }
                </div>
                <div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="mode2" id="mode2" bind:checked={ mode2 }>
                        <label class="form-check-label" for="mode2">Очно-заочная форма обучения</label>
                    </div>
                    { #if mode2 }
                        <br />
                        <div class="grid grid-1" transition:blur|local={{ duration: 200 }}>
                            <div>
                                <label for="budget1">Количество мест - Бюджет (очно-заочно)</label><br />
                                <input class="form-control wide" type="number" name="budget2" placeholder="10" required />
                            </div>
                            <div>
                                <label for="contract1">Количество мест - Контракт (очно-заочно)</label><br />
                                <input class="form-control wide" type="number" name="contract2" placeholder="10" required />
                            </div>
                            <div>
                                <label for="period1">Срок обучения (очно-заочно)</label><br />
                                <input class="form-control wide" type="text" name="period2" placeholder="2 года и 6 месяцев" />
                            </div>
                            <div>
                                <label for="price1">Стоимость обучения (очно-заочно)</label><br />
                                <small>Только число (без слова "от" и символа рубля)</small><br />
                                <input class="form-control wide" type="text" name="price2" placeholder="170 000" />
                            </div>
                            <div>
                                <label for="language1">Язык освоения (очно-заочно)</label><br />
                                <input class="form-control wide" type="text" name="language2" placeholder="Русский, Английский" />
                            </div>
                        </div>
                    { /if }
                </div>
                <div>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="mode3" id="mode3" bind:checked={ mode3 }>
                        <label class="form-check-label" for="mode3">Заочная форма обучения</label>
                    </div>
                    { #if mode3 }
                        <br />
                        <div class="grid grid-1" transition:blur|local={{ duration: 200 }}>
                            <div>
                                <label for="budget1">Количество мест - Бюджет (заочно)</label><br />
                                <input class="form-control wide" type="number" name="budget3" placeholder="10" required />
                            </div>
                            <div>
                                <label for="contract1">Количество мест - Контракт (заочно)</label><br />
                                <input class="form-control wide" type="number" name="contract3" placeholder="10" required />
                            </div>
                            <div>
                                <label for="period1">Срок обучения (заочно)</label><br />
                                <input class="form-control wide" type="text" name="period3" placeholder="2 года и 6 месяцев" />
                            </div>
                            <div>
                                <label for="price1">Стоимость обучения (заочно)</label><br />
                                <small>Только число (без слова "от" и символа рубля)</small><br />
                                <input class="form-control wide" type="text" name="price3" placeholder="170 000" />
                            </div>
                            <div>
                                <label for="language1">Язык освоения (заочно)</label><br />
                                <input class="form-control wide" type="text" name="language3" placeholder="Русский, Английский" />
                            </div>
                        </div>
                    { /if }
                </div>
            </Grid>
            <br />
            <div>
                <label for="directions">Направления подготовки (каждое с новой строки)</label><br />
                <textarea class="form-control" name="directions" cols="30" rows="4"></textarea>
            </div>
            { #if degree != DegreeLevel.MASTER }
                <h3>Экзамены</h3>
                <Grid m={1}>
                    {#each activeExams.filter(exam => exam) as _, i}
                        <div transition:slide|local={{ duration: 200 }} class="grid grid-2-plus-btn m-grid-1">
                            <div>
                                <label for="exam{i + 1}">Название экзамена</label><br />
                                <input
                                    class="form-control wide"
                                    type="text"
                                    name="exam{i + 1}"
                                    required
                                />
                            </div>
                            <div>
                                <label for="result{i + 1}">Минимальный балл</label><br />
                                <input
                                    class="form-control wide"
                                    type="number"
                                    name="result{i + 1}"
                                    required
                                />
                            </div>
                            {#if countExams > 1}
                                <button type="button" on:click={ () => removeExam(i) } transition:blur|local={{ duration: 200 }} class="btn btn btn-outline-danger">Удалить экзамен</button >
                            {/if}
                        </div>
                    {/each}
                </Grid>
                <div class="buttons-row">
                    {#if countExams < 5}
                        <button type="button" on:click={addExam} class="btn btn-outline-primary">Добавить экзамен</button>
                    {/if}
                </div>
            { /if }
            <h3>Руководитель программы</h3>
            <Grid l={3} m={2} s={1}>
                <div>
                    <div>
                        <label for="teacher_name">ФИО</label><br />
                        <input class="form-control wide" type="text" name="teacher_name" required />
                    </div>
                    <div>
                        <label for="teacher_caption">Учёные звания</label><br />
                        <input class="form-control wide" type="text" name="teacher_caption" required />
                    </div>
                </div>
                <div>
                    <div>
                        <label for="teacher_phone">Телефон</label><br />
                        <input class="form-control wide" type="text" use:imask={ phoneMask } name="teacher_phone" />
                    </div>
                    <div>
                        <label for="teacher_email">Email</label><br />
                        <input class="form-control wide" type="email" name="teacher_email" />
                    </div>
                </div>
                <div>
                    <label for="teacher_photo">Фотография:</label><br />
                    {#if teacherImagePath}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img width="150px" height="150px" src={teacherImagePath} class="img-fluid mt-3">
                        <br />
                    {/if}
                    <input type="hidden" name="teacher_photo" value={ teacherImageId }><br />
                    {#if $isMobile}
                        <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                    {:else}
                        <button type="button" class="btn btn-outline-success" on:click={ teacherImageModal.open }> { teacherImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                    {/if}
                </div>
            </Grid>
            <h3>Описание программы</h3>
            <div>
                <TipTap name="text" />
            </div>
            <h3>Отзывы</h3>
            <Grid l={2} m={1} s={1} ratio="1:2">
                <Grid m={1}>
                    <div>
                        <label for="feedback_name1">ФИО</label><br />
                        <input class="form-control wide" type="text" name="feedback_name1" />
                    </div>
                    <div>
                        <label for="feedback_caption1">Подпись</label><br />
                        <input class="form-control wide" type="text" name="feedback_caption1" />
                    </div>
                    <div>
                        <label for="feedback_img1">Изображение:</label><br />
                        {#if firstImagePath}
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <img width="150px" height="150px" src={firstImagePath} class="img-fluid mt-3">
                            <br />
                        {/if}
                        <input type="hidden" name="feedback_img1" value={ firstImageId }><br />
                        {#if $isMobile}
                            <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                        {:else}
                            <button type="button" class="btn btn-outline-success" on:click={ firstImageModal.open }> { firstImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                        {/if}
                    </div>
                </Grid>
                <div>
                    <label for="feedback_text1">Текст отзыва</label><br />
                    <textarea class="form-control" name="feedback_text1" cols="30" rows="10"></textarea>
                </div>
            </Grid>
            { #if feedbacksExpanded }
                <Grid m={2} ratio="1:2">
                    <Grid m={1}>
                        <div>
                            <label for="feedback_name2">ФИО</label><br />
                            <input class="form-control wide" type="text" name="feedback_name2" />
                        </div>
                        <div>
                            <label for="feedback_caption2">Подпись</label><br />
                            <input class="form-control wide" type="text" name="feedback_caption2" />
                        </div>
                        <div>
                            <label for="feedback_img2">Добавить новое изображение:</label><br />
                            {#if secondImagePath}
                                <img width="150px" height="150px" src={secondImagePath} class="img-fluid mt-3" alt="Изображение">
                                <br />
                            {/if}
                            <input type="hidden" name="feedback_img2" value={ secondImageId }><br />
                            <button type="button" class="btn btn-outline-success" on:click={ secondImageModal.open }> { secondImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                        </div>
                    </Grid>
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
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>
        </Form>
    </div>
</section>
