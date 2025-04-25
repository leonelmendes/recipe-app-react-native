import Toast from 'react-native-toast-message';
import { supabase } from './supabase';

export const signUpWithEmail = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Erro no cadastro:', error.message);
    return { error };
  }

  const userId = data.user?.id;

  if (userId) {
    const { error: insertError } = await supabase.from('profiles').insert({
      id: userId,
      name: name,
    });

    if (insertError) console.error('Erro ao salvar perfil:', insertError.message);
  }

  return { data };
};

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao sair',
      text2: error.message,
    });
    throw error;
  }
  Toast.show({
    type: 'success',
    text1: 'Logout',
    text2: 'Você saiu com sucesso.',
  });
}

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Erro no login:', error.message);
    return { error };
  }

  return { data };
};

export const getProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Erro ao buscar perfil:', error.message);
    return null;
  }

  return data;
};

export async function updateProfile({ name, avatar_url }: { name: string; avatar_url?: string }) {
  const user = (await supabase.auth.getUser()).data.user;
  if (!user) return;

  const { error } = await supabase.from('profiles').update({
    name,
    ...(avatar_url && { avatar_url }),
  }).eq('id', user.id);

  if (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao atualizar perfil',
      text2: error.message,
    });
    throw error;
  }
  Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: 'Perfil atualizado com sucesso.',
  });
}
