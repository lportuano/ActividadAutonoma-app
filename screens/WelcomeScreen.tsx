import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, FlatList, Image, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const BACKGROUND_IMAGES = [
  { id: '1', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_2964.webp' },
  { id: '2', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_2988.webp' },
  { id: '3', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_3021.webp' },
  { id: '4', uri: 'https://www.xtrafondos.com/thumbs/vertical/webp/1_3078.webp' },
];

export default function WelcomeScreen({ navigation }: any) {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para que el carrusel se mueva solo cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= BACKGROUND_IMAGES.length) {
        nextIndex = 0;
      }
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderBackground = ({ item }: { item: typeof BACKGROUND_IMAGES[0] }) => (
    <View style={{ width, height }}>
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        blurRadius={1} // <-- Ajusta qué tan borroso lo quieres (0 a 10)
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* Carrusel de Fondo */}
      <View style={StyleSheet.absoluteFill}>
        <FlatList
          ref={flatListRef}
          data={BACKGROUND_IMAGES}
          renderItem={renderBackground}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
        />
        <View style={styles.darkOverlay} />
      </View>

      <View style={styles.overlay}>
        <View>
          <Text style={styles.logo}>PELIS<Text style={{ color: '#E50914' }}>HUB</Text></Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Las mejores peliculas del cine a tu casa.</Text>
          <Text style={styles.subtitle}>Añade tus peliculas favoritas sin limite.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonRegister}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>REGÍSTRATE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  logo: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 3,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitle: {
    color: '#d1d1d1',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 15,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  buttonLogin: {
    backgroundColor: '#E50914',
    paddingVertical: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonRegister: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#fff',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});