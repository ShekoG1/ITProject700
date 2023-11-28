import React from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function forgotPassword(email){
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://example.com/api/auth/callback?next=/account/update-password',
        })
        if (error) throw error;
    } catch (error) {
        console.error('Error in resetting password: ', error.message);
    }
}
