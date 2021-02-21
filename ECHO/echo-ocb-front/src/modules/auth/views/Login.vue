<template>
 <v-container fluid>
    <v-row justify="center" align="center">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="3"
      >
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Entrar no Sistema</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
            prepend-icon="person"
            name="username"
            type="text"
            label="Nome do Usuário"
            :error-messages="usernameErrors"
            :success="!$v.user.username.$invalid"
            v-model.trim="$v.user.username.$model"
            >
            </v-text-field>
            <v-text-field
            prepend-icon="lock"
            name="password"
            type="password"
            label="Senha"
            :error-messages="passwordErrors"
            :success="!$v.user.password.$invalid"
            v-model.trim="$v.user.password.$model"
            >
            </v-text-field>
            <v-btn
            :disabled="$v.$invalid"
            color="primary"
            large
            @click="submit"
            >Entrar</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions></v-card-actions>
      </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    submit () {
      console.log('User: ', this.user)
    }
  },
  computed: {
    usernameErrors () {
      const errors = []
      const username = this.$v.user.username
      if (!username.$dirty) { return errors }
      !username.required && errors.push('O Nome do usuário é obrigatòrio')
      !username.minLength && errors.push(`O nome do usuário deve conter pelo menos ${username.$params.minLength.min} caracteres`)
      return errors
    },
    passwordErrors () {
      const errors = []
      const password = this.$v.user.password
      if (!password.$dirty) { return errors }
      !password.required && errors.push('A Senha é obrigatória')
      !password.minLength && errors.push(`A senha deve conter pelo menos ${password.$params.minLength.min} caracteres`)
      return errors
    }
  }
}
</script>
