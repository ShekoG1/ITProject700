import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Validate the user is has token
export default async function autoLogin(){
    let token = localStorage.getItem('token');

    // Login user if toke is not set
    if(token){
        const { data: { user } } = await supabase.auth.getUser(token)
        console.log(user);

        // Login user if JWT is not valid
        if(user){
            window.location.href = "/Dashboard";
        }
    }
}