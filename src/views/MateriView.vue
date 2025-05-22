<template>
  <div class="py-8 px-6 bg-gray-100 min-h-screen ">
    <router-link to="/courses/all" class="mb-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Enroll Mata Kuliah
    </router-link>

    <h1 class="text-2xl font-bold text-gray-800 mb-6">Materi Perkuliahan</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <CourseCard v-for="course in courses" :key="course.id" :course="course" :title="course.name" :code="course.code"
        :credits="course.credits" />

    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import api from '../api/axios'

const courses = ref([])

onMounted(async () => {
  try {
    const response = await api.get('/users/_self/courses?count=10')
    courses.value = response.data.data || [] // atau sesuaikan dengan struktur response backend-mu
  } catch (error) {
    console.error('Gagal fetch course:', error)
  }
})
</script>
