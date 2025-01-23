import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const TestScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const dataUrl = 'https://raw.githubusercontent.com/Imran751/daoAll/7a8049fe1b5676559279dca62ed5164ccab29c70/backend/data.json';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(dataUrl);
      const jsonData = await response.json();
      // Get unique categories
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
      // Filter questions by the selected category
      const categoryQuestions = jsonData.filter(question => question.category === category).slice(0, 7); // Limit to 7 questions
      setQuestions(categoryQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentDateTime = () => {
    return 'Thursday, January 23, 2025, 5 PM PKT'; // Static date and time
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedCategory === null ? (
          // Display category selection
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
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Question Paper</Text>
              <Text style={styles.dateText}>{getCurrentDateTime()}</Text>
              <Text style={styles.instructionsText}>Instructions: First question is mandatory. Attempt a total of 5 questions.</Text>
              <Text style={styles.totalMarksText}>Total Marks: 100</Text>
            </View>

            {/* Questions Section */}
            {questions.length > 0 && questions.map((question, index) => (
              <View key={question.id} style={styles.questionContainer}>
                <View style={styles.questionRow}>
                  <Text style={styles.questionNumber}>{index + 1}.</Text>
                  <Text style={styles.questionText}>{question.question}</Text>
                  <Text style={styles.marksText}> ({question.marks} Marks)</Text>
                </View>
              </View>
            ))}

            {/* Back Button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setSelectedCategory(null); // Reset selected category
                setQuestions([]); // Clear previous questions
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
    backgroundColor: '#F3F4F6',
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
  categoryContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  categoryButton: {
    backgroundColor: '#4CAF50',
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
    color: '#4CAF50',
    textAlign: 'center',
   marginTop :30,
   },
   header:{
     backgroundColor:'#4CAF50',
     padding :15,
     marginBottom :20,
     borderRadius :8,
     alignItems:'center',
     top: 20,
   },
   headerText:{
     fontSize :24,
     color:'#FFF'
   },
   dateText:{
     fontSize :16,
     color:'#FFF',
     marginBottom :5
   },
   instructionsText:{
     fontSize :16,
     color:'#FFF',
     marginTop :10,
     fontStyle:'italic'
   },
   totalMarksText:{
     fontSize :16,
     color:'#FFF',
     marginTop :10,
     fontWeight:'bold'
   },
   questionContainer:{
     marginVertical :10,
     paddingVertical :10,
     borderBottomWidth :StyleSheet.hairlineWidth,
     borderBottomColor:'#CCC'
   },
   questionRow:{
     flexDirection:'row',
     alignItems:'flex-start', // Align items at the start
   },
   questionNumber:{
     fontSize :18,
     fontWeight:'bold',
     marginRight :10
   },
   questionText:{
     fontSize :16,
     color:'#333',
     textAlign:'left', // Ensure left alignment for question text
     flexShrink :1
   },
   marksText:{
     fontSize :16,
     fontWeight:'bold',
     color:'#4CAF50',
     textAlign:'left', 
     marginLeft :2
   },
   backButton:{
     backgroundColor:'#FF5722',
     padding :15,
     borderRadius :8,
     position:'absolute',
     left :0,
     right :0,
     bottom :0
   },
   backButtonText:{
     color:'#FFF',
     fontSize :16,
     fontWeight:'bold',
     textAlign:'center'
   }
});

export default TestScreen;
