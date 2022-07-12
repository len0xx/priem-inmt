<script lang="ts">
    import { Nav, Link, Input, Button, Footer, AjaxForm, ScrollToTop } from '$lib/components'

    let formSubmitted = false
    let formSuccess = false

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }

    const formEndpoint = 'https://fgaouvo.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.site.form.fill'
    
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
</script>

<main>
    <ScrollToTop />

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
                    <AjaxForm action={ formEndpoint } method="POST" bitrix={ true } on:success={ handleSuccess } on:error={ handleError } checkOk={ false }>
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
