import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Button,
  SafeAreaView,
} from "react-native";
import axios from "axios";

export default function CareerScreen() {
  const [jobPostings, setJobPostings] = useState([]);

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
});
