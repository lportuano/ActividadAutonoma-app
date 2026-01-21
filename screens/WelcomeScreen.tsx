import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Dimensions, 
  FlatList, 
  Image, 
  StatusBar 
} from 'react-native';

const { width, height } = Dimensions.get('window');

/** * AQUÍ VAN LAS IMÁGENES:
 * He puesto 4 URLs de posters de películas famosas en alta resolución.
 */
const BACKGROUND_IMAGES = [
  { id: '1', uri: 'https://www.xtrafondos.com/wallpapers/resized/stitch-pelicula-2025-live-action-13205.jpg?s=large' }, // Spider-Man
  { id: '2', uri: 'https://www.xtrafondos.com/wallpapers/resized/deadpool-y-wolverine-pelicula-12622.jpg?s=large' },    // Batman v Superman
  { id: '3', uri: 'https://www.xtrafondos.com/wallpapers/resized/luffy-one-piece-personaje-anime-y-pelicula-11927.jpg?s=large' },  // Avengers
  { id: '4', uri: 'https://www.xtrafondos.com/wallpapers/resized/pelicula-the-super-mario-bros-11417.jpg?s=large' },  // Interstellar
];

export default function WelcomeScreen() {
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
        blurRadius={6} // <-- Ajusta qué tan borroso lo quieres (0 a 10)
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
        {/* Capa negra encima de las fotos para mejorar contraste */}
        <View style={styles.darkOverlay} />
      </View>

      {/* Contenido Visual */}
      <View style={styles.overlay}>
        <View>
           <Text style={styles.logo}>PELIS<Text style={{color: '#E50914'}}>HUB</Text></Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>Películas ilimitadas y mucho más.</Text>
          <Text style={styles.subtitle}>Crea tu lista de favoritos y califica tus estrenos.</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLogin} activeOpacity={0.8}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister} activeOpacity={0.7}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Capa de oscuridad
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