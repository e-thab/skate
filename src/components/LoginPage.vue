<template>
  <div class="container"> 
    <div v-if="!isLoggedIn">
      <h2>
      <form @submit.prevent="login" novalidate>
        <h1>Login</h1>
        <div>
          <label for="username">Email:</label>
          <input
            :class="{ invalid: invalidLogin }"
            v-model="username"
            type="text"
            id="username"
            required
          />
        </div>
          <div class="password-container">
            <label for="password">Password:</label>
            <input
              :class="{ invalid: invalidLogin }"
              v-model="password"
              type="password"
              id="password"
              required
            />
          </div>
          <div class="button-container">
            <button type="submit">Login</button>
            <button type="button" @click="createAccount">Create Account</button>
          </div>
      </form>
      </h2>
      </div>
    <div v-else>
      <h1>Welcome {{ username }}!</h1>
      <button @click.prevent="logout">Logout</button>
    </div>
  </div>
</template>

<script>
/**
 * @author Sinclair DeYoung & William Troscher
 * @purpose Login page that handles users login system and create account page button
 * @date Apr 1, 2024
 */
// import axios from 'axios';
// import { login, isLoggedIn } from './Auth';
import { supabase } from '@/lib/supabaseClient';
// Holdes the data for the blank spaces
export default {
  data() {
    return {
      isLoggedIn: false,
      username: '',
      password: '',
      invalidLogin: false,
      userInfo: {},
    }
  },
  computed: {
    passwordRequirements() {
      return [
        {
          name: 'Must contain uppercase letters',
          predicate: this.password.toLowerCase() !== this.password,
        },
        {
          name: 'Must contain lowercase letters',
          predicate: this.password.toUpperCase() !== this.password,
        },
        {
          name: 'Must contain numbers',
          predicate: /\d/.test(this.password),
        },
        {
          name: 'Must contain symbols',
          predicate: /\W/.test(this.password),
        },
        {
          name: 'Must be at least 8 characters long',
          predicate: this.password.length >= 8,
        },
        {
          name: 'Must match',
          predicate: this.password === this.repeatPassword,
        }
      ];
    }
  },
  watch: {
    email(value) {
      this.validateEmail(value)
    }
  },
  methods: {
    async login() { // Method for handling user login
      if (!this.username || !this.password) {
        alert('Please enter both username and password.');
        return;
      }

      if (!this.validateEmail(this.username)){
        alert('Please enter a valid email address.');
        return;
      }

      ////// Axios/express implementation:
      // try {
      //   const response = await axios.post('http://localhost:8000/user/api/login', { //The axios post is employed to send the user response credentials to the end point
      //     email: this.username,
      //     password: this.password
      //   }); // Parameters to be sent are defined 
      //   console.log('Login successful');
      //   login(response.data.token); // Logging in the user with the received token
      //   this.invalidLogin = false;
      //   this.$router.push('/');
      // } catch (error) {
      //   console.error('Error logging in: ', error);
      //   this.invalidLogin = true;
      //   alert('Invalid  email or password, Please try again.');
      // } // Error handling

      ////// Supabase auth:
      const { error } = await supabase.auth.signInWithPassword({
        email: this.username,
        password: this.password
      })
      if (error) {
        // Error response
        console.error('Error logging in: ', error)
        alert('Invalid  email or password, Please try again.');
        this.invalidLogin = true
      } else {
        this.invalidLogin = false
        this.$router.push('/');
      }
    },
    // moves to the create account page
    createAccount() {
      this.$router.push({ name: 'create-account' });
    },
    // clears the password
    clearPassword() {
      this.password = '';
    },
    validateEmail(email){
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);    
    }
  }
};
</script>

<style scoped>
/* Add styles here in css */
h1 {
  color: black;
  background-color: rgb(13, 226, 180);
  width: 300px;
  border: 15px dotted gold;
  padding: 5px;
  margin: 5px;
  justify-content: center;
}
h2 {
    color: black;
    display: grid;
    height: auto;
    width: auto;
    justify-content: center;
    background-color: rgb(13, 226, 180);
  }
h3 {
  color: black;
  display: grid;
  height: auto;
  width: auto;
  justify-content: center;
  background-color: rgb(13, 226, 180);
}
.invalid {
  border-block: red;
}
.container {
  color: black;
  display: grid;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 3px solid teal;
  height: auto;
  width: auto;
  background-color: rgb(13, 226, 180);
}
.button-container{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
label {
  color: black;
  align-items: flex-start;
}
button {
  background-color: dimgray;
  border: black;
  color: white;
  padding: 5px 10px;
  position: center;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 13px;
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: gray;
  }
  &:active {
    background-color: black;
  }
}
</style>