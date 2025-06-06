import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import request from '../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await request.post('/users/login', { email, password });
      await AsyncStorage.setItem('token', res.data['acces_token']);
      router.push('/clients');
    } catch (err) {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email} autoCapitalize="none" />
      <Text>Contraseña:</Text>
      <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={() => router.push('/register')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
