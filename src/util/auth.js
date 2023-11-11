import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Validate the user is logged in
export default async function validateUser(){
    let token = localStorage.getItem('token');

    // Kick user if toke is not set
    if(!token && window.location.href != "/") {
        window.location.href = "/";
    }

    const { data: { user } } = await supabase.auth.getUser(token)
    console.log("User auth check");

    // Kick user if JWT is not valid
    if(!user){
        window.location.href = "/";
    }
}