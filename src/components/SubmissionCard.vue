<template>
  <div class="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
    <div class="flex justify-between items-start mb-2">
      <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
      <span
        class="text-sm font-medium"
        :class="status === 'submitted' ? 'text-green-600' : 'text-red-500'"
      >
        {{ status === 'submitted' ? 'Terkirim' : 'Belum Submit' }}
      </span>
    </div>

    <p v-if="submittedAt" class="text-gray-500 text-sm mb-2">
      Tanggal Submit: {{ formattedDate }}
    </p>

    <a href="#" class="text-sm text-indigo-600 font-medium hover:underline">Lihat Detail →</a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  status: String,
  submittedAt: String
})

const formattedDate = computed(() => {
  if (!props.submittedAt) return ''
  const date = new Date(props.submittedAt)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>
