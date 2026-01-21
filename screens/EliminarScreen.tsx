import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ref, remove } from 'firebase/database';
import { auth, db } from '../firebase/config';

export default function EliminarScreen() {

  const [id, setid] = useState("")

  function eliminarPelicula() {
    const uid = auth.currentUser?.uid;

    if (id.trim() != "") {
      remove(ref(db, 'users/' + uid + '/peliculas/' + id));
      Alert.alert("Eliminado", "La película ha sido borrada con éxito.");
      setid("");
    } else {
      Alert.alert("ERROR", "El ID no puede estar en blanco")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eliminar <Text style={{ color: '#E50914' }}>Contenido</Text></Text>
          <Text style={styles.subTitle}>Gestiona tu catálogo personal</Text>
        </View>

        <View style={styles.iconContainer}>
          <View style={styles.circle}>
            <Text style={styles.trashIcon}>🗑️</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.infoTitle}>¡Cuidado!</Text>
          <Text style={styles.infoText}>
            Introduce el ID de la película que deseas quitar de tu lista de forma permanente.
          </Text>

          <TextInput
            placeholder="ID de la pelicula"
            placeholderTextColor="#555"
            style={styles.input}
            onChangeText={(texto) => setid(texto)}
            value={id}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={eliminarPelicula}
          >
            <Text style={styles.buttonText}>Confirmar Eliminación</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerInfo}>
          <Text style={styles.stepText}>1. Ve a la sección 'Leer' para copiar el ID exacto.</Text>
          <Text style={styles.stepText}>2. Pégalo en el recuadro de arriba.</Text>
          <Text style={styles.stepText}>3. Confirma la acción para limpiar tu lista.</Text>
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
    paddingTop: 50,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#8c8c8c',
    fontSize: 14,
    marginTop: 5,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  trashIcon: {
    fontSize: 40,
  },
  card: {
    backgroundColor: '#121212',
    marginHorizontal: 25,
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: '#222',
  },
  infoTitle: {
    color: '#E50914',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    backgroundColor: "#000",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#333",
    color: "white",
    padding: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E50914',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerInfo: {
    marginTop: 30,
    paddingHorizontal: 40,
  },
  stepText: {
    color: '#444',
    fontSize: 12,
    marginBottom: 8,
    fontStyle: 'italic',
  }
})