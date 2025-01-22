import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuestionDetail = ({ route }) => {
  const { question } = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!question) {
      setError("No question data available.");
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [question]);

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

  // Extract image keys dynamically
  const imageKeys = Object.keys(question).filter((key) => key.startsWith('image'));

  // Base URL for the images
  const imageBaseUrl = 'https://raw.githubusercontent.com/Imran751/daoAll/7a8049fe1b5676559279dca62ed5164ccab29c70';

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Details</Text>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsText}>{question.details}</Text>
        </View>

        {/* Render images */}
        <View style={styles.imageContainer}>
          {imageKeys.map((key, index) => (
            <Image
              key={index}
              source={{ uri: `${imageBaseUrl}${question[key]}` }}
              style={styles.image}
              resizeMode="contain"
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#eef1f5',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  detailsText: {
    fontSize: 14,
    color: '#4a5568',
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 30,
    padding: 10,
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
