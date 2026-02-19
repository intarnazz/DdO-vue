export const title = (i) => {
  return i ? i.charAt(0).toUpperCase() + i.slice(1) : ''
}

export const price = (i) => {
  const n = Number(i)
  if (!Number.isFinite(n)) return ''

  const formatted = n.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return `${formatted}\u00A0Р`
}

export const up = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const up_fast = () => {
  window.scrollTo({
    top: 0,
  })
}

export const link = (str) => {
  return str.replace(/[^a-zA-Z0-9а-яА-ЯеЕёЁ]/g, '-')
}

export const date = (s) =>
  new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

export function namesToKeys(array) {
  return array.reduce((acc, obj) => {
    const { name, ...rest } = obj
    acc[name] = rest
    return acc
  }, {})
}

export function formatPhone(phone) {
  const digits = phone.replace(/\D/g, '')

  if (digits.length !== 11 || digits[0] !== '7') {
    return phone // если формат неожиданный — возвращаем как есть
  }

  return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9)}`
}

export async function copyToClipboard(text, event) {
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
