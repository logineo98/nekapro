import { Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import WebView from 'react-native-webview'
import { BackHandler } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import NetInfo from "@react-native-community/netinfo"
import { NoConnect } from './src/components'

const App = () => {

  const [confirmExit, setConfirmExit] = useState(false)
  const [webViewCanGoBack, setWebViewCanGoBack] = useState(false)
  const [isConnect, setIsConnect] = useState(false)

  const webViewRef = useRef(null)

  const handleBackPress = () => {
    if (webViewRef.current) {
      if (webViewCanGoBack) {
        webViewRef.current.goBack()
        setConfirmExit(false)
        return true
      } else {
        setConfirmExit(true)
        return true
      }
    }
    return false
  }

  useEffect(() => {
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', handleBackPress)

    return () => BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
  }, [confirmExit, webViewCanGoBack])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => setIsConnect(state.isConnected))

    return () => unsubscribe()
  }, [isConnect])

  return (
    !isConnect ? <NoConnect /> :

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <StatusBar barStyle={"light-content"} backgroundColor="#0F1C2E" />

        <WebView ref={webViewRef} source={{ uri: "https://nekapro.com/" }} onNavigationStateChange={(navState) => setWebViewCanGoBack(navState.canGoBack)} />

        <Modal animationType="fade" visible={confirmExit} onRequestClose={() => setConfirmExit(false)} transparent>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ height: 150, width: 315, backgroundColor: "#000", padding: 10, alignItems: "center", borderRadius: 5 }}>
              <Text style={{ fontSize: 25, color: "#fff", textAlign: "center" }}>Voulez-vous quitter l'application ?</Text>

              <View style={{ width: 150, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "#07AB4E", paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5 }} onPress={() => { BackHandler.exitApp(); setConfirmExit(false) }}>
                  <Text style={{ color: "#fff", fontSize: 18 }}>Oui</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#D25380", paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5 }} onPress={() => setConfirmExit(false)}>
                  <Text style={{ color: "#fff", fontSize: 18 }}>Non</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({})

