import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    Dimensions
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { getContacts, deleteContact, Contact } from '../services/contactService';
import AddContactModal from '../components/AddContactModal';
import ContactItem from '../components/ContactItem';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
    const { token, logout } = useAuth();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const loadContacts = useCallback(async () => {
        if (!token) return;

        try {
            const data = await getContacts(token);
            setContacts(data);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar contatos');
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [token]);

    useEffect(() => {
        loadContacts();
    }, [loadContacts]);

    const onRefresh = () => {
        setRefreshing(true);
        loadContacts();
    };

    const handleDeleteContact = async (id: number) => {
        try {
            await deleteContact(token!, id);
            Alert.alert('Sucesso', 'Contato excluído com sucesso!');
            loadContacts();
        } catch (error) {
            console.error('Erro ao excluir:', error);
            Alert.alert('Erro', 'Erro ao excluir contato');
        }
    };

    const handleEditContact = (contact: Contact) => {
        console.log('✏️ Editando contato:', contact);
        setEditingContact(contact);
        setModalVisible(true);
    };

    const handleAddContact = () => {
        setEditingContact(null);
        setModalVisible(true);
    };

    const handleModalSubmit = () => {
        setModalVisible(false);
        setEditingContact(null);
        loadContacts();
    };

    const favoriteContacts = contacts.filter(contact => contact.favorite);
    const regularContacts = contacts.filter(contact => !contact.favorite);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={styles.loadingText}>Carregando contatos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerTitle}>
                            Meus Contatos
                        </Text>
                        <Text style={styles.headerSubtitle}>
                            {contacts.length} contato{contacts.length !== 1 ? 's' : ''}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.logoutButtonText}>Sair</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.addButtonContainer}>
                <TouchableOpacity
                    style={[styles.addButton, styles.addButtonShadow]}
                    onPress={handleAddContact}
                    activeOpacity={0.8}
                >
                    <Text style={styles.addButtonIcon}>+</Text>
                    <Text style={styles.addButtonText}>Adicionar Contato</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={[]}
                style={styles.flatList}
                ListHeaderComponent={() => (
                    <View style={styles.listContent}>
                        {favoriteContacts.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    ⭐ Favoritos
                                </Text>
                                {favoriteContacts.map((contact) => (
                                    <ContactItem
                                        key={contact.id}
                                        contact={contact}
                                        onEdit={() => handleEditContact(contact)}
                                        onDelete={() => handleDeleteContact(contact.id)}
                                    />
                                ))}
                            </View>
                        )}

                        {regularContacts.length > 0 && (
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>
                                    📋 Todos os Contatos
                                </Text>
                                {regularContacts.map((contact) => (
                                    <ContactItem
                                        key={contact.id}
                                        contact={contact}
                                        onEdit={() => handleEditContact(contact)}
                                        onDelete={() => handleDeleteContact(contact.id)}
                                    />
                                ))}
                            </View>
                        )}

                        {contacts.length === 0 && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyIcon}>📱</Text>
                                <Text style={styles.emptyTitle}>
                                    Nenhum contato ainda
                                </Text>
                                <Text style={styles.emptySubtitle}>
                                    Adicione seu primeiro contato para começar!
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#3B82F6']}
                        tintColor="#3B82F6"
                    />
                }
                renderItem={undefined}
                showsVerticalScrollIndicator={false}
            />

            <AddContactModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setEditingContact(null);
                }}
                onSubmit={handleModalSubmit}
                contact={editingContact}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: height * 0.02,
        color: '#6B7280',
        fontSize: width * 0.04,
    },
    header: {
        backgroundColor: '#3B82F6',
        paddingTop: height * 0.06,
        paddingBottom: height * 0.03,
        paddingHorizontal: width * 0.06,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        color: '#BFDBFE',
        fontSize: width * 0.035,
        marginTop: 2,
    },
    logoutButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        paddingVertical: height * 0.01,
        paddingHorizontal: width * 0.04,
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: width * 0.035,
    },
    addButtonContainer: {
        paddingHorizontal: width * 0.06,
        paddingVertical: height * 0.02,
    },
    addButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.06,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonShadow: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    addButtonIcon: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width * 0.05,
        marginRight: width * 0.02,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: width * 0.045,
    },
    flatList: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: width * 0.06,
        paddingBottom: height * 0.02,
    },
    section: {
        marginBottom: height * 0.03,
    },
    sectionTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: height * 0.015,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: height * 0.06,
    },
    emptyIcon: {
        fontSize: width * 0.15,
        marginBottom: height * 0.02,
    },
    emptyTitle: {
        fontSize: width * 0.05,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: height * 0.01,
    },
    emptySubtitle: {
        color: '#6B7280',
        textAlign: 'center',
        fontSize: width * 0.04,
        lineHeight: width * 0.05,
    },
});