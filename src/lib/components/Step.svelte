<script lang="ts">
    type Сolor = 'blue' | 'red' | 'white'

    export let num: number
    export let title: string
    export let color: Сolor
    export let fillPoints = false
    export let textColor = 'var(--blue)'

    let colorValue: string
    let fillClass = fillPoints ? 'fill-step-points' : ''
    let colorClass = 'color-' + color
    
    if (color == 'blue') {
        colorValue = '#1e4391'
    } else if (color == 'red') {
        colorValue = '#ef302b'
    } else if (color == 'white') {
        colorValue = '#FFF'
    }

</script>

<div
    class="step {fillClass} {colorClass}"
    style:--step-acccent-color={colorValue}
    style:--step-text-color={textColor}
>
    <div class="step__head">
        <span class="step__number">{num}</span>
        <p class="step__heading subtitle">{title}</p>
    </div>
    {#if $$slots.first}
        <div class="step-wrapper">
            <div class="step__item">
                <slot name="first" />
            </div>
        </div>
	{/if}
    {#if $$slots.second}
        <div class="step-wrapper">
            <div class="step__item">
                <slot name="second" />
            </div>
        </div>
	{/if}
    {#if $$slots.third}
        <div class="step-wrapper">
            <div class="step__item">
                <slot name="third" />
            </div>
        </div>
	{/if}
    {#if $$slots.fourth}
        <div class="step-wrapper">
            <div class="step__item">
                <slot name="fourth" />
            </div>
        </div>
	{/if}
    {#if $$slots.fifth}
        <div class="step-wrapper">
            <div class="step__item">
                <slot name="fifth" />
            </div>
        </div>
	{/if}
</div>

<style>   
    .step {
        --step-bottom-padding: 20px;
        position: relative;
        min-width: 360px;
    }

    @media screen and (max-width: 768px)  {
        .step {
            min-width: 70vw;
        }
    }

    .step-wrapper {
        position: relative;
    }

    .step-wrapper:not(:last-child)::before {
        content: "";
        position: absolute;
        top: 6px;
        left: 19px;
        width: 2px;
        background-color: var(--step-acccent-color);
        height: 100%;
    }

    .step-wrapper:not(:last-child) {
        padding-bottom: var(--step-bottom-padding);
    }

    .step__number {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-negative: 0;
        flex-shrink: 0;
        position: relative;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--step-acccent-color);
        font-size: 24px;
        line-height: 120%;
        z-index: 2;
        margin-right: 20px;
    }

    .step.color-white .step__number {
        color: var(--blue);
    }

    .step.color-red .step__number,
    .step.color-blue .step__number {
        color: var(--white);
    }

    .step__heading {
        font-size: 18px;
        line-height: 120%;
        color: var(--step-text-color);
        margin: 0;
    }

    .step__item, .step__head {
        position: relative;
    }

    .step__item::before {
        position: absolute;
        content: "";
        top: 3px;
        left: 13px;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid var(--step-acccent-color);
        background-color: #fff;
        z-index: 2;
    }

    .step.fill-step-points .step__item::before {
        background-color: var(--step-acccent-color);
    }

    .step__head {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-bottom: var(--step-bottom-padding);
        min-height: 44px;
    }

    .step__head::before {
        content: "";
        position: absolute;
        top: 53%;
        left: 19px;
        width: 2px;
        background-color: var(--step-acccent-color);
        height: 100%;
        z-index: 1;
    }

    .step__item {
        padding-left: 60px;
    }
</style>
