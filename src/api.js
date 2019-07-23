import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirmToken: (token) => {
      axios.post("/api/auth/confirmation", { token })
        .then(function(res){
          console.log("hello from apiii");
          return res.data.user;
        })
        .catch(function(error){
          return error
        });
    },
  }
}
