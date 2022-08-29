<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'

    export const load: Load = async ({ fetch, params }) => {
        const programId = params.id
        const res = await fetch(apiRoute(`admin/programs/${programId}`))
        const programResult = (await res.json()).program

        if (res.ok) {
            return { props: { program: programResult } }
        }
    }
</script>

<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Form, Grid, Modal, RoundButton, TipTap, FileSelect } from '$lib/components'
    import { DegreeLevel } from '../../../../types/enums'
    import { range, redirect } from '$lib/utilities'
    import { slide } from 'svelte/transition'
    import type { EducationalProgram, ModalComponent } from '../../../../types'

    let modal: ModalComponent = null

    let firstImageModal: ModalComponent = null
    let firstImageId: number = null
    let firstImagePath: string = null

    let secondImageModal: ModalComponent = null
    let secondImageId: number = null
    let secondImagePath: string = null

    let phoneMask = {
        mask: '+{7}-(000)-000-0000',
    }

    export let program: EducationalProgram
    let directions = (Object.values(program.directions)).join('\n')

    let feedbacksCount = Object.keys(program.feedbacks).length || 1
    let mode1 = Boolean(program.educationModes.fullTime)
    let mode2 = Boolean(program.educationModes.partFullTime)
    let mode3 = Boolean(program.educationModes.partTime)
    let degree = program.degree
    let totalExams = 5

    let exams = program.exams
    let examsCount = Object.keys(exams).length

    const addExam = () => {
        for (let i = examsCount; i < totalExams; i++) {
            exams[i] = {
                title: '',
                result: ''
            }
            examsCount++
            return
        }
    }

    const removeExam = () => {
        exams[examsCount - 1] = undefined
        examsCount--
    }

    const removeProgram = async () => {
        const res = await fetch(apiRoute(`admin/programs/${program.id}`), { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/programs')
        }
        modal.close()
    }

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
    console.log(`FirstImagePath: ${firstImagePath}`)
    console.log(`SecondImagePath: ${secondImagePath}`)
</script>

<svelte:head>
    <title>Образовательные программы</title>
</svelte:head>

<Modal bind:this={ modal } align="center" closable={true}>
    <p class="mb-4">Вы действительно хотите удалить эту образовательную программу?</p>
    <div class="buttons-row">
        <button type="button" on:click={removeProgram} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<FileSelect bind:modal={ firstImageModal } on:save={ firstImageSelected } />

<FileSelect bind:modal={ secondImageModal } on:save={ secondImageSelected } />

<section class="main-content">
    <div class="white-block-wide">
        <h2>Редактирование образовательной программы</h2>
        <Form
            method="PATCH"
            action="/api/admin/programs/{program.id}"
            reset={false}
            on:success={handleSuccess}
        >
            <h3>Общая информация</h3>
            <Grid m={2} ratio="2:1">
                <div>
                    <label for="title">Название</label><br />
                    <input
                        class="form-control wide"
                        type="text"
                        name="title"
                        value={program.title}
                        required
                        placeholder="Конструирование и технология электронных средств"
                    />
                </div>
                <div>
                    <label for="degree">Уровень подготовки</label><br />
                    <select
                        class="wide form-select"
                        name="degree"
                        bind:value={degree}
                    >
                        <option value="Бакалавриат">Бакалавриат</option>
                        <option value="Специалитет">Специалитет</option>
                        <option value="Магистратура">Магистратура</option>
                    </select>
                </div>
            </Grid>
            <h3>Подробная информация</h3>
            <Grid m={3} gap={2}>
                <div>
                    <label for="mode1"> Очная форма обучения </label>
                    <input
                        type="checkbox"
                        name="mode1"
                        id="mode1"
                        bind:checked={mode1}
                    />
                </div>
                <div>
                    <label for="mode2"> Очно-заочная форма обучения </label>
                    <input
                        type="checkbox"
                        name="mode2"
                        id="mode2"
                        bind:checked={mode2}
                    />
                </div>
                <div>
                    <label for="mode3"> Заочная форма обучения </label>
                    <input
                        type="checkbox"
                        name="mode3"
                        id="mode3"
                        bind:checked={mode3}
                    />
                </div>
                <div>
                    {#if mode1}
                        <label for="budget1"
                            >Количество мест - Бюджет (очно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="number"
                            name="budget1"
                            placeholder="10"
                            value={program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.budget : '0'}
                            required
                        />
                    {/if}
                </div>
                <div>
                    {#if mode2}
                        <label for="budget2"
                            >Количество мест - Бюджет (очно-заочно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="number"
                            name="budget2"
                            placeholder="10"
                            value={program.educationModes.partFullTime ? program.educationModes.partFullTime.vacantSpots.budget: '0'}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode3}
                        <label for="budget3"
                            >Количество мест - Бюджет (заочно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="number"
                            name="budget3"
                            placeholder="10"
                            value={program.educationModes.partTime ? program.educationModes.partTime.vacantSpots.budget : '0'}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode1}
                        <label for="contract1"
                            >Количество мест - Контракт (очно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="number"
                            name="contract1"
                            placeholder="10"
                            value={program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : '0'}
                            required
                        />
                    {/if}
                </div>
                <div>
                    {#if mode2}
                        <label for="contract2"
                            >Количество мест - Контракт (очно-заочно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="number"
                            name="contract2"
                            placeholder="10"
                            value={program.educationModes.partFullTime ? program.educationModes.partFullTime.vacantSpots.contract : '0'}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode3}
                        <label for="contract3"
                            >Количество мест - Контракт (заочно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="number"
                            name="contract3"
                            placeholder="10"
                            value={program.educationModes.partTime ? program.educationModes.partTime.vacantSpots.contract : '0'}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode1}
                        <label for="period1">Срок обучения (очно)</label><br />
                        <input
                            class="form-control wide"
                            type="text"
                            name="period1"
                            placeholder="2 года и 6 месяцев"
                            value={program.educationModes.fullTime ? program.educationModes.fullTime.duration : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode2}
                        <label for="period2">Срок обучения (очно-заочно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="text"
                            name="period2"
                            value={program.educationModes.partFullTime ? program.educationModes.partFullTime.duration : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode3}
                        <label for="period3">Срок обучения (заочно)</label><br
                        />
                        <input
                            class="form-control wide"
                            type="text"
                            name="period3"
                            value={program.educationModes.partTime ? program.educationModes.partTime.duration : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode1}
                        <label for="price1">Стоимость обучения (очно)</label><br
                        />
                        <small
                            >Только число (без слова "от" и символа рубля)</small
                        ><br />
                        <input
                            class="form-control wide"
                            type="text"
                            name="price1"
                            placeholder="170 000"
                            value={program.educationModes.fullTime ? program.educationModes.fullTime.price : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode2}
                        <label for="price2"
                            >Стоимость обучения (очно-заочно)</label
                        ><br />
                        <small
                            >Только число (без слова "от" и символа рубля)</small
                        ><br />
                        <input
                            class="form-control wide"
                            type="text"
                            name="price2"
                            value={program.educationModes.partFullTime ? program.educationModes.partFullTime.price : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode3}
                        <label for="price3">Стоимость обучения (заочно)</label
                        ><br />
                        <small
                            >Только число (без слова "от" и символа рубля)</small
                        ><br />
                        <input
                            class="form-control wide"
                            type="text"
                            name="price3"
                            value={program.educationModes.partTime.price ? program.educationModes.partTime.price : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode1}
                        <label for="language1">Язык освоения (очно)</label><br
                        />
                        <input
                            class="form-control wide"
                            type="text"
                            name="language1"
                            placeholder="Русский, Английский"
                            value={program.educationModes.fullTime ? program.educationModes.fullTime.languages : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode2}
                        <label for="language2"
                            >Язык освоения (очно-заочно)</label
                        ><br />
                        <input
                            class="form-control wide"
                            type="text"
                            name="language2"
                            placeholder="Русский, Английский"
                            value={program.educationModes.partFullTime ? program.educationModes.partFullTime.languages : ''}
                        />
                    {/if}
                </div>
                <div>
                    {#if mode3}
                        <label for="language3">Язык освоения (заочно)</label><br
                        />
                        <input
                            class="form-control wide"
                            type="text"
                            name="language3"
                            placeholder="Русский, Английский"
                            value={program.educationModes.partTime ? program.educationModes.partTime.languages: ''}
                        />
                    {/if}
                </div>
                <div>
                    <label for="directions"
                        >Направления подготовки (каждое с новой строки)</label
                    ><br />
                    <textarea class="form-control" name="directions" cols="30" rows="4" value={directions} />
                </div>
            </Grid>
            {#if degree != DegreeLevel.MASTER}
                <h3>Экзамены</h3>
                <Grid m={1}>
                    {#each Object.values(exams) as exam, i}
                        {#if exams[i] != undefined}
                            <div transition:slide|local={{ duration: 200 }} class="grid grid-2 m-grid-1">
                                <div>
                                    <label for="exam{i + 1}"
                                        >Название экзамена</label
                                    ><br />
                                    <input
                                        class="form-control wide"
                                        type="text"
                                        name="exam{i + 1}"
                                        value={exam.title}
                                        required
                                    />
                                </div>
                                <div>
                                    <label for="result{i + 1}"
                                        >Минимальный балл</label
                                    ><br />
                                    <input
                                        class="form-control wide"
                                        type="number"
                                        name="result{i + 1}"
                                        value={exam.result}
                                        required
                                    />
                                </div>
                            </div>
                        {/if}
                    {/each}
                </Grid>
                <div class="buttons-row">
                    {#if examsCount < 5}
                        <button
                            type="button"
                            on:click={addExam}
                            class="btn btn-outline-primary">Добавить экзамен</button
                        >
                    {/if}
                    {#if examsCount > 1}
                        <button
                            type="button"
                            on:click={removeExam}
                            class="btn btn btn-outline-danger">Удалить экзамен</button
                        >
                    {/if}
                </div>
            {/if}
            <h3>Руководитель программы</h3>
            <Grid m={3}>
                <div>
                    <label for="teacher_name">ФИО</label><br />
                    <input
                        class="form-control wide"
                        type="text"
                        name="teacher_name"
                        value={program.teacher.name}
                        required
                    />
                </div>
                <div>
                    <label for="teacher_caption">Учёные звания</label><br />
                    <input
                        class="form-control wide"
                        type="text"
                        name="teacher_caption"
                        value={program.teacher.caption}
                        required
                    />
                </div>
                <div />
                <div>
                    <label for="teacher_phone">Телефон</label><br />
                    <input
                        class="form-control wide"
                        type="text"
                        use:imask={phoneMask}
                        name="teacher_phone"
                        value={program.teacher.phone}
                    />
                </div>
                <div>
                    <label for="teacher_email">Email</label><br />
                    <input
                        class="form-control wide"
                        type="email"
                        name="teacher_email"
                        value={program.teacher.email}
                    />
                </div>
                <div />
            </Grid>
            <h3>Описание программы</h3>
            <Grid m={2} ratio="2:1">
                <TipTap name="text" content={program.text} />
            </Grid>
            <h3>Отзывы</h3>
            <Grid m={2} ratio="1:2">
                {#each range(1, feedbacksCount) as i}
                    { @const feedback = program.feedbacks ? program.feedbacks[i - 1] : null}
                    <Grid m={1}>
                        <div>
                            <label for="feedback_name{i}">ФИО</label><br />
                            <input
                                class="form-control wide"
                                type="text"
                                name="feedback_name{i}"
                                value={feedback?.name || null}
                            />
                        </div>
                        <div>
                            <label for="feedback_caption{i}">Подпись</label><br />
                            <input
                                class="form-control wide"
                                type="text"
                                name="feedback_caption{i}"
                                value={feedback?.caption || null}
                            />
                        </div>
                        <div>
                            <label for="feedback_img{i}">Добавить новое изображение:</label><br />
                            {#if i == 1}
                                {#if firstImagePath}
                                    <img width="150px" height="150px" src={firstImagePath} class="img-fluid mt-3" alt="Изображение">
                                    <br />

                                {:else}
                                    <img width="150px" height="150px" src={feedback?.img} class="img-fluid mt-3" alt="Изображение">
                                    <br />
                                {/if}
                                <input type="hidden" name="feedback_img{i}" value={ firstImageId }><br />
                                <button type="button" class="btn btn-outline-success" on:click={ firstImageModal.open }> { firstImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                            {:else if i == 2}
                                {#if secondImagePath}
                                    <img width="150px" height="150px" src={secondImagePath} class="img-fluid mt-3" alt="Изображение">
                                    <br />
                                {:else}
                                    <img width="150px" height="150px" src={feedback?.img} class="img-fluid mt-3" alt="Изображение">
                                    <br />
                                {/if}
                                <input type="hidden" name="feedback_img{i}" value={ secondImageId }><br />
                                <button type="button" class="btn btn-outline-success" on:click={ secondImageModal.open }> { secondImageId ? 'Файл выбран' : 'Выбрать файл' } </button>
                            {/if}
                        </div>
                    </Grid>
                    <div>
                        <label for="feedback_text{i}">Текст отзыва</label><br />
                        <textarea class="form-control" name="feedback_text{i}" cols="30" rows="10">{feedback?.text || null}</textarea>
                    </div>
                {/each}
            </Grid>
            { #if feedbacksCount < 2}
                <div class="align-center">
                    <RoundButton
                        variant="plus"
                        size="M"
                        on:click={() => (feedbacksCount++)}
                    />
                </div>
            {/if}
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click={modal.open} class="btn btn-danger">Удалить</button>
                <button type="button" on:click|preventDefault={ () => window.history.back() } class="btn btn-outline-secondary">Вернуться назад</button>
            </div>
        </Form>
    </div>
</section>
