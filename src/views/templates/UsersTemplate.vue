<template>
    <div class="users">
        <h1>Gestion des utilisateurs</h1>
        <div class="tableau">
            <button type="button" class="btn btn-primary mb-2" @click="newUser">Ajouter un utilisateur</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Prénom</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.nom }}</td>
                        <td>{{ user.prenom }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <router-link :to="{ name: 'user', params: { id: user.id } }" class="btn btn-info m-1"><font-awesome-icon icon="eye" /> Voir</router-link>
                            <button class="btn btn-primary m-1" type="submit" @click="editUser(user.id)"><font-awesome-icon icon="pen-to-square" /> Modifier</button>
                            <button class="btn btn-danger m-1" type="submit" @click="dropUser(user.id)"><font-awesome-icon icon="trash" /> Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="userform" ref="userForm" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="userformLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 v-show="!edit" class="modal-title" id="userformLabel">Ajouter un utilisateur</h5>
                        <h5 v-show="edit" class="modal-title" id="userformLabel">Modilfier un utilisateur</h5>
                        <button type="button" class="btn-close" @click="getUsers" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <user-form :edit="edit" :user-data="currentUser" />
                    </div>
                    <!-- <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" class="btn btn-primary">Sauvegarder</button>
                    </div> -->
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import UserForm from "../composants/UserForm.vue";
    import axios from 'axios';
    import { Modal } from 'bootstrap';
    import Swal from "sweetalert2";
    export default {
        components: {
            UserForm
        },
        data() {
            return {
                users: [],
                errorMessage: '',
                edit: false,
                currentUser:{
                    nom: '',
                    prenom: '',
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            async getUsers() {
                let loader = this.$loading.show();
                try {
                    const response = await axios.get('/users');
                    if (response.data.status) {
                        loader.hide();
                        this.users = response.data.data;
                    } else {
                        this.errorMessage = response.data.message;
                        loader.hide();
                    }
                } catch (error) {
                    this.errorMessage = 'Erreur lors de la récupération des utilisateurs';
                }
            },
            newUser() {
                // $("userform").modal('show')
                const modal = new Modal(this.$refs.userForm);
                this.edit = false;
                modal.show();
            },
            async deleteUser(id) {
                let loader = this.$loading.show();
                try {
                    const response = await axios.delete('/users/' + id);
                    if (response.data.status) {
                        loader.hide();
                        Swal.fire({
                            title: "Utilisateur supprimé",
                            text: "L'utilisateur a été bien supprimé .",
                            icon: "success"
                        });
                        this.getUsers(); // Mettre à jour la liste des utilisateurs
                    } else {
                        loader.hide();
                        Swal.fire({
                            icon: "error",
                            title: "Oops... Une erreur s'est produite",
                            text: response.data.message,
                        });        
                    }
                } catch (error) {
                    loader.hide();
                    Swal.fire({
                            icon: "error",
                            title: "Oops... Une erreur s'est produite",
                            text: 'Erreur lors de la suppression de l\'utilisateur',
                    });  
                }
            },
            dropUser(id) {
                Swal.fire({
                    title: "Etes-vous sûr ?",
                    text: "Vous êtes sur le point de supprimer l'utilisateur sélectionné !",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Oui, Supprimer", 
                    cancelButtonText: "Annuler", 
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.deleteUser(id);
                    }
                });
            },
            editUser(id) {
                this.edit = true,
                this.currentUser = this.users.find(user => user.id === id);
                const modal = new Modal(this.$refs.userForm)
                modal.show()
            },
        },
        created() {
            this.getUsers();
        },
        name: 'UsersTemplate',
    }
</script>