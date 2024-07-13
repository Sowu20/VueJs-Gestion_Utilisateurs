<template>
    <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">GestionUtilisateurs</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Acceuil</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/users">Utilisateurs</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/categorie">Catégories</router-link>
              </li>
            </ul>
            <form class="d-flex">
                <LogOut />
            </form>
          </div>
        </div>
      </nav>
    </header>
</template>

<script>
    import LogOut from '../composants/LogOut.vue'
    export default {
        components: {
            LogOut
        },
        name: 'AppHeader',
    }
</script>