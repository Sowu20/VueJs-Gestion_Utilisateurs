<template>
    <div class="user-form">
        <form @submit.prevent="saveOrUpdate">
            <alert v-if="hasError == true" :success="false" :message="statusMessage" />
            <alert v-if="hasSuccess == true" :success="true" :message="statusMessage" />

            <div class="form-floating mb-3">
                <input v-model="userFormData.nom" type="nom" class="form-control" id="nom" placeholder="nom" required>
                <label for="nom">Nom</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="userFormData.prenom" type="prenom" class="form-control" id="prenom" placeholder="prenom"
                    required>
                <label for="prenom">Prénom</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="userFormData.email" type="email" class="form-control" id="email"
                    placeholder="name@example.com" required>
                <label for="email">Adresse email</label>
            </div>
            <div class="form-floating mb-3">
                <input v-model="userFormData.password" type="password" class="form-control" id="password"
                    placeholder="Password" required>
                <label for="password">Mot de passe</label>
            </div>

            <button class="w-100 btn btn-lg btn-primary" type="submit">Sauvegarder</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import Alert from "../composants/Alert.vue";
export default {
    components: {
        Alert
    },
    props: {
        edit: {
            type: Boolean,
            default: false
        },
        userData: {
            type: Object,
            default: () => {
                return {
                    id: '',
                    nom: '',
                    prenom: '',
                    email: '',
                    password: ''
                }
            }
        }
    },
    name: 'UserForm',
    data() {
        return {
            userFormData: {},
            statusMessage: "",
            hasError: false,
            hasSuccess: false,
        };
    },
    watch: {
        userData: {
            immediate: true,
            handler(newVal) {
                this.userFormData = { ...newVal };
            }
        },
        edit: {
            immediate: true,
            handler(newVal) {
               if(!newVal){
                    this.clearForm();
               }
            }
        }
    },
    methods: {
        async save() {
            let loader = this.$loading.show();
            try {
                const response = await axios.post('/users', {
                    nom: this.userFormData.nom,
                    prenom: this.userFormData.prenom,
                    email: this.userFormData.email,
                    password: this.userFormData.password,
                    device_name: 'gestionUtilisateur'
                });

                if (response.data.success) {
                    this.hasError = false;
                    this.hasSuccess = true;
                    this.statusMessage = "Utilisateur " + response.data.data.nom + " enregistré avec succès";
                    this.clearForm();
                    loader.hide();
                } else {
                    this.hasSuccess = false;
                    this.statusMessage = response.data.message;
                    this.hasError = true;
                    loader.hide();
                }
            } catch (error) {
                this.statusMessage = "Une erreur inconnue s'est produite";
                this.hasError = true;
                this.hasSuccess = false;
            }
        },
        clearForm() {
            this.userFormData.nom = "";
            this.userFormData.prenom = "";
            this.userFormData.email = "";
            this.userFormData.password = "";
        },
        async update(){
            let loader = this.$loading.show();
            try {
                const response = await axios.put('/users/'+this.userData.id, {
                    nom: this.userFormData.nom,
                    prenom: this.userFormData.prenom,
                    email: this.userFormData.email,
                    password: this.userFormData.password,
                });

                if (response.data.status) {
                    this.hasError = false;
                    this.hasSuccess = true;
                    this.statusMessage = "Utilisateur " + response.data.data.nom + " enregistré avec succès";
                    loader.hide();
                } else {
                    this.hasSuccess = false;
                    this.statusMessage = response.data.message;
                    this.hasError = true;
                    loader.hide();
                }
            } catch (error) {
                this.statusMessage = "Une erreur inconnue s'est produite";
                this.hasError = true;
                this.hasSuccess = false;
            }
        },
        saveOrUpdate(){
            if(this.edit){
                this.update();
            }else{
                this.save();
            }
        }
    },
}
</script>