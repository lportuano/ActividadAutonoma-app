import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import { auth } from '../firebase/config';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Tab")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        let titulo = "Error"
        let mensaje = "Revisar Credenciales"

        console.log(errorCode);

        switch (errorCode) {
          case "auth/invalid-credential":
            titulo = "Credenciales invalidas";
            mensaje = "Por favor revisar correo y contraseña";
            break;

          case "auth/invalid-email":
            titulo = "Correo invalido";
            mensaje = "Por favor revisa el correo";
            break;

          case "auth/missing-password":
            titulo = "Contraseña invalida";
            mensaje = "Ingrese su contraseña por favor";
            break;

          case "auth/network-request-failed":
            titulo = "Trafico de red";
            mensaje = "Espere porfavor y vuelva a intentar";
            break;

          default:
            break;
        }

        Alert.alert(titulo, mensaje);
      });
  }

  function restablecer() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Se envio un mensaje al correo")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <Text style={styles.logo}>PELIS<Text style={{ color: '#E50914' }}>HUB</Text></Text>

        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>Iniciar Sesión</Text>

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

          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.8}
            onPress={login}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpSection}
            onPress={restablecer}
          >
            <Text style={styles.whiteText}>Olvidaste tu contraseña ?</Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.signUpSection}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.grayText}>¿Nuevo en PelisHub? <Text style={styles.whiteText}>Suscríbete ahora.</Text></Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  logo: {
    color: '#fff',
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 50,
    letterSpacing: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    padding: 30,
    borderRadius: 8,
  },
  loginTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  input: {
    backgroundColor: '#333',
    height: 55,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonLogin: {
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
  },
  footerLinks: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#b3b3b3',
    fontSize: 14,
  },
  signUpSection: {
    marginTop: 40,
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