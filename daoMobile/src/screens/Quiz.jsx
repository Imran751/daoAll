import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const QuizScreen = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const dataUrl = 'https://raw.githubusercontent.com/Imran751/daoAll/main/backend/data.json?timestamp=';

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

  const fetchQuestions = async (category) => {
    setLoading(true);
    try {
      const response = await fetch(dataUrl);
      const jsonData = await response.json();

      // Filter questions by the selected category
      const categoryQuestions = jsonData.filter(question => question.category === category);

      // Shuffle and select the first 5 questions for the quiz
      const shuffledQuestions = shuffleArray(categoryQuestions).slice(0, 7);
      setQuestions(shuffledQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevIndex) => prevIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    fetchQuestions(selectedCategory);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchQuestions(category);
  };

  const goBackToCategorySelection = () => {
    setSelectedCategory(null);  // Reset selected category
    setQuestions([]);           // Clear previous questions
    setCurrentQuestion(0);      // Reset current question
    setScore(0);                // Reset score
    setQuizFinished(false);     // Reset quiz finished state
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
        <ActivityIndicator size="large" color="#4C89FF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedCategory === null ? (
          <View style={styles.categoryContainer}>
            <Text style={styles.motivationalText}>Test Your Knowledge and Challenge Yourself!</Text>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryButton}
                onPress={() => handleCategorySelect(category)}
              >
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : quizFinished ? (
          <View style={styles.centered}>
            <Text style={styles.title}>Quiz Finished!</Text>
            <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
            <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
              <Text style={styles.restartText}>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {selectedCategory ? `${selectedCategory}: Quiz` : ': Quiz'}
              </Text>
              <Text style={styles.instructionsText}>{getCurrentDateTime()}</Text>
              <Text style={styles.instructionsText}>Answer each question to the best of your ability!</Text>
            </View>

            <View key={questions[currentQuestion]?.id}>
              <Text style={styles.questionText}>
                {currentQuestion + 1}. {questions[currentQuestion]?.question}
              </Text>

              {questions[currentQuestion]?.options.map((option, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => handleAnswer(option)}
                  style={styles.optionButton}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.scoreText}>Score: {score} / {questions.length}</Text>
            </View>
          </>
        )}
      </ScrollView>

      {selectedCategory !== null && (
        <TouchableOpacity style={styles.backButton} onPress={goBackToCategorySelection}>
          <Text style={styles.backButtonText}>Back to Category</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContainer: {
    padding: 20,
    marginTop: 20,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#4C89FF',
    fontSize: 16,
  },
  categoryContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  categoryButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
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
    color: '#333',
    textAlign: 'center',
    marginTop: 30,
  },
  header: {
    backgroundColor: '#4C89FF',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  instructionsText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 10,
    fontStyle: 'italic',
  },
  centered: {
    alignItems: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  questionText: {
    fontSize: 18,
    marginTop: 50,
    marginVertical: 15,
    color: '#333',
  },
  optionButton: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  restartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FF7043',
    padding: 15,
    borderRadius: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    marginHorizontal: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default QuizScreen;
