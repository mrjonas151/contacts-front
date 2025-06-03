import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StatusBar,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function RegisterScreen({ navigation }: any) {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Digite um email válido');
            return;
        }

        setLoading(true);
        try {
            await register({ name, email, password });
            Alert.alert('Sucesso', 'Conta criada com sucesso!', [
                { text: 'OK', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error: any) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar backgroundColor="#111827" barStyle="light-content" />

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={[styles.card, styles.cardShadow]}>
                        <View style={styles.header}>
                            <View style={[styles.logoContainer, styles.logoShadow]}>
                                <Text style={styles.logoEmoji}>✨</Text>
                            </View>
                            <Text style={styles.title}>Criar Conta</Text>
                            <Text style={styles.subtitle}>
                                Junte-se ao Topaz Contatos
                            </Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome Completo</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Seu nome completo"
                                value={name}
                                onChangeText={setName}
                                maxLength={50}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="seu@email.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                maxLength={100}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                maxLength={50}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmar Senha</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                maxLength={50}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.registerButton,
                                styles.buttonShadow,
                                loading && styles.registerButtonDisabled
                            ]}
                            onPress={handleRegister}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Text style={styles.registerButtonText}>
                                    Criar Conta
                                </Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginLink}
                            onPress={() => navigation.goBack()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.loginText}>
                                Já tem conta? <Text style={styles.loginTextBold}>Faça login</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.05,
        minHeight: height,
    },
    card: {
        backgroundColor: '#1F2937',
        borderRadius: 24,
        padding: width * 0.08,
        borderWidth: 1,
        borderColor: '#374151',
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: height * 0.015,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.04,
    },
    logoContainer: {
        width: width * 0.16,
        height: width * 0.16,
        backgroundColor: '#10B981',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.02,
    },
    logoShadow: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoEmoji: {
        fontSize: width * 0.06,
        color: 'white',
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: height * 0.01,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: width * 0.04,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: height * 0.005,
    },
    inputGroup: {
        marginBottom: height * 0.025,
    },
    label: {
        fontSize: width * 0.04,
        fontWeight: '600',
        color: '#D1D5DB',
        marginBottom: height * 0.01,
    },
    input: {
        backgroundColor: '#374151',
        borderWidth: 1,
        borderColor: '#4B5563',
        borderRadius: 12,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        fontSize: width * 0.04,
        color: 'white',
        minHeight: height * 0.055,
    },
    registerButton: {
        backgroundColor: '#10B981',
        borderRadius: 12,
        paddingVertical: height * 0.02,
        marginBottom: height * 0.03,
        marginTop: height * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height * 0.06,
    },
    registerButtonDisabled: {
        backgroundColor: '#34D399',
    },
    buttonShadow: {
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    registerButtonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loginLink: {
        paddingVertical: height * 0.015,
    },
    loginText: {
        color: '#60A5FA',
        fontSize: width * 0.04,
        textAlign: 'center',
        fontWeight: '500',
    },
    loginTextBold: {
        fontWeight: 'bold',
    },
});