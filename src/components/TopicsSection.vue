<script setup lang="ts">
import { ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { isTopics, type Topic } from '../types'

const draft = ref('')
const { value: topics, error } = useLocalStorage<Topic[]>('vtuber-companion:topics', [], isTopics)
function addTopic() {
  const text = draft.value.trim()
  if (!text) return
  topics.value.push({ id: crypto.randomUUID(), text })
  draft.value = ''
}

function removeTopic(id: Topic['id']) {
  topics.value = topics.value.filter((topic) => topic.id !== id)
}
</script>

<template>
  <section class="card" aria-labelledby="topics-title">
    <header class="card-heading">
      <span class="section-icon purple" aria-hidden="true">✦</span>
      <div>
        <h2 id="topics-title">Темы для разговора</h2>
        <p>Чтобы всегда было о чём поболтать</p>
      </div>
      <span class="count">{{ topics.length }}</span>
    </header>
    <form class="add-form" @submit.prevent="addTopic">
      <label class="sr-only" for="topic-input">Новая тема</label>
      <input
        id="topic-input"
        v-model="draft"
        maxlength="300"
        placeholder="О чём поговорим?"
        autocomplete="off"
      />
      <button
        class="add-button"
        :disabled="!draft.trim()"
        aria-label="Добавить тему"
        title="Добавить тему"
      >
        +
      </button>
    </form>
    <ul v-if="topics.length" class="item-list">
      <li v-for="(topic, index) in topics" :key="topic.id" class="list-row">
        <span class="item-number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="item-text">{{ topic.text }}</span>
        <button
          type="button"
          class="delete-button"
          :aria-label="`Удалить тему: ${topic.text}`"
          title="Удалить тему"
          @click="removeTopic(topic.id)"
        >
          ×
        </button>
      </li>
    </ul>
    <div v-else class="empty-state">
      <span aria-hidden="true">✧</span>
      <h3>Хороший разговор начинается с идеи</h3>
      <p>Добавьте первую тему — историю, игру<br />или вопрос для чата.</p>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <footer class="card-footer">Место для идей, которые хочется обсудить</footer>
  </section>
</template>
