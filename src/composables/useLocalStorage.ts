import { ref, watch, type Ref } from 'vue'

// Проверяем сохранённые данные: localStorage может содержать старый или повреждённый JSON.
export function useLocalStorage<T>(
  key: string,
  initial: T,
  validate: (value: unknown) => value is T,
) {
  const value = ref(initial) as Ref<T>
  const error = ref('')

  try {
    const saved = localStorage.getItem(key)
    if (saved !== null) {
      const parsed: unknown = JSON.parse(saved)
      if (!validate(parsed)) throw new Error('Invalid saved value')
      value.value = parsed
    }
  } catch {
    error.value =
      'Не удалось прочитать сохранённые данные. Новые изменения попробуем сохранить снова.'
  }

  watch(
    value,
    (next) => {
      try {
        localStorage.setItem(key, JSON.stringify(next))
        error.value = ''
      } catch {
        error.value = 'Не удалось сохранить изменения. Проверьте доступ к хранилищу браузера.'
      }
    },
    { deep: true, flush: 'sync' },
  )

  return { value, error }
}
