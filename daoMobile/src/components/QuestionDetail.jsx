import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuestionDetail = ({ route }) => {
  const { question } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);  // Track refresh status
  const [questionData, setQuestionData] = useState(question);  // Store question data

  useEffect(() => {
    if (!question) {
      setError("No question data available.");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [question]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    // Simulate fetching fresh data
    try {
      // You can refresh your data here, for example, re-fetching from an API or database
      setQuestionData(question);  // In a real scenario, replace with actual data refresh
      setIsRefreshing(false);
    } catch (error) {
      setError("Failed to refresh");
      setIsRefreshing(false);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <Text style={styles.title}>Details</Text>
      <Text style={styles.questionText}>{questionData.question}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>{questionData.details}</Text>
      </View>

      {/* Display images */}
      <View style={styles.imagesContainer}>
        {questionData.image1 && (
          <Image
            source={{ uri: questionData.image1 }}
            style={styles.image}
          />
        )}
        {questionData.image2 && (
          <Image
            source={{ uri: questionData.image2 }}
            style={styles.image}
          />
        )}
        {questionData.image3 && (
          <Image
            source={{ uri: questionData.image3 }}
            style={styles.image}
          />
        )}
      </View>

      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#555',
  },
  detailsContainer: {
    backgroundColor: '#eef1f5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginBottom: 16,
  },
  detailsText: {
    fontSize: 14,
    color: '#4a5568',
  },
  imagesContainer: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 600, // Adjust height as per your design needs
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuestionDetail;
