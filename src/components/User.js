/**
 * @author Sinclair DeYoung 
 * @purpose User class used in hardcoded testing
 * @date Apr 1, 2024
 */
export default class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  isValidCredentials() {
    const users = [
      {email: 'user@example.com', password: 'password'},
      {email: 'user1@example.com', password: 'password1'}
    ];

    for (const user of users){
      if (this.username == user.email && this.password == user.password){
        return true;
      }
    }
    return false;
  }
}