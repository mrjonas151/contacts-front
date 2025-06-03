import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function AppNavigator() {
    const { token } = useAuth();
    return token ? <HomeStack /> : <AuthStack />;
}