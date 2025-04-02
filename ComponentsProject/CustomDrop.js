import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Status from './Status';
import Finish from '../ComponentsProject/Finish';

const CustomDrop = (props) => {
    const [isOpen, setIsOpen] = useState(false); 
    const [value, setValue] = useState("Status");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.staticDropdown} onPress={toggleDropdown}>
                <Text style={styles.selectedText}>{value}</Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.optionsContainer}>
                    <ScrollView contentContainerStyle={styles.scrollContent} nestedScrollEnabled={true}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={true}>
                        {props.myArray.map((item, index) => {
                            if (item === undefined) {
                                return null; 
                            }
                            return (
                                <Status
                                    key={index}
                                    type={item}
                                    num={(index + 1).toString()}
                                    ques={props.questionC[index]}
                                />
                            );
                        })}
                        <Finish data={props.answer} />
                    </ScrollView>
                </View>
            )}

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
    },
    staticDropdown: {
        marginHorizontal: 10,
        width: '95%',
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor: 'blue',
        borderBottomColor: '#2B3BFF',
        backgroundColor: '#F5FBFF',
        elevation: 5,
        padding: 10,
        marginTop: 8,
    },
    selectedText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: 'bold'
    },
    optionsContainer: {
        backgroundColor: "#f9f9f9",
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "blue",
        maxHeight: 500,
        overflow: 'hidden', // Prevent overflow of content
    },
    scrollContent: {
        paddingBottom: 20,
        marginTop: 20,
    },
});

export default CustomDrop;
