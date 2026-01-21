import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');
const columnWidth = (width / 2) - 20;

export default function Card(props: any) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
            >
                <Image
                    source={{ uri: props.inf.imagen || 'https://via.placeholder.com/150' }}
                    style={styles.poster}
                />
                <View style={styles.info}>
                    <Text style={styles.title} numberOfLines={1}>
                        {props.inf.titulo}
                    </Text>
                    <View style={styles.row}>
                        <Text style={styles.year}>{props.inf.creacion}</Text>
                        <Text style={styles.separator}>•</Text>
                        <Text style={styles.genre} numberOfLines={1}>{props.inf.genero}</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>

                        <Image
                            source={{ uri: props.inf.imagen }}
                            style={styles.modalImage}
                        />

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>

                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.modalTitle}>{props.inf.titulo}</Text>

                            <View style={[styles.row, { marginBottom: 15 }]}>
                                <Text style={styles.modalYear}>{props.inf.creacion}</Text>
                                <View style={styles.ageBadge}>
                                    <Text style={styles.ageText}>13+</Text>
                                </View>
                                <Text style={styles.modalGenre}>{props.inf.genero}</Text>
                            </View>

                            <Text style={styles.descriptionTitle}>Sinopsis</Text>
                            <Text style={styles.descriptionText}>
                                {props.inf.descripcion || "No hay descripción disponible para esta película."}
                            </Text>

                            <TouchableOpacity
                                style={styles.playButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.playButtonText}>▶ Reproducir</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: columnWidth,
        margin: 10,
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        overflow: 'hidden',
    },
    poster: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
    },
    info: {
        padding: 10,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    year: {
        color: '#8c8c8c',
        fontSize: 12,
    },
    genre: {
        color: '#8c8c8c',
        fontSize: 12,
        flex: 1,
    },
    separator: {
        color: '#444',
        marginHorizontal: 5,
        fontSize: 12,
    },



    // ESTILOS DEL MODAL
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#121212',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: height * 0.8,
        width: '100%',
    },
    modalImage: {
        width: '100%',
        height: 250,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 35,
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalBody: {
        padding: 20,
    },
    modalTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textTransform: 'capitalize'
    },
    modalYear: {
        color: '#46d369',
        fontWeight: 'bold',
        marginRight: 15,
    },
    ageBadge: {
        backgroundColor: '#333',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 3,
        marginRight: 15,
    },
    ageText: {
        color: '#fff',
        fontSize: 12,
    },
    modalGenre: {
        color: '#fff',
        fontSize: 14,
    },
    descriptionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 8,
    },
    descriptionText: {
        color: '#ccc',
        fontSize: 14,
        lineHeight: 20,
    },
    playButton: {
        backgroundColor: '#fff',
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 50,
    },
    playButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    }
});