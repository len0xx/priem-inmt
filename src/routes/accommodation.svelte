<script context="module" lang="ts">
    import type { Load } from '@sveltejs/kit'
    import { apiRoute } from '$lib/utilities'
    
    export const load: Load = async ({ fetch }) => {
        const documentsRes = await fetch(apiRoute('admin/documents?type=docAccommodation'))
        const rentInfoRes = await fetch(apiRoute('admin/rentInfo'))
        const settlementRes = await fetch(apiRoute('admin/settlement'))
        const dormsRes = await fetch(apiRoute('admin/dormitory'))
        const infoRes = await fetch(apiRoute('admin/textinfo/?page=accommodation'))

    
        const documents = (await documentsRes.json()).documents
        const rentInfo = (await rentInfoRes.json()).rentInfo
        const settlement = (await settlementRes.json()).responsible
        const dormitories = (await dormsRes.json()).dormitories
        const info = (await infoRes.json()).info

        if (documentsRes.ok && rentInfoRes.ok && settlementRes.ok && infoRes.ok) {
            return { props: { documents, rentInfo, settlement, dormitories, pageInfo: info } }
        }
    }
</script>

<script lang="ts">
    import { onMount } from 'svelte'
    import {
        Nav,
        Grid,
        Link,
        Text,
        Icon,
        Header,
        Teacher,
        Heading,
        Graduate,
        Document,
        Preloader
    } from '$components'
    import { modal, mobileMenu, commonHeaderState } from '$lib/stores'
    import type { DocumentI, DormitoryI, RentInfoI, SettlementI } from '../types'
    // import documents from '$lib/documents2'

    export let documents: DocumentI[] = []
    export let dormitories: DormitoryI[] = []
    export let rentInfo: RentInfoI = null
    export let settlement: SettlementI = null
    export let pageInfo: Record<string, string> = {}

    let showPreloader = true
    let pageLoaded = false
    let headerClass = ''
    let linkColor: 'white' | 'black' = 'white'

    const handleScrollUp = () => {
        setTimeout(() => {
            headerClass = ''
            linkColor = 'white'
        }, 250)
    }

    const handleScrollDown = () => {
        setTimeout(() => {
            headerClass = 'header-scrolled'
            linkColor = 'black'
        }, 200)
    }
    
    onMount(() => {
        pageLoaded = true
        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Поселение – Институт новых материалов и технологий</title>
    <meta property="og:image" content="https://inmt-priem.urfu.ru/img/snippet-accommodation.jpg" />
    <meta property="vk:image" content="https://inmt-priem.urfu.ru/img/snippet-accommodation.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 } transparent={ true } className={ headerClass } on:scroll-up={ handleScrollUp } on:scroll-down={ handleScrollDown }>
    <div class="content">
        <div class="header-layout accommodation { headerClass == 'header-scrolled' ? 'black' : 'white' }">
            <div>
                <a sveltekit:reload href="/">
                    { #if headerClass == 'header-scrolled' }
                        <Icon name="urfu-logo-colourful" width={140} height={48} alt="Логотип Уральского федерального университета"/>
                    { :else }
                        <Icon name="logo_urfu" width={142} height={48} alt="Логотип Уральского федерального университета"/>
                    { /if }
                </a>
            </div>
            <div class="mobile-hide">
                { #if headerClass == 'header-scrolled' }
                    <Icon name="menu-icon-gray" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ () => $commonHeaderState = true }/>
                { :else }
                    <Icon name="menu-icon-white" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ () => $commonHeaderState = true }/>
                { /if }
            </div>
            <Nav className="mobile-hide">
                <Link color={ linkColor } lineWidth={ 3 } href="#dorms" variant="hover">Общежития</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#responsible" variant="hover">Ответственные</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#order" variant="hover">Порядок поселения</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#distribution" variant="hover">Распределение мест</Link>
                <Link color={ linkColor } lineWidth={ 3 } href="#documents" variant="hover">Документы</Link>
            </Nav>
            <div class="pc-hide align-right">
                <Icon name="menu-icon-gray-fill" className="menu-button" width={52} height={52} alt="Кнопка открытия меню" on:click={ $mobileMenu.open }/>
            </div>
        </div>
    </div>
</Header>

<section class="promo accommodation" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>
                { pageInfo.accommodationTitle }<br />
                <span class="smaller-text">{ pageInfo.accommodationSubtitle }</span>
            </Heading>
            <div class="align-right">
                <Link on:click={ $modal.open } href="" preventDefault={true} variant="interactive" color="white" lineWidth={ 2 }>Получить консультацию</Link>
            </div>
        </Grid>
    </div>
</section>
{ #if dormitories?.length }
    <br />
    <section id="dorms">
        <div class="content">
            <Grid m={4} s={1}>
                { #each dormitories as dormitory (dormitory.id) }
                    <Graduate name={ dormitory.title } src={ dormitory.img } caption={ dormitory.address } />
                { /each }
                <!-- <Graduate name="№8" src="/img/dorm-1.jpg" caption="ул. Комсомольская 70" />
                <Graduate name="№5" src="/img/dorm-2.jpg" caption="ул. Малышева 144" />
                <Graduate name="№12" src="/img/dorm-3.jpg" caption="ул. Фонвизина 4" />
                <Graduate name="№11" src="/img/dorm-4.jpg" caption="ул. Фонвизина 2" /> -->
            </Grid>
        </div>
    </section>
{ /if }
{ #if settlement }
    <section id="responsible">
        <div class="content">
            <Grid m={2} s={1}>
                <Heading size={1} className="blue-text" marginTop={0}>Ответственный <br /> за поселение</Heading>
                <Teacher image={ settlement?.photo }>
                    <svelte:fragment slot="name">{ settlement?.name }</svelte:fragment>
                    <svelte:fragment slot="description">{ settlement?.label }</svelte:fragment>
                    <svelte:fragment slot="footer">
                        Адрес: { settlement?.address } <br />
                        Аудитория: { settlement?.auditory } <br />
                        Телефон: <a href="tel:{ settlement?.phone }">{ settlement?.phone }</a> <br />
                        Электронная почта: <a href="mailto:{ settlement?.email }">{ settlement?.email }</a>
                    </svelte:fragment>
                </Teacher>
            </Grid>
        </div>
    </section>
{ /if }
<section id="order">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Порядок поселения <br /> в общежитие</Heading>
        <Grid m={4} className="mobile-horizontal-scroll">
            <div class="numbered-section">
                <Icon name="section-1-alt-1" width={40} height={86} alt="1" />
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Медицинское обследование</Text>
                    <Text>Абитуриенты могут проходить медицинский осмотр до выхода приказов о зачислении.</Text>
                    <Text color="var(--blue)" opacity={0.6}>с 01.07</Text>
                    <!-- <Text><Link href="#programs" color="var(--blue)" lineWidth={2} variant="interactive">Необходимые документы</Link></Text> -->
                </div>
            </div>
            <div class="numbered-section">
                <Icon name="section-2-alt-1" width={40} height={86} alt="2" />
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Получение документов</Text>
                    <Text opacity={0.6} color="var(--red)">Внимание! С момента получения документов необходимо заселиться в течение 7 рабочих дней, потом документты аннулируются</Text>
                    <Text>После выхода приказов о зачислении вам выдадут:</Text>
                    <ul>
                        <li>выписку из протокола жилищной комиссии университета (ордер)</li>
                        <li>договор найма жилого помещения (3 экземпляра)</li>
                    </ul>
                    <Text>Информация о месте и времени выдачи появится в группе:</Text>
                    <Text><Link href="https://vk.com/poselinmt" color="var(--blue)" lineWidth={2} variant="interactive">ВКонтакте</Link></Text>
                </div>
            </div>
            <div class="numbered-section">
                <Icon name="section-3-alt-1" width={40} height={86} alt="3" />
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Оплата проживания в общежитии</Text>
                    <Text>Произвести оплату обеспечительного платежа в размере 5 000 рублей можно следующими способами: </Text>
                    <ul>
                        <li>в отделениях СКБ-банка</li>
                        <li>через электронные платежи УрФУ по коду оплаты из выписки протокола комиссии университета (ордеру)</li>
                        <li>в отделениях Сбербанка</li>
                        <li>через сервис «Сбербанк Онлайн»</li>
                    </ul>
                </div>
            </div>
            <div class="numbered-section">
                <Icon name="section-4-alt-1" width={40} height={86} alt="4" />
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Оформление временной регистрации по месту пребывания</Text>
                    <Text opacity={0.6} color="var(--red)">Внимание! Сниматься с регистрационного учета по месту жительства не нужно.</Text>
                    <Text>Чтобы оформить временную регистрацию студенту необходимо обратиться в паспортный отдел студгородка: </Text>
                    <ul>
                        <li>ул. Коминтерна, 11 — для проживающих в студенческих общежитиях № 3, 5, 7, 8, 10, 11, 12, 13, 14, 15, 16</li>
                    </ul>
                    <Text><Link href="https://vk.com/@ossg.urfu-dokumenty2" target="_BLANK" color="var(--blue)" lineWidth={2} variant="interactive">Необходимые документы</Link></Text>
                </div>
            </div>
        </Grid>
    </div>
</section>
<section id="distribution">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Порядок <br /> распределения мест<br /> в общежитии</Heading>
        <Grid m={3} className="mobile-horizontal-scroll">
            <div class="numbered-section">
                <Icon name="section-1-alt-2" width={40} height={40} alt="1" />
                <div>
                    <Text className="subtitle" marginTop={0}>В первоочередном порядке в жилые помещения в студенческих общежитиях УрФУ подлежат заселению:</Text>
                    <Text>
                        <ul>
                            <li>дети-сироты и дети, оставшиеся без попечения родителей, лица из числа детей-сирот и детей, оставшихся без попечения родителей, лица, потерявшие в период обучения обоих родителей или единственного родителя</li>
                            <li>дети-инвалиды, инвалиды I и II групп, инвалиды с детства, лица, подвергшиеся воздействию радиации вследствие катастрофы на Чернобыльской АЭС и иных радиационных катастроф, вследствие ядерных испытаний на Семипалатинском полигоне, лица, являющиеся инвалидами вследствие военной травмы или заболевания, полученных в период прохождения военной службы, и ветеранами боевых действий</li>
                            <li>граждане, проходившие в течение не менее трех лет военную службу по контракту на воинских должностях, подлежащих замещению солдатами, матросами, сержантами, старшинами, и уволенных с военной службы по основаниям, предусмотренным подпунктами "б" - "г" пункта 1, подпунктом "а" пункта 2 и подпунктами "а" - "в" пункта 3 статьи 51 Федерального закона от 28 марта 1998 года N 53-ФЗ "О воинской обязанности и военной службе"</li>
                        </ul>
                    </Text>
                </div>
            </div>
            <div class="numbered-section">
                <Icon name="section-2-alt-2" width={40} height={40} alt="2" />
                <div>
                    <Text className="subtitle" marginTop={0}>Правом первоочередного поселения в жилые помещения в студенческих общежитиях УрФУ также обладают обучающиеся в УрФУ иностранные граждане и лица без гражданства, поселение которых является обязательным для УрФУ в соответствии с требованиями законодательства Российской Федерации:</Text>
                    <Text>
                        <ul>
                            <li>именным стипендиатам, отличникам учебы</li>
                            <li>обучающимся по результатам общего рейтинга</li>
                            <li>иным категориям обучающихся (2-6 курсы в порядке очередности по рейтингу в личном кабинете) (вновь поступающие в университет в порядке очередности по рейтингу баллов ЕГЭ)</li>
                        </ul>
                    </Text>
                    <Text className="subtitle" marginTop={0}>Студенты II и старших курсов будут заселены в случаях:</Text>
                    <Text>
                        <ul>
                            <li>отсутствия академических задолженностей</li>
                            <li>отсутствие задолженностей по оплате за проживание в общежитии</li>
                            <li>отсутствия нарушений, зафиксированных управлением безопасности</li>
                        </ul>
                    </Text>
                </div>
            </div>
            <div class="numbered-section">
                <Icon name="section-3-alt-2" width={40} height={40} alt="3" />
                <div>
                    <Text className="subtitle" marginTop={0}>В случае, если хотя бы одному из перечисленных требований студент не удовлетворяет, то он будет заселяться в индивидуальном порядке на конкурсной основе.Помните, ВУЗ не может удовлетворить все заявки студентов на поселение.</Text>
                    <Text opacity={0.6} color="var(--red)">К сожалению, ВУЗ не может удовлетворить все заявки студентов на поселение, в связи с этим создан рейтинг поселения на конкурсной основе</Text>
                    <!-- <Text><Link href="#calendar" color="var(--blue)" lineWidth={2} variant="interactive">Рейтинг поселения</Link></Text> -->
                </div>
            </div>
        </Grid>
    </div>
</section>
<section id="alternative">
    <div class="content">
        <Grid m={2} s={1}>
            <Heading size={1} marginTop={0} className="blue-text">{ rentInfo?.heading || 'Альтернативное поселение' }</Heading>
            <div>
                <Heading size={3} marginTop={0}>{ rentInfo?.subheading || 'Проект Союза студентов Уральского федерального университета «Платное жилье»' }</Heading>
                <Grid m={2} s={1} ratio="3:2" gap={3}>
                    <Text>{ rentInfo?.text || 'Союз студентов Уральского федерального университета предлагает абитуриентам и студентам помощь в поиске коммерческого жилья в Екатеринбурге. Специалисты проектного офиса «Платное жилье» предлагают заселение в квартиры, комнаты и частные общежития, а при заселении на короткий срок — хостелы и отели.' }</Text>
                    <div>
                        <Text opacity={0.5}>Контакы:</Text>
                        <Heading size={3} marginTop={0}><a href="tel:{ rentInfo?.tel1 || '+7 (343) 375-45-18' }">{ rentInfo?.tel1 || '+7 (343) 375-45-18' }</a></Heading>
                        <Heading size={3} marginY={0}><a href="tel:{ rentInfo?.tel1 || '+7 (982) 643-34-95' }">{ rentInfo?.tel1 || '+7 (982) 643-34-95' }</a></Heading>
                        <Link variant="interactive" className="heading-3 semi-bold" href={ rentInfo?.linkURL || 'https://vk.com/rent_flats' } color="var(--blue)">{ rentInfo?.linkText || 'ВКонтакте' }</Link>
                    </div>
                </Grid>
            </div>
        </Grid>
    </div>
</section>
{ #if documents?.length }
    <section id="documents">
        <div class="content">
            <Grid m={2} s={1} ratio="2:3">
                <Heading size={1} className="blue-text" marginTop={0}>Нормативные <br /> документы</Heading>
                <Grid m={1}>
                    { #each documents as document (document.id) }
                        <Document link={ document.src } filename={ document.title } extension={ document.extension } />
                    { /each }
                </Grid>
            </Grid>
        </div>
    </section>
{ /if }