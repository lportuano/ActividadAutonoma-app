import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { auth, db } from '../firebase/config';

export default function GuardarScreen() {

  const [id, seatid] = useState("")
  const [titulo, seattitulo] = useState("")
  const [anio, seatanio] = useState("")
  const [genero, seatgenero] = useState("")
  const [imagen, seatimagen] = useState("")
  const [descripcion, seatdescripcion] = useState("")

  function guardarPelicula() {

    const uid = auth.currentUser?.uid;

    if (id.trim() != "") {
      set(ref(db, 'users/' + uid + '/peliculas/' + id), {
        titulo: titulo,
        creacion: anio,
        genero: genero,
        imagen: imagen,
        descripcion: descripcion
      });

      limpiar()
      Alert.alert("Éxito", "Película guardada correctamente");

    } else {
      Alert.alert("ERROR", "los campos no pueden estar en blanco")
    }
  }


  function limpiar() {
    seatid("")
    seattitulo("")
    seatanio("")
    seatgenero("")
    seatimagen("")
    seatdescripcion("")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Agregar Nueva <Text style={{ color: '#E50914' }}>Película</Text></Text>
        <Text style={styles.subtitle}>Ingresa los detalles para catalogar el contenido.</Text>

        <View style={styles.form}>

          <Text style={styles.label}>ID de la pelicula</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 1"
            placeholderTextColor="#666"
            onChangeText={(texto) => seatid(texto)}
            value={id}
          />

          <Text style={styles.label}>Título de la película</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Inception"
            placeholderTextColor="#666"
            onChangeText={(texto) => seattitulo(texto)}
            value={titulo}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Año</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej: 2024"
                placeholderTextColor="#666"
                keyboardType="numeric"
                onChangeText={(texto) => seatanio(texto)}
                value={anio.toString()}
              />
            </View>
            <View style={{ flex: 2 }}>
              <Text style={styles.label}>Género</Text>
              <TextInput
                style={styles.input}
                placeholder="Acción, Ciencia Ficción"
                placeholderTextColor="#666"
                onChangeText={(texto) => seatgenero(texto)}
                value={genero}
              />
            </View>
          </View>

          <Text style={styles.label}>URL de la Portada (Imagen)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://imagen.com/poster.jpg"
            placeholderTextColor="#666"
            onChangeText={(texto) => seatimagen(texto)}
            value={imagen}
          />

          <Text style={styles.label}>Sinopsis / Descripción</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escribe un breve resumen..."
            placeholderTextColor="#666"
            multiline={true}
            numberOfLines={4}
            onChangeText={(texto) => seatdescripcion(texto)}
            value={descripcion}
          />

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={guardarPelicula}
          >
            <Text style={styles.saveButtonText}>GUARDAR PELÍCULA</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#8c8c8c',
    fontSize: 14,
    marginBottom: 30,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#e5e5e5',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 55,
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#E50914',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  cancelButton: {
    marginTop: 15,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#8c8c8c',
    fontSize: 14,
  },
});