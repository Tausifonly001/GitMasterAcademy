import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';
import { quizzes, QuizQuestion } from '../data/courses';
import { useAuth } from '../context/AuthContext';

export const QuizScreen = () => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { saveQuizScore, progress } = useAuth();

  const currentQuiz = quizzes[currentQuizIndex];
  const totalQuestions = quizzes.length;

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === currentQuiz.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuizIndex < totalQuestions - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      saveQuizScore('final', score);
    }
  };

  const handleRetry = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <View style={styles.container}>
        <View style={styles.completedContainer}>
          <View style={styles.completedIcon}>
            <Ionicons
              name={percentage >= 70 ? 'trophy' : 'refresh-circle'}
              size={80}
              color={percentage >= 70 ? Colors.accent : Colors.primary}
            />
          </View>
          <Text style={styles.completedTitle}>
            {percentage >= 70 ? 'Great Job!' : 'Keep Practicing!'}
          </Text>
          <Text style={styles.completedScore}>
            {score}/{totalQuestions} ({percentage}%)
          </Text>
          <Text style={styles.completedMessage}>
            {percentage >= 70
              ? 'You have a good understanding of Git basics!'
              : 'Review the lessons and try again to improve your score.'}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={32} color={Colors.secondary} />
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="close-circle" size={32} color={Colors.danger} />
              <Text style={styles.statValue}>{totalQuestions - score}</Text>
              <Text style={styles.statLabel}>Incorrect</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="star" size={32} color={Colors.accent} />
              <Text style={styles.statValue}>{score * 5}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Ionicons name="refresh" size={20} color={Colors.white} />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Git Quiz</Text>
        <Text style={styles.subtitle}>Test your knowledge</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuizIndex + 1) / totalQuestions) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuizIndex + 1} / {totalQuestions}
        </Text>
      </View>

      <View style={styles.quizCard}>
        <Text style={styles.questionNumber}>Question {currentQuizIndex + 1}</Text>
        <Text style={styles.questionText}>{currentQuiz.question}</Text>

        <View style={styles.optionsContainer}>
          {currentQuiz.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuiz.correctAnswer;
            const showResult = selectedAnswer !== null;

            let optionStyle: any = styles.option;
            let textStyle: any = styles.optionText;

            if (showResult) {
              if (isCorrect) {
                optionStyle = [styles.option, styles.optionCorrect];
                textStyle = [styles.optionText, styles.optionTextCorrect];
              } else if (isSelected && !isCorrect) {
                optionStyle = [styles.option, styles.optionIncorrect];
                textStyle = [styles.optionText, styles.optionTextIncorrect];
              }
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
              >
                <View style={styles.optionLetter}>
                  <Text style={styles.optionLetterText}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={textStyle}>{option}</Text>
                {showResult && isCorrect && (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.secondary} />
                )}
                {showResult && isSelected && !isCorrect && (
                  <Ionicons name="close-circle" size={20} color={Colors.danger} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View style={styles.explanationContainer}>
            <View style={styles.explanationHeader}>
              <Ionicons
                name={selectedAnswer === currentQuiz.correctAnswer ? 'bulb' : 'information-circle'}
                size={20}
                color={selectedAnswer === currentQuiz.correctAnswer ? Colors.accent : Colors.primary}
              />
              <Text style={styles.explanationTitle}>Explanation</Text>
            </View>
            <Text style={styles.explanationText}>{currentQuiz.explanation}</Text>
          </View>
        )}
      </View>

      {selectedAnswer !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentQuizIndex < totalQuestions - 1 ? 'Next Question' : 'See Results'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.white} />
        </TouchableOpacity>
      )}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  quizCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  questionNumber: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  questionText: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.lg,
    lineHeight: 28,
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.secondary + '10',
  },
  optionIncorrect: {
    borderColor: Colors.danger,
    backgroundColor: Colors.danger + '10',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  optionLetterText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  optionText: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  optionTextCorrect: {
    color: Colors.secondary,
  },
  optionTextIncorrect: {
    color: Colors.danger,
  },
  explanationContainer: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  explanationTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  explanationText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  nextButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.white,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  completedIcon: {
    marginBottom: Spacing.lg,
  },
  completedTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  completedScore: {
    fontSize: FontSize.xxxl,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  completedMessage: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.xl,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  retryButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.white,
  },
});
