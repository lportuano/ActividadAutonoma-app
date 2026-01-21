import { Alert, StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { ref, update } from 'firebase/database'
import { auth, db } from '../firebase/config'

export default function EditarScreen() {

  const [id, setid] = useState("")
  const [titulo, seattitulo] = useState("")
  const [anio, setanio] = useState("")
  const [genero, setgenero] = useState("")
  const [imagen, setimagen] = useState("")
  const [descripcion, setdescripcion] = useState("")

  function editarPelicula() {
    const uid = auth.currentUser?.uid;

    if (id.trim() != "") {
      update(ref(db, 'users/' + uid + '/peliculas/' + id), {
        titulo: titulo,
        creacion: anio,
        genero: genero,
        imagen: imagen,
        descripcion: descripcion
      });

      limpiar();
      Alert.alert("Éxito", "Película actualizada correctamente");

    } else {
      Alert.alert("ERROR", "Debes ingresar el ID de la película a editar");
    }
  }

  function limpiar() {
    setid("")
    seattitulo("")
    setanio("")
    setgenero("")
    setimagen("")
    setdescripcion("")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Editar <Text style={{ color: '#E50914' }}>Película</Text></Text>
          <Text style={styles.subTitle}>Ingresa el ID exacto para modificar los datos</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>ID de la Película (Título actual)</Text>
          <TextInput
            placeholder='ID del Título a buscar...'
            placeholderTextColor="#555"
            style={[styles.input, styles.inputHighlight]}
            onChangeText={(texto) => setid(texto)}
            value={id}
          />

          <Text style={styles.label}>Nuevo Título</Text>
          <TextInput
            placeholder='Nuevo nombre'
            placeholderTextColor="#555"
            style={styles.input}
            onChangeText={(texto) => seattitulo(texto)}
            value={titulo}
          />

          <Text style={styles.label}>Año de Lanzamiento</Text>
          <TextInput
            placeholder='Ej: 2024'
            placeholderTextColor="#555"
            style={styles.input}
            keyboardType='numeric'
            onChangeText={(texto) => setanio(texto)}
            value={anio}
          />

          <Text style={styles.label}>Género</Text>
          <TextInput
            placeholder='Acción, Drama...'
            placeholderTextColor="#555"
            style={styles.input}
            onChangeText={(texto) => setgenero(texto)}
            value={genero}
          />

          <Text style={styles.label}>URL de la Imagen</Text>
          <TextInput
            placeholder='https://...'
            placeholderTextColor="#555"
            style={styles.input}
            onChangeText={(texto) => setimagen(texto)}
            value={imagen}
          />

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            placeholder='Nueva sinopsis...'
            placeholderTextColor="#555"
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            onChangeText={(texto) => setdescripcion(texto)}
            value={descripcion}
          />

          <TouchableOpacity style={styles.button} onPress={editarPelicula}>
            <Text style={styles.buttonText}>Actualizar Datos</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    padding: 30,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#8c8c8c',
    fontSize: 14,
    marginTop: 5,
  },
  form: {
    paddingHorizontal: 30,
  },
  label: {
    color: '#E50914',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 15,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputHighlight: {
    borderColor: '#E50914',
    borderWidth: 1.5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#E50914',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#8c8c8c',
    fontSize: 14,
  }
})