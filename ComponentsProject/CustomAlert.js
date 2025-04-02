import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomAlert = ({ visible, onClose, onConfirm }) => {
    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.alertBox}>
                    <Text style={styles.alertTitle}>Finish Exam</Text>
                    <Text style={styles.alertMessage}>Are you sure you want to finish the exam?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Finish</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    alertBox: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginHorizontal: 5,
        backgroundColor: "#d3d3d3",
    },
    confirmButton: {
        backgroundColor: "#3944BC",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default CustomAlert;
