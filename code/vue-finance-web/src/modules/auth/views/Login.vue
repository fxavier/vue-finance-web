<template>
  <v-container>
    <v-row align="center" justify="center" style="height:450px;">
      <v-col cols="12" md="6" sm="4" lg="3" xl="3">
        <v-card elevation="12">
          <v-toolbar color="primary" dark>
            <v-app-bar-title >{{ texts.toolbar }}</v-app-bar-title>
            <v-spacer></v-spacer>
            <v-progress-circular
             v-show="isLoading"
             indeterminate
             color="white"
             width="2"
            ></v-progress-circular>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
              v-if="!isLogin"
              prepend-icon="person"
              name="name"
              label="Nome"
              type="text"
              :error-messages="nameErrors"
              :success="!$v.user.name.$invalid"
              v-model.trim="$v.user.name.$model"
              ></v-text-field>
              <v-text-field
              prepend-icon="email"
              name="email"
              label="Email"
              type="email"
              :error-messages="emailErrors"
              :success="!$v.user.email.$invalid"
              v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
              prepend-icon="lock"
              name="password"
              label="Senha"
              type="password"
              :error-messages="passwordErrors"
              :success="!$v.user.password.$invalid"
              v-model.trim="$v.user.password.$model"
              ></v-text-field>
            </v-form>
            <v-btn
            block
            depressed
            color="secondary"
            @click="isLogin = !isLogin"
            >{{ texts.button }}</v-btn>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            large
            color="primary"
            :disabled="$v.$invalid"
            @click="submit"
            >Entrar</v-btn>
          </v-card-actions>
          <v-snackbar
           v-model="showSnackbar"
           top
          >
          {{ error }}
          <v-btn
           color="pink" text icon @click="showSnackbar = false">
           <v-icon>close</v-icon>
          </v-btn>
          </v-snackbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { minLength, email, required } from 'vuelidate/lib/validators'
import AuthService from './../services/auth-service'
import { formatErrors } from '@/utils'
export default {
  name: 'Login',
  data: () => ({
    error: undefined,
    isLogin: true,
    isLoading: false,
    showSnackbar: false,
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  validations () {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    }
    if (this.isLogin) { return validations }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(4)
        }
      }
    }
  },
  computed: {
    texts () {
      return this.isLogin
        ? { toolbar: 'Entrar', button: 'Criar conta' }
        : { toolbar: 'Criar conta', button: 'Já tenho conta' }
    },
    nameErrors () {
      const errors = []
      const name = this.$v.user.name
      if (!name.$dirty) { return errors }
      !name.required && errors.push('Por favor introduza o nome')
      !name.minLength && errors.push(`O nome deve conter no mínimo ${name.$params.minLength.min} caracteres`)
      return errors
    },
    emailErrors () {
      const errors = []
      const email = this.$v.user.email
      if (!email.$dirty) { return errors }
      !email.required && errors.push('Por favor introduza o email')
      !email.email && errors.push('O email é invalido (Ex: john@domain.com)')
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('Por favor introduza a Senha')
      !password.minLength && errors.push(`A senha deve conter no mínimo ${password.$params.minLength.min} caracteres`)
      return errors
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        this.isLogin
          ? await AuthService.login(this.user)
          : await AuthService.signup(this.user)
        this.$router.push(this.$route.query.redirect || '/dashboard')
      } catch (error) {
        console.log(error)
        this.error = formatErrors(error.message)
        this.showSnackbar = true
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style>

</style>
