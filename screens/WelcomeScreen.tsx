import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';

export default function WelcomeScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={{ uri: 'https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bca1-07e3f8eb14b8/af094000-8b1b-4395-8884-2f22b82269a3/EC-es-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg' }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.overlay}>
                    <Text style={styles.logo}>PELIS<Text style={{ color: '#E50914' }}>HUB</Text></Text>

                    <View style={styles.content}>
                        <Text style={styles.title}>Películas y series ilimitadas y mucho más.</Text>
                        <Text style={styles.subtitle}>Crea tu propia lista de favoritos ahora mismo.</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.buttonLogin}
                            
                            >
                            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.buttonRegister}>
                            <Text style={styles.buttonText}>REGÍSTRATE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Oscurece la imagen de fondo
        justifyContent: 'space-between',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    logo: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
    },
    content: {
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
        gap: 15, // Espaciado entre botones
    },
    buttonLogin: {
        backgroundColor: '#E50914', // Rojo Netflix
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonRegister: {
        backgroundColor: 'rgba(128, 128, 128, 0.5)', // Gris transparente
        paddingVertical: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});