import { View, ActivityIndicator, StyleSheet } from "react-native";


function Loader() {

    return (
        <View>
             <ActivityIndicator size={50} color="white" animating={false} />
        </View>
    )
}


export default Loader;