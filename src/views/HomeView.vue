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

    <!-- Section: Tugas Mahasiswa -->
<div class="mt-10">
  <h2 class="text-xl font-semibold mb-4 text-black" >Tugas Mahasiswa</h2>

  <!-- Filter Dropdown -->
  <div class="mb-6 text-black">
    <label for="filter" class="text-sm font-medium mr-2 text-black">Tampilkan berdasarkan MK:</label>
    <select id="filter" v-model="selectedCourse" class="border px-3 py-2 rounded">
      <option value="">Semua Mata Kuliah</option>
      <option
        v-for="course in courseOptions"
        :key="course.id"
        :value="course.id"
      >
        {{ course.name }}
      </option>
    </select>
  </div>

  <!-- List Tugas -->
  <div v-if="filteredAssignments.length">
    <div
      v-for="assignment in filteredAssignments"
      :key="assignment.id"
      class="border p-4 mb-4 rounded-xl bg-white shadow"
    >
      <h3 class="font-semibold text-lg mb-1 text-black">{{ assignment.title }}</h3>
      <p class="text-sm text-gray-600 mb-1">
        <span class="font-medium">Mata Kuliah:</span>
        {{
          courseOptions.find(c => c.id === assignment.course_id)?.name ||
          'Tidak Diketahui'
        }}
      </p>
      <p class="text-sm text-gray-600 mb-1">
        <span class="font-medium">Deadline:</span> {{ formatDate(assignment.due_date) }}
      </p>
      <p class="text-sm text-gray-600">
        <span class="font-medium">Status:</span>
        <span
          :class="assignment.has_submit ? 'text-green-600' : 'text-red-500'"
        >
          {{ assignment.has_submit ? 'Sudah Submit' : 'Belum Submit' }}
        </span>
      </p>
    </div>
  </div>
  <p v-else class="text-gray-500 italic">Tidak ada tugas ditemukan.</p>
</div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CourseCard from '../components/CourseCard.vue'
import api from '../api/axios'

import { computed } from 'vue'

// courseOptions: hasil dari /users/_self/courses
// assignments: hasil dari /users/_self/assignments

const assignments = ref([])
const courseOptions = ref([])
const selectedCourse = ref('')

onMounted(async () => {
  try {
    // ambil course
    const courseRes = await axios.get('http://localhost:8000/api/users/_self/courses?count=10', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    courseOptions.value = courseRes.data.data || []

    // ambil assignment
    const assignmentRes = await axios.get('http://localhost:8000/api/users/_self/assignments', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    assignments.value = assignmentRes.data.data || []
  } catch (err) {
    console.error('Gagal fetch data:', err)
  }
})

const filteredAssignments = computed(() => {
  if (!selectedCourse.value) return assignments.value
  return assignments.value.filter(a => a.course_id == selectedCourse.value)
})

const formatDate = (date) => {
  return new Date(date).toLocaleString('id-ID', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

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
