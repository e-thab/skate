<template>
    <div class="container">
      <form @submit.prevent="createAccount" novalidate style="display: flex; flex-direction: column; align-items: center;">
        <h1>Create Account</h1>
        <div>
        <h2>
            <div>
              <label for="username">Enter an Email:</label>
              <input type="email" v-model="email" required>
            </div>
            <div>
              <label for="password">Enter Password:</label>
              <input type="password" v-model="password" required>
            </div>
            <div>
              <label for="repeatPassword">Repeat Password:</label>
              <input type="password" v-model="repeatPassword" required>
            </div>
            <div class="password-requirements">
              <h2>Password Requirements:</h2>
              <ul>
                <li v-for="(requirement, index) in passwordRequirements" :key="index">
                {{ requirement.name }}: <span v-if="requirement.predicate">✅</span><span v-else>❌</span>
                </li>
              </ul>
            </div>
            <div class="button-container">
              <button type="submit">Create Account</button>
              <button type="button" @click="cancel">Cancel</button>
            </div>
            <div v-if="invalidInput" class="error-message">
              {{ invalidInputMsg }}
            </div>
        </h2>
        </div>
      </form>
    </div>
</template>
  
<script>
/**
 * @author Sinclair DeYoung 
 * @purpose Create Account page to handle password checks and email checks 
 * @date Apr 1, 2024
 */
//import User from './User';
import { supabase } from '@/lib/supabaseClient';
// import axios from 'axios';
  
export default {
  data() {
      return {
        email: '', 
        password: '',
        repeatPassword: '',
        invalidInput: false,
        invalidInputMsg: ''
        };
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
    async createAccount() {
      // console.log('Button Clicked');
      if (!this.email || !this.password || !this.repeatPassword) {
          alert('Please enter your email and create a password.');
          return;
          }
      
      if (!this.validateEmail(this.email)) {
        alert('Please enter a valid email address.')
        return;
      }

      if (this.password !== this.repeatPassword){
        alert('Passwords do not match. Please try again.');
        return;
      }
      
      ////// Axios/express implementation:
      // try {
      //   const response = await axios.post('http://localhost:8000/user/api/create-account',{
      //     email: this.email,
      //     password: this.password
      //   });
      //   console.log('Account created successfully.');
      //   this.$router.push('/');
      // } catch (error) {
      //   console.error('Error creating account : ', error);
      //   this.invalidInput = true;
      //   alert('Error creating account. Please try again.');
      //   this.clearPasswords();
      // }

      ////// Supabase implementation:
      const { error } = await supabase
        .from('users')
        .insert([{ email: this.email, password: this.password}]);
      if (error) {
        if (error.code === "23505") {
          // Error response for email already in use
          this.invalidInput = true;
          this.invalidInputMsg = "Account with this email already exists."
        } else {
          // Other error responses
        console.error('Error creating account : ', error);
        this.invalidInput = true;
        this.invalidInputMsg = "Error creating account. Please try again."
        this.clearPasswords();
        }
      } else {
        // Success
        console.log('Account created successfully.');
        this.$router.push('/');
      }

      ////// Supabase auth test
      // const { error } = await supabase.auth.signUp({
      //   email: this.email,
      //   password: this.password
      // })
      // if (error) {
      //   // Error response
      //   console.error('Error creating account : ', error);
      //   this.invalidInput = true;
      //   alert('Error creating account. Please try again.');
      //   this.clearPasswords();
      // } else {
      //   // Success
      //   console.log('Account created successfully.');
      //   this.$router.push('/');
      // }
    },
      cancel() {
        this.$router.push('/login');
    },
      clearPasswords(){
        this.password = '';
        this.repeatPassword = '';
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
.error-message {
  color: red;
  margin-top: 5px;
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
button {
  background-color: dimgray; /* Green */
  border: black;
  color: white;
  padding: 5px 13px;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  font-size: 13px;
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  }
&:hover {
  background-color: gray;
  }
&:active {
  background-color: black;
  }
</style>
  