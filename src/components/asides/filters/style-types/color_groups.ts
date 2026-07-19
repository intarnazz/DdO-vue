import type { Characteristic } from '@/api/local_domains/catalog/product/types'

/**
 * Базовые группы цветов, в которые схлопываются похожие оттенки.
 * label — русская подпись (используется в тултипе группы).
 * Цвет заливки самого чекбокса сюда не зашит — он берётся из первого
 * товара, попавшего в группу (см. group_color_characteristics ниже).
 */
type BaseColorKey =
  | 'white'
  | 'beige'
  | 'yellow'
  | 'orange'
  | 'brown'
  | 'red'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'turquoise'
  | 'green'
  | 'gray'
  | 'black'

const BASE_COLOR_META: Record<BaseColorKey, { label: string }> = {
  white: { label: 'Белый' },
  beige: { label: 'Бежевый' },
  yellow: { label: 'Жёлтый' },
  orange: { label: 'Оранжевый' },
  brown: { label: 'Коричневый' },
  red: { label: 'Красный' },
  pink: { label: 'Розовый' },
  purple: { label: 'Фиолетовый' },
  blue: { label: 'Синий' },
  turquoise: { label: 'Бирюзовый' },
  green: { label: 'Зелёный' },
  gray: { label: 'Серый' },
  black: { label: 'Чёрный' },
}

// Порядок отображения групп в сетке фильтра
const BASE_COLOR_ORDER: BaseColorKey[] = [
  'white',
  'beige',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple',
  'blue',
  'turquoise',
  'green',
  'brown',
  'gray',
  'black',
]

// Сколько названий оттенков показывать в тултипе группы, прежде чем свернуть в "и ещё N"
const MAX_TOOLTIP_NAMES = 6

export interface ColorGroup {
  id: string
  name: string
  description: string
  ids: number[]
}

/**
 * Превращает любую CSS-запись цвета (hex, rgb/rgba, названный цвет и т.д.)
 * в RGB. Разбор делает сам браузер через canvas — не нужно писать парсер
 * под каждый формат записи цвета.
 */
function css_color_to_rgb(css_color: string): [number, number, number] | null {
  if (typeof document === 'undefined' || !css_color) return null

  try {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    const probe = '#010203'
    ctx.fillStyle = probe
    ctx.fillStyle = css_color
    // Если цвет не распознан браузером, fillStyle молча остаётся прежним
    if (ctx.fillStyle === probe) return null

    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
    return [r, g, b]
  } catch {
    return null
  }
}

function rgb_to_hsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      default:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * Классификация по HSL. Пороги подобраны и проверены на характерных
 * эталонных цветах (белый/чёрный/серый, тёмный и светлый тёплый диапазон,
 * граница красный/розовый/фиолетовый). Это эвристика — стоит свериться
 * с реальной палитрой каталога и при необходимости подстроить границы.
 */
function classify_hsl(h: number, s: number, l: number): BaseColorKey {
  if (l >= 95) return 'white'
  if (l >= 88 && s <= 20) return 'white'
  if (l <= 12) return 'black'
  if (s <= 12) return 'gray'

  // Оранжево-жёлтый диапазон: тёмные оттенки — коричневый,
  // светлые и приглушённые — бежевый
  if (h >= 20 && h <= 65) {
    if (l <= 40) return 'brown'
    if (s <= 60) return 'beige'
  }

  // Красно-пурпурная область на высокой светлоте — розовый
  // (иначе бледно-розовый попадал бы в "красный" просто по оттенку)
  if ((h >= 300 || h < 20) && l >= 65) return 'pink'

  if (h < 15 || h >= 345) return 'red'
  if (h < 45) return 'orange'
  if (h < 65) return 'yellow'
  if (h < 170) return 'green'
  if (h < 200) return 'turquoise'
  if (h < 255) return 'blue'
  if (h < 310) return 'purple'
  return 'pink'
}

function classify_color(css_color: string): BaseColorKey {
  const rgb = css_color_to_rgb(css_color)
  if (!rgb) return 'gray'
  const { h, s, l } = rgb_to_hsl(...rgb)
  return classify_hsl(h, s, l)
}

function build_description(label: string, names: string[]): string {
  if (!names.length) return label
  const shown = names.slice(0, MAX_TOOLTIP_NAMES)
  const remaining = names.length - shown.length
  const list = remaining > 0 ? `${shown.join(', ')} и ещё ${remaining}` : shown.join(', ')
  return `${label}: ${list}`
}

/**
 * Группирует список цветовых характеристик по базовым цветам.
 * Все исходные id внутри группы попадают в один чекбокс: клик по нему
 * включает/выключает сразу все оттенки этой группы. Цвет заливки чекбокса —
 * это content.name первого товара, попавшего в группу (оригинальный цвет
 * из каталога, а не усреднённый или "эталонный").
 */
export function group_color_characteristics(items: Characteristic[] = []): ColorGroup[] {
  const buckets = new Map<BaseColorKey, { ids: number[]; names: string[]; swatch: string }>()

  for (const item of items ?? []) {
    const key = classify_color(item.name)
    // swatch фиксируется один раз — по первому товару, попавшему в группу
    if (!buckets.has(key)) buckets.set(key, { ids: [], names: [], swatch: item.name })
    const bucket = buckets.get(key) as { ids: number[]; names: string[]; swatch: string }
    bucket.ids.push(item.id)
    if (item.description && !bucket.names.includes(item.description)) {
      bucket.names.push(item.description)
    }
  }

  return BASE_COLOR_ORDER.filter((key) => buckets.has(key)).map((key) => {
    const bucket = buckets.get(key) as { ids: number[]; names: string[]; swatch: string }
    const meta = BASE_COLOR_META[key]
    return {
      id: key,
      name: bucket.swatch,
      description: build_description(meta.label, bucket.names),
      ids: bucket.ids,
    }
  })
}
