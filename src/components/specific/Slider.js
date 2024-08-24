import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
    Linking
} from "react-native";
import Carousel, { PaginationLight } from "react-native-x-carousel";
import { slideData } from "../../data/SliderData";

const { width } = Dimensions.get("window");
const urlWebsite = "https://www.google.com/";   // Thay bằng trang web bán hàng sau này

const Slider = () => {
    const handleOpenWebsite = async () => {
        await Linking.openURL(urlWebsite);
    };

    const renderItem = (data) => (
        <View key={data.coverImageUri} style={styles.cardContainer}>
            <Pressable onPress={handleOpenWebsite}>
                <View style={styles.cardWrapper}>
                <Image style={styles.card} source={{ uri: data.coverImageUri }} />
                    <View
                        style={[
                            styles.cornerLabel,
                            { backgroundColor: data.cornerLabelColor },
                        ]}
                    >
                        <Text style={styles.cornerLabelText}>{data.cornerLabelText}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                pagination={PaginationLight}
                renderItem={renderItem}
                data={slideData}
                loop
                autoplay
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 15,
    },
    cardContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    cardWrapper: {
        overflow: "hidden",
        borderRadius: 10,
        borderColor: "#DDD",
        borderWidth: 1,
    },
    card: {
        width: width * 0.97,
        height: width * 0.5,
    },
    cornerLabel: {
        position: "absolute",
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "600",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
});

export default Slider;