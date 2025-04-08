import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

type Props = {}

const InputRegister = (props: React.ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      style={styles.inputRegister}
      {...props} />
  )
}

export default InputRegister

const styles = StyleSheet.create({
  inputRegister: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 16,
    alignSelf: "stretch",
    fontSize: 16,
    color: Colors.black,
    marginBottom: 20,
  },
})