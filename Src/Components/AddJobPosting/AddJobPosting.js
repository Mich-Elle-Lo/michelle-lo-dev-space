import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

export default function AddJobPosting({ modalVisible, setModalVisible }) {
  const handleClose = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a New Job Posting</Text>

          <TextInput
            style={styles.input}
            placeholder="Job Title"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Salary Range"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Experience"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Qualifications"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Industry"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Contanct"
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSave({ username, email, location, bio })}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "85%",
    backgroundColor: "#2C2C2E",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: "#474749",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  button: {
    backgroundColor: "#3A3A3C",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
