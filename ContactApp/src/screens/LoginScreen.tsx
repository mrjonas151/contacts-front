import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
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

            <View style={styles.content}>
                <View style={[styles.card, styles.cardShadow]}>
                    <View style={styles.header}>
                        <View style={[styles.logoContainer, styles.logoShadow]}>
                            <Text style={styles.logoEmoji}>📱</Text>
                        </View>
                        <Text style={styles.title}>Topaz Contatos</Text>
                        <Text style={styles.subtitle}>
                            Gerencie seus contatos profissionalmente
                        </Text>
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
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.loginButton,
                            styles.buttonShadow,
                            loading && styles.loginButtonDisabled
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text style={styles.loginButtonText}>Entrar</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Register')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.registerText}>
                            Não tem conta? <Text style={styles.registerTextBold}>Cadastre-se</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: width * 0.08,
        paddingVertical: height * 0.05,  
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
        width: width * 0.2,  
        height: width * 0.2, 
        backgroundColor: '#3B82F6',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height * 0.02, 
    },
    logoShadow: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    logoEmoji: {
        fontSize: width * 0.08, 
        color: 'white',
    },
    title: {
        fontSize: width * 0.07, 
        fontWeight: 'bold',
        color: 'white',
        marginBottom: height * 0.01,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: width * 0.04, 
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: height * 0.01,
        lineHeight: width * 0.05, 
    },
    inputGroup: {
        marginBottom: height * 0.03, 
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
        paddingVertical: height * 0.02,  
        fontSize: width * 0.04, 
        color: 'white',
        minHeight: height * 0.06, 
    },
    loginButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        paddingVertical: height * 0.02, 
        marginBottom: height * 0.03,
        marginTop: height * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height * 0.06, 
    },
    loginButtonDisabled: {
        backgroundColor: '#60A5FA',
    },
    buttonShadow: {
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButtonText: {
        color: 'white',
        fontSize: width * 0.045, 
        fontWeight: 'bold',
        textAlign: 'center',
    },
    registerLink: {
        paddingVertical: height * 0.015, 
    },
    registerText: {
        color: '#60A5FA',
        fontSize: width * 0.04, 
        textAlign: 'center',
        fontWeight: '500',
    },
    registerTextBold: {
        fontWeight: 'bold',
    },
});