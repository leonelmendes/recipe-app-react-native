import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  onSearchPress: () => void;
  style?: any;
  placeholder?: string;
}

const SearchBar = ({ 
  value, 
  onChangeText, 
  onSubmitEditing, 
  onSearchPress,
  style,
  placeholder = 'Search recipe' 
}: SearchBarProps) => {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color="#888" style={styles.icon} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        placeholderTextColor="#888"
        returnKeyType="search"
      />
      {value ? (
        <TouchableOpacity onPress={onSearchPress}>
          <Ionicons name="send" size={20} color="#E74C3C" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default SearchBar;