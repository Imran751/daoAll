import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview'; // Import WebView

const QuestionDetail = ({ route }) => {
  const { question } = route.params; // Get the question object passed from QuestionsCard
  const navigation = useNavigation();

  const getEmbeddableUrl = (url) => {
    const shortsPattern = /https?:\/\/(www\.)?youtube\.com\/shorts\/([\w-]+)/;
    const standardPattern = /https?:\/\/(www\.)?youtube\.com\/watch\?v=([\w-]+)/;
    const youtuBePattern = /https?:\/\/(www\.)?youtu\.be\/([\w-]+)/;
  
    if (shortsPattern.test(url)) {
      const videoId = url.match(shortsPattern)[2]; // Extract video ID from Shorts URL
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;
    } else if (standardPattern.test(url)) {
      const videoId = url.match(standardPattern)[2]; // Extract video ID from standard URL
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;
    } else if (youtuBePattern.test(url)) {
      const videoId = url.match(youtuBePattern)[2]; // Extract video ID from youtu.be URL
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&modestbranding=1&rel=0`;
    }
  
    // Return original URL if no match is found (fallback)
    return url;
  };
  
  
  

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

        {/* Display Videos (YouTube links) */}
        <View style={styles.videosContainer}>
          {question.videos && question.videos.length > 0 ? (
            question.videos.map((videoUrl, index) => (
              <WebView
                key={index}
                source={{ uri: getEmbeddableUrl(videoUrl) }}
                style={styles.video}
              />
            ))
          ) : (
            <Text>No videos available.</Text>
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
  videosContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  video: {
    height: 200, // Adjust video height as needed
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
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
