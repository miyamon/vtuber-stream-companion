<script setup lang="ts">
import TopicsSection from './components/TopicsSection.vue'
import StreamPlanSection from './components/StreamPlanSection.vue'
import NotesSection from './components/NotesSection.vue'
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <a class="brand" href="#main" aria-label="VTuber Stream Companion — к содержимому"
        ><span class="brand-mark" aria-hidden="true">✦</span
        ><span>VTuber<span class="brand-secondary"> / Stream Companion</span></span></a
      >
      <span class="local-badge"><span></span>Ваше личное пространство</span>
    </header>
    <main id="main">
      <div class="intro">
        <p class="eyebrow">МЕНЬШЕ СУЕТЫ. БОЛЬШЕ ОБЩЕНИЯ.</p>
        <h1>Ваш следующий <span>классный стрим.</span></h1>
        <p class="intro-copy">Соберите идеи, продумайте план и держите важное под рукой.</p>
      </div>
      <div class="workspace-label">
        <span>Подготовка к эфиру</span><span class="workspace-line"></span
        ><span class="workspace-caption">Всё в одном месте</span>
      </div>
      <div class="workspace"><TopicsSection /><StreamPlanSection /><NotesSection /></div>
    </main>
    <footer class="page-footer">
      <span>Сделано для вашего творческого потока</span
      ><span>Только вы, ваши идеи и ваш чат <span class="footer-star">✦</span></span>
    </footer>
  </div>
</template>
