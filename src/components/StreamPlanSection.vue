<script setup lang="ts">
import { computed, ref } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'
import { isTasks, type StreamTask } from '../types'

const draft = ref('')
const { value: tasks, error } = useLocalStorage<StreamTask[]>('vtuber-companion:tasks', [], isTasks)
const completed = computed(() => tasks.value.filter((task) => task.done).length)
const progress = computed(() =>
  tasks.value.length ? Math.round((completed.value / tasks.value.length) * 100) : 0,
)
function addTask() {
  const text = draft.value.trim()
  if (!text) return
  tasks.value.push({ id: crypto.randomUUID(), text, done: false })
  draft.value = ''
}

function removeTask(id: StreamTask['id']) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <section class="card" aria-labelledby="plan-title">
    <header class="card-heading">
      <span class="section-icon mint" aria-hidden="true">☷</span>
      <div>
        <h2 id="plan-title">План стрима</h2>
        <p>Всё по порядку, в своём темпе</p>
      </div>
      <span class="count">{{ tasks.length }}</span>
    </header>
    <form class="add-form" @submit.prevent="addTask">
      <label class="sr-only" for="task-input">Новая задача</label>
      <input
        id="task-input"
        v-model="draft"
        maxlength="300"
        placeholder="Что запланируем?"
        autocomplete="off"
      />
      <button
        class="add-button"
        :disabled="!draft.trim()"
        aria-label="Добавить задачу"
        title="Добавить задачу"
      >
        +
      </button>
    </form>
    <ul v-if="tasks.length" class="item-list">
      <li v-for="task in tasks" :key="task.id" class="list-row" :class="{ completed: task.done }">
        <label class="task-label"
          ><input v-model="task.done" type="checkbox" /><span class="item-text">{{
            task.text
          }}</span></label
        >
        <button
          type="button"
          class="delete-button"
          :aria-label="`Удалить задачу: ${task.text}`"
          title="Удалить задачу"
          @click="removeTask(task.id)"
        >
          ×
        </button>
      </li>
    </ul>
    <div v-else class="empty-state">
      <span aria-hidden="true">☑</span>
      <h3>У каждого стрима свой план</h3>
      <p>Начните с приветствия, добавьте игру<br />и оставьте время для общения.</p>
    </div>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <footer class="card-footer progress-footer">
      <span>Выполнено {{ completed }} из {{ tasks.length }}</span
      ><progress :value="progress" max="100" aria-label="Прогресс плана стрима">
        {{ progress }}%
      </progress>
    </footer>
  </section>
</template>
