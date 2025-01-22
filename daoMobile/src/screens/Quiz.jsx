import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  const dataUrl = 'https://raw.githubusercontent.com/Imran751/courseWebsite/8b85b9b62e935ba9634851c593491f77c58ef39e/data.json';

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(dataUrl);
      const jsonData = await response.json();

      // Shuffle and take the first 20 questions
      const shuffledQuestions = shuffleArray(jsonData).slice(0, 50);
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
    fetchQuestions();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Loading questions...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizFinished ? (
        <View style={styles.centered}>
          <Text style={styles.title}>Quiz Finished!</Text>
          <Text style={styles.scoreText}>Your Score: {score} / {questions.length}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        questions.length > 0 && (
          <View key={questions[currentQuestion].id}>
            <Text style={styles.questionText}>
              {currentQuestion + 1}. {questions[currentQuestion].question}
            </Text>

            {questions[currentQuestion].options.map((option, i) => (
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
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 20,
    backgroundColor: '#F3F4F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  optionButton: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
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
});

export default QuizScreen;
