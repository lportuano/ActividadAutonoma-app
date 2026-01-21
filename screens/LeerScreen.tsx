import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { ref, onValue } from "firebase/database";
import { auth, db } from '../firebase/config';
import Card from '../components/Card';

export default function LeerScreen() {
  const [peliculas, setpeliculas] = useState([]);

  useEffect(() => {
    leerPelicula()
  }, [])

  function leerPelicula() {
    const uid = auth.currentUser?.uid;
    const starCountRef = ref(db, 'users/' + uid + '/peliculas/');
    onValue(starCountRef, (snapshot) => {
      // Usamos || {} para evitar que el código se rompa si no hay datos
      const data = snapshot.val() || {};
      let arrayData: any = Object.keys(data).map(id => ({
        id, ...data[id]
      }))

      setpeliculas(arrayData)

    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi <Text style={{ color: '#E50914' }}>Catálogo</Text></Text>
      </View>

      <FlatList
        data={peliculas}
        numColumns={2}
        renderItem={({ item }) => (
          <Card inf={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  list: { paddingHorizontal: 10, paddingBottom: 100 },
});