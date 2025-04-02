import { StyleSheet,Dimensions } from "react-native";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const ExamStyles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#f5eefe',

    },
    container: {
        backgroundColor: 'navy',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    endT: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    time: {
        color: '#FFBF00',
        fontWeight: 'bold',
        fontSize: 17
    },
    image: {
        marginLeft: 0,
        width: 50,
        height: 50,
        marginRight: 10,
    },
    header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: screenWidth * 0.03,
        marginRight: 5,
    },
    inputBox: {

        width: "100%",
        fontWeight: 'bold'

    },
    valueStyle: {
        color: '#1E90FF',
        fontWeight: 'bold',
        fontWeight: 'bold',

    },
    action: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    placeholderStyle: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    selectedTextStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputSearchStyle: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold'
    },
    drop1: {
        marginHorizontal: 20,
        width: '50%',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#F5FBFF',
        elevation: 5,
        padding: 5,
    },
    drop2: {
        marginHorizontal: 20,
        width: '90%',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: 'blue',
        marginTop: 25,
        backgroundColor: '#F5FBFF',
        borderBottomColor: '#2B3BFF',
        elevation: 5,
        padding: 10,
    },
    drop3: {
        marginHorizontal: 20,
        width: '90%',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: 'blue',
        borderBottomColor: '#2B3BFF',
        backgroundColor: '#F5FBFF',
        elevation: 5,
        padding: 10,
        marginTop: 8,
    },

    dropdownItem: {
        backgroundColor: "#fff",
    },
    containerN: {
        justifyContent: "center",
        flexDirection: 'row',

        marginLeft: 24,
        marginRight: 24,
    },
    defaultButton: {
        width: 60,
        padding: 5,
        marginTop: 10,
        height: 49,
        alignItems: "center",
    },
    clickedButton: {
        width: 60,
        padding: 5,
        marginTop: 10,
        backgroundColor: "white",
        borderTopColor: "#0D98BA",
        borderTopWidth: 1.5,
        height: 49,
        alignItems: "center",
    },
    defaultText: {
        fontSize: 20,
        fontFamily: "OpenSans-VariableFont_wdth,wght",
        color: 'blue',
    },
    clickedText: {
        fontSize: 20,
        color: 'grey',
        fontFamily: "OpenSans-VariableFont_wdth,wght",
        borderBottomColor: 'pink'

    },
    tableContainer: {
        backgroundColor: '#f5eefe',
        flex: 1,
        marginHorizontal: 10,
        height: screenHeight / 1.5,
        marginBottom: 40,
    },
    table: {
        padding: 20,
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#0D98BA',
        maxHeight: screenHeight,
        overflow: 'hidden',
    },

    tableRow: {
        flexDirection: "row",
    },
    tableCell1: {

        borderColor: '#20c9a6',
        borderWidth: 0.5,
        padding: 20,
        alignItems: "center",
    },
    tableCellS: {
        borderColor: '#20c9a6',
        borderWidth: 0.5,
        padding: 13,
        alignItems: "center",
    },
    tableCell: {
        borderColor: '#20c9a6',
        borderWidth: 0.5,
        flex: 7,
        padding: 5,
    },

    tableCellText: {
        textAlign: "center",
        fontSize: 16,
        color: 'grey'
    },
    tableCellA: {
        flex: 4,
        borderColor: '#20c9a6',
        borderWidth: 0.5,
        padding: 5,
    },
    tableCellTextA: {
        textAlign: "center",
        fontSize: 12,
        color: 'red'
    },
    inputField: {
        width: 180,
        height: 50,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    inputFieldL: {
        width: 200,
        height: 100,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },

    submitBtn: {
        backgroundColor: "#1cc88b",
        padding: 5,
        borderRadius: 5,
        shadowColor: "black",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 50,
        marginTop: 20

    },

    submitText: {
        color: 'white',
        fontSize: 19,
        textAlign: "center",
    },
    radio1: {
        width: 15,
        height: 15,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 1,
        margin: 3,
    },

    radioText: {
        fontSize: 17,
        color: 'grey',
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    tableCellO: {
        borderColor: '#20c9a6',
        borderWidth: 0.5,
        flex: 3,
        padding: 5,
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    radioTextContainer: {
        justifyContent: "start",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 1,
        padding: 5,
    },
    radioTextContainerG: {
        backgroundColor: '#1c88a'
    },
    radio: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: "black",
        marginRight: 10,
    },
    radioText: {
        fontSize: 13,
        color: 'grey'
    },
    selectedRadio1: {
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#01796F',
        padding: 5
    }
    ,
    selectedRadio: {
        backgroundColor: '#01796F',
        color: 'white'
    },
    selectedRadioMultiple: {
        backgroundColor: 'blue'
    }
});


export default ExamStyles;