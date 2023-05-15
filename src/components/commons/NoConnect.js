import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const NoConnect = () => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor="#0F1C2E" />

            <Text>Aucune connexion Internet</Text>
            <TouchableOpacity style={styles.actualisation}>
                <Text>Vous êtes hors ligne</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoConnect

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    actualisation: { marginVertical: 40, padding: 10, backgroundColor: "'rgba(155,155,155,0.1)'" },
})