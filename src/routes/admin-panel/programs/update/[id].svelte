<script context="module" lang="ts">
    // import { sendNodeAJAX } from '../../../shared/utilities'
    import type { Load } from '@sveltejs/kit'

    export const load: Load = async ({ fetch, params }) => {
        const programId = params.id
        const res = await fetch(`http://localhost:8080/api/program/${programId}`)
        const programResult = (await res.json()).program

        if (res.ok) {
            return { props: { program: programResult } }
        }
    }
</script>

<script lang="ts">
    import { imask } from 'svelte-imask'
    import { Grid, AjaxForm, RoundButton, TipTap, Modal } from '$lib/components'
    import { modal } from '$lib/stores'
    import { DegreeLevel } from '../../../../types/enums'
    import type { EducationalProgram } from '../../../../types'
    import { redirect } from '$lib/utilities'

    let phoneMask = {
        mask: '+{7}-(000)-000-0000',
    }

    export let program: EducationalProgram
    let directions = (Object.values(program.directions)).join('\n')

    let feedbacksExpanded = false
    let feedbacks = program.feedbacks
    let feedbacksCount = Object.keys(program.feedbacks).length
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
            console.log(exams)
            return
        }
    }

    const removeExam = () => {
        exams[examsCount - 1] = undefined
        examsCount --
    }

    let updateError = false
    let deleteError = false

    const removeProgram = async () => {
        const res = await fetch(`http://localhost:8080/api/program/${program.id}`, { method: 'DELETE' })
        if (res.ok) {
            redirect('/admin-panel/programs')
        } else {
            deleteError = true
        }
    }

    const handleSuccess = () => {
        redirect('/admin-panel/programs')
    }

    const handleError = () => {
        updateError = true
    }
</script>

<svelte:head>
    <title>Образовательные программы</title>
</svelte:head>

<Modal bind:this={ $modal } align="center" closable={true}>
    <p class="mb-4">Подтвердите удаление образовательной программы</p>
    <div class="buttons-row">
        <button type="button" on:click={removeProgram} class="btn btn-danger">Удалить</button>
        <button type="button" on:click={$modal.close} class="btn btn-secondary">Отмена</button>
    </div>
</Modal>

<section class="main-content">
    <div class="white-block-wide">
        <h2>Редактирование образовательной программы</h2>
        <AjaxForm
            method="PATCH"
            action="/api/program/{program.id}"
            noReset={false}
            on:success={handleSuccess}
            on:error={handleError}
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
                <Grid m={2}>
                    {#each Object.values(exams) as exam, i}
                        {#if exams[i] != undefined}
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
                                    type="text"
                                    name="result{i + 1}"
                                    value={exam.result}
                                    required
                                />
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
                {#each Object.values(feedbacks) as feedback, i}
                    <div>
                        <div>
                            <label for="feedback_name{i + 1}">ФИО</label><br />
                            <input
                                class="form-control wide"
                                type="text"
                                name="feedback_name{i + 1}"
                                value={feedback.name}
                            />
                        </div>
                        <div>
                            <label for="feedback_caption{i + 1}">Подпись</label><br />
                            <input
                                class="form-control wide"
                                type="text"
                                name="feedback_caption{i + 1}"
                                value={feedback.caption}
                            />
                        </div>
                    </div>
                    <div>
                        <label for="feedback_text{i + 1}">Текст отзыва</label><br />
                        <textarea class="form-control" name="feedback_text{i + 1}" cols="30" rows="10">{feedback.text}</textarea>
                    </div>
                {/each}
            </Grid>
            {#if feedbacksExpanded}
                <Grid m={2} ratio="1:2">
                    <div>
                        <div>
                            <label for="feedback_name2">ФИО</label><br />
                            <input
                                class="form-control wide"
                                type="text"
                                name="feedback_name2"
                            />
                        </div>
                        <div>
                            <label for="feedback_caption2">Подпись</label><br />
                            <input
                                class="form-control wide"
                                type="text"
                                name="feedback_caption2"
                            />
                        </div>
                    </div>
                    <div>
                        <label for="feedback_text2">Текст отзыва</label><br />
                        <textarea class="form-control" name="feedback_text2" cols="30" rows="10" />
                    </div>
                </Grid>
            {:else if feedbacksCount < 2}
                <div class="align-center">
                    <RoundButton
                        variant="plus"
                        size="M"
                        on:click={() => (feedbacksExpanded = true)}
                    />
                </div>
            {/if}
            <br />
            <div class="buttons-row">
                <button class="btn btn-primary">Сохранить</button>
                <button type="button" on:click={$modal.open} class="btn btn-danger">Удалить</button>
            </div>
        </AjaxForm>
        <div class="alerts mt-4">
            {#if updateError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка во время обновления программы
                </div>
            {/if}
            {#if deleteError}
                <div class="alert alert-danger" role="alert">
                    Произошла ошибка во время удаления программы
                </div>
            {/if}
        </div>
    </div>
</section>
