export const title = (i) => {
  return i ? i.charAt(0).toUpperCase() + i.slice(1) : ''
}

export const price = (i) => {
  return i.toLocaleString('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

export const up = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

export const link = (str) => {
  return str.replace(/[^a-zA-Z0-9а-яА-ЯеЕёЁ]/g, '-')
}

export const date = (s) =>
  new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
