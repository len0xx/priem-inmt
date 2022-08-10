<script context="module" lang="ts">
    // import { sendNodeAJAX } from '../../../shared/utilities'
    import type { Load } from '@sveltejs/kit'
    
    export const load: Load = () => {
        // const loggedIn = !!(session.loggedIn)

        // if (!loggedIn) {
        //     return {
        //         status: 302,
        //         redirect: '/admin-panel/auth/login'
        //     }
        // }

        return {
            props: {
                programs: [{
                    title: 'Живые системы. Перспективные химико-фармацевтические и биотехнологии: исследования и разработки',
                    vacantSpots: [
                        [46, 4]
                    ],
                    price: ['170 400'],
                    duration: ['2 года'],
                    teacher: {
                        name: 'Козицина Алиса Николаевна',
                        position: 'Доктор химических наук <br /> Заведующий кафедрой, директор',
                        tel: '+7 (343) 375-97-56',
                        email: 'a.n.kozitsina@urfu.ru',
                        photo: '/teacher/Козицина.jpg'
                    },
                    languages: ['Русский'],
                    educationModes: ['Очно'],
                    directions: [
                        '04.04.01 Химия',
                        '18.04.01 Химическая технология',
                        '19.04.01 Биотехнология'
                    ],
                    degree: 'Бакалавриат',
                    feedbacks: [
                        {
                            name: 'Маргарита Медведева',
                            photo: '',
                            position: 'аспирант (участник проекта РНФ-2021)',
                            text: `Достоинством направления "Живые системы" является возможность изучения новых курсов, которые позволяют не только более подробно углубиться в интересующие тебя темы, но и изучить совершенно новые современные направления, получив тем самым дополнительные навыки.<br /><br />
                            Моим научным направлением является создание электрохимических сенсоров и портативных систем. Для более глубокого понимания этой темы курсы по биоинформатике, молекулярной биологии были не просто интересны, а были очень необходимы мне, т.к. мой диплом бакалавра узко химический. Сегодня для создания прорывных идей, технологий, для активной интеграции с предприятиями невозможно работать в узком поле, только междисциплинарном.`
                        }
                    ],
                    text: `Осуществляется подготовка учёных и специалистов для работы в области биологической и медицинской химии, химико-фармацевтических и биотехнологий, перспективных органических материалов.<br /><br />

                        В рамках программы вы получите конкурентоспособное образование в области живых систем, перспективных химико-фармацевтических и биотехнологий  через прикладную и фундаментальную науку мирового уровня.<br /><br />

                        Базовая площадка - Инновационный центр химико-фармацевтических технологий УрФУ с молодежной командой  и самым современным оборудованием.<br /><br />

                        <h4>Предлагаем два трека: академический и прикладной.</h4>

                        <ul>
                        <li>После окончания академического трека магистратуры выпускники - аспиранты продолжают начатые в рамках своих проектов исследования и в течение короткого срока - 2-3 лет, получают степень кандидата наук с последующим продвижением академического карьерного роста. Возможно занимать позиции ключевых исследователей и руководителей R&D центров в фарм-, биомед- и биотех компаниях.</li>

                        <li>После окончания прикладного трека многие наши выпускники, выполняя свои проекты совместно с сетевыми партнерами трудоустроены. 80% наших выпускников находятся на позициях начальников отделов, лабораторий крупных и средних предприятий.</li>
                        </ul>

                        В рамках программы вы получите конкурентоспособное образование в области живых систем, перспективных химико-фармацевтических и биотехнологий  через прикладную и фундаментальную науку мирового уровня. Программа сочетает богатую историю и традиции научных школ с новаторским подходом современного индивидуального образования.

                        <h4>Базовая площадка</h4>
                        Инновационный центр химико-фармацевтических технологий УрФУ с молодежной командой  и самым современным оборудованием.

                        <h4>Бизнес партнеры</h4>
                        Биофармацевтическая компания «Биокад», завод «Медсинтез», «Р-Фарм», «Герофарм», компания «Элта», «Отисифарм», Государственный научный центр вирусологии и биотехнологии «Вектор», биохимические лаборатории Роспотребнадзора и др. ведомств, контрактные исследовательские организации (CRO)

                        <h4>Академические партнеры:</h4>
                        Новосибирский государственный университет, Казанский федеральный университет, Институт органического синтеза УрО РАН, НИИ онкологии им. Петрова, университет Антверпена (Бельгия), Университет Тор-Вергата (Рим, Италия), Университет Маккуори (Сидней, Австралия)`
                }]
            }
        }
    }
</script>

<script lang="ts">
    import { Grid, Card } from '$lib/components'

    export let programs: any[]

    const programsSpec = programs.filter(program => program.degree == 'Специалитет')
    const programsBach = programs.filter(program => program.degree == 'Бакалавриат')
    const programsMast = programs.filter(program => program.degree == 'Магистратура')
</script>

<svelte:head>
    <title>Образовательные программы</title>
</svelte:head>

<section class="main-content">
    <div class="white-block-wide">
        <h2 class="no-top-margin">Опубликованные образовательные программы</h2>
        <a href="/admin-panel/programs/new"><button type="button" class="btn btn-outline-primary">Создать новую программу</button></a>
        <h3>Специалитет{ programsSpec.length ? ` (${programsSpec.length})` : '' }</h3>
        { #if programsSpec.length }
            <Grid s={1} m={2} l={3}>
                { #each programsSpec as program }
                    <Card variant="grey" color="custom">
                        <svelte:fragment slot="title"><a href="/program/{ program._id }">{ program.title }</a></svelte:fragment>
                        <svelte:fragment slot="left">{ program.vacantSpots.length ? program.vacantSpots[0][0] : 'NaN' } бюджет { program.vacantSpots.length ? program.vacantSpots[0][1] : 'NaN' } контракт</svelte:fragment>
                        <svelte:fragment slot="right">от { program.price.length ? program.price[0] : 'NaN' } ₽</svelte:fragment>
                    </Card>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
        <h3>Бакалавриат{ programsBach.length ? ` (${programsBach.length})` : '' }</h3>
        { #if programsBach.length }
            <Grid s={1} m={2} l={3}>
                { #each programsBach as program }
                    <Card variant="grey" color="custom">
                        <svelte:fragment slot="title"><a href="/program/{ program._id }">{ program.title }</a></svelte:fragment>
                        <svelte:fragment slot="left">{ program.vacantSpots.length ? program.vacantSpots[0][0] : 'NaN' } бюджет { program.vacantSpots.length ? program.vacantSpots[0][1] : 'NaN' } контракт</svelte:fragment>
                        <svelte:fragment slot="right">от { program.price.length ? program.price[0] : 'NaN' } ₽</svelte:fragment>
                    </Card>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
        <h3>Магистратура{ programsMast.length ? ` (${programsMast.length})` : '' }</h3>
        { #if programsMast.length }
            <Grid s={1} m={2} l={3}>
                { #each programsMast as program }
                    <Card variant="grey" color="custom">
                        <svelte:fragment slot="title"><a href="/program/{ program._id }">{ program.title }</a></svelte:fragment>
                        <svelte:fragment slot="left">{ program.vacantSpots.length ? program.vacantSpots[0][0] : 'NaN' } бюджет { program.vacantSpots.length ? program.vacantSpots[0][1] : 'NaN' } контракт</svelte:fragment>
                        <svelte:fragment slot="right">от { program.price.length ? program.price[0] : 'NaN' } ₽</svelte:fragment>
                    </Card>
                { /each }
            </Grid>
        { :else }
            <p>Здесь ещё нет образовательных программ</p>
        { /if }
    </div>
</section>
