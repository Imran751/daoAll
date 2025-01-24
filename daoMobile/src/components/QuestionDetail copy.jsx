import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QuestionDetail = ({ route }) => {
  const { question } = route.params; // Get the question object passed from QuestionsCard
  const navigation = useNavigation();

  // Debugging: Log the question data to ensure it includes images
  // console.log('Question Data:', question);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.questionContainer}>
        {/* Display Question */}
        <Text style={styles.questionText}>{question.question}</Text>

        {/* Display Details */}
        <Text style={styles.detailsText}>{question.details}</Text>

        {/* Display Images */}
        <View style={styles.imagesContainer}>
          {question.images && question.images.length > 0 ? (
            question.images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="cover"
              />
            ))
          ) : (
            <Text>No images available.</Text>
          )}
        </View>

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  questionContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#333',
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#555',
  },
  imagesContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 450, // Adjust height as needed
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default QuestionDetail;
