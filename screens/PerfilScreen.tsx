import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { auth, db } from '../firebase/config';
import { onValue, ref } from 'firebase/database';

export default function PerfilScreen({ navigation }: any) {

    const [users, setUsers] = useState({} as info)

    useEffect(() => {
        leerUsuario();
    }, []);

    function leerUsuario() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                leerUsuarioLogeado(user.uid)
            } else {
            }
        });
    }

    function leerUsuarioLogeado(uid: string) {
        const userRef = ref(db, 'users/' + uid);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUsers(data);
        });
    }

    function cerrarSesion() {
        signOut(auth)
            .then(() => {
                navigation.navigate("Welcome")
            })
            .catch((error) => {
                console.log("Error al cerrar sesión", error);
            });
    }

    type info = {
        name: String,
        email: String
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://www.xtrafondos.com/thumbs/webp/1_13053.webp' }}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>{users.name}</Text>
                    <Text style={styles.userEmail}>{users.email}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={[styles.statBox, styles.borderLeft]}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Vistas</Text>
                    </View>
                    <View style={[styles.statBox, styles.borderLeft]}>
                        <Text style={styles.statNumber}>Premium</Text>
                        <Text style={styles.statLabel}>Plan</Text>
                    </View>
                </View>

                <View style={styles.menuContainer}>
                    <Text style={styles.sectionTitle}>Cuenta</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>🍿 Mi Lista de Favoritos</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>⚙️ Configuración de App</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>Preferencias</Text>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>🔔 Notificaciones</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>📥 Mis Descargas</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>🔒 Privacidad y Seguridad</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuText}>❓ Centro de Ayuda</Text>
                        <Text style={styles.arrow}>›</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={cerrarSesion}
                >
                    <Text style={styles.logoutText}>Cerrar Sesión</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
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
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: '#121212',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#E50914',
    },
    editBadge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: '#E50914',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    editIcon: {
        color: '#fff',
        fontSize: 14,
    },
    userName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    userEmail: {
        color: '#8c8c8c',
        fontSize: 14,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: -25,
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
        paddingVertical: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    statBox: {
        flex: 1,
        alignItems: 'center',
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: '#333',
    },
    statNumber: {
        color: '#E50914',
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        color: '#8c8c8c',
        fontSize: 12,
        marginTop: 2,
    },
    menuContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#1a1a1a',
    },
    menuText: {
        color: '#e5e5e5',
        fontSize: 16,
        fontWeight: '500',
    },
    arrow: {
        color: '#E50914',
        fontSize: 24,
        fontWeight: '300',
    },
    logoutButton: {
        marginTop: 40,
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E50914',
        alignItems: 'center',
    },
    logoutText: {
        color: '#E50914',
        fontSize: 16,
        fontWeight: 'bold',
    },
    versionText: {
        color: '#444',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 12,
    },
    sectionTitle: {
        color: '#E50914',
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginTop: 20,
        marginBottom: 10,
        letterSpacing: 1,
    },
});