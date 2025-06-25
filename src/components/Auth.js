/**
 * @author Sinclair DeYoung 
 * @purpose Token system for logged in users to track them logged in on different pages
 * @date Apr 1, 2024
 */
export function login(token){
    localStorage.setItem('token', token);
}
export function logout() {
    localStorage.removeItem('token');
}
export function isLoggedIn() {
    return localStorage.getItem('token') !== null;
}