import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Colors } from "../constants/Colors";
import InputRegister from "../components/InputRegister";
import SocialLoginButton from "../components/SocialLoginButton";
import { signUpWithEmail } from "./lib/auth";
import Toast from "react-native-toast-message";
import { supabase } from "./lib/supabase";

const Register = () => {
  const navigate = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Acção requerida',
        text2: 'Por favor, preencha todos os campos.',
      });
      return;
    }
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Acção requerida',
        text2: '"As senhas não coincidem.',
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, // o que o usuário digitar
        },
      },
    });

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar conta',
        text2: error.message,
      });
      return;
    } else {
      Toast.show({
        type: 'success',
        text1: 'Conta criada com sucesso',
        text2: 'Você pode fazer login agora.',
      });
      delay(2000);
      router.dismissAll();
      router.push("/login");
    }

  }
  return (
    <>
      <Stack.Screen options={{
        headerTitle: "Registrar", headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        )
      }} />

      <View style={styles.container}>
        <Text style={styles.title}>Criar Uma Conta</Text>
        <InputRegister onChangeText={setName} value={name} placeholder="Digite o seu Nome Completo" placeholderTextColor={Colors.gray} autoCapitalize="none" />
        <InputRegister onChangeText={setEmail} value={email}  placeholder="Digite o seu Email" placeholderTextColor={Colors.gray} autoCapitalize="none" keyboardType="email-address" />
        <InputRegister onChangeText={setPassword} value={password}  placeholder="Digite a sua Password" placeholderTextColor={Colors.gray} secureTextEntry={true} />
        <InputRegister onChangeText={setConfirmPassword} value={confirmPassword}  placeholder="Confirme a sua Password" placeholderTextColor={Colors.gray} secureTextEntry={true} />

        <TouchableOpacity style={styles.btnCriarConta} onPress={handleRegister}>
          <Ionicons name="checkmark" size={20} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.txtCriarConta}>Crian Conta</Text>
        </TouchableOpacity>

        <Text style={styles.txtCadastro}>
          Já tem uma conta?
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.txtCadastroSpan}>Entrar</Text>
            </TouchableOpacity>
          </Link>
        </Text>
        <View style={styles.divider} />

        <SocialLoginButton emailHref={"/login"} />
      </View>
      <Toast position='bottom' visibilityTime={2000}/>
    </>
  );
};

// Estilos
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
});

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Register;
