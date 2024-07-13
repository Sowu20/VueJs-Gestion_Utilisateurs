<template>
    <default-layout>
        <div class="home">
            <h1>Bienvenue {{ user.prenom }} {{ user.nom }}</h1>
            <router-link to="/users">
                <div class="card shadow-sm" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Gestion des utilisateurs</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Créer, Modifier, supprimer</h6>
                    </div>
                </div>
            </router-link>
            <router-link to="">
                <div class="card shadow-sm" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Gestion des ca</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Créer, Modifier, supprimer</h6>
                    </div>
                </div>
            </router-link>
        </div>
    </default-layout>
</template>

<script>
    import DefaultLayout from './Layout.vue';
    export default {
        components: {
            DefaultLayout
        },
        computed: {
            user() {
                const auth_user = localStorage.getItem('auth_user_data') 
                return JSON.parse(auth_user);
            },   
        },
        name: 'HomePage',
    }
</script>