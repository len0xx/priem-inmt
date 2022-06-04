<script lang="ts">
    import Grid from './Grid.svelte'
    import Text from './Text.svelte'
    import Button from './Button.svelte'
    import Heading from './Heading.svelte'
    import Partner from './Partner.svelte'
    import Profile from './Profile.svelte'
    import Rainbow from './Rainbow.svelte'
    import { createEventDispatcher, onMount } from 'svelte'
    import type { EducationMode, Degree, Exam, Teacher, Feedback } from '$lib/programs'

    const dispatch = createEventDispatcher()

    export let title: string
    export let vacantSpots: [string, string][]
    export let price: string[]
    export let text: string
    export let hidden = true
    export let partners: string[] = []
    export let languages: string[]
    export let directions: string[] = []
    export let duration: string[]
    export let degree: Degree
    export let feedbacks: Feedback[] = []
    export let educationModes: EducationMode[]
    export let exams: Exam[] = []
    export let teacher: Teacher

    let activeMode = 0

    const emitApplying = () => dispatch('apply')

    const emitCloseEvent = () => dispatch('close')

    onMount(() => {
        document.addEventListener('keyup', event => {
            if (event.key == 'Escape' && !hidden) {
                emitCloseEvent()
            }
        })
    })
</script>

<div class="sidebar-wrapper" class:hidden>
    <div class="shadow" on:click={emitCloseEvent}></div>
    <div class="sidebar">
        <div class="header">
            <div class="layout-wrapper">
                <div class="sidebar-content">
                    <div class="grid grid-2-1 m-grid-1">
                        <div>
                            <h3>{ title }</h3>
                            <div class="pills">
                                { #each educationModes as mode, i }
                                    <div class="pill" class:active={ activeMode == i } on:click={() => activeMode = i}>{ mode }</div>
                                { /each }
                            </div>
                        </div>
                        <div>
                            <ul>
                                <li>{ vacantSpots[activeMode][0] } бюджетных мест</li>
                                <li>{ vacantSpots[activeMode][1] } контрактных мест</li>
                                <li>{ price[activeMode] } в год</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="close-icon" on:click={emitCloseEvent}></div>
                <div class="button-wrapper"><Button size="S" variant="blue" on:click={emitApplying}>Подать документы</Button></div>
            </div>
        </div>
        <div class="sidebar-content">
            <div class="description">
                <br />
                <br />
                { #if degree == 'Бакалавриат' || degree == 'Специалитет' }
                    <div class="exams">
                        <Heading size={3} className="blue-text" marginTop={0}>Минимальные баллы</Heading>
                        <Grid m={2} s={1} ratio="2:3">
                            <div>
                                <Text opacity={0.6}>Обязательно:</Text>
                                { exams[0].title } <span class="blue-text exam-result">{ exams[0].result }</span><br />
                                { exams[1].title } <span class="blue-text exam-result">{ exams[1].result }</span><br />
                            </div>
                            <div>
                                <Text opacity={0.6}>По выбору:</Text>
                                { #each exams.filter((exam, i) => i > 1) as exam }
                                    { exam.title } <span class="blue-text exam-result">{ exam.result }</span><br />
                                { /each }
                            </div>
                        </Grid>
                    </div>
                    <br />
                    <br />
                { /if }
                <div class="grid grid-2-3 m-grid-1">
                    <div class="teacher">
                        <div class="teacher-img" style="background-image: url('{ teacher.photo }')"></div>
                        <div class="contents">
                            <h3 class="blue-text">{ teacher.name }</h3>
                            <p>Руководитель программы</p>
                            <p class="semi-transparent">
                                { @html teacher.position }
                            </p>
                            <p>
                                <a href="mailto:{ teacher.email }" class="link blue-color">{ teacher.email }</a>
                                <Text opacity={0.4} marginBottom={0} className="semi-bold">Отборочная комиссия:</Text>
                                <a href="tel:+7 (912) 635-52-97" class="link blue-color">+7 (912) 635-52-97</a><br />
                            </p>
                        </div>
                        <Rainbow size="S" fixed="bottom" />
                    </div>
                    <div class="info">
                        <div class="contents">
                            <p>
                                <span class="semi-transparent">Институт:</span><br />
                                Институт новых материалов и технологий
                            </p>
                            <p>
                                <span class="semi-transparent">Направление подготовки:</span><br />
                                { @html directions.join('<br />') }
                            </p>
                            <p>
                                <span class="semi-transparent">Уровень подготовки:</span><br />
                                { degree }
                            </p>
                            <p>
                                <span class="semi-transparent">Срок обучения:</span><br />
                                { duration[activeMode] }
                            </p>
                            <p>
                                <span class="semi-transparent">Язык освоения:</span><br />
                                { languages.filter((lang, pos) => languages.indexOf(lang) == pos).join(', ') }
                            </p>
                        </div>
                        <Rainbow size="S" fixed="bottom" />
                    </div>
                </div>
                <br />
                <h3 class="blue-text">О программе</h3>
                <p>
                    { @html text }
                </p>
                { #if feedbacks.length > 0 }
                    <h3 class="blue-text">Отзывы</h3>
                    <div class="feedbacks">
                        { #each feedbacks as feedback }
                            <Profile variant="white">
                                <svelte:fragment slot="name">{ feedback.name }</svelte:fragment>
                                <svelte:fragment slot="description">{ feedback.position }</svelte:fragment>
                                <svelte:fragment slot="text">{ feedback.text }</svelte:fragment>
                            </Profile>
                        { /each }
                    </div>
                    <br /><br />
                { /if }
                { #if partners && partners.length }
                    <h3 class="blue-text">Работодатели</h3>
                    <Grid m={4} s={2}>
                        { #each partners as partner }
                            <Partner size="contain" className="white-bg ww" src={ partner } />
                        { /each }
                    </Grid>
                { /if }
                <br /><br />
                <Button on:click={emitApplying} variant="blue">Поступить</Button>
                <br /><br />
                <h3 class="blue-text">Отборочная комиссия института</h3>
                <div class="grid grid-2-1 m-grid-1">
                    <div>
                        <p class="grey-text">Контакты</p>
                        <p class="subtitle">
                            <a href="tel:+7 (912) 635-52-97">+7 (912) 635-52-97</a><br />
                            <a href="mailto:ok.inmt@urfu.ru">ok.inmt@urfu.ru</a>
                        </p>
                    </div>
                    <div>
                        <p class="grey-text">Приёмная комиссия</p>
                        <p class="subtitle">
                            г. Екатеринбург,<br />
                            ул. Мира, 19
                        </p>
                    </div>
                </div>
                <br />
            </div>
        </div>
        <Rainbow size="L" />
    </div>
</div>

<style>
    .pills > .pill {
        margin-right: 1em;
    }

    .pill {
        cursor: pointer;
        display: inline-block;
        position: relative;
        padding: 0.5em 1em;
        border: 1px solid rgba(255, 255, 255, 0);
        color: white;
        border-radius: 100em;
    }

    .pill:hover,
    .pill.active {
        border: 1px solid rgba(255, 255, 255, 1);
    }

    :global(.feedbacks > *) {
        margin-bottom: 1em;
    }

    .teacher, .info, .exams {
        background-color: white;
        position: relative;
    }

    .exams {
        display: block;
        position: relative;
        box-sizing: border-box;
        padding: 2em 1em;
    }

    .teacher > .contents,
    .info > .contents {
        padding: 0.5em 1em;
        position: relative;
    }

    .teacher > .teacher-img {
        display: block;
        position: relative;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 260px;
    }

    .sidebar-wrapper {
        display: block;
        position: fixed;
        z-index: 190;
        top: 0;
        right: 0;
        width: 100%;
        min-height: 100vh;
    }

    .sidebar-wrapper.hidden .shadow {
        opacity: 0;
    }

    .sidebar {
        display: block;
        position: fixed;
        z-index: 200;
        top: 0;
        right: 0;
        width: 40vw;
        min-height: 100vh;
        background-color: #F6F6F6; 
        transform: translateX(0%);
        transition: 0.2s ease-in-out;
        height: 100%;
        overflow-y: scroll;
    }

    @media screen and (min-width: 769px) {
        .sidebar {
            min-width: 720px;
        }
    }

    @media screen and (max-width: 768px) {
        .sidebar {
            width: 100vw;
        }
            
        .header {
            min-height: 500px;
        }
    }
    
    .shadow {
        display: block;
        position: fixed;
        z-index: 199;
        width: 100vw;
        height: 100vh;
        opacity: 1;
        transition: 0.1s ease-in-out;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .sidebar-wrapper.hidden .sidebar {
        transform: translateX(100%);
    }

    .sidebar-content {
        padding: 0 2em;
        position: relative;
    }

    .sidebar-content > .grid.grid-2-1 {
        align-items: end;
    }

    .layout-wrapper {
        display: grid;
        position: relative;
        align-items: end;
        min-height: 400px;
        padding-bottom: 2em;
    }

    @media screen and (max-width: 768px) {
        .layout-wrapper {
            padding-top: 6em;
        }
    }

    .header {
        display: block;
        position: relative;
        min-height: 400px;
        background-image: url(/img/program-gradient.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: white;
    }

    .button-wrapper {
        display: block;
        position: absolute;
        top: 2em;
        right: 2em;
        z-index: 300;
    }

    .close-icon {
        display: block;
        position: absolute;
        top: 2em;
        left: 2em;
        background-image: url(/img/white-close-icon.svg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: pointer;
        width: 32px;
        height: 32px;
        z-index: 2;
    }
</style>
