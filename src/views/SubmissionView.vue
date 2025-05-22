<template>
  <div class="py-8 px-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Daftar Submission</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <SubmissionCard
        v-for="submission in submissions"
        :key="submission.id"
        :title="submission.assignment"
        :status="submission.status"
        :submittedAt="submission.submittedAt"
      />
    </div>
  </div>
</template>

<script setup>
import SubmissionCard from '../components/SubmissionCard.vue'

const submissions = [
  {
    id: 1,
    assignment: 'Tugas Basis Data',
    status: 'submitted',
    submittedAt: '2025-05-09T13:20:00'
  },
  {
    id: 2,
    assignment: 'Tugas Pemrograman Web',
    status: 'pending',
    submittedAt: null
  },
  {
    id: 3,
    assignment: 'Final Project',
    status: 'submitted',
    submittedAt: '2025-05-15T09:45:00'
  }
]
</script>
