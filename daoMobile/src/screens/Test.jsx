import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const TestScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataUrl = 'https://raw.githubusercontent.com/Imran751/daoAll/d92d1aeb4136e9a802ef91205b4a7e9d4e8b3ea8/backend/data.json';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(dataUrl);
      const jsonData = await response.json();
      const uniqueCategories = [...new Set(jsonData.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(dataUrl);
      const jsonData = await response.json();
      let categoryQuestions = jsonData.filter(question => question.category === category);

      // Shuffle questions
      categoryQuestions = categoryQuestions.sort(() => Math.random() - 0.5).slice(0, 7);

      setQuestions(categoryQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Karachi',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {selectedCategory === null ? (
          <View style={styles.categoryContainer}>
            <Text style={styles.motivationalText}>Take a Mock Test.{'\n'}Select a Category</Text>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => {
                  setSelectedCategory(category);
                  fetchQuestionsByCategory(category);
                }}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {selectedCategory ? `${selectedCategory}: Paper` : ': Paper'}
              </Text>
              <Text style={styles.dateText}>{getCurrentDateTime()}</Text>
              <Text style={styles.instructionsText}>Instructions: First question is mandatory. Attempt a total of 5 questions.</Text>
              <Text style={styles.totalMarksText}>Total Marks: 100</Text>
            </View>


            {questions.length > 0 && questions.map((question, index) => (
              <View key={question.id} style={styles.questionContainer}>
                <View style={styles.questionRow}>
                  <Text style={styles.questionNumber}>{index + 1}.</Text>
                  <Text style={styles.questionText}>{question.question}</Text>
                  <Text style={styles.marksText}> ({question.marks} Marks)</Text>
                </View>
              </View>
            ))}

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setSelectedCategory(null);
                setQuestions([]);
              }}
            >
              <Text style={styles.backButtonText}>Back to Categories</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light gray background for a clean look
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#007BFF',
    fontSize: 18,
  },
  categoryContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  categoryButton: {
    backgroundColor: '#007BFF', // Soft blue color for professionalism
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  motivationalText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Darker text for better readability
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#007BFF', // Matching header color with buttons
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
    top: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
    fontStyle: 'italic',
  },
  totalMarksText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
    fontWeight: 'bold',
  },
  questionContainer: {
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCC',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
    flexShrink: 1,
  },
  marksText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007BFF', // Using the same blue for emphasis
    textAlign: 'left',
    marginLeft: 2,
  },
  backButton: {
    backgroundColor: '#FF6F61', // A professional coral color
    padding: 15,
    borderRadius: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TestScreen;
