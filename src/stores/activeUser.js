/**
 * @author Ethan Harris
 * @purpose Represents the user currently logged in.
 * @date May 3, 2024
 */
import { reactive } from 'vue';
import { supabase } from '@/lib/supabaseClient';

class User {
    constructor() {
        this.loggedIn = false;
        this.email = null;
    }

    logIn(email) {
        this.loggedIn = true;
        this.email = email;
        console.log("Logging in as user", this.email)
    }

    logOut() {
        this.loggedIn = false;
        this.email = null;
        console.log("Logging out")
    }
}

// This component watches for Supabase auth state changes and stores them in this object,
// accessible globally by importing {activeUser} from this file.
export const activeUser = reactive(new User());

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        // console.log('SIGNED_IN', session);
        activeUser.logIn(session.user.email)
    } else if (event === 'SIGNED_OUT') {
        // console.log('SIGNED_OUT', session);
        activeUser.logOut()
    }
});