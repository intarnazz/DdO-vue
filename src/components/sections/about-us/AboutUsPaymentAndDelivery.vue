<script setup lang="ts"></script>

<template>
  <section id="payment-and-delivery" class="about__section box-y">
    <span class="about__label">Условия</span>
    <h2 class="about__title">Оплата и доставка</h2>

    <div class="about__delivery-grid">
      <div class="about__delivery-card">
        <div class="about__card-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="2"
              y="5"
              width="20"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path d="M2 10h20" stroke="currentColor" stroke-width="1.5" />
            <path d="M6 15h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </div>
        <h3 class="about__card-title">Онлайн-оплата</h3>
        <p class="about__card-text">
          Visa, Mastercard, Мир, Apple Pay и Google Pay. Данные карты защищены протоколом 3D Secure.
        </p>
      </div>

      <div class="about__delivery-card">
        <div class="about__card-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 10h18M3 10V17a2 2 0 002 2h14a2 2 0 002-2V10M3 10l2-5h14l2 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="about__card-title">Курьерская доставка</h3>
        <p class="about__card-text">
          По городу — от 1 дня. Стоимость от 300 ₽, бесплатно при заказе от 5 000 ₽. Время доставки
          согласуем с вами заранее.
        </p>
      </div>

      <div class="about__delivery-card">
        <div class="about__card-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <h3 class="about__card-title">Самовывоз</h3>
        <p class="about__card-text">
          Заберите заказ из нашего шоурума — адрес и часы работы на странице контактов. Оплата при
          получении тоже доступна.
        </p>
      </div>

      <div class="about__delivery-card">
        <div class="about__card-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h3 class="about__card-title">Доставка по России</h3>
        <p class="about__card-text">
          СДЭК, Почта России и Boxberry. Срок — 3–10 рабочих дней в зависимости от региона.
          Отслеживание заказа в личном кабинете.
        </p>
      </div>
    </div>

    <div class="about__returns">
      <div class="about__returns-inner">
        <h3 class="about__returns-title">Возврат и обмен</h3>
        <p class="about__returns-text">
          Если товар не подошёл — вернём деньги в течение 14 дней без лишних вопросов. Гарантия на
          всю технику — от 1 до 3 лет в зависимости от производителя. Сервисный центр доступен
          напрямую через нас.
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.about

  &__section
    padding-top: 4rem
    padding-bottom: 4rem

    &--hero
      // нет дополнительных стилей

  &__label
    display: inline-block
    font-size: 0.7rem
    font-weight: 600
    letter-spacing: 0.14em
    text-transform: uppercase
    color: rgba(255, 255, 255, 0.4)
    margin-bottom: 0.75rem

  &__title
    font-size: clamp(1.75rem, 4vw, 2.75rem)
    font-weight: 700
    line-height: 1.15
    color: #ffffff
    margin-bottom: 1.5rem

  // ─── HERO ──────────────────────────────
  &__hero-grid
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 4rem
    align-items: center

    @media (max-width: 900px)
      grid-template-columns: 1fr
      gap: 2.5rem

  &__hero-text
    display: flex
    flex-direction: column

  &__lead
    font-size: 1.1rem
    line-height: 1.65
    color: rgba(255, 255, 255, 0.85)
    margin-bottom: 1rem

  &__body
    font-size: 0.9rem
    line-height: 1.7
    color: rgba(255, 255, 255, 0.5)
    margin-bottom: 2.5rem

  &__stats
    display: flex
    gap: 2.5rem

    @media (max-width: 480px)
      gap: 1.5rem

  &__stat
    display: flex
    flex-direction: column
    gap: 0.2rem

  &__stat-num
    font-size: 1.6rem
    font-weight: 700
    color: #ffffff

  &__stat-label
    font-size: 0.72rem
    color: rgba(255, 255, 255, 0.4)
    letter-spacing: 0.03em

  &__hero-photo
    border-radius: 1.25rem
    overflow: hidden
    aspect-ratio: 4 / 3

  &__photo-placeholder
    width: 100%
    height: 100%
    background: rgba(255, 255, 255, 0.06)
    border-radius: 1.25rem

  // ─── DELIVERY GRID ──────────────────────
  &__delivery-grid
    display: grid
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))
    gap: 1px
    background: rgba(255, 255, 255, 0.08)
    border-radius: 1rem
    overflow: hidden
    margin-top: 2.5rem
    margin-bottom: 1.5rem

  &__delivery-card
    background: rgba(255, 255, 255, 0.03)
    padding: 1.75rem 1.5rem
    display: flex
    flex-direction: column
    gap: 0.75rem
    transition: background 0.2s ease

    &:hover
      background: rgba(255, 255, 255, 0.07)

  &__card-icon
    width: 2.25rem
    height: 2.25rem
    color: rgba(255, 255, 255, 0.5)

    svg
      width: 100%
      height: 100%

  &__card-title
    font-size: 0.95rem
    font-weight: 600
    color: #ffffff
    margin: 0

  &__card-text
    font-size: 0.82rem
    line-height: 1.65
    color: rgba(255, 255, 255, 0.45)
    margin: 0

  // ─── RETURNS ────────────────────────────
  &__returns
    border: 1px solid rgba(255, 255, 255, 0.08)
    border-radius: 1rem
    overflow: hidden

  &__returns-inner
    padding: 1.75rem 2rem

  &__returns-title
    font-size: 1rem
    font-weight: 600
    color: #ffffff
    margin: 0 0 0.6rem

  &__returns-text
    font-size: 0.85rem
    line-height: 1.7
    color: rgba(255, 255, 255, 0.5)
    margin: 0
</style>
