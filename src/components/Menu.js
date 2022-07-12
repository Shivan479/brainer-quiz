import { Button } from 'native-base'
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default class Menu extends Component {
    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri }}
                    />
                    <Text style={styles.name}>Your name</Text>
                </View>

                <Text
                    onPress={() => onItemSelected('About')}
                    style={styles.item}
                >
                    About
      </Text>

                <Text
                    onPress={() => onItemSelected('Contacts')}
                    style={styles.item}
                >
                    Contacts
      </Text>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});
