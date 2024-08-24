import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet, Pressable} from 'react-native';

const ToggleButton = ({state, setState}) => {

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{true: '#5BBCFF', false: '#767577'}}
                thumbColor={state ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={state}
                style={styles.toggleButton}
                onValueChange={setState}
            />

            {
                state ? 
                (
                    <Pressable onPress={setState}>
                        <Text style={styles.on}>Bật</Text>
                    </Pressable>
                ) : (
                    <Pressable onPress={setState}>
                        <Text style={styles.off}>Tắt</Text>
                    </Pressable>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "97%",
        margin: "auto",
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: 'space-around',
        borderColor: "#ccc",
        borderRadius: 5,
        borderWidth: 0.5,
    },
    toggleButton: {
        transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }],
    },
    on: {
        width: 90,
        height: 30,
        fontSize: 17,
        fontWeight: "600",
        textAlign: "center",
        textAlignVertical: "center",
        color: "white",
        backgroundColor: "#06D001",
        borderRadius: 5,
    },
    off: {
        width: 90,
        height: 30,
        fontSize: 17,
        fontWeight: "600",
        textAlign: "center",
        textAlignVertical: "center",
        color: "white",
        backgroundColor: "#FF7777",
        borderRadius: 5,
    }

});

export default ToggleButton;