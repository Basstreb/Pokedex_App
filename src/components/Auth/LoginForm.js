import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { user, userDetails } from '../../utils/userDB';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {

    const [error, setError] = useState(null);
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: values => {
            setError('');
            const { username, password } = values;

            if (user.username === username && user.password === password) {
                login(userDetails);
            } else {
                setError('El usuario o la contraseña son incorrectos');
            }
        }
    });

    return (
        <View>
            <Text style={styles.title} >Iniciar Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                autoCapitalize='none'
                value={formik.values.username}
                onChangeText={(text) => formik.setFieldValue('username', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                autoCapitalize='none'
                secureTextEntry={true}
                value={formik.values.password}
                onChangeText={(text) => formik.setFieldValue('password', text)}
            />
            <Button
                title='Entrar'
                onPress={() => formik.handleSubmit()}
            />

            {formik.errors.username && formik.errors.password ?
                <Text style={styles.error}>Los datos son obligatorios</Text> :
                <>
                    {formik.errors.username && <Text style={styles.error}>{formik.errors.username}</Text>}
                    {formik.errors.password && <Text style={styles.error}>{formik.errors.password}</Text>}
                    <Text style={styles.error}>{error}</Text>
                </>}
        </View>
    )
}

function initialValues() {
    return {
        username: '',
        password: '',
    }
}

function validationSchema() {
    return {
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        password: Yup.string().required('La contraseña es obligatoria')
    };
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
})