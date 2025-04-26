import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack, useNavigation, useRouter } from 'expo-router'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import InputRegister from '@/components/InputRegister'
import { Colors } from '@/constants/Colors'
import SocialLoginButton from '../components/SocialLoginButton'
import { signInWithEmail } from './lib/auth'
import { useUser } from './context/UserContext'
import { supabase } from './lib/supabase'

type Props = {}

const login = (props: Props) => {
  const { refreshUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigation();

  const handleLogin = async () => {
    if(!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Acção requerida',
        text2: 'Por favor, preencha todos os campos.',
        position: 'bottom',
      } );
      return;
    }

    const {data, error} = await supabase.auth.signInWithPassword({ email, password });

    if(error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao fazer login',
        text2: error.message,
      } );
      return;
    } else {
      Toast.show({
        type: 'success',
        text1: 'Login realizado com sucesso',
        text2: 'Você está logado.'
      });
      /*console.log('Usuário logado:', data);
      console.log('Usuário logado:', data.user);*/
      delay(2000)
      await refreshUser();
      router.dismissAll();
      router.replace('/home');
    }
  }
    return (
        <>
            <Stack.Screen options={{
                headerTitle: "Entrar", headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                )
            }} />

            <View style={styles.container}>
                <Text style={styles.title}>Entrar</Text>
                <InputRegister onChangeText={setEmail} value={email} placeholder="Digite o seu Email" placeholderTextColor={Colors.gray} autoCapitalize="none" keyboardType="email-address" />
                <InputRegister onChangeText={setPassword} value={password} placeholder="Digite a sua Password" placeholderTextColor={Colors.gray} secureTextEntry={true} />

                <TouchableOpacity style={styles.btnCriarConta} onPress={handleLogin}>
                    <Ionicons name="checkmark" size={20} color="white" style={{ marginRight: 10 }} />
                    <Text style={styles.txtCriarConta}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <SocialLoginButton emailHref={"/login"} />
            </View>
            <Toast position='bottom' visibilityTime={2000}/>
        </>
    )
}

export default login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 20,
        backgroundColor: Colors.background,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 1.2,
        color: Colors.black,
        marginBottom: 50,
      },
      btnCriarConta: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignSelf: "stretch",
        alignItems: "center",
        borderRadius: 8,
        marginBottom: 20,
      },
      txtCriarConta: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "bold",
      },
      txtCadastro: {
        marginTop: 15,
        fontSize: 14,
        color: Colors.black,
        lineHeight: 24,
        justifyContent: 'center',
        textAlign: 'center',
      },
      txtCadastroSpan: {
        color: Colors.primary,
        fontWeight: '600',
      },
      divider: {
        borderTopColor: Colors.gray,
        borderTopWidth: StyleSheet.hairlineWidth,
        width: '30%',
        marginBottom: 30,
      }
})

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}