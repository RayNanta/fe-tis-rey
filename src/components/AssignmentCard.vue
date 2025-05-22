<template>
  <div class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
    <div class="flex justify-between items-start mb-2">
      <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
      <span
        class="text-sm font-medium"
        :class="isOverdue ? 'text-red-500' : 'text-green-600'"
      >
        {{ formattedDeadline }}
      </span>
    </div>
    <p class="text-gray-600 text-sm mb-4">{{ desc }}</p>
    <a href="#" class="text-sm text-indigo-600 hover:underline font-medium">Lihat Detail →</a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  desc: String,
  deadline: String
})

const formattedDeadline = computed(() => {
  const date = new Date(props.deadline)
  return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })
})

const isOverdue = computed(() => {
  const now = new Date()
  const deadline = new Date(props.deadline)
  return deadline < now
})
</script>
