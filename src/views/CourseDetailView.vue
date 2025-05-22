<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const courseId = route.params.id

const course = ref(null)
const isLoading = ref(true)

const handleUnenroll = async () => {
  const confirmed = confirm(`Yakin ingin membatalkan mata kuliah "${course.value.name}"?`)
  if (!confirmed) return

  try {
    await axios.delete(`http://localhost:8000/api/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    alert('Berhasil membatalkan mata kuliah.')
    router.push('/')
  } catch (error) {
    console.error('Gagal unenroll:', error)
    alert('Terjadi kesalahan saat membatalkan mata kuliah.')
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8000/api/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    course.value = response.data
  } catch (error) {
    console.error('Gagal fetch course:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-8 max-w-4xl mx-auto" v-if="course">
    <div class="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
      <h2 class="text-3xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        📚 Detail Mata Kuliah
      </h2>

      <div class="space-y-4 text-gray-700">
        <div>
          <p class="text-sm font-medium text-gray-500">Kode Mata Kuliah</p>
          <p class="text-lg font-semibold text-gray-800">{{ course.code }}</p>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-500">Nama Mata Kuliah</p>
          <p class="text-lg font-semibold text-gray-800">{{ course.name }}</p>
        </div>

        <div>
          <p class="text-sm font-medium text-gray-500">Jumlah SKS</p>
          <p class="text-lg font-semibold text-gray-800">{{ course.credits }}</p>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="mt-6">
      <router-link
        to="/"
        class="inline-block text-sm text-blue-600 hover:text-blue-800 transition font-medium"
      >
        ← Kembali ke daftar mata kuliah
      </router-link>
    </div>

    <div v-if="course.has_enroll" class="mt-8">
  <button
    @click="handleUnenroll"
    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
  >
    Batal Ambil Mata Kuliah
  </button>
</div>

  </div>
</template>


