import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import AddJobPosting from "../../Components/AddJobPosting/AddJobPosting";
import axios from "axios";

export default function CareerScreen() {
  const [jobPostings, setJobPostings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const mobileServer = "http://10.0.0.108:3000";

  useEffect(() => {
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get(`${mobileServer}/job_postings`);
        setJobPostings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobPostings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={jobPostings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postingContainer}>
            <Text style={styles.postingTitle}>{item.user_name}</Text>
            <Text style={styles.postingTitle}>{item.job_title}</Text>
            <Text style={styles.postingData}>{item.job_description}</Text>
            <Text style={styles.postingData}>{item.location}</Text>
            <Text style={styles.postingData}>{item.salary_range}</Text>
            <Text style={styles.postingData}>{item.experience_level}</Text>
            <Text style={styles.postingData}>{item.qualifications}</Text>
            <Text style={styles.postingData}>{item.industry}</Text>
            <Text style={styles.postingData}>{item.posted_date}</Text>
            <Text style={styles.postingData}>{item.expiration_date}</Text>
            <Text style={styles.postingData}>{item.status}</Text>
            <Text style={styles.postingData}>
              {item.application_email_or_link}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add Job Posting</Text>
      </TouchableOpacity>

      <AddJobPosting
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    gap: 10,
  },
  postingContainer: {
    borderTopWidth: 1,
    borderColor: "#343536",
    paddingBottom: 12,
    paddingTop: 4,
  },
  postingTitle: {
    color: "white",
    fontSize: 20,
  },
  postingData: {
    color: "white",
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
