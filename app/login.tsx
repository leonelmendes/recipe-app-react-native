import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, router, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import InputRegister from '@/components/InputRegister'
import { Colors } from '@/constants/Colors'
import SocialLoginButton from '../components/SocialLoginButton'

type Props = {}

const login = (props: Props) => {
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
                <InputRegister placeholder="Digite o seu Email" placeholderTextColor={Colors.gray} autoCapitalize="none" keyboardType="email-address" />
                <InputRegister placeholder="Digite a sua Password" placeholderTextColor={Colors.gray} secureTextEntry={true} />

                <TouchableOpacity style={styles.btnCriarConta} onPress={() => {
                            router.dismissAll();
                            router.replace('/home');}}>
                    <Text style={styles.txtCriarConta}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.divider} />

                <SocialLoginButton emailHref={"/login"} />
            </View>
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