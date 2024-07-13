import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/pages/LoginPage.vue'
import HomePage from '../views/pages/HomePage.vue'
import RegisterPage from '../views/pages/RegisterPage.vue'
import UsersPage from '../views/pages/UsersPage.vue'
import SingleUserPage from '../views/pages/SingleUserPage.vue'
// import CategoriePage from '../views/pages/CategoriePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/users',
      name: 'users',
      component: UsersPage
    },
    {
      path: '/user/:id',
      name: 'user',
      component: SingleUserPage
    },
    // {
    //   path: '/categorie',
    //   name: 'categorie',
    //   component: CategoriePage
    // }
  ]
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('auth_user_data');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  }else if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    // Il est déjà connecté ! on le redirige vers l'accueil
    next('/');
  }else {
    next();
  }
});

export default router
