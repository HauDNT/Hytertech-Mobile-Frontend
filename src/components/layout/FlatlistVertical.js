import { FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import blankImage from "../../assets/images/blank.png"

/* Fields truyền vào component FlatlistVertical có thứ tự: 
    + id
    + Hình ảnh
    + Tiêu đề thẻ
    + Nội dung 1 (nếu có)
    + Nội dung 2 (nếu có)
*/

const FlatlistVertical = ({ data, noteFields = [], fields = [], onItemPress = () => { return }}) => {
    const renderItem = ({ item }) => {
        const itemData = {
            id: item[fields[0]],
            title_1: item[fields[1]],
            image: item[fields[2]] ? item[fields[2]] : "",
            content_1: item[fields[3]],
            content_2: item[fields[4]],
        };

        return <FlatListItem {...itemData} />;
    };

    const FlatListItem = ({id, title_1 = "", content_1 = "", content_2 = "", image}) => {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => onItemPress(id)}>
                <View style={styles.leftHalf}>
                    <Text style={[styles.text, {fontWeight: "bold", paddingBottom: 5}]} numberOfLines={1} ellipsizeMode='tail'>
                        {noteFields[0]}{title_1}
                    </Text>
                    <Text style={[styles.text, {paddingBottom: 5, fontSize: 15}]}>{noteFields[1]} {content_1}</Text>
                    {
                        content_2 ?
                        (<Text style={[styles.text, {paddingBottom: 5, fontSize: 15}]}>{noteFields[2]}{content_2}</Text>)
                        :
                        (<Text style={[styles.text, {paddingTop: 3, fontSize: 13, color: "#3572EF"}]}>(Xem thêm...)</Text>)
                    }
                </View>
                <View style={styles.rightHalf}>
                    <Image 
                        source={
                            image !== "" ?
                            ({uri: image})
                            :
                            (blankImage)
                        } 
                        style={styles.image}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList 
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        height: 100, 
        backgroundColor: "white",
        flexDirection: "row",
        margin: 5,
        marginTop: 0,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#ccc",
    },
    leftHalf: {
        width: 200,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 15,
    },
    rightHalf: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        paddingTop: 8,
        paddingLeft: 45,
    },
    text: {
        paddingLeft: 20,
        fontSize: 16,
    },
    image: {
        width: 85,
        height: 85,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 100,
    }
});

export default FlatlistVertical;