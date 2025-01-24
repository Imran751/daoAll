import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from './SearchBar';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SubjectCategories from './SubjectCategories';
import TopBar from './TopBar';

// Import the local data.json file
import data from '../data/data.json';

const QuestionsCard = () => {
  const [questions, setQuestions] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [subCategories, setSubCategories] = useState(['All']);
  const [topics, setTopics] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAnswerIndex, setShowAnswerIndex] = useState(null);
  const [showOptionsIndex, setShowOptionsIndex] = useState(null);
  const [doneStatus, setDoneStatus] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [isTopicOpen, setIsTopicOpen] = useState(false); // State for Topic dropdown
  const navigation = useNavigation();

  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    const fetchQuestionsAndCategories = async () => {
      try {
        const savedDoneStatus = await AsyncStorage.getItem('doneStatus');
        const savedCategory = await AsyncStorage.getItem('selectedCategory');
        const savedSubCategory = await AsyncStorage.getItem('selectedSubCategory');
        const savedTopic = await AsyncStorage.getItem('selectedTopic');

        if (savedDoneStatus) setDoneStatus(JSON.parse(savedDoneStatus));
        if (savedCategory) setSelectedCategory(savedCategory);
        if (savedSubCategory) setSelectedSubCategory(savedSubCategory);
        if (savedTopic) setSelectedTopic(savedTopic);

        const cachedData = await AsyncStorage.getItem('cachedQuestions');
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);

          const now = new Date().getTime();
          if (now - timestamp < CACHE_DURATION) {
            const uniqueCategories = [
              'All',
              ...new Set(data.map((item) => item.category)),
            ];
            const uniqueSubCategories = [
              'All',
              ...new Set(data.filter((item) => item.category === selectedCategory).map((item) => item.subCategory)),
            ];
            const uniqueTopics = [
              'All',
              ...new Set(data.filter((item) => item.subCategory === selectedSubCategory).map((item) => item.topic)),
            ];
            setCategories(uniqueCategories);
            setSubCategories(uniqueSubCategories);
            setTopics(uniqueTopics);
            setQuestions(
              selectedCategory === 'All'
                ? data
                : data.filter((item) => item.category === selectedCategory)
            );
            return;
          }
        }

        // Use the locally imported data instead of fetching remotely
        const uniqueCategories = [
          'All',
          ...new Set(data.map((item) => item.category)),
        ];
        const uniqueSubCategories = [
          'All',
          ...new Set(data.filter((item) => item.category === selectedCategory).map((item) => item.subCategory)),
        ];
        const uniqueTopics = [
          'All',
          ...new Set(data.filter((item) => item.subCategory === selectedSubCategory).map((item) => item.topic)),
        ];
        setCategories(uniqueCategories);
        setSubCategories(uniqueSubCategories);
        setTopics(uniqueTopics);

        setQuestions(
          selectedCategory === 'All'
            ? data
            : data.filter((item) => item.category === selectedCategory)
        );

        const cachedObject = {
          data,
          timestamp: new Date().getTime(),
        };
        await AsyncStorage.setItem('cachedQuestions', JSON.stringify(cachedObject));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchQuestionsAndCategories();
  }, [selectedCategory, selectedSubCategory, selectedTopic]);

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory('All'); // Reset subcategory when category changes
    setSelectedTopic('All'); // Reset topic when category changes
    await AsyncStorage.setItem('selectedCategory', category);
  };

  const handleSubCategoryChange = async (subCategory) => {
    setSelectedSubCategory(subCategory);
    setSelectedTopic('All'); // Reset topic when subcategory changes
    await AsyncStorage.setItem('selectedSubCategory', subCategory);
  };

  const handleTopicChange = async (topic) => {
    setSelectedTopic(topic);
    await AsyncStorage.setItem('selectedTopic', topic);
  };

  const toggleSubCategory = () => {
    setIsSubCategoryOpen((prevState) => !prevState); // Toggle visibility
  };

  const toggleTopic = () => {
    setIsTopicOpen((prevState) => !prevState); // Toggle visibility
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSubCategory === 'All' || question.subCategory === selectedSubCategory) &&
    (selectedTopic === 'All' || question.topic === selectedTopic)
  );

  const handleOptionClick = (option, answer) => {
    Alert.alert(
      option === answer
        ? 'Well done! You got it right!'
        : 'Oops! Not quite right. Try again!'
    );
  };

  const toggleDoneStatus = async (id) => {
    const newStatus = !doneStatus[id];
    const updatedStatus = { ...doneStatus, [id]: newStatus };
    setDoneStatus(updatedStatus);
    await AsyncStorage.setItem('doneStatus', JSON.stringify(updatedStatus));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopBar />
      <SubjectCategories
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={handleCategoryChange}
      />
      <View style={styles.subCategoryContainer}>
        <TouchableOpacity onPress={toggleSubCategory} style={styles.subCategoryButton}>
          <Text style={styles.subCategoryTitle}>Subcategory</Text>
          <MaterialCommunityIcons
            name={isSubCategoryOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>

        {isSubCategoryOpen && (
          <View style={styles.subCategoryList}>
            {subCategories.map((subCategory, index) => (
              <TouchableOpacity
                key={index}
                style={[ 
                  styles.subCategoryButton, 
                  selectedSubCategory === subCategory && styles.selectedButton
                ]}
                onPress={() => handleSubCategoryChange(subCategory)}
              >
                <Text style={styles.subCategoryButtonText}>{subCategory}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.topicContainer}>
        <TouchableOpacity onPress={toggleTopic} style={styles.subCategoryButton}>
          <Text style={styles.subCategoryTitle}>Topic</Text>
          <MaterialCommunityIcons
            name={isTopicOpen ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#333"
          />
        </TouchableOpacity>

        {isTopicOpen && (
          <View style={styles.subCategoryList}>
            {topics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[ 
                  styles.subCategoryButton, 
                  selectedTopic === topic && styles.selectedButton
                ]}
                onPress={() => handleTopicChange(topic)}
              >
                <Text style={styles.subCategoryButtonText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <View style={styles.questionsContainer}>
        {filteredQuestions.map((question, index) => (
          <View 
          key={question.id} 
          style={[
            styles.questionCard, // Base style
            doneStatus[question.id] && styles.questionCardDone // Conditional style
          ]}
        >
            <TouchableOpacity
              onPress={() => toggleDoneStatus(question.id)}
              style={[ 
                styles.doneButton,
                doneStatus[question.id] ? styles.doneActive : styles.doneInactive,
              ]}
            >
              <MaterialCommunityIcons
                name={doneStatus[question.id] ? 'check-circle' : 'circle'}
                size={20}
                color={doneStatus[question.id] ? '#4CAF50' : '#888'}
              />
              <Text style={styles.doneButtonText}>
                {doneStatus[question.id] ? 'Done' : 'Not Done'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.questionText}>
              {index + 1}. {question.question}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.optionButton, styles.showAnswerButton]}
                onPress={() =>
                  setShowAnswerIndex(showAnswerIndex === index ? null : index)
                }
              >
                <Text style={styles.optionButtonText}>
                  {showAnswerIndex === index ? 'Hide Answer' : 'Show Answer'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, styles.showOptionsButton]}
                onPress={() =>
                  setShowOptionsIndex(showOptionsIndex === index ? null : index)
                }
              >
                <Text style={styles.optionButtonText}>
                  {showOptionsIndex === index ? 'Hide Options' : 'Show Options'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.optionButton, styles.detailsButton]}
                onPress={() =>
                  navigation.navigate('QuestionDetail', { question })
                }
              >
                <Text style={styles.optionButtonText}>Details</Text>
              </TouchableOpacity>
            </View>

            {showAnswerIndex === index && (
              <Text style={styles.answerText}>Answer: {question.answer}</Text>
            )}
            {showOptionsIndex === index && (
              <View style={styles.optionsContainer}>
                {question.options.map((option, i) => {
                  const optionLabel = String.fromCharCode(97 + i);
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.optionItem}
                      onPress={() => handleOptionClick(option, question.answer)}
                    >
                      <Text style={styles.optionItemText}>
                        {optionLabel}) {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
  },
  subCategoryContainer: {
    marginBottom: 0,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subCategoryButton: {
    padding: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subCategoryList: {
    marginTop: 0,
  },
  selectedButton: {
    backgroundColor: '#A7C6FF',
  },
  subCategoryButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  topicContainer: {
    marginBottom: 5,
  },
  questionsContainer: {
    marginBottom: 16,
  },
  questionCard: {
    backgroundColor: '#ffffff', // Default background
    borderRadius: 12,
    padding: 20,
    paddingTop: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    marginHorizontal: 8,
  },
  questionCardDone: {
    backgroundColor: '#DFF0D8', // Lighter green color for "done" state
  },
  doneButton: {
    position: 'absolute',
    top: 2,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  doneActive: {
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneInactive: {
    backgroundColor: '#F4F4F4',
    borderRadius: 20,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    marginLeft: 6,
    color: '#888',
    fontWeight: '600',
    fontSize: 12,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
    marginTop: 20,
  },
  optionButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#F0F0F0',
  },
  optionButtonText: {
    color: '#555',
    fontWeight: '500',
    fontSize: 12,
  },
  showAnswerButton: {
    backgroundColor: '#A7C6FF',
  },
  showOptionsButton: {
    backgroundColor: '#A8DAB5',
  },
  detailsButton: {
    backgroundColor: '#FFE082',
  },
  answerText: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 12,
    fontWeight: '600',
  },
  optionsContainer: {
    marginTop: 12,
  },
  optionItem: {
    backgroundColor: '#D1D8E1',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  optionItemText: {
    fontSize: 14,
    color: '#444',
  },
});

export default QuestionsCard;
