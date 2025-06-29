import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { Contact, sendEmail } from '../services/contactService';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

interface Props {
    contact: Contact;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ContactItem({ contact, onEdit, onDelete }: Props) {
    const { token } = useAuth();

    const handleSendEmail = () => {
        Alert.prompt(
            'Enviar Email',
            'Digite sua mensagem:',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Enviar',
                    onPress: async (message) => {
                        if (!message || !token) return;

                        try {
                            await sendEmail(token, {
                                subject: `Mensagem para ${contact.name}`,
                                message,
                                senderName: 'ContactApp User'
                            });
                            Alert.alert('Sucesso', 'Email enviado com sucesso!');
                        } catch (error) {
                            Alert.alert('Erro', 'Erro ao enviar email');
                        }
                    }
                }
            ],
            'plain-text'
        );
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            `Deseja excluir ${contact.name}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => {
                        console.log('🗑️ Deletando contato:', contact.id);
                        onDelete(); 
                    }
                }
            ]
        );
    };

    const handleEdit = () => {
        console.log('✏️ Editando contato:', contact.id);
        onEdit(); 
    };

    return (
        <View style={[styles.container, styles.containerShadow]}>
            <View style={styles.header}>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{contact.name}</Text>
                    {contact.favorite && (
                        <View style={styles.favoriteContainer}>
                            <Text style={styles.favoriteIcon}>⭐</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                    <Text style={styles.infoIcon}>📧</Text>
                    <Text style={styles.infoText} numberOfLines={1}>
                        {contact.email}
                    </Text>
                </View>

                <View style={styles.infoItem}>
                    <Text style={styles.infoIcon}>📱</Text>
                    <Text style={styles.infoText}>
                        {contact.phone}
                    </Text>
                </View>
            </View>

            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.emailButton]}
                    onPress={handleSendEmail}
                    activeOpacity={0.8}
                >
                    <Text style={styles.emailButtonText}>✉️ Email</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.editButton]}
                    onPress={handleEdit}
                    activeOpacity={0.8}
                >
                    <Text style={styles.editButtonText}>✏️ Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={handleDelete} 
                    activeOpacity={0.8}
                >
                    <Text style={styles.deleteButtonText}>🗑️ Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: width * 0.04,
        marginBottom: width * 0.03,
        borderWidth: 1,
        borderColor: '#374151',
    },
    containerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    header: {
        marginBottom: width * 0.03,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: 'white',
        flex: 1,
    },
    favoriteContainer: {
        backgroundColor: '#FEF3C7',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    favoriteIcon: {
        fontSize: width * 0.035,
    },
    infoContainer: {
        marginBottom: width * 0.04,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: width * 0.02,
    },
    infoIcon: {
        fontSize: width * 0.04,
        marginRight: width * 0.02,
    },
    infoText: {
        fontSize: width * 0.035,
        color: '#D1D5DB',
        flex: 1,
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: width * 0.02,
    },
    actionButton: {
        flex: 1,
        paddingVertical: width * 0.025,
        paddingHorizontal: width * 0.02,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: width * 0.1,
    },
    emailButton: {
        backgroundColor: '#3B82F6',
    },
    emailButtonText: {
        color: 'white',
        fontSize: width * 0.03,
        fontWeight: '600',
        textAlign: 'center',
    },
    editButton: {
        backgroundColor: '#10B981',
    },
    editButtonText: {
        color: 'white',
        fontSize: width * 0.03,
        fontWeight: '600',
        textAlign: 'center',
    },
    deleteButton: {
        backgroundColor: '#EF4444',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: width * 0.03,
        fontWeight: '600',
        textAlign: 'center',
    },
});