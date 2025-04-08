import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Href, Link, LinkProps } from 'expo-router'
import { Colors } from '../constants/Colors'

type Props = {
    emailHref: LinkProps['href']
}

const SocialLoginButton = (props: Props) => {

    const createTwoButtonAlert = () =>
        Alert.alert('Aviso', 'Esta opção está temporariamente indisponivel.', [
          {text: 'OK'}
        ]);

    const { emailHref } = props
    return (
        <View style={styles.loginWrapper}>
            <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                <Link href={emailHref} asChild>
                    <TouchableOpacity style={styles.touchEmail}>
                        <Image source={require("../assets/images/email.png")} style={styles.imgEmail} />
                        <Text style={styles.txtEmail}>Entrar com e-mail</Text>
                    </TouchableOpacity>
                </Link>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(700).duration(500)}>
                    <TouchableOpacity style={styles.touchEmail} onPress={createTwoButtonAlert}>
                        <Image source={require("../assets/images/google.png")} style={styles.imgEmail} />
                        <Text style={styles.txtEmail}>Entrar com Google</Text>
                    </TouchableOpacity>

            </Animated.View>

            <Animated.View entering={FadeInDown.delay(1100).duration(500)}>
                    <TouchableOpacity style={styles.touchEmail} onPress={createTwoButtonAlert}>
                        <Image source={require("../assets/images/apple.png")} style={styles.imgEmail} />
                        <Text style={styles.txtEmail}>Entrar com Apple</Text>
                    </TouchableOpacity>

            </Animated.View>
        </View>
    )
}

export default SocialLoginButton

const styles = StyleSheet.create({
    loginWrapper: {
        alignSelf: 'stretch',
        marginHorizontal: 35,
    },
    imgEmail: {
        width: 25,
        height: 25,
    },
    touchEmail: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.gray,
        borderRadius: 25,
        padding: 8,
        borderWidth: StyleSheet.hairlineWidth,
        //width: '100%',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 10,
    },
    txtEmail: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.black,
    },
})