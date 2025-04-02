import React from "react";
import { ScrollView, StyleSheet, View, Text, TextInput, Image } from "react-native";
import FastImage from "react-native-fast-image";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';



function OnlineShopping() {
    const images = [
        require("../assets/Images/of.jpg"),
        require("../assets/Images/of.jpg"),
        require("../assets/Images/of.jpg"),
        require("../assets/Images/of.jpg"),
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header Section */}
            <View style={styles.head}>
                <View style={styles.grid}>
                    <Text style={styles.textS}>Neargud  <Image source={require('../assets/Images/bas.png')} style={{ width: 40, height: 40 }} resizeMode="contain" /> </Text>
                    <TextInput placeholder="Pune" style={styles.inputB} />
                    {/* <GooglePlacesAutocomplete
                        placeholder="Search for a location"
                        style={styles.inputB}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details);
                        }}
                        query={{
                            key:API_KEY ,
                            language: 'en',
                        }}
                    /> */}

                </View>
                <View style={styles.grid2}>
                    <TextInput placeholder="Search anything here..." style={styles.inputB2} />
                    <Text style={styles.icon}>🔍</Text>
                    <Image source={require('../assets/Images/heart.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />
                    <Image source={require('../assets/Images/bell.png')} style={{ width: 20, height: 20 }} resizeMode="contain" />
                </View>
                <View style={styles.grid3}>
                    <View style={styles.rowContainer}>
                        <Image
                            source={require('../assets/Images/girl.png')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.textHead}>Happy</Text>
                            <Text style={styles.textHead}>Shopping</Text>
                            {/* <Text></Text> */}
                        </View>
                    </View>
                </View>

            </View>
            <Text style={{ margin: 3, fontSize: 15, padding: 10, fontWeight: 'bold' }}>Top in Pune</Text>

            {/* Horizontal ScrollView for Images */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imageContainer}
            >
                {images.map((image, index) => (
                    <FastImage
                        key={index}
                        source={image}
                        style={styles.image}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                ))}
            </ScrollView>
            <Text style={{ margin: 3, fontSize: 15, padding: 10, fontWeight: 'bold' }}>Top Categories in Pune</Text>
            <View style={styles.grid4}>
                <View style={styles.gameContainer}>
                    <View>
                        <Image
                            source={require('../assets/Images/m1.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Men's</Text>

                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/buety.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Cosmetics</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/d1.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Women's</Text>
                    </View>


                </View>
                <View style={styles.gameContainer}>
                    <View>
                        <Image
                            source={require('../assets/Images/s1.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Footwear</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/apple.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 15 }}>Mobiles</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/chips.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Foods</Text>
                    </View>

                </View>
                <View style={styles.gameContainer}>
                    <View>
                        <Image
                            source={require('../assets/Images/k1.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Kid's</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/d2.jpg')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Ethenic's Wear</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/lip.webp')}
                            style={styles.Img}
                            resizeMode="contain"
                        />
                        <Text style={{ margin: 3, fontSize: 15, paddingHorizontal: 10 }}>Product's</Text>
                    </View>
                </View>
            </View>
            <Text style={{ margin: 3, fontSize: 15, padding: 10, fontWeight: 'bold' }}>Products</Text>
            <View style={styles.grid4}>
                <View style={styles.gameContainer2}>
                    <View>
                        <Image
                            source={require('../assets/Images/s1.jpg')}
                            style={styles.Img2}
                            resizeMode="contain"
                        />
                        <Text style={styles.txt}>Adidas</Text>

                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/s2.jpg')}
                            style={styles.Img2}
                            resizeMode="contain"
                        />
                        <Text style={styles.txt}>Jordan Spizike Low Men's</Text>
                    </View>

                </View>
                <View style={styles.gameContainer2}>
                    <View>
                        <Image
                            source={require('../assets/Images/s3.jpg')}
                            style={styles.Img2}
                            resizeMode="contain"
                        />
                        <Text style={styles.txt}>Kashmiri Mojadi</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/Images/s1.jpg')}
                            style={styles.Img2}
                            resizeMode="contain"
                        />
                        <Text style={styles.txt}>Nike Black</Text>
                    </View>


                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        paddingBottom: 20,
    },
    head: {
        backgroundColor: "#683bab",
        padding: 20,
        alignItems: "center",
    },
    textHead: {
        fontSize: 40,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    textS: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
    },
    inputB: {
        width: 150,
        height: 40,
        borderRadius: 7,
        borderColor: "white",
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    inputB2: {
        flex: 1,
        height: 40,
        borderRadius: 7,
        borderColor: "white",
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    grid: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 15,
    },
    grid2: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },

    grid3: {
        marginTop: 20,
        alignItems: "center",
    },

    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },

    textContainer: {
        marginLeft: 10, // Space between image and text
    },

    icon: {
        fontSize: 24,
        marginLeft: 10,
        color: "white",
    },
    imageContainer: {
        flexDirection: "row",
        paddingHorizontal: 10,
        // paddingVertical: 10,
    },
    image: {
        width: 300,
        height: 200,
        marginRight: 10,
        borderRadius: 5,
    },
    image1: {
        width: 200,
        height: 150,
        marginRight: 10,

    },
    grid4: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    gameContainer: {
        // backgroundColor: "white",
        // borderRadius: 8,
        padding: 15,
        flexDirection: "row",  // Aligns items horizontally
        alignItems: "center",
        margin: 15,
        flexGrow: 1,
        flexShrink: 1,
    },
    gameContainer2: {


        // padding: 15,
        flexDirection: "row",  // Aligns items horizontally
        alignItems: "center",
        margin: 10,
        flexGrow: 1,
        flexShrink: 1,
    },
    Img: {
        width: 100,
        height: 100,
        marginHorizontal: 5, // Adjust spacing between images
    },
    Img2: {
        width: 200,
        height: 200,
        marginHorizontal: 5, // Adjust spacing between images
    },
    txt: {
        margin: 10, fontSize: 15,
        textAlign: 'center'
    }

});

export default OnlineShopping;
