<script lang="ts">
    import { formEndpoint, modal, mobileMenu, mainHeader } from '$lib/stores'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import { Nav, Link, Modal, MobileMenu, Header, Heading, Rainbow, Text, Input, Icon, Button, Footer, AjaxForm, ScrollToTop } from '$lib/components'

    let formSubmitted = false
    let formSuccess = false

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    beforeNavigate(() => {
        document.documentElement.style.scrollBehavior = 'auto'
    })
    
    afterNavigate(() => {
        document.documentElement.style.scrollBehavior = 'smooth'
    })
    
    const resetFormResults = () => {
        setTimeout(() => {
            formSubmitted = false
            formSuccess = false
        }, 10 * 1000)
    }

    const handleSuccess = () => {
        formSubmitted = true
        formSuccess = true
        resetFormResults()
    }

    const handleError = () => {
        formSubmitted = true
        formSuccess = false
        resetFormResults()
    }
</script>

<MobileMenu bind:this={ $mobileMenu }>
    <Link prefetch on:click={ $mobileMenu.close } color="black" variant="hover" href="/bachelor">Бакалавриат и специалитет</Link><br /><br />
    <Link prefetch on:click={ $mobileMenu.close } color="black" variant="hover" href="/master">Магистратура</Link><br /><br />
    <Link prefetch on:click={ $mobileMenu.close } color="black" variant="hover" target="_BLANK" href="https://aspirant.urfu.ru/ru/aspirantura/">Аспирантура</Link><br /><br />
    <Link prefetch on:click={ $mobileMenu.close } color="black" variant="hover" href="/accommodation">Поселение</Link><br /><br />
    <Link prefetch on:click={ $mobileMenu.close } color="black" variant="hover" href="/contacts">Контакты</Link><br /><br />
</MobileMenu>

<Modal bind:this={ $modal } align="center" closable={true}>
    <Heading size={2} className="blue-text" marginTop={0}>Получить консультацию</Heading>
    <AjaxForm action={ $formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false } id="JSyW">
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

<main>
    <ScrollToTop />

    <Header bind:this={ $mainHeader } hideOnScrollDown={ false } showOnScrollUp={ false } className="additional-header">
        <div class="content">
            <div class="header-layout">
                <div>
                    <Icon name="red-close" className="menu-button" width={52} height={52} alt="Кнопка закрытия навигации" on:click={ $mainHeader.close }/>
                </div>
                <Nav className="mobile-hide">
                    <Link color="black" lineWidth={ 3 } href="/bachelor" prefetch variant="hover">Бакалавриат и специалитет</Link>
                    <Link color="black" lineWidth={ 3 } href="/master" prefetch variant="hover">Магистратура</Link>
                    <Link color="black" lineWidth={ 3 } href="https://aspirant.urfu.ru/ru/aspirantura/" target="_BLANK" prefetch variant="hover">Аспирантура</Link>
                    <Link color="black" lineWidth={ 3 } href="/accommodation" prefetch variant="hover">Поселение</Link>
                    <Link color="black" lineWidth={ 3 } href="/contacts" prefetch variant="hover">Контакты</Link>
                </Nav>
                <div class="mobile-hide align-right">
                    <Link color="var(--red)" variant="interactive" lineWidth={ 3 } on:click={ $modal.open }>Хочу поступить</Link>
                </div>
            </div>
        </div>
    </Header>

    <slot />

    <Footer>
        <div class="content">
            <div class="grid grid-2 m-grid-1">
                <div>
                    <p class="grey-text">Горячая линия</p>
                    <h2 class="no-top-margin">
                        <a href="tel:+7 (912) 635-52-97">+7 (912) 635-52-97</a><br>
                        <a href="mailto:ok.inmt@urfu.ru">ok.inmt@urfu.ru</a>
                    </h2>
                    <div class="grid grid-2 m-grid-1 my-7">
                        <div>
                            <p class="grey-text">Дирекция института</p>
                            <h3 class="no-top-margin">г. Екатеринбург<br>
                                ул. Мира, 28</h3>
                        </div>
                        <div>
                            <p class="grey-text">Приемная комиссия</p>
                            <h3 class="no-top-margin">г. Екатеринбург,<br>
                                ул. Мира, 19</h3>
                        </div>
                    </div>
                    <Nav className="social">
                        <Link href="https://vk.com/abiturient_inmt" className="size-3" variant="interactive" lineWidth={ 3 }>ВКонтакте</Link>
                        <Link href="https://vk.com/inmt_urfu" className="size-3" variant="interactive" lineWidth={ 3 }>Союз студентов ИНМТ</Link>
                        <Link href="https://t.me/abitinmt" className="size-3" variant="interactive" lineWidth={ 3 }>Telegram</Link>
                    </Nav>
                </div>
                <div>
                    <h2 class="no-top-margin">Обратная связь</h2>
                    <AjaxForm action={ $formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false }>
                        <div class="my-4">
                            <Input name="fio" type="text" placeholder="ФИО" wide />
                            <div class="grid grid-2 m-grid-1 my-4">
                                <Input name="email" type="email" placeholder="Email" wide required={ true } />
                                <Input name="phone" type="tel" placeholder="Контактный телефон" wide mask={ phoneMask } required={ true } />
                            </div>
                            <Input name="message" type="text" placeholder="Сообщение" wide />
                        </div>
                        <br />
                        <br class="mobile-hide" />
                        <div class="grid grid-2 m-grid-1">
                            <div>
                                <label for="agreement2" class="checkbox-wrapper align-left">
                                    <Input type="checkbox" name="agreement" id="agreement2" required={ true } />
                                    <span class="fourty-text-black">Нажимая кнопку «Получить консультацию», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
                                </label>
                            </div>
                            <div id="uAqn">
                                <Button variant="blue" className="pc-hide wide">Получить консультацию</Button>
                                <Button variant="blue" className="mobile-hide">Получить консультацию</Button>
                            </div>
                        </div>
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
                </div>
            </div>
            <div class="copyright grey-text">
                ФГАОУ ВО «УрФУ имени первого Президента России Б.Н. Ельцина» | Все права защищены { new Date().getFullYear() }
            </div>
        </div>
    </Footer>
</main>

<style>
    main {
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
