<template>
  <div class="py-8 px-6 bg-gray-100 min-h-screen">
    <!-- Filter Tab -->
    <div class="flex gap-3 mb-6">
      <button v-for="option in ['all', 'submitted', 'not-submitted']" :key="option" :class="[
        'px-4 py-2 rounded',
        selectedFilter === option
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]" @click="selectedFilter = option">
        {{
          option === 'all' ? 'Semua' :
            option === 'submitted' ? 'Sudah Submit' : 'Belum Submit'
        }}
      </button>
    </div>
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Daftar Tugas</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AssignmentCard v-for="assignment in filteredAssignments" :key="assignment.id" :title="assignment.title"
        :desc="assignment.description" :deadline="assignment.due_date" />
    </div>
  </div>
</template>

<script setup>
import AssignmentCard from '../components/AssignmentCard.vue'

import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const assignments = ref([])

const selectedFilter = ref('all') // all | submitted | not-submitted

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/users/_self/assignments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    assignments.value = response.data.data
    console.log('Assignments loaded:', assignments.value)
  } catch (error) {
    console.error('Gagal fetch assignments:', error)
  }
})

const filteredAssignments = computed(() => {
  if (selectedFilter.value === 'submitted') {
    return assignments.value.filter(a => a.has_submit)
  } else if (selectedFilter.value === 'not-submitted') {
    return assignments.value.filter(a => !a.has_submit)
  }
  return assignments.value
})


</script>
