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

  // Fixed image URLs
  const imageBaseUrl = "https://raw.githubusercontent.com/Imran751/daoAll/main/backend/images/";

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Details</Text>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>{question.details}</Text>
      </View>

      {/* Display images */}
      <View style={styles.imagesContainer}>
        {question.image1 && (
          <Image
            source={{ uri: `${imageBaseUrl}Image1.png` }}
            style={styles.image}
            resizeMode="contain"
            onError={(e) => console.log('Error loading image1:', e.nativeEvent.error)}
          />
        )}
        {question.image2 && (
          <Image
            source={{ uri: `${imageBaseUrl}Image2.png` }}
            style={styles.image}
            resizeMode="contain"
            onError={(e) => console.log('Error loading image2:', e.nativeEvent.error)}
          />
        )}
        {question.image3 && (
          <Image
            source={{ uri: `${imageBaseUrl}Image3.png` }}
            style={styles.image}
            resizeMode="contain"
            onError={(e) => console.log('Error loading image3:', e.nativeEvent.error)}
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
    height: 550, // Adjust height for A4 paper ratio
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
