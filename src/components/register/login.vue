<template>
      <b-card class="row d-flex shadow-sm mt-5 pt-2 border-4">
        <b-form @submit.prevent="signIn(login)">
          
      <b-row class='justify-content-center'>
        <b-col cols="8" sm="6">
          <b-form-group label="Email:">
            <b-form-input
              type="text"
              size="md"
              v-model="login.email"
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
              v-model="login.password"
              placeholder="Password"
            ></b-form-input>
          </b-form-group>
        </b-col>    
      </b-row>
      <b-row align="end" class='justify-content-center'>
        <b-col cols="8" sm="6">
          <b-button size="md" type='submit' variant="primary">Entrar</b-button>
        </b-col>
      </b-row>
        </b-form>

    </b-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    // handleLogin() {
    //   this.$http
    //     .post(`/login/`, this.login)
    //     .then(res => {
    //       localStorage.setItem("user-token", res.data.token);
    //       console.log(res);
    //       this.$router.push({ path: "/" });
    //       this.mensagens.push({
    //         texto: "!",
    //         tipo: "danger"
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    ...mapActions(["authRequest"]),
    async signIn(login) {
      console.log(login)
      let formData = new FormData();
      for (var e in login) {
        formData.append(e, login[e]);
      }
      const logged = await this.authRequest(formData);
      if (logged) {
        this.$router.push({ name: "Main" });
      }
    }
  }
};
</script>

<style>
</style>
