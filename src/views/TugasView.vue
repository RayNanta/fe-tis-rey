<template>
  <div class="py-8 px-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Daftar Tugas</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <AssignmentCard
        v-for="assignment in assignments"
        :key="assignment.id"
        :title="assignment.title"
        :desc="assignment.description"
        :deadline="assignment.deadline"
      />
    </div>
  </div>
</template>

<script setup>
import AssignmentCard from '../components/AssignmentCard.vue'

const assignments = [
  {
    id: 1,
    title: 'Tugas Basis Data',
    description: 'Desain database untuk aplikasi e-commerce',
    deadline: '2025-05-09'
  },
  {
    id: 2,
    title: 'Tugas Pemrograman Web',
    description: 'Buat aplikasi CRUD dengan Laravel',
    deadline: '2025-05-11'
  },
  {
    id: 3,
    title: 'Tugas Final Project',
    description: 'Kerjakan proyek akhir semester',
    deadline: '2025-06-04'
  }
]
</script>
