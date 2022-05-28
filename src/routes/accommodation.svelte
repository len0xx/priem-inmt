<script lang="ts">
    import { onMount } from 'svelte'
    import Nav from '$lib/components/Nav.svelte'
    import Grid from '$lib/components/Grid.svelte'
    import Link from '$lib/components/Link.svelte'
    import Text from '$lib/components/Text.svelte'
    import Modal from '$lib/components/Modal.svelte'
    import Input from '$lib/components/Input.svelte'
    import Button from '$lib/components/Button.svelte'
    import Header from '$lib/components/Header.svelte'
    import Heading from '$lib/components/Heading.svelte'
    import Rainbow from '$lib/components/Rainbow.svelte'
    import Teacher from '$lib/components/Teacher.svelte'
    import AjaxForm from '$lib/components/AjaxForm.svelte'
    import Graduate from '$lib/components/Graduate.svelte'
    import Document from '$lib/components/Document.svelte'
    import Preloader from '$lib/components/Preloader.svelte'
    import MobileMenu from '$lib/components/MobileMenu.svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import documents from '$lib/documents2'

    // User authorization
    // import { session } from '$app/stores'
    // let user = $session.user
    // console.log(user)

    let modalVisible = false
    let menuHidden = true
    let showPreloader = true
    let pageLoaded = false
    let additional = false
    let headerClass = ''
    let formSubmitted = false
    let formSuccess = false

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    const formEndpoint = 'https://fgaouvo.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.site.form.fill'

    const openModal = () => {
        modalVisible = true
    }

    beforeNavigate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
    })
    
    afterNavigate(() => {
        document.documentElement.style.scrollBehavior = 'smooth'
    })
    
    const openMenu = () => menuHidden = false

    const handleScrollUp = () => {
        setTimeout(() => headerClass = '', 250)
    }

    const handleScrollDown = () => {
        setTimeout(() => headerClass = 'header-scrolled', 200)
    }

    const resetFormResults = (): void => {
        setTimeout(() => {
            formSubmitted = false
            formSuccess = false
        }, 10 * 1000)
    }

    const handleSuccess = (): void => {
        formSubmitted = true
        formSuccess = true
        resetFormResults()
    }

    const handleError = (): void => {
        formSubmitted = true
        formSuccess = false
        resetFormResults()
    }

    onMount(() => {
        pageLoaded = true

        setTimeout(() => showPreloader = false, 150)
    })
</script>

<svelte:head>
    <title>Поселение – Институт новых материалов и технологий</title>
    <meta property="og:image" content="/img/snippet-accommodation.jpg" />
</svelte:head>

{ #if showPreloader }
    <Preloader bind:invisible={pageLoaded} />
{ /if }

<MobileMenu bind:menuHidden>
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/bachelor">Бакалавриат и специалитет</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/master">Магистратура</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" target="_BLANK" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/accommodation">Поселение</a><br /><br />
    <a sveltekit:prefetch on:click={() => menuHidden = true} class="underlined" href="/contacts">Контакты</a><br /><br />
</MobileMenu>

<Modal bind:visible={modalVisible} align="center" closable={true}>
    <Heading size={2} className="blue-text" marginTop={0}>Получить консультацию</Heading>
    <AjaxForm action={ formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false } id="JSyW">
        <Text className="subtitle">Специалисты института свяжутся с вами в ближайшее время</Text>
        <Input name="fio" marginY={0.5} type="text" placeholder="ФИО" wide required={ true } /><br /><br />
        <Input name="email" marginY={0.5} type="email" placeholder="Email" wide required={ true } /><br /><br />
        <Input name="phone" marginY={0.5} mask={ phoneMask } type="tel" placeholder="Контактный телефон" wide required={ true } /><br /><br />
        <Input name="message" marginY={0.5} type="text" placeholder="Сообщение" wide /><br /><br />
        <label for="agreement4" class="checkbox-wrapper align-left">
            <Input type="checkbox" name="agreement" id="agreement4" required={ true } />
            <span class="fourty-text-black">Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
        </label>
        <br />
        <br />
        <Button variant="blue">Отправить</Button>
    </AjaxForm>
    { #if formSubmitted }
        <br />
        <div class="align-center">
            { #if formSuccess }
                Спасибо! Ваша заявка отправлена
            { :else }
                Кажется, произошла ошибка при отправке формы. Свяжитесь, пожалуйста, с нами по почте: <a href="mailto:ok.inmt@urfu.ru">ok.inmt@urfu.ru</a>
            { /if }
        </div>
    { /if }
    <Rainbow slot="footer" size="L" />
</Modal>

<Header hideOnScrollDown={ true } showOnScrollUp={ true } hideAfter={ 90 } transparent={ true } className={ headerClass } on:scroll-up={ handleScrollUp } on:scroll-down={ handleScrollDown }>
    <div class="content">
        <div class="header-layout accommodation { headerClass == 'header-scrolled' ? 'black' : 'white' }">
            <div>
                <a href="/">
                    { #if headerClass == 'header-scrolled' }
                        <img src="/img/urfu-logo-colourful.svg" alt="Логотип Уральского федерального университета">
                    { :else }
                        <img src="/img/logo_urfu.svg" alt="Логотип Уральского федерального университета">
                    { /if }
                </a>
            </div>
            <div class="mobile-hide">
                { #if headerClass == 'header-scrolled' }
                    <img src="/img/menu-icon-gray.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ () => additional = true }>
                { :else }
                    <img src="/img/menu-icon-white.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ () => additional = true }>
                { /if }
            </div>
            <Nav className="mobile-hide">
                <a class="underlined" href="#dorms">Общежития</a>
                <a class="underlined" href="#contacts">Ответственные</a>
                <a class="underlined" href="#order">Порядок поселения</a>
                <a class="underlined" href="#distribution">Распределение мест</a>
                <a class="underlined" href="#documents">Документы</a>
            </Nav>
            <div class="pc-hide align-right">
                <img src="/img/menu-icon-gray-fill.svg" class="menu-button" alt="Кнопка открытия меню" on:click={ openMenu }>          
            </div>
        </div>
    </div>
</Header>
<Header hideOnScrollDown={ false } showOnScrollUp={ false } className="additional-header { additional ? 'opened' : '' }">
    <div class="content">
        <div class="header-layout">
            <div>
                <img src="/img/red-close.svg" class="menu-button" alt="Кнопка закрытия навигации" on:click={ () => additional = false }>
            </div>
            <Nav className="mobile-hide">
                <a sveltekit:prefetch class="underlined" href="/bachelor">Бакалавриат и специалитет</a>
                <a sveltekit:prefetch class="underlined" href="/master">Магистратура</a>
                <a sveltekit:prefetch target="_BLANK" class="underlined" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</a>
                <a sveltekit:prefetch class="underlined" href="/accommodation">Поселение</a>
                <a sveltekit:prefetch class="underlined" href="/contacts">Контакты</a>
            </Nav>
            <div class="mobile-hide align-right">
                <Link color="var(--red)" variant="interactive" lineWidth={ 3 } on:click={ openModal }>Хочу поступить</Link>
            </div>
        </div>
    </div>
</Header>
<section class="promo accommodation" id="beginning">
    <div class="content">
        <Grid m={1} l={2} ratio="5:3" alignItems="end">
            <Heading size={1} marginY={0}>Поселение<br /><span class="smaller-text">Институт новых материалов <br /> и технологий</span></Heading>
            <div class="align-right">
                <Link on:click={ openModal } variant="interactive" color="white" lineWidth={ 2 }>Обратная связь</Link>
            </div>
        </Grid>
    </div>
</section>
<br />
<section id="dorms">
    <div class="content">
        <Grid m={4} s={1}>
            <Graduate name="№8" src="/img/dorm-1.jpg" caption="ул. Комсомольская 70" />
            <Graduate name="№5" src="/img/dorm-2.jpg" caption="ул. Малышева 144" />
            <Graduate name="№12" src="/img/dorm-3.jpg" caption="ул. Фонвизина 4" />
            <Graduate name="№11" src="/img/dorm-4.jpg" caption="ул. Фонвизина 2" />
        </Grid>
    </div>
</section>
<section id="responsible">
    <div class="content">
        <Grid m={2} s={1}>
            <Heading size={1} className="blue-text" marginTop={0}>Ответственный <br /> за поселение</Heading>
            <Teacher image="/img/elantsev-2.jpg">
                <svelte:fragment slot="name">Еланцев Алексей Владимирович</svelte:fragment>
                <svelte:fragment slot="description">Заместитель начальника Отдела обеспечения деятельности</svelte:fragment>
                <svelte:fragment slot="footer">
                    Адрес: ул., Мира, 28 <br />
                    Аудитория: МТ-221 <br />
                    Телефон: <a href="tel:+7 (912) 635-52-97">+7 (912) 635-52-97</a> <br />
                    Электронная почта: <a href="mailto:a.v.elantcev@urfu.ru">a.v.elantcev@urfu.ru</a>
                </svelte:fragment>
            </Teacher>
        </Grid>
    </div>
</section>

<section id="order">
    <div class="content">
        <Heading size={1} className="blue-text" marginTop={0}>Порядок поселения <br /> в общежитие</Heading>
        <Grid m={4} className="mobile-horizontal-scroll">
            <div class="numbered-section">
                <img src="/img/section-1-alt-1.svg" alt="1">
                <div>
                    <Text className="subtitle blue-text" marginTop={0}>Медицинское обследование</Text>
                    <Text>Абитуриенты могут проходить медицинский осмотр до выхода приказов о зачислении.</Text>
                    <Text color="var(--blue)" opacity={0.6}>с 01.07</Text>
                    <!-- <Text><Link href="#programs" color="var(--blue)" lineWidth={2} variant="interactive">Необходимые документы</Link></Text> -->
                </div>
            </div>
            <div class="numbered-section">
                <img src="/img/section-2-alt-1.svg" alt="2">
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
                <img src="/img/section-3-alt-1.svg" alt="3">
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
                <img src="/img/section-4-alt-1.svg" alt="4">
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
                <img src="/img/section-1-alt-2.svg" alt="1">
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
                <img src="/img/section-2-alt-2.svg" alt="2">
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
                <img src="/img/section-3-alt-2.svg" alt="3">
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
            <Heading size={1} marginTop={0} className="blue-text">Альтернативное <br /> поселение</Heading>
            <div>
                <Heading size={3} marginTop={0}>Проект Союза студентов Уральского федерального университета «Платное жилье»</Heading>
                <Grid m={2} s={1} ratio="3:2" gap={3}>
                    <Text>Союз студентов Уральского федерального университета предлагает абитуриентам и студентам помощь в поиске коммерческого жилья в Екатеринбурге. Специалисты проектного офиса «Платное жилье» предлагают заселение в квартиры, комнаты и частные общежития, а при заселении на короткий срок — хостелы и отели.</Text>
                    <div>
                        <Text opacity={0.5}>Контакы:</Text>
                        <Heading size={3} marginTop={0}><a href="tel:+7 (343) 375-45-18">+7 (343) 375-45-18</a></Heading>
                        <Heading size={3} marginY={0}><a href="tel:+7 (982) 643-34-95">+7 (982) 643-34-95</a></Heading>
                        <Link variant="interactive" className="heading-3 semi-bold" href="https://vk.com/rent_flats" color="var(--blue)">ВКонтакте</Link>
                    </div>
                </Grid>
            </div>
        </Grid>
    </div>
</section>
<section id="documents">
    <div class="content">
        <Grid m={2} s={1} ratio="2:3">
            <Heading size={1} className="blue-text" marginTop={0}>Нормативные <br /> документы</Heading>
            <Grid m={1}>
                { #each documents as document }
                    <Document { ...document } />
                { /each }
            </Grid>
        </Grid>
    </div>
</section>