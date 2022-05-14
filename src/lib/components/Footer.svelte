<script lang="ts">
    import Button from './Button.svelte'
    import Nav from './Nav.svelte'
    import Link from './Link.svelte'
    import { imask } from 'svelte-imask'

    let phoneMask = {
        mask: '+{7}-(000)-000-0000'
    }
</script>

<footer id="footer">
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
                    <Link href="https://vk.com/" className="size-3" borderWidth={ 3 }>ВКонтакте</Link>
                    <Link href="https://t.me" className="size-3" borderWidth={ 3 }>Telegram</Link>
                </Nav>
            </div>
            <div>
                <h2 class="no-top-margin">Обратная связь</h2>
                <form action="">
                    <div class="my-4">
                        <input name="fio" type="text" placeholder="ФИО" class="simple wide" required />
                        <div class="grid grid-2 m-grid-1 my-4">
                            <input name="email" type="email" placeholder="Email" class="simple wide" required />
                            <input name="tel" use:imask={ phoneMask } type="tel" placeholder="Контактный телефон" class="simple wide" required />
                        </div>
                    </div>
                    <br>
                    <br>
                    <div class="grid grid-2 m-grid-1">
                        <div>
                            <label for="agreement2" class="checkbox-wrapper align-left">
                                <div style="padding: 0.15em">
                                    <input type="checkbox" name="agreement" id="agreement2">
                                </div>
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
    <div class="rainbow"></div>
</footer>

<style>
    footer {
        margin-top: 1em;
        padding-top: 5em;
    }

    footer .copyright {
        padding: 2.5em 0;
        text-align: center;
    }

    footer .rainbow {
        display: block;
        position: relative;
        width: 100%;
        height: 20px;
        background: var(--rainbow-gradient);
    }
    
    #uAqn {
        justify-self: end;
    }

    footer nav.social a {
        font-size: 1.8em;
    }

    footer nav.social a::after {
        height: 3px;
    }
    
    @media screen and (max-width: 768px) {
        footer .content {
            text-align: center;
        }
        footer .content > .grid {
            gap: 3em;
        }
        footer .content > .grid > *:nth-child(1) {
            order: 2;
        }
        footer .content > .grid > *:nth-child(2) {
            order: 1;
        }
        #uAqn {
            justify-self: center;
        }
        footer nav.social a {
            font-size: 1.1em;
        }

        footer nav.social a::after {
            height: 2px;
        }
    }

    label.checkbox-wrapper {
        display: grid;
        gap: 1em;
        grid-template-columns: 20px 1fr;
    }

    .fourty-text-black {
        color: rgba(0, 0, 0, 0.4);
    }
</style>
