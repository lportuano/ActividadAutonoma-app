import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, ScrollView } from 'react-native';
import { auth, db } from '../firebase/config';
import { ref, set } from 'firebase/database';

export default function RegistroScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registro() {
    createUserWithEmailAndPassword(auth, email, password,)
      .then((userCredential) => {
        const user = userCredential.user;
        guardarUsuario(user.uid)
        navigation.navigate("Login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  }

  function guardarUsuario(uid: String) {
    set(ref(db, 'users/' + uid), {
      name: name,
      email: email,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.logo}>PELIS<Text style={{ color: '#E50914' }}>HUB</Text></Text>

          <View style={styles.formContainer}>
            <Text style={styles.title}>Crea una cuenta para empezar</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              placeholderTextColor="#8c8c8c"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              placeholderTextColor="#8c8c8c"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#8c8c8c"
              value={password}
              onChangeText={setPassword}
            />

            <Text style={styles.infoText}>
              Al hacer clic en Registrate, aceptas nuestros Términos y la Política de privacidad.
            </Text>

            <TouchableOpacity
              style={styles.buttonRegister}
              activeOpacity={0.8}
              onPress={() => registro()}
            >
              <Text style={styles.buttonText}>REGÍSTRATE</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.grayText}>¿Ya tienes cuenta? <Text style={styles.whiteText}>Inicia sesión.</Text></Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  logo: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'left',
    marginBottom: 40,
    letterSpacing: 2,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  stepText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#333',
    height: 60,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#444',
  },
  infoText: {
    color: '#8c8c8c',
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 18,
  },
  buttonRegister: {
    backgroundColor: '#E50914',
    height: 55,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 50,
    alignItems: 'center',
  },
  grayText: {
    color: '#8c8c8c',
    fontSize: 16,
  },
  whiteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});