/**
 * Преобразует первую букву строки в верхний регистр, если строка задана.
 * @param i - Входная строка или undefined.
 * @returns Строка с первой буквой в верхнем регистре или пустая строка, если вход undefined.
 */
export const title = (i: string | undefined): string => {
  return i ? i.charAt(0).toUpperCase() + i.slice(1) : ''
}

/**
 * Форматирует число как цену в рублях без десятичных знаков.
 * @param i - Входное число или строка, представляющая число.
 * @returns Отформатированная строка в формате "X Р", или пустая строка, если вход некорректен.
 */
export const price = (i: number | string): string => {
  const n = Number(i)
  if (!Number.isFinite(n)) return ''

  const formatted = n.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${formatted}\u00A0Р`
}

/**
 * Прокручивает страницу вверх с плавной анимацией.
 */
export const up = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

/**
 * Прокручивает страницу вверх мгновенно.
 */
export const up_fast = (): void => {
  window.scrollTo({
    top: 0,
  })
}

/**
 * Преобразует строку в формат ссылки, заменяя недопустимые символы на '-'.
 * @param str - Входная строка.
 * @returns Строка, подходящая для использования в URL (slug).
 */
export const link = (str: string): string => {
  return str.replace(/[^a-zA-Z0-9а-яА-ЯеЕёЁ]/g, '-')
}

/**
 * Форматирует дату в русский формат "число месяц".
 * @param s - Входная строка или объект Date.
 * @returns Отформатированная дата как строка.
 */
export const date = (s: string | Date): string =>
  new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

/**
 * Преобразует массив объектов в рекорд (объект), где ключи - значения поля 'name', а значения - объекты без 'name'.
 * @param array - Массив объектов с обязательным полем 'name'.
 * @returns Рекорд с ключами по 'name' и значениями без 'name'.
 */
export function namesToKeys<T extends { name: string }>(
  array: T[],
): Record<string, Omit<T, 'name'>> {
  return array.reduce((acc: Record<string, Omit<T, 'name'>>, obj: T) => {
    const { name, ...rest } = obj
    acc[name] = rest
    return acc
  }, {})
}

/**
 * Форматирует номер телефона в российский формат "+7 (XXX) XXX-XX-XX".
 * @param phone - Входная строка с номером телефона.
 * @returns Отформатированный номер или исходная строка, если формат некорректен.
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')

  if (digits.length !== 11 || digits[0] !== '7') {
    return phone // если формат неожиданный — возвращаем как есть
  }

  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
}

/**
 * Копирует текст в буфер обмена и отображает временное уведомление.
 * @param text - Текст для копирования.
 * @param event - Событие мыши для позиционирования уведомления.
 * @returns Promise, разрешающийся true при успешном копировании.
 */
export async function copyToClipboard(text: string, event: MouseEvent): Promise<boolean> {
  await navigator.clipboard.writeText(text)

  const div = document.createElement('div')
  div.textContent = 'Скопировано ✔'

  div.style.position = 'fixed'
  div.style.zIndex = '999'
  div.className = 'alert'
  div.style.left = `${event.clientX - 50}px`
  div.style.top = `${event.clientY + 30}px`

  document.body.appendChild(div)

  setTimeout(() => div.remove(), 900)

  return true
}
