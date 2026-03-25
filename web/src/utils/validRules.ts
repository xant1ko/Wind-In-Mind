export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export const phoneNumberPattern = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/
export const emailPattern = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
export const numberPattern = /^\d+$/
export const passwordPattern = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const valid_rules = {
  required: (value: string) => !!value || 'Обязательное поле',
  max: (value: string, max_length: number) => value.length > max_length ? true : 'Слишком длинная строка',
  min: (value: string, min_length: number) => value.length > min_length ? true : 'Слишком короткая строка',
  isPhoneNum: (value: string) => phoneNumberPattern.test(value) ? true : 'Введите номер телефона',
  isEmail: (value: string) => emailPattern.test(value) ? true : 'Введите корректный e-mail',
  isNumber: (value: string) => numberPattern.test(value) ? true : 'Неверный формат записи',
  isCorrectPassword: (value: string) => passwordPattern.test(value) ? true : 'Неподходящий пароль, нужно минимум 8 символов, хотя бы одна цифра и один специальный знак (.*?[#?!@$%^&*-)',
}

export function codeRule (value: string) {
  if (!value) {
    return true
  }

  if (!/^\d{2}\.\d{2}\.\d{2}$/.test(value)) {
    return 'Формат должен быть **.**.** (например, 31.08.49)'
  }

  const numbers = value.replace(/\./g, '')
  if (!/^\d{6}$/.test(numbers)) {
    return 'Можно использовать только цифры'
  }

  return true
}
