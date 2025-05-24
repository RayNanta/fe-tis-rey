import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TugasView from '../views/TugasView.vue'
import SubmissionView from '../views/SubmissionView.vue'
import CourseDetailView from '../views/CourseDetailView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/tugas', name: 'Tugas', component: TugasView },
  { path: '/submission', name: 'Submission', component: SubmissionView },
  {
    path: '/courses/:id',
    name: 'CourseDetail',
    component: CourseDetailView,
  },
  {
  path: '/courses/all',
  name: 'AllCourses',
  component: () => import('@/views/AllCoursesView.vue')
}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
