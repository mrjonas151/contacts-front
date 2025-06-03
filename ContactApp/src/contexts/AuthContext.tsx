import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

export type AuthContextProps = {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (user: { name: string; email: string; password: string }) => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const savedToken = await AsyncStorage.getItem('@contactapp:token');
                if (savedToken) {
                    setToken(savedToken);
                }
            } catch (error) {
                console.error('Erro ao carregar token:', error);
            } finally {
                setLoading(false);
            }
        };
        loadToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { token: authToken } = response.data;

            setToken(authToken);
            await AsyncStorage.setItem('@contactapp:token', authToken);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw new Error('Email ou senha incorretos');
        }
    };

    const register = async (user: { name: string; email: string; password: string }) => {
        try {
            await api.post('/auth/register', user);
        } catch (error) {
            console.error('Erro ao registrar:', error);
            throw new Error('Erro no cadastro. Verifique os dados.');
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('@contactapp:token');
            setToken(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
}