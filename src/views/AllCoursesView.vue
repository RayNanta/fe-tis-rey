<template>
  <div class="p-8 max-w-5xl mx-auto">
    <!-- Back Button -->
    <div class="mb-6">
      <router-link
        to="/"
        class="inline-block text-sm text-blue-600 hover:text-blue-800 transition font-medium"
      >
        ← Kembali ke halaman Materi
      </router-link>
    </div>

    <!-- Heading -->
    <h1 class="text-2xl font-bold mb-6 text-black">Daftar Semua Mata Kuliah</h1>

    <!-- Course Grid -->
    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="course in courses"
        :key="course.id"
        class="border p-5 rounded-xl shadow bg-white"
      >
        <h2 class="text-lg font-semibold text-black">{{ course.name }}</h2>
        <p class="text-sm text-gray-600">Kode: {{ course.code }}</p>
        <p class="text-sm text-gray-600">SKS: {{ course.credits }}</p>

        <button
          v-if="!course.has_enroll"
          @click="handleEnroll(course.id)"
          class="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ambil Mata Kuliah
        </button>

        <p v-else class="mt-4 text-green-600 text-sm">Sudah diambil ✔</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const courses = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:8000/api/courses', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    courses.value = res.data.data || res.data
  } catch (err) {
    console.error('Gagal ambil daftar semua course:', err)
  }
})

const handleEnroll = async (id) => {
  try {
    await axios.post(`http://localhost:8000/api/courses/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    alert('Berhasil ambil mata kuliah!')
    const course = courses.value.find(c => c.id === id)
    if (course) course.has_enroll = true
  } catch (err) {
    console.error('Gagal enroll:', err)
    alert('Terjadi kesalahan saat mengambil mata kuliah.')
  }
}
</script>
