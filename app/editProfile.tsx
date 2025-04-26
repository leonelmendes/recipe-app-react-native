// app/screens/EditProfileScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getProfile, updateProfile } from './lib/auth';
import { useUser } from './context/UserContext';
import { supabase } from './lib/supabase';
import Toast from 'react-native-toast-message';

export default function EditProfileScreen() {
  const { user, refreshUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [showDelayedText, setShowDelayedText] =
        useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSave = async () => {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'O nome não pode estar vazio.',
      });
      return;
    }

     // Atualizar o nome no metadata
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { name },
    });

    if (metadataError) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao atualizar nome',
        text2: metadataError.message,
      });
      return;
    }

    // Atualizar senha se preenchida
    if (password) {
      const { error: passError } = await supabase.auth.updateUser({ password });
      if (passError)
        return Toast.show ({
          type: 'error',
          text1: 'Erro ao alterar senha',
          text2: passError.message,
        });
    }

    await refreshUser();
    Toast.show({
      type: 'success',
      text1: 'Sucesso',
      text2: 'Dados atualizados com sucesso.',
    });
    await delay(2000); // Espera 2 segundos antes de voltar
    //Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <View >
      <Text style={styles.title}>Editar Perfil</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: '#f2f2f2', color: '#777' }]}
        placeholder="E-mail"
        keyboardType="email-address"
        editable={false}
        selectTextOnFocus={false}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Nova senha"
        placeholderTextColor={'#999'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      </View>
      <Toast position='bottom' visibilityTime={2000} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#19C37D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  label: { fontSize: 16, fontWeight: '500' },
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}