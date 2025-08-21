import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import { useRouter } from 'expo-router';
import { setAuthedUser } from '@/src/store/slices/UserSlice';

interface LoginScreenProps {
    onLogin?: (username: string, password: string) => void;
    error?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, error }) => {
    const dispatch = useDispatch<any>();
    const router = useRouter();

    const users = useSelector((state: RootState) => state.users.users);
    const authedUser = useSelector((state: RootState) => state.users.authedUser);
    console.log("authedUser", authedUser);
    const userList = useMemo(() => Object.values(users), [users]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
     console.log("userList", username)    // Redirect if already logged in
    useEffect(() => {
        if (authedUser) {
           router.replace("/service-center"); // Make sure this route exists in your app's routing configuration

        }
    }, [authedUser, router]);

    const handleLogin = useCallback(() => {
        setLoading(true);
        setLocalError(null);
        const userExists = userList.find(
            
            user => user.email === username && user.password === password
        );
        console.log("userExists", userExists);
        if (userExists) {
            onLogin?.(username, password);
            dispatch(setAuthedUser(username));
             router.replace("/service-center");

        } else {
            setLocalError('Invalid username or password');
            setPassword('');
        }
        setLoading(false);
    }, [username, password, userList, dispatch, onLogin, router]);

    const isButtonDisabled = !username || !password || loading;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <Text style={styles.title}>LOGIN</Text>
                {(error || localError) ? (
                    <Text style={styles.error}>{error || localError}</Text>
                ) : null}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={username}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setUsername}
                    autoCorrect={false}
                    textContentType="username"
                    returnKeyType="next"
                    editable={!loading}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    autoCorrect={false}
                    textContentType="password"
                    returnKeyType="done"
                    editable={!loading}
                />
                <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={isButtonDisabled} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', color: '#222' },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#fafafa' },
    error: { color: 'red', marginBottom: 12, textAlign: 'center', fontSize: 14 },
});

export default LoginScreen;