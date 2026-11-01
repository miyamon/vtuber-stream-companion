export interface Topic {
  id: string
  text: string
}
export interface StreamTask extends Topic {
  done: boolean
}

export function isTopic(value: unknown): value is Topic {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'string' &&
    'text' in value &&
    typeof value.text === 'string'
  )
}

export function isTopics(value: unknown): value is Topic[] {
  return Array.isArray(value) && value.every(isTopic)
}

export function isTasks(value: unknown): value is StreamTask[] {
  return (
    Array.isArray(value) &&
    value.every((item) => isTopic(item) && 'done' in item && typeof item.done === 'boolean')
  )
}
