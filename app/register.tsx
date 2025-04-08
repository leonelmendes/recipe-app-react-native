import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import InputRegister from "../components/InputRegister";
import SocialLoginButton from "../components/SocialLoginButton";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <InputRegister placeholder="Digite o seu Nome Completo" placeholderTextColor={Colors.gray} autoCapitalize="none" />
        <InputRegister placeholder="Digite o seu Email" placeholderTextColor={Colors.gray} autoCapitalize="none" keyboardType="email-address" />
        <InputRegister placeholder="Digite a sua Password" placeholderTextColor={Colors.gray} secureTextEntry={true} />
        <InputRegister placeholder="Confirme a sua Password" placeholderTextColor={Colors.gray} secureTextEntry={true} />

        <TouchableOpacity style={styles.btnCriarConta}>
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

export default Register;
