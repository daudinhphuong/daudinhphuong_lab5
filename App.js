// src/App.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const usersCollectionRef = collection(db, 'users');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data = await getDocs(usersCollectionRef);
            const usersArray = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUsers(usersArray);
        } catch (err) {
            setError('Error fetching users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = async () => {
        setLoading(true);
        try {
            await addDoc(usersCollectionRef, { name, email, age });
            fetchUsers();
            setName('');
            setEmail('');
            setAge('');
        } catch (err) {
            setError('Error adding user');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (id) => {
        setLoading(true);
        try {
            const userDoc = doc(db, 'users', id);
            await updateDoc(userDoc, { name, email, age });
            fetchUsers();
        } catch (err) {
            setError('Error updating user');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            const userDoc = doc(db, 'users', id);
            await deleteDoc(userDoc);
            fetchUsers();
        } catch (err) {
            setError('Error deleting user');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Management</Text>
            {loading && <Text>Loading...</Text>}
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={addUser}>
                <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text>{item.name} - {item.email} - {item.age}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.smallButton} onPress={() => updateUser(item.id)}>
                                <Text style={styles.buttonText}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.smallButton} onPress={() => deleteUser(item.id)}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    smallButton: {
        backgroundColor: 'blue',
        padding: 5,
        marginLeft: 5,
    },
});

export default App;