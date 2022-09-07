<script context="module" lang="ts">
    import { apiRoute } from '$lib/utilities'
    import type { Load } from '@sveltejs/kit'

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
    import { isMobile } from '$lib/stores'
    import { slide, blur } from 'svelte/transition'
    import type { EducationalProgram, ModalComponent } from '../../../../types'

    let modal: ModalComponent = null

    let imageModals: ModalComponent[] = []
    let imageIds: number[] = []
    let imagePaths: string[] = []
    
    let teacherImageModal: ModalComponent = null
    let teacherImageId: number = null
    let teacherImagePath: string = null

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

    const removeExam = (index?: number) => {
        const finalIndex = index !== undefined || index !== null ? index : examsCount - 1
        exams = exams.filter((_exam, i) => i !== finalIndex)
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
        imageIds[0] = event.detail.id
        imagePaths[0] = event.detail.path
    }

    const secondImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        imageIds[1] = event.detail.id
        imagePaths[1] = event.detail.path
    }

    const teacherImageSelected = (event: CustomEvent<{id: number, path: string}>) => {
        teacherImageId = event.detail.id
        teacherImagePath = event.detail.path
    }
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

<FileSelect bind:modal={ imageModals[0] } on:save={ firstImageSelected } />

<FileSelect bind:modal={ imageModals[1] } on:save={ secondImageSelected } />

<FileSelect bind:modal={ teacherImageModal } on:save={ teacherImageSelected } />

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
            <Grid m={2} s={1} ratio="2:1">
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
                    <select class="wide form-select" name="degree" bind:value={degree} >
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
                                <input class="form-control wide" type="number" name="budget1" placeholder="10" required value={program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.budget : '0'} />
                            </div>
                            <div>
                                <label for="contract1">Количество мест - Контракт (очно)</label><br />
                                <input class="form-control wide" type="number" name="contract1" placeholder="10" required value={program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : '0'} />
                            </div>
                            <div>
                                <label for="period1">Срок обучения (очно)</label><br />
                                <input class="form-control wide" type="text" name="period1" placeholder="2 года и 6 месяцев" value={program.educationModes.fullTime ? program.educationModes.fullTime.duration : ''} />
                            </div>
                            <div>
                                <label for="price1">Стоимость обучения (очно)</label><br />
                                <small>Только число (без слова "от" и символа рубля)</small><br />
                                <input class="form-control wide" type="text" name="price1" placeholder="170 000" value={program.educationModes.fullTime ? program.educationModes.fullTime.price : ''} />
                            </div>
                            <div>
                                <label for="language1">Язык освоения (очно)</label><br />
                                <input class="form-control wide" type="text" name="language1" placeholder="Русский, Английский" value={program.educationModes.fullTime ? program.educationModes.fullTime.languages : ''} />
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
                                <input class="form-control wide" type="number" name="budget2" placeholder="10" required value={program.educationModes.partFullTime ? program.educationModes.partFullTime.vacantSpots.budget: '0'} />
                            </div>
                            <div>
                                <label for="contract1">Количество мест - Контракт (очно-заочно)</label><br />
                                <input class="form-control wide" type="number" name="contract2" placeholder="10" required value={program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : '0'} />
                            </div>
                            <div>
                                <label for="period1">Срок обучения (очно-заочно)</label><br />
                                <input class="form-control wide" type="text" name="period2" placeholder="2 года и 6 месяцев" value={program.educationModes.partFullTime ? program.educationModes.partFullTime.duration : ''} />
                            </div>
                            <div>
                                <label for="price1">Стоимость обучения (очно-заочно)</label><br />
                                <small>Только число (без слова "от" и символа рубля)</small><br />
                                <input class="form-control wide" type="text" name="price2" placeholder="170 000" value={program.educationModes.partFullTime ? program.educationModes.partFullTime.price : ''} />
                            </div>
                            <div>
                                <label for="language1">Язык освоения (очно-заочно)</label><br />
                                <input class="form-control wide" type="text" name="language2" placeholder="Русский, Английский" value={program.educationModes.partFullTime ? program.educationModes.partFullTime.languages : ''} />
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
                                <input class="form-control wide" type="number" name="budget3" placeholder="10" required value={program.educationModes.partTime ? program.educationModes.partTime.vacantSpots.budget : '0'} />
                            </div>
                            <div>
                                <label for="contract1">Количество мест - Контракт (заочно)</label><br />
                                <input class="form-control wide" type="number" name="contract3" placeholder="10" required value={program.educationModes.fullTime ? program.educationModes.fullTime.vacantSpots.contract : '0'} />
                            </div>
                            <div>
                                <label for="period1">Срок обучения (заочно)</label><br />
                                <input class="form-control wide" type="text" name="period3" placeholder="2 года и 6 месяцев" value={program.educationModes.partTime ? program.educationModes.partTime.duration : ''} />
                            </div>
                            <div>
                                <label for="price1">Стоимость обучения (заочно)</label><br />
                                <small>Только число (без слова "от" и символа рубля)</small><br />
                                <input class="form-control wide" type="text" name="price3" placeholder="170 000" value={program.educationModes.partTime.price ? program.educationModes.partTime.price : ''} />
                            </div>
                            <div>
                                <label for="language1">Язык освоения (заочно)</label><br />
                                <input class="form-control wide" type="text" name="language3" placeholder="Русский, Английский" value={program.educationModes.partTime ? program.educationModes.partTime.languages: ''} />
                            </div>
                        </div>
                    { /if }
                </div>
            </Grid>
            <br />
            <div>
                <label for="directions">Направления подготовки (каждое с новой строки)</label><br />
                <textarea class="form-control" name="directions" cols="30" rows="4">{ directions }</textarea>
            </div>
            {#if degree != DegreeLevel.MASTER}
                <h3>Экзамены</h3>
                <Grid m={1}>
                    {#each exams as exam, i}
                        <div transition:slide|local={{ duration: 200 }} class="grid grid-2-plus-btn m-grid-1">
                            <div>
                                <label for="exam{i + 1}">Название экзамена</label><br />
                                <input
                                    class="form-control wide"
                                    type="text"
                                    name="exam{i + 1}"
                                    value={exam.title}
                                    required
                                />
                            </div>
                            <div>
                                <label for="result{i + 1}">Минимальный балл</label><br />
                                <input
                                    class="form-control wide"
                                    type="number"
                                    name="result{i + 1}"
                                    value={exam.result}
                                    required
                                />
                            </div>
                            {#if examsCount > 1}
                                <button type="button" on:click={ () => removeExam(i) } transition:blur|local={{ duration: 200 }} class="btn btn btn-outline-danger">Удалить экзамен</button >
                            {/if}
                        </div>
                    {/each}
                </Grid>
                <div class="buttons-row">
                    {#if examsCount < 5}
                        <button type="button" on:click={addExam} class="btn btn-outline-primary">Добавить экзамен</button>
                    {/if}
                </div>
            {/if}
            <h3>Руководитель программы</h3>
            <Grid l={3} m={2} s={1}>
                <div>
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
                    <br />
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
                </div>
                <div>
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
                    <br />
                    <div>
                        <label for="teacher_email">Email</label><br />
                        <input
                            class="form-control wide"
                            type="email"
                            name="teacher_email"
                            value={program.teacher.email}
                        />
                    </div>
                </div>
                <div>
                    <label for="teacher_photo">Фотография:</label><br />
                    {#if teacherImagePath}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img width="150px" height="150px" src={teacherImagePath} class="img-fluid mt-3">
                        <br />
                    {:else if program.teacher.photo}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img width="150px" height="150px" src={program.teacher.photo} class="img-fluid mt-3">
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
                <TipTap name="text" content={program.text} />
            </div>
            <h3>Отзывы</h3>
            {#each range(1, feedbacksCount) as i}
                <Grid l={2} m={1} s={1} ratio="1:2">
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
                            <label for="feedback_img{i}">Изображение:</label><br />
                            { #if imagePaths[i - 1] }
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <img width="150px" height="150px" src={imagePaths[i - 1]} class="img-fluid mt-3">
                                <br />
                            { :else if feedback?.img }
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <img width="150px" height="150px" src={feedback?.img} class="img-fluid mt-3">
                                <br />
                            { /if }
                            <input type="hidden" name="feedback_img{i}" value={ imageIds[i - 1] || '' }><br />
                            {#if $isMobile}
                                <p class="text-secondary mt-2 mb-0">Выбор изображения на данный момент недоступен, попробуйте на персональном компьютере</p>
                            {:else}
                                <button type="button" class="btn btn-outline-success" on:click={ imageModals[i - 1].open }> { imageIds[i - 1] ? 'Файл выбран' : 'Выбрать файл' } </button>
                            {/if}
                        </div>
                    </Grid>
                    <div>
                        <label for="feedback_text{i}">Текст отзыва</label><br />
                        <textarea class="form-control" name="feedback_text{i}" cols="30" rows="10">{feedback?.text || null}</textarea>
                    </div>
                </Grid>
                <br />
            {/each}
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
