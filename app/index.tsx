import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react'
import { Link, Stack } from "expo-router";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Colors } from '../constants/Colors';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import SocialLoginButton from '../components/SocialLoginButton';


const Index = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground source={require("../assets/images/recipe-splash.png")} style={{ flex: 1 }} resizeMode="cover">
        <View style={styles.container}>
          <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 01)']} style={styles.background}>
            <View style={styles.wrapper}>
              <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(300).springify()}>CookBook</Animated.Text>
              <Animated.Text style={styles.description} entering={FadeInRight.delay(500).duration(300).springify()}>Transforme ingredientes em memórias!</Animated.Text>

              <SocialLoginButton emailHref={'/login'}/>
              
              <Text style={styles.txtCadastro}>
                Não tem uma conta?
                <Link href="/register" asChild>
                  <TouchableOpacity>
                    <Text style={styles.txtCadastroSpan}>Criar Conta</Text>
                  </TouchableOpacity>
                </Link>
              </Text>

              <View style={styles.divider} />

            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "flex-end",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 5,
  },
  wrapper: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  description: {
    color: Colors.lightGray,
    fontSize: 14,
    letterSpacing: 1.2,
    lineHeight: 30,
    marginBottom: 20,
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
    marginBottom: 40,
  }
});

export default Index;