import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddJobPosting({ modalVisible, setModalVisible }) {
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [experience, setExperience] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [industry, setIndustry] = useState("");
  const [contact, setContact] = useState("");

  const handleSave = async () => {
    const baseURL = "http://localhost:3000/";
    const mobileServer = "http://10.0.0.108:3000";
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.post(`${mobileServer}/job_postings`, {
        job_title: jobTitle,
        job_description: description,
        location,
        salary_range: salaryRange,
        experience_level: experience,
        qualifications,
        industry,
        application_email_or_link: contact,

        company_id: userId,
        job_type: "Full Time",
        posted_date: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        expiration_date: moment(new Date())
          .add(30, "days")
          .format("YYYY-MM-DD HH:mm:ss"),
        status: "active",
      });

      console.log(response.data);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };
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
            value={jobTitle}
            onChangeText={setJobTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="#999"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Salary Range"
            placeholderTextColor="#999"
            value={salaryRange}
            onChangeText={setSalaryRange}
          />
          <TextInput
            style={styles.input}
            placeholder="Experience"
            placeholderTextColor="#999"
            value={experience}
            onChangeText={setExperience}
          />
          <TextInput
            style={styles.input}
            placeholder="Qualifications"
            placeholderTextColor="#999"
            value={qualifications}
            onChangeText={setQualifications}
          />
          <TextInput
            style={styles.input}
            placeholder="Industry"
            placeholderTextColor="#999"
            value={industry}
            onChangeText={setIndustry}
          />
          <TextInput
            style={styles.input}
            placeholder="Contanct"
            placeholderTextColor="#999"
            value={contact}
            onChangeText={setContact}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleSave({
                jobTitle,
                description,
                location,
                salaryRange,
                experience,
                qualifications,
                industry,
                contact,
              })
            }
          >
            <Text style={styles.buttonText}>Post</Text>
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
    backgroundColor: "#000000",
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
    borderColor: "#D8D9DA",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#D8D9DA",
    padding: 10,
    width: 200,
    borderRadius: 10,
    color: "#D8D9DA",
  },
  button: {
    backgroundColor: "#3A3A3C",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#D8D9DA",
    fontWeight: "bold",
  },
});
