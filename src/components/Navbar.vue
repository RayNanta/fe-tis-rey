<template>
  <nav class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Kiri: Logo + Nama -->
        <div class="flex items-center space-x-2">
          <div class="text-2xl">📝</div>
          <span class="font-semibold text-lg text-black">Mahastudent</span>
        </div>

        <!-- Tengah: Navigasi -->
        <div class="hidden sm:flex space-x-8">
          <RouterLink
            to="/"
            class="border-b-2 pb-1"
            :class="isActiveRoute('/') ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-black'"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/tugas"
            class="border-b-2 pb-1"
            :class="isActiveRoute('/tugas') ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-black'"
          >
            Tugas
          </RouterLink>
          <!-- <RouterLink
            to="/submission"
            class="border-b-2 pb-1"
            :class="isActiveRoute('/submission') ? 'border-black text-black font-medium' : 'border-transparent text-gray-500 hover:text-black'"
          >
            Submission
          </RouterLink> -->
        </div>

        <!-- Kanan: Icon user -->
        <div class="rounded-full bg-gray-200 w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-700">
          T
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActiveRoute = (path) => route.path === path
</script>
