<script setup lang="ts">
import { useLocalStorage } from '../composables/useLocalStorage'

const { value: notes, error } = useLocalStorage(
  'vtuber-companion:notes',
  '',
  (value): value is string => typeof value === 'string',
)
</script>

<template>
  <section class="card notes-card" aria-labelledby="notes-title">
    <header class="card-heading">
      <span class="section-icon peach" aria-hidden="true">✎</span>
      <div>
        <h2 id="notes-title">Заметки</h2>
        <p>Мысли, ссылки и маленькие напоминания</p>
      </div>
      <span class="save-status" role="status"
        ><span :class="{ 'status-error': error }"></span
        >{{ error ? 'Не сохранено' : 'Автосохранение' }}</span
      >
    </header>
    <label class="sr-only" for="notes">Заметки к стриму</label>
    <textarea
      id="notes"
      v-model="notes"
      placeholder="Запишите всё, что пригодится на стриме…"
      spellcheck="true"
    ></textarea>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <footer class="card-footer">
      <span>Сохраняется автоматически в этом браузере</span><span>{{ notes.length }} симв.</span>
    </footer>
  </section>
</template>
