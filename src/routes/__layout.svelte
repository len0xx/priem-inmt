<script lang="ts">
    import RoundButton from '$lib/components/RoundButton.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import Link from '$lib/components/Link.svelte'
    import Nav from '$lib/components/Nav.svelte'
    import Input from '$lib/components/Input.svelte'
    import Button from '$lib/components/Button.svelte'

    let phoneMask = {
        mask: '+{7} (000) 000-00-00'
    }
    
    let showScrollTop = false
    const scrollTop = () => window.scrollTo({top: 0, behavior: 'smooth'})

    function handleScrolling() {
        const currentScroll = window.scrollY
        showScrollTop = currentScroll > 500
    }
</script>

<svelte:window on:scroll={ handleScrolling }></svelte:window>

<main>
    <div id="scroll-up" style:display={ showScrollTop ? 'block' : 'none' }>
        <RoundButton variant="up" size="M" on:click={ scrollTop } transparent={ false } />
    </div>

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
                        <Link href="https://t.me/abitinmt" className="size-3" variant="interactive" lineWidth={ 3 }>Telegram</Link>
                    </Nav>
                </div>
                <div>
                    <h2 class="no-top-margin">Обратная связь</h2>
                    <form action="">
                        <div class="my-4">
                            <Input name="fio" type="text" placeholder="ФИО" wide />
                            <div class="grid grid-2 m-grid-1 my-4">
                                <Input name="email" type="email" placeholder="Email" wide required={ true } />
                                <Input name="tel" type="tel" placeholder="Контактный телефон" wide mask={ phoneMask } required={ true } />
                            </div>
                            <Input name="message" type="text" placeholder="Сообщение" wide />
                        </div>
                        <br>
                        <br>
                        <div class="grid grid-2 m-grid-1">
                            <div>
                                <label for="agreement2" class="checkbox-wrapper align-left">
                                    <Input type="checkbox" name="agreement" id="agreement2" required={ true } />
                                    <span class="fourty-text-black">Нажимая кнопку «Отправить», я даю свое согласие на обработку моих персональных данных, в соответствии с Федеральным законом от 27.07.2006 года №152-ФЗ </span>
                                </label>
                            </div>
                            <div id="uAqn">
                                <Button variant="blue">Отправить заявку</Button>
                            </div>
                        </div>
                    </form>
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
