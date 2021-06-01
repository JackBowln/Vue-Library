<template>
      <b-card class="row d-flex shadow-sm mt-5 pt-2 border-4">
      <b-row class='justify-content-center'>
        <b-col cols="8" sm="6">
          <b-form-group label="Nome:">
            <b-form-input
              type="text"
              size="md"
              v-model="register.name"
              placeholder="Nome"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class='justify-content-center'>
        <b-col cols="8" sm="6">
          <b-form-group label="Email:">
            <b-form-input
              type="text"
              size="md"
              v-model="register.email"
              placeholder="Email"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class='justify-content-center'>
      <b-col cols="8" sm="6">
          <b-form-group label="Senha:">
            <b-form-input
              type="text"
              size="md"
              v-model="register.password"
              placeholder="Senha"
            ></b-form-input>
          </b-form-group>
        </b-col>    
      </b-row>
      <b-row class='justify-content-center'>
      <b-col cols="8" sm="6">
          <b-form-group label="Confirmar Senha:">
            <b-form-input
              type="text"
              size="md"
              v-model="register.password_confirmation"
              placeholder="Confirmar Senha"
            ></b-form-input>
          </b-form-group>
        </b-col>    
      </b-row>
      <b-row align="end" class='justify-content-center'>
        <b-col cols="8" sm="6">
          <b-button size="md" variant="primary" @click="handleSignUp">Cadastrar</b-button>
        </b-col>
      </b-row>

    </b-card>
</template>

<script>
export default {
  data() {
    return {
      register: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    handleSignUp() {
      this.$http
        .post(`/register/`, this.register)
        .then(res => {
          console.log(res)
          this.$router.push({ name: 'Login'})
          this.mensagens.push({
            texto: "!",
            tipo: "danger"
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
