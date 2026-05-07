<script setup lang="ts">
import IconLocationOn from '@/components/icons/IconLocationOn.vue'
import HomeContacts from '@/components/sections/home/HomeContacts.vue'
import LayoutButton from '@/layout/LayoutButton.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})
onUnmounted(() => clearInterval(timer))

const SCHEDULE = [
  { day: 'Понедельник', open: 8, close: 18 },
  { day: 'Вторник', open: 8, close: 18 },
  { day: 'Среда', open: 8, close: 18 },
  { day: 'Четверг', open: 8, close: 18 },
  { day: 'Пятница', open: 8, close: 18 },
  { day: 'Суббота', open: 8, close: 18 },
  { day: 'Воскресенье', open: 8, close: 18 },
]

const currentTime = computed(() => {
  const h = now.value.getHours().toString().padStart(2, '0')
  const m = now.value.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
})

const isOpen = computed(() => {
  const dow = now.value.getDay()
  const idx = dow === 0 ? 6 : dow - 1
  const entry = SCHEDULE[idx]
  if (!entry) return false
  const total = now.value.getHours() * 60 + now.value.getMinutes()
  return total >= entry.open * 60 && total < entry.close * 60
})

const statusLabel = computed(() => (isOpen.value ? 'Сейчас мы открыты' : 'Сейчас мы закрыты'))
</script>

<template>
  <div class="about-us">
    <!-- О нас -->
    <section class="about-us__block about-us__block--hero text-right">
      <div class="flex-col flex items-end">
        <span class="about-us__tag">О компании</span>
        <h2 class="about-us__title">О нас</h2>
        <p class="about-us__lead">
          Мы предлагаем качественные входные и межкомнатные двери для дома и бизнеса. Подбираем
          решения под ваш стиль и бюджет, обеспечиваем консультацию, замер и установку.
        </p>
        <p class="about-us__body">
          Работаем только с проверенными производителями и даём гарантию на продукцию и монтаж.
        </p>
      </div>

      <img class="br img" src="@/assets/icons/dfy--_rVqLaOGV4-unsplash.jpg" alt="" />
    </section>

    <!-- Почему выбирают нас -->
    <section class="about-us__block about-us__block--why">
      <img class="img br" src="@/assets/img/vitaly-gariev-KDWgcgMFFVI-unsplash 1.webp" alt="" />

      <div class="about-us__why-text">
        <span class="about-us__tag">Наши преимущества</span>
        <h2 class="about-us__title">Почему выбирают нас</h2>
        <p class="about-us__lead">
          Мы предлагаем широкий выбор дверей на любой вкус и бюджет, гарантируя высокое качество и
          надёжность. Наши специалисты помогают на каждом этапе — от подбора до установки, чтобы вы
          получили идеальное решение без лишних хлопот.
        </p>
        <ul class="about-us__why-list">
          <li class="about-us__why-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Только проверенные производители
          </li>
          <li class="about-us__why-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Бесплатный замер и консультация
          </li>
          <li class="about-us__why-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Гарантия на продукцию и монтаж
          </li>
          <li class="about-us__why-item">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Работаем под ключ — без лишних хлопот
          </li>
        </ul>
      </div>
    </section>

    <!-- Оплата и доставка -->
    <section class="about-us__block about-us__block--delivery">
      <div class="about-us__delivery-header">
        <span class="about-us__tag about-us__tag--light">Условия работы</span>
        <h2 id="payment-and-delivery" class="about-us__title">Оплата и доставка</h2>
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
            также наличными. Рассрочка.
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
          <h3 class="about-us__card-title">Доставка</h3>
          <p class="about-us__card-text">
            Доставляем по городу и району. Стоимость рассчитывается при оформлении заказа.
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
            Заберите заказ бесплатно из нашего магазина. Товар будет готов к выдаче в течение
            нескольких дней после подтверждения заказа. Работаем ежедневно без выходных.
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
            Вернуть или обменять товар надлежащего качества можно в течение 3 дней с момента
            получения. Гарантийные случаи рассматриваются отдельно — свяжитесь с нашем менеджером по
            продажам.
          </p>
        </div>
      </div>
    </section>

    <!-- Наши магазины -->
    <section class="about-us__block about-us__block--stores">
      <div class="stores__header">
        <span class="about-us__tag">Где нас найти</span>
        <h2 class="about-us__title">Наши магазины</h2>
        <RouterLink :to="{ name: 'contact' }" class="stores__link">
          <LayoutButton>
            <IconLocationOn />
            <strong>На карте</strong>
          </LayoutButton>
        </RouterLink>
      </div>

      <div class="stores__grid">
        <!-- Магазин 1 — горизонтальное фото -->
        <div class="stores__item stores__item--wide">
          <div class="stores__image stores__image--landscape">
            <img src="@/assets/img/DSCN4717.JPG1 (1).webp" alt="Магазин на Институтской" />
            <span class="stores__badge absolute top-4 right-4">Основной</span>
          </div>
          <div class="stores__info">
            <div class="stores__info-row">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span class="stores__address">Ул. Институтская, 2, Александров</span>
            </div>
            <p class="stores__desc">
              Основной магазин и офис. Здесь вы найдёте полный ассортимент дверей, получите
              консультацию и оформите заказ.
            </p>
          </div>
        </div>

        <!-- Магазин 2 — вертикальное фото -->
        <div class="stores__item stores__item--narrow">
          <div class="stores__image stores__image--portrait">
            <img
              src="@/assets/img/95af33ae-64ce-406d-80f2-a22736fd9eb9 (1).webp"
              alt="Магазин на Терешковой"
            />
          </div>
          <div class="stores__info">
            <div class="stores__info-row">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span class="stores__address">Ул. Терешковой, 12, Александров</span>
            </div>
            <p class="stores__desc">
              Второй магазин для удобства наших клиентов. Широкий выбор межкомнатных и входных
              дверей в наличии.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- График работы и адрес -->
    <section class="about-us__block about-us__block--contacts">
      <!-- Верхняя половина: статус + расписание -->
      <div class="contacts__top">
        <!-- Статус открыто/закрыто -->
        <div class="contacts__status" :class="{ 'contacts__status--closed': !isOpen }">
          <span class="contacts__status-label">{{ statusLabel }}</span>
          <span class="contacts__status-time">{{ currentTime }}</span>
          <span
            class="contacts__status-dot"
            :class="{ 'contacts__status-dot--closed': !isOpen }"
          ></span>
        </div>

        <!-- Расписание -->
        <div class="contacts__schedule">
          <h2 class="about-us__title">График работы магазина</h2>
          <ul class="contacts__schedule-list">
            <li v-for="(row, i) in SCHEDULE" :key="i" class="contacts__schedule-row">
              <span class="contacts__schedule-day">{{ row.day }}</span>
              <span class="contacts__schedule-time">с {{ row.open }}:00 до {{ row.close }}:00</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <HomeContacts />
  </div>
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

  // ── Why us block ─────────────────────────────────
  &__block--why
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 3rem
    align-items: center

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__why-text
    display: flex
    flex-direction: column

  &__why-list
    list-style: none
    padding: 0
    margin: 1.5rem 0 0
    display: flex
    flex-direction: column
    gap: 0.75rem

  &__why-item
    display: flex
    align-items: center
    gap: 0.65rem
    font-size: 0.9rem
    color: #444
    line-height: 1.5

    svg
      color: $main
      flex-shrink: 0

  // ── Stores block ─────────────────────────────────
  &__block--stores
    display: flex
    flex-direction: column
    gap: 2rem

.stores
  &__header
    margin-bottom: 0.5rem

  &__grid
    display: grid
    grid-template-columns: 3fr 2fr
    gap: 1.5rem
    align-items: start

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__item
    border: 1px solid #e8e6e0
    border-radius: 1.25rem
    overflow: hidden
    display: flex
    flex-direction: column
    transition: box-shadow 0.2s ease

    &:hover
      box-shadow: 0 4px 24px rgba(0,0,0,0.07)

  &__image
    position: relative
    overflow: hidden
    background: #f0efec

    img
      width: 100%
      height: 100%
      object-fit: cover
      display: block
      transition: transform 0.4s ease
  &__item:hover &__image img
    transform: scale(1.03)

  &__badge
    background: $main
    color: #fff
    font-size: 0.7rem
    font-weight: 600
    letter-spacing: 0.08em
    text-transform: uppercase
    padding: 0.3rem 0.75rem
    border-radius: 2rem

  &__info
    padding: 1.5rem
    display: flex
    flex-direction: column
    gap: 0.75rem
    flex: 1

  &__info-row
    display: flex
    align-items: center
    gap: 0.5rem
    color: $main

    svg
      flex-shrink: 0

  &__address
    font-size: 0.95rem
    font-weight: 600
    color: #111

  &__desc
    font-size: 0.84rem
    line-height: 1.65
    color: #666
    margin: 0

  &__link
    margin-top: auto
    align-self: flex-start

  // ── Why us block ─────────────────────────────────
  &__block--why
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 3rem
    align-items: center

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__why-text
    display: flex
    flex-direction: column

  &__why-image
    aspect-ratio: 4 / 3
    border-radius: 1.25rem
    background: #f0efec
    overflow: hidden
    order: -1

    @media (min-width: 769px)
      order: 0

    img
      width: 100%
      height: 100%
      object-fit: cover
      display: block

  &__why-list
    list-style: none
    padding: 0
    margin: 1.5rem 0 0
    display: flex
    flex-direction: column
    gap: 0.75rem

  &__why-item
    display: flex
    align-items: center
    gap: 0.65rem
    font-size: 0.9rem
    color: #444
    line-height: 1.5

    svg
      color: $main
      flex-shrink: 0
</style>

<style lang="sass" scoped>
// ── Contacts / Schedule block ─────────────────────
.contacts
  &__top
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 0
    border: 1px solid #e8e6e0
    border-radius: 1rem
    overflow: hidden
    margin-bottom: 1px

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__status
    background: $main
    color: #fff
    padding: 2.5rem 2rem
    display: flex
    flex-direction: column
    justify-content: flex-end
    gap: 0.5rem
    min-height: 220px
    position: relative
    overflow: hidden

    &::before
      content: ''
      position: absolute
      top: -60px
      left: -40px
      width: 280px
      height: 280px
      border-radius: 50%
      background: rgba(255,255,255,0.08)
      pointer-events: none

    &--closed
      background: #555

  &__status-label
    font-size: 1.05rem
    font-weight: 500
    letter-spacing: 0.03em
    opacity: 0.92

  &__status-time
    font-size: clamp(2.5rem, 6vw, 3.5rem)
    font-weight: 700
    letter-spacing: -0.03em
    line-height: 1

  &__status-dot
    width: 10px
    height: 10px
    border-radius: 50%
    background: #6effa0
    box-shadow: 0 0 8px #6effa0
    animation: pulse 2s ease-in-out infinite

    &--closed
      background: #ff8080
      box-shadow: 0 0 8px #ff8080
      animation: none

  &__schedule
    background: #fff
    padding: 2rem 2rem

    .about-us__title
      font-size: clamp(1.2rem, 2.5vw, 1.6rem)
      margin-bottom: 1rem

  &__schedule-list
    list-style: none
    padding: 0
    margin: 0

  &__schedule-row
    display: flex
    justify-content: space-between
    padding: 0.45rem 0
    border-bottom: 1px solid #f0efec
    font-size: 0.88rem
    color: #444

    &:last-child
      border-bottom: none

  &__schedule-day
    color: #333

  &__schedule-time
    color: #666

  &__bottom
    display: grid
    grid-template-columns: 1fr 1fr
    gap: 0
    border: 1px solid #e8e6e0
    border-radius: 1rem
    overflow: hidden
    align-items: stretch

    @media (max-width: 768px)
      grid-template-columns: 1fr

  &__address
    background: #fff
    padding: 2.5rem 2rem
    display: flex
    flex-direction: column
    justify-content: center

    .about-us__title
      font-size: clamp(1.2rem, 2.5vw, 1.6rem)
      margin-bottom: 1rem

    .about-us__lead
      font-size: 0.88rem
      max-width: 100%

  &__map-image
    position: relative
    overflow: hidden
    min-height: 220px

    img
      width: 100%
      height: 100%
      object-fit: cover
      display: block
      position: absolute
      top: 0
      left: 0

  &__map-btn
    position: absolute
    bottom: 1.25rem
    right: 1.25rem
    display: inline-flex
    align-items: center
    gap: 0.5rem
    background: $main
    color: #fff
    font-size: 0.82rem
    font-weight: 600
    padding: 0.55rem 1rem
    border-radius: 2rem
    text-decoration: none
    transition: opacity 0.2s

    &:hover
      opacity: 0.85

.about-us__block--contacts
  display: flex
  flex-direction: column
  gap: 1px

@keyframes pulse
  0%, 100%
    opacity: 1
  50%
    opacity: 0.4
</style>
