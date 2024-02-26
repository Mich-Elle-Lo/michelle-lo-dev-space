import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import AddJobPosting from "../../Components/AddJobPosting/AddJobPosting";
import axios from "axios";

export default function CareerScreen() {
  const [jobPostings, setJobPostings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const baseURL = "http://localhost:3000/";
  const mobileServer = "http://10.0.0.108:3000";

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get(`${mobileServer}/job_postings`);
      setJobPostings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const onRefresh = () => {
    fetchJobPostings();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <Text style={styles.headerTitle}>FIND YOUR NEXT JOB</Text>
        }
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
            <Text style={styles.postingData}>
              {item.application_email_or_link}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
          />
        }
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
  headerTitle: {
    textAlign: "center",
    color: "#D8D9DA",
    fontSize: 20,
    fontWeight: "bold",
  },
  postingContainer: {
    marginVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "#343536",
    gap: "2",
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
