import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Validate the user is has token
export default async function logOut(){
    let token = localStorage.getItem('token');

    // Login user if toke is not set
    if(token){
        const { error } = await supabase.auth.signOut()
        console.log(error);

        // Login user if JWT is not valid
        if(!error){
            localStorage.removeItem("token");
            window.location.href = "/"
        }
    }else{
        window.location.href = "/"
    }
}