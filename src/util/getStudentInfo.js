import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

// Validate the user is logged in
export default async function getStudentInfo(){
    let token = localStorage.getItem('token');

    // Kick user if toke is not set
    if(!token && window.location.href != "/") {
        window.location.href = "/";
    }

    const { data: { user } } = await supabase
    .from('student')
    .select(`*, address!inner(*)`)
    .eq('studentNumber',localStorage.getItem('studentNumber'));

    // Set Local storage is user data fetched
    if(user){
        localStorage.setItem('user',user);
        return true;
    }else{
        return false;
    }
}