import React from 'react'
import { RefreshControl } from 'react-native'
import { ScrollView } from 'react-native'

const Reloader = ({ children, onRefresh, refreshing }) => {

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} >
            {children}
        </ScrollView>
    )
}

export default Reloader
