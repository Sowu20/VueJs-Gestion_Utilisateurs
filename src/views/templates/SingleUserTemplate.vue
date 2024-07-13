<template>
    <div class="single-user">
        <div v-if="user">
            <h1>Détails de l'utilisateur</h1>
            <p><strong>Nom:</strong> {{ user.nom }}</p>
            <p><strong>Prénom:</strong> {{ user.prenom }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
        <div v-else>
            <p>Chargement des données de l'utilisateur...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SingleUserTemplate',
    data() {
        return {
            user: null,
            errorMessage: null
        }
    },
    methods: {
        async getUser() {
            const userId = this.$route.params.id;
            let loader = this.$loading.show();
            try {
                const response = await axios.get('/users/'+userId);
                if (response.data.status) {
                    loader.hide();
                    this.user = response.data.data;
                } else {
                    this.errorMessage = response.data.message;
                    loader.hide();
                }
            } catch (error) {
                this.errorMessage = 'Erreur lors de la récupération de l\'utilisateurs';
            }
        }
    },
    created(){
        this.getUser();
    }
}
</script>