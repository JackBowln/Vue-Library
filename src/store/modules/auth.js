import Vue from "vue";

export default {
  state: {
    token: localStorage.getItem("user-token") || "",
    status: "",
  },
  getters: {
    isAuthenticated: state => (state.token.length > 0 ? true : false),
    authStatus: state => state.status,
  },
  mutations: {
    authSuccess: (state, token) => {
      state.status = "success";
      state.token = token;
    },
    resetToken(state) {
      localStorage.removeItem("user-token");
      localStorage.removeItem("logged-user-id");
      state.loggedUser = null;
      state.token = "";
    }
  },
  actions: {
    authRequest({ commit }, auth) {
      return new Promise(resolve => {
        Vue.prototype.$http
          .post("/login", auth)
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("user-token", token);
            commit("setLoggedUser", resp.data.user);
            commit("authSuccess", token);
            resolve(true);
          })
          .catch(() => {
            localStorage.removeItem("user-token");
            resolve(false);
          });
      });
    },
    authLogout({ commit }) {
      return new Promise(resolve => {
        commit("resetToken");
        delete Vue.prototype.$http.defaults.headers.common["token"];
        resolve();
      });
    },
    recoveryCodeRequest({ commit }, email) {
      return new Promise(resolve => {
        Vue.prototype.$http
          .post("/users/requestPasswordCode", email)
          .then(resp => {
            const snackBar = {
              title: "Um código foi enviado para o seu E-mail!",
              description:
                "Verifique sua caixa de entrada e obtenha seu código para criar uma nova senha.",
              status: "success",
              time: 10000
            };

            commit("addSnackBar", snackBar);
            resolve(resp);
          })
          .catch(err => {
            const snackBar = {
              title: "Não foi possível enviar o código para seu E-mail!",
              description:
                "Verifique se preencheu o email corretamente e tente novamente.",
              status: "error"
            };

            commit("addSnackBar", snackBar);
            resolve(err);
          });
      });
    },
    updatePasswordRequest({ commit }, payload) {
      return new Promise(resolve => {
        Vue.prototype.$http
          .post("/users/updatePassword", payload)
          .then(resp => {
            const snackBar = {
              title: "Nova senha criada com sucesso!",
              status: "success"
            };

            commit("addSnackBar", snackBar);
            resolve(resp);
          })
          .catch(err => {
            const snackBar = {
              title: "Não foi possível criar uma nova senha!",
              description:
                "Verifique se o código preenchido está correto e tente novamente.",
              status: "error"
            };

            commit("addSnackBar", snackBar);
            resolve(err);
          });
      });
    }
  }
};
