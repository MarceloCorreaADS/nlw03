import React , { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextData{
    signed: boolean;
    user: User | null;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
    loading: boolean;
}
 interface IProps {
    children: React.ReactNode;
 }

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider(props: {children: IProps;} ){
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadStorageData (){
            const storagedUser = await AsyncStorage.getItem('@HappyAuth:user');
            const storagedToken = await AsyncStorage.getItem('@HappyAuth:token');
            api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

            if(storagedUser && storagedToken){
                setUser(JSON.parse(storagedUser));
            }
            setLoading(false);
        }

        loadStorageData();
    }, []);

    async function signIn(email: string, password: string){
        const response = await api.post('authenticate', {
            email: email,
            password: password
        });

        setUser(response.data.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

        console.log(response.data.user);
        console.log(user?.email);

        await AsyncStorage.setItem('@HappyAuth:user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('@HappyAuth:token', response.data.token);
    }

    function signOut(){
        AsyncStorage.clear().then(() => {
            setUser(null);
        });
    }
    return(
        <AuthContext.Provider value={{signed: !!user, user: user, signIn, loading, signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthContext;

export function useAuth(){
    const context = useContext(AuthContext);

    return context;
}