<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities.js'
    
    export const load: Load = async ({ fetch }) => {
        const resGraduates = await fetch(apiRoute('admin/graduate'))
        const graduates = (await resGraduates.json()).graduates

        const resPartners = await fetch(apiRoute('admin/partner'))
        const partners = (await resPartners.json()).partners

        const resCarouselAbout = await fetch(apiRoute('admin/carousel/?name=about'))
        const carouselAboutImages = (await resCarouselAbout.json()).images

        const resCarouselLife = await fetch(apiRoute('admin/carousel/?name=life'))
        const carouselLifeImages = (await resCarouselLife.json()).images

        const resFeatures = await fetch(apiRoute('admin/feature/?type=main'))
        const features = (await resFeatures.json()).features

        const resPosts = await fetch(apiRoute('admin/post'))
        const posts = (await resPosts.json()).posts

        const resInfo = await fetch(apiRoute('admin/textinfo/?page=main'))
        const info = (await resInfo.json()).info

        const resVideos = await fetch(apiRoute('admin/documents?type=video'))
        const videos = (await resVideos.json()).documents

        if (resGraduates.ok && resPartners.ok && resCarouselAbout.ok && resCarouselLife.ok && resFeatures.ok && resPosts.ok && resVideos.ok) {
            return {
                props: {
                    graduates,
                    partners,
                    carouselAboutImages,
                    carouselLifeImages,
                    features,
                    posts,
                    videos,
                    pageInfo: info
                }
            }
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import {
        Nav,
        Grid,
        Link,
        Icon,
        Text,
        Slide,
        Button,
        Header,
        Slider,
        Heading,
        Partner,
        Benefit,
        Graduate,
        Carousel,
        NewsCard,
        Preloader,
        VideoCard,
        RoundButton
    } from '$components'
    import images1 from '$lib/images1'
    import images2 from '$lib/images2'
    import { getSequentialPartialIndexes } from '$lib/utilities'
    import { modal, mobileMenu, commonHeaderState } from '$lib/stores'
    import type { IDocument, IFeature, IPartner, IGraduate, IPost } from '../types'

    export let features: IFeature[] = []
    export let posts: IPost[] = []
    export let partners: IPartner[] = []
    export let videos: IDocument[] = []
    export let pageInfo: Record<string, string> = {}
    export let graduates: IGraduate[] = []

    let showPreloader = true
    let pageLoaded = false

    onMount(() => {
        pageLoaded = true
        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Институт новых материалов и технологий</title>
    <meta property="og:image" content="https://inmt-priem.urfu.ru/img/snippet-inmt.jpg" />
    <meta property="vk:image" content="https://inmt-priem.urfu.ru/img/snippet-inmt.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 }>
    <div class="content">
        <div class="header-layout">
            <div>
                <a data-sveltekit-reload href="/">
                    <Icon name="urfu-logo-colourful" width={140} height={48} alt="Логотип Уральского федерального университета"/>
                </a>
            </div>
            <div class="mobile-hide">
                <Icon name="menu-icon-gray" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ () => $commonHeaderState = true }/>
            </div>
            <Nav className="mobile-hide">
                <Link color="black" lineWidth={ 3 } href="#about" variant="hover">Об институте</Link>
                <Link color="black" lineWidth={ 3 } href="#levels" variant="hover">Уровни подготовки</Link>
                <Link color="black" lineWidth={ 3 } href="#partners" variant="hover">Партнёры</Link>
                <Link color="black" lineWidth={ 3 } href="#schoolarship" variant="hover">Стипендии</Link>
            </Nav>
            <div class="mobile-hide align-right">
                <Button href="https://priem.urfu.ru" target="_BLANK">Подать документы</Button>
            </div>
            <div class="pc-hide align-right">
                <Icon name="menu-icon-gray-fill" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ $mobileMenu.open }/>
            </div>
        </div>
    </div>
</Header>
<div class="escape-header">
    { #if posts?.length }
        <Slider let:showPrevPage let:showNextPage duration={ 15 }>
            { #each posts as post (post.id) }
                <Slide img={ post.img }>
                    <Heading size={2} className="white-text">{ post.title }</Heading>
                    <Text className="heading-3">{ post.text }</Text>
                    { #each post.links as link, i (i) }
                        <Link href={ link.url } variant="interactive" color="white" lineWidth={ 2 }>{ link.text }</Link><br /><br />
                    { /each }
                    <svelte:fragment slot="buttons">
                        <RoundButton theme="bright" size="M" variant="left" on:click={ showPrevPage } />
                        <RoundButton theme="bright" size="M" variant="right" on:click={ showNextPage } />
                    </svelte:fragment>
                </Slide>
            { /each }
        </Slider>
        <br />
    { /if }
    { #if pageInfo?.aboutInstituteText || features?.length }
    <section class="info-1" id="about">
        <div class="content">
            <Grid m={2} s={1} alignItems="end">
                <div class="about-left">
                    <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.5}>Об институте</Heading>
                    { #if pageInfo?.aboutInstituteText }
                        <Text id="NqY1">{ pageInfo.aboutInstituteText }</Text>
                    { /if }
                </div>
                { #if features?.length }
                    <div>
                        <Grid m={2}>
                            { #each features as feature }
                                <Benefit
                                    num={ feature.title }
                                    caption={ feature.description }
                                />
                            { /each }
                        </Grid>
                    </div>
                { /if }
            </Grid>
        </div>
    </section>
    { /if }
    { #if images1?.length }
        <section class="images-1">
            <Carousel margin={10}>
                { #each images1 as src }
                    <img {src} alt={ src }>
                { /each }
            </Carousel>
        </section>
    { /if }
    <section id="levels">
        <div class="content">
            <Grid m={3} s={1}>
                <Heading size={1} className="blue-text" marginTop={0}>Уровни подготовки</Heading>
                <Text className="heading-3" marginTop={0}>Институт дает студентам прочные знания об устройстве современных машин и механизмов, применении новых материалов и технологий в металлургии, машиностроении, строительстве, позволяет работать над реальными проектами. </Text>
                <Text marginTop={0} className="mobile-hide">Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
            </Grid>
            <br />
            <Grid m={3} s={1}>
                <a href="/bachelor">
                    <NewsCard img="/img/bachelor-inmt.jpg">
                        <svelte:fragment slot="title">Бакалавриат и специалитет</svelte:fragment>
                        <Text marginY={0}>
                            <span class="red-text">19</span>
                            <span class="semi-transparent">образовательных программ</span>
                        </Text>
                    </NewsCard>
                </a>
                <a href="/master">
                    <NewsCard img="/img/master-inmt.jpg">
                        <svelte:fragment slot="title">Магистратура</svelte:fragment>
                        <Text marginY={0}>
                            <span class="red-text">26</span>
                            <span class="semi-transparent">образовательных программ</span>
                        </Text>
                    </NewsCard>
                </a>
                <a href="https://aspirant.urfu.ru/ru/aspirantura/" target="_BLANK">
                    <NewsCard img="/img/postgraduate-inmt.jpg">
                        <svelte:fragment slot="title">Аспирантура</svelte:fragment>
                        <Text marginY={0}>
                            <span class="red-text">21</span>
                            <span class="semi-transparent">образовательная программа</span>
                        </Text>
                    </NewsCard>
                </a>
            </Grid>
            <Text marginBottom={0} marginTop={1.5} className="pc-hide">Выпускники способны создавать новые материалы с уникальными свойствами, проектировать конструкции, схемы, алгоритмы, технологии производства материалов, машин и оборудования, разрабатывать бизнес-планы создания технических новинок, управлять созданными машинами и обслуживать их, руководить промышленными предприятиями.</Text>
        </div>
    </section>
    { #if partners?.length }
        <section id="partners">
            <div class="content">
                <Grid m={2} s={1}>
                    <Heading size={1} className="blue-text" marginTop={0}>Партнеры института</Heading>
                </Grid>
            </div>
            <Carousel margin={0} className="mobile-hide" displayButtons={ partners && partners.length > 6 }>
                { #each getSequentialPartialIndexes(partners, 6) as range }
                    <div class="fill-width">
                        <div class="content">
                            <Grid s={3} m={6} className="my-4" alignItems="start">
                                { #each range as i (partners[i].id) }
                                    <Partner src={ partners[i].logo } />
                                { /each }
                            </Grid>
                        </div>
                    </div>
                { /each }
            </Carousel>
            <Carousel margin={15} className="pc-hide" displayButtons={ partners && partners.length > 6 }>
                { #each partners as partner (partner.id) }
                    <div>
                        <Partner src={ partner.logo } />
                    </div>
                { /each }
            </Carousel>
        </section>
    { /if }
    { #if graduates?.length }
        <section id="graduates">
            <div class="content">
                <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.5}>Известные выпускники</Heading>
            </div>
            <Carousel margin={0} className="mobile-hide" displayButtons={ graduates && graduates.length > 6 }>
                { @const grad = graduates.filter(graduate => graduate.photo.length) }
                { #each getSequentialPartialIndexes(grad, 6) as range }
                    <div class="fill-width">
                        <div class="content">
                            <Grid s={3} m={6} className="my-4" alignItems="stretch">
                                { #each range as i }
                                { @const graduate = grad[i] }
                                    <Graduate headingSize={4} size="S" {...graduate} src={graduate.photo} />
                                { /each }
                            </Grid>
                        </div>
                    </div>
                { /each }
            </Carousel>
            <div class="content pc-hide">
                <div class="mobile-horizontal-scroll">
                    { #each graduates.filter(graduate => graduate.photo.length) as graduate }
                        <Graduate headingSize={4} inline size="M" {...graduate} src={graduate.photo} />
                    { /each }
                </div>
            </div>
        </section>
    { /if }
    { #if videos?.length }
        <section id="students">
            <div class="content">
                <Grid m={2} s={1} ratio="1:2">
                    <div>
                        <Heading size={1} className="blue-text" marginTop={0} marginBottom={0.75}>Институт глазами студентов</Heading>
                        { #if pageInfo.videoText }
                            <Text id="jz91" marginTop={0}>{ pageInfo.videoText }</Text>
                        { /if }
                        <Button className="mobile-hide" on:click={ $modal.open }>Получить консультацию</Button>
                    </div>
                    <Grid m={4} className="mobile-horizontal-scroll">
                        { #each videos as video (video.id) }
                            <VideoCard src={ video.src } />
                        { /each }
                    </Grid>
                </Grid>
                <br class="pc-hide" />
                <br class="pc-hide" />
                <Button className="pc-hide wide" on:click={ $modal.open }>Поступить</Button>
            </div>
        </section>
    { /if }
    <section id="schoolarship">
        <div class="content">
            <Grid m={3} s={1} gap={2}>
                <Heading size={1} className="blue-text" marginTop={0}>Именные стипендии</Heading>
                <Text className="heading-3" marginTop={0}>Поддержка инициатив талантливых и активных студентов от фондов, корпораций и будущих работодателей</Text>
                <Text marginTop={0}>
                    Стипендии назначаются дополнительно к государственной академической стипендии, а также дополнительно к повышенной государственной академической стипендии за достижения в учебной, научно-исследовательской, общественной, культурно-творческой и спортивной деятельности.
                    <br /><br />
                    <Button className="mobile-hide" href="https://urfu.ru/ru/students/study/scholarships/imennye-stipendii/" target="_BLANK">Актуальный перечень</Button>
                    <Button className="wide pc-hide" href="https://urfu.ru/ru/students/study/scholarships/imennye-stipendii/" target="_BLANK">Актуальный перечень</Button>
                </Text>
            </Grid>
        </div>
    </section>
    { #if images2?.length }
        <section id="student-life">
            <div class="content">
                <Grid m={2} s={1} gap={2} ratio="2:3">
                    <Heading size={1} className="blue-text" marginTop={0}>Студенческая жизнь</Heading>
                    { #if pageInfo?.studentLifeCaption }
                        <Text className="heading-3" marginTop={0}>{ pageInfo.studentLifeCaption }</Text>
                    { /if }
                </Grid>
            </div>
            <Carousel margin={10}>
                { #each images2 as src }
                    <img {src} alt={ src } />
                { /each }
            </Carousel>
        </section>
    { /if }
</div>
