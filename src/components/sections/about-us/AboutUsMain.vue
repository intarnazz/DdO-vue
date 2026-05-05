<script setup lang="ts"></script>

<template>
  <section class="about-us">
    <!-- О нас -->
    <div class="about-us__block about-us__block--hero">
      <div class="about-us__hero-text">
        <span class="about-us__tag">О компании</span>
        <h2 class="about-us__title">О нас</h2>
        <p class="about-us__lead">
          Мы занимаемся поставкой качественной техники и электроники с&nbsp;2015 года. За это время
          мы выстроили надёжные партнёрские отношения с ведущими производителями и создали магазин,
          в котором хочется покупать.
        </p>
        <p class="about-us__body">
          В нашем каталоге — только проверенные бренды и оригинальная продукция. Мы тщательно
          отбираем каждую позицию, чтобы вы могли быть уверены в качестве покупки. Наша команда
          всегда готова помочь с выбором и ответить на любые вопросы до и после приобретения товара.
        </p>

        <div class="about-us__stats">
          <div class="about-us__stat">
            <span class="about-us__stat-num">9+</span>
            <span class="about-us__stat-label">лет на рынке</span>
          </div>
          <div class="about-us__stat">
            <span class="about-us__stat-num">4 000+</span>
            <span class="about-us__stat-label">товаров в каталоге</span>
          </div>
          <div class="about-us__stat">
            <span class="about-us__stat-num">50 000+</span>
            <span class="about-us__stat-label">довольных покупателей</span>
          </div>
        </div>
      </div>

      <div class="about-us__hero-image">
        <img src="@/assets/icons/dfy--_rVqLaOGV4-unsplash.jpg" alt="" />
      </div>
    </div>

    <!-- Оплата и доставка -->
    <div class="about-us__block about-us__block--delivery">
      <div class="about-us__delivery-header">
        <span class="about-us__tag about-us__tag--light">Условия работы</span>
        <h2 id="#payment-and-delivery" class="about-us__title">Оплата и доставка</h2>
        <p class="about-us__lead about-us__lead--light">
          Мы сделали процесс покупки максимально простым — от выбора товара до получения на руки.
        </p>
      </div>

      <div class="about-us__cards">
        <div class="about-us__card">
          <div class="about-us__card-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <h3 class="about-us__card-title">Способы оплаты</h3>
          <p class="about-us__card-text">
            Принимаем банковские карты Visa и Mastercard, оплату через систему быстрых платежей, а
            также наличными при самовывозе. Рассрочка 0% доступна на выбранные категории товаров.
          </p>
        </div>

        <div class="about-us__card">
          <div class="about-us__card-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
              <rect x="9" y="11" width="14" height="10" rx="1" />
              <circle cx="12" cy="16" r="1" />
              <circle cx="20" cy="16" r="1" />
            </svg>
          </div>
          <h3 class="about-us__card-title">Курьерская доставка</h3>
          <p class="about-us__card-text">
            Доставляем по городу в течение 1–2 дней. По России — от 3 до 7 рабочих дней в
            зависимости от региона. Стоимость рассчитывается автоматически при оформлении заказа.
          </p>
        </div>

        <div class="about-us__card">
          <div class="about-us__card-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h3 class="about-us__card-title">Самовывоз</h3>
          <p class="about-us__card-text">
            Заберите заказ бесплатно из нашего шоурума. Товар будет готов к выдаче в течение
            нескольких часов после подтверждения заказа. Работаем ежедневно без выходных.
          </p>
        </div>

        <div class="about-us__card">
          <div class="about-us__card-icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
          </div>
          <h3 class="about-us__card-title">Возврат и обмен</h3>
          <p class="about-us__card-text">
            Вернуть или обменять товар надлежащего качества можно в течение 14 дней с момента
            получения. Гарантийные случаи рассматриваются отдельно — свяжитесь с нашей службой
            поддержки.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.about-us
  display: flex
  flex-direction: column
  gap: 5rem

  &__tag
    display: inline-block
    font-size: 0.65rem
    font-weight: 600
    letter-spacing: 0.14em
    text-transform: uppercase
    color: $main
    margin-bottom: 0.75rem

    &--light
      opacity: 0.7

  &__title
    font-size: clamp(1.75rem, 4vw, 2.75rem)
    font-weight: 700
    line-height: 1.15
    letter-spacing: -0.02em
    color: #111
    margin: 0 0 1.25rem

  &__lead
    font-size: 1.05rem
    line-height: 1.7
    color: #444
    max-width: 52ch
    margin: 0 0 1rem

  &__body
    font-size: 0.9rem
    line-height: 1.75
    color: #666
    max-width: 52ch
    margin: 0 0 2.5rem

  // ── Hero block ──────────────────────────────────
  &__block--hero
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 3rem
    align-items: center

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__hero-image
    aspect-ratio: 4 / 3
    border-radius: 1.25rem
    background: #f0efec
    overflow: hidden
    position: relative

    img
      width: 100%
      height: 100%
      object-fit: cover
      display: block

  // ── Stats ────────────────────────────────────────
  &__stats
    display: flex
    gap: 2rem
    flex-wrap: wrap

  &__stat
    display: flex
    flex-direction: column
    gap: 0.2rem

  &__stat-num
    font-size: 1.6rem
    font-weight: 700
    letter-spacing: -0.03em
    color: $main

  &__stat-label
    font-size: 0.75rem
    color: #888
    text-transform: uppercase
    letter-spacing: 0.06em

  // ── Delivery block ───────────────────────────────
  &__block--delivery
    display: flex
    flex-direction: column
    gap: 2.5rem

  &__delivery-header
    max-width: 60ch

  &__cards
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))
    gap: 1px
    border: 1px solid #e8e6e0
    border-radius: 1rem
    overflow: hidden
    background: #e8e6e0

  &__card
    background: #fff
    padding: 1.75rem 1.5rem
    display: flex
    flex-direction: column
    gap: 0.75rem
    transition: background 0.2s ease

    &:hover
      background: #fafaf8

  &__card-icon
    width: 40px
    height: 40px
    border-radius: 10px
    display: flex
    align-items: center
    justify-content: center
    color: $main
    flex-shrink: 0

  &__card-title
    font-size: 0.95rem
    font-weight: 600
    color: #111
    margin: 0

  &__card-text
    font-size: 0.84rem
    line-height: 1.7
    color: #666
    margin: 0
</style>
