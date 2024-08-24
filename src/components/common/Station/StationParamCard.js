import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";

const StationParamCard = ({title, icon, number, unit, time, difference, highOrLow = false}) => {
    return (
        <View style={styles.item}>
            <View style={styles.leftHalf}>
                <Text style={styles.title}>
                    {title}
                </Text>
                
                <Text style={styles.number}>
                    {number} {unit}
                </Text>

                <View style={styles.moreInfo}>
                    <Text style={[highOrLow ? {color: "green"} : {color: "red"}, {width: "50%"}]} numberOfLines={1} ellipsizeMode='tail'>
                        {
                            highOrLow ? "Tăng " : "Giảm "
                        }
                        {difference}
                    </Text>
                    <Text style={{
                        textAlign: "right",
                        paddingRight: 10,
                        width: "100%",
                    }}>
                        {time}
                    </Text>
                </View>
            </View>
            <View style={styles.rightHalf}>
                <Image style={styles.icon} source={icon}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        width: "97%",
        height: "100%",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        margin: "auto",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#DDD",
        backgroundColor: "#fff",
    },
    icon: {
        width: 80,
        height: 80,
        margin: 10,
        marginBottom: 35,
    },
    title: {
        fontSize: 18,
        marginBottom: 15,
    },
    number: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    leftHalf: {
        width: 270,
        height: "100%",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },
    rightHalf: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'flex-end',
        height: "100%",
    },
    moreInfo: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        paddingLeft: 20,
        paddingBottom: 8,
    }
});

export default StationParamCard;