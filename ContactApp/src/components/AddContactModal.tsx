import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { createContact, updateContact } from '../services/contactService';

const { width, height } = Dimensions.get('window');

interface Props {
    visible: boolean;
    onClose: () => void;
    onSubmit: () => void;
    contact?: {
        id?: number;
        name: string;
        email: string;
        phone: string;
        favorite: boolean;
    } | null;
}

export default function AddContactModal({ visible, onClose, onSubmit, contact }: Props) {
    const { token } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [favorite, setFavorite] = useState(false);
    const [loading, setLoading] = useState(false);

    const isEditing = !!contact?.id;

    const handleSubmit = async () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'O nome é obrigatório');
            return;
        }

        if (!email.trim()) {
            Alert.alert('Erro', 'O email é obrigatório');
            return;
        }

        if (!phone.trim()) {
            Alert.alert('Erro', 'O telefone é obrigatório');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Digite um email válido');
            return;
        }

        if (!token) {
            Alert.alert('Erro', 'Token de autenticação não encontrado');
            return;
        }

        setLoading(true);
        try {
            const contactData = {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                phone: phone.trim(),
                favorite
            };

            if (isEditing && contact?.id) {
                await updateContact(token, contact.id, contactData);
                Alert.alert('Sucesso', 'Contato atualizado com sucesso!');
            } else {
                await createContact(token, contactData);
                Alert.alert('Sucesso', 'Contato criado com sucesso!');
            }

            setName('');
            setEmail('');
            setPhone('');
            setFavorite(false);

            onSubmit();
        } catch (error: any) {
            console.error('Erro ao salvar contato:', error);
            Alert.alert('Erro', 'Erro ao salvar contato. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setName('');
        setEmail('');
        setPhone('');
        setFavorite(false);
        onClose();
    };

    useEffect(() => {
        if (contact) {
            setName(contact.name);
            setEmail(contact.email);
            setPhone(contact.phone);
            setFavorite(contact.favorite);
        } else {
            setName('');
            setEmail('');
            setPhone('');
            setFavorite(false);
        }
    }, [contact, visible]);

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={[styles.container, styles.containerShadow]}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {isEditing ? '✏️ Editar Contato' : '➕ Novo Contato'}
                        </Text>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Nome Completo *
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Digite o nome completo"
                                value={name}
                                onChangeText={setName}
                                maxLength={50}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Email *
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="exemplo@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                maxLength={100}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                Telefone *
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="(11) 99999-9999"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                                maxLength={20}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.favoriteContainer}>
                            <View style={styles.favoriteInfo}>
                                <Text style={styles.favoriteTitle}>
                                    ⭐ Contato Favorito
                                </Text>
                                <Text style={styles.favoriteSubtitle}>
                                    Marcar como contato favorito
                                </Text>
                            </View>
                            <Switch
                                value={favorite}
                                onValueChange={setFavorite}
                                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                                thumbColor={favorite ? '#FFFFFF' : '#9CA3AF'}
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={handleClose}
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.cancelButtonText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    styles.submitButton,
                                    loading && styles.submitButtonDisabled
                                ]}
                                onPress={handleSubmit}
                                disabled={loading}
                                activeOpacity={0.8}
                            >
                                {loading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    <Text style={styles.submitButtonText}>
                                        {isEditing ? 'Atualizar' : 'Salvar'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.requiredText}>
                            * Campos obrigatórios
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        width: width * 0.92,
        maxHeight: height * 0.8,
    },
    containerShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 15,
    },
    header: {
        backgroundColor: '#3B82F6',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.02,
    },
    headerText: {
        color: 'white',
        fontSize: width * 0.05,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.03,
    },
    inputGroup: {
        marginBottom: height * 0.025,
    },
    label: {
        color: '#374151',
        fontWeight: '600',
        marginBottom: height * 0.01,
        fontSize: width * 0.04,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        fontSize: width * 0.04,
        color: '#1F2937',
        backgroundColor: '#F9FAFB',
    },
    favoriteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: width * 0.04,
        marginBottom: height * 0.03,
    },
    favoriteInfo: {
        flex: 1,
    },
    favoriteTitle: {
        color: '#374151',
        fontWeight: '600',
        fontSize: width * 0.04,
    },
    favoriteSubtitle: {
        color: '#6B7280',
        fontSize: width * 0.035,
        marginTop: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: width * 0.03,
        marginBottom: height * 0.02,
    },
    button: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: height * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#E5E7EB',
    },
    cancelButtonText: {
        color: '#374151',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },
    submitButton: {
        backgroundColor: '#3B82F6',
    },
    submitButtonDisabled: {
        backgroundColor: '#93C5FD',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },
    requiredText: {
        color: '#6B7280',
        fontSize: width * 0.035,
        textAlign: 'center',
    },
});