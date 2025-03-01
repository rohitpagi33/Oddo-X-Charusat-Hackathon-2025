import { supabase } from '../config/db.js';


export const createUser = async (userData) => {
    const { data, error } = await supabase.from('users').insert([userData]);
    if (error) throw error;
    return data;
};

export const getUserById = async (id) => {
    const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
};