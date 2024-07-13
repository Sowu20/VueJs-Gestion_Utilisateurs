<template>
    <div class="login">
        <main class="form-signin text-center">
            <form @submit.prevent="login">
                <img class="mb-4" src="/img/bootstrap-logo.svg" alt="" width="72" height="57">
                <h1 class="h3 mb-3 fw-normal">Connectez-vous</h1>
                <alert v-if="hasError==true" :success="false" :message="errorMessage"/>

                <div class="form-floating">
                    <input v-model="loginFormData.email" type="email" class="form-control" id="email"
                        placeholder="name@example.com">
                    <label for="email">Adresse email</label>
                </div>
                <div class="form-floating">
                    <input v-model="loginFormData.password" type="password" class="form-control" id="password"
                        placeholder="Password">
                    <label for="password">Mot de passe</label>
                </div>

                <div>
                    <p>Pas de compte ? <router-link to="/register">S'inscrire</router-link></p>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Connexion</button>
                <p class="mt-5 mb-3 text-muted">&copy; 2023-2024</p>
            </form>
        </main>
    </div>
</template>

<script> 
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import Alert from "../composants/Alert.vue";
    export default{
        name: 'LoginTemplate',
        components: {
            Alert
        },
        data() {
            return {
                loginFormData: {
                    email: '',
                    password: ''
                },
                errorMessage:"",
                hasError:false,
            };
        },
        methods: {
            async login() {
                let loader = this.$loading.show();
                try {
                    const response = await axios.post('/login', {
                        email: this.loginFormData.email,
                        password: this.loginFormData.password,
                        device_name: 'gestionUtilisateur'
                    });

                    if (response.data.success) {
                        // connecté avec siccès
                        console.log('Connecté avec succès', response.data);
                        // On stock son token dans localStorage
                        localStorage.setItem('token', response.data.data.token);
                        localStorage.setItem('auth_user_data', JSON.stringify(response.data.data));
                        this.hasError=false;
                        this.errorMessage="";
                        loader.hide();
                        this.$router.push('/'); // On le redirige vers le home
                    } else {
                        this.errorMessage = response.data.message;
                        this.hasError=true;
                        loader.hide();
                        /* 
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: response.data.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        */
                    }
                } catch (error) {
                    this.errorMessage ="Une erreur inconnue s'est produite";
                    this.hasError=true;
                }
            }
        }
    }
</script>

<style>
    .login {
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }

    .form-signin {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: auto;
    }

    .form-signin .checkbox {
        font-weight: 400;
    }

    .form-signin .form-floating:focus-within {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    @media (min-width: 768px) {
        .bd-placeholder-img-lg {
            font-size: 3.5rem;
        }
    }
</style>
