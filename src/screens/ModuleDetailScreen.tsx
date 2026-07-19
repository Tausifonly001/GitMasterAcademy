import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';
import { Module, Lesson } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import Markdown from 'react-native-markdown-display';

interface ModuleDetailScreenProps {
  navigation: any;
  route: any;
}

export const ModuleDetailScreen = ({ navigation, route }: ModuleDetailScreenProps) => {
  const { module } = route.params as { module: Module };
  const { progress, completeLesson } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const getLessonStatus = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  const handleCompleteLesson = async (lessonId: string) => {
    await completeLesson(lessonId);
  };

  if (selectedLesson) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.lessonHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setSelectedLesson(null)}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.lessonTitleContainer}>
            <Text style={styles.lessonTitle} numberOfLines={1}>
              {selectedLesson.title}
            </Text>
            <Text style={styles.lessonDuration}>{selectedLesson.duration}</Text>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() =>
              Share.share({
                message: `Check out this lesson: ${selectedLesson.title}`,
              })
            }
          >
            <Ionicons name="share-outline" size={22} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.lessonContent}>
          <Markdown style={markdownStyles}>{selectedLesson.content}</Markdown>

          {selectedLesson.commands && selectedLesson.commands.length > 0 && (
            <View style={styles.commandsSection}>
              <Text style={styles.commandsTitle}>Commands to Practice</Text>
              {selectedLesson.commands.map((cmd, index) => (
                <View key={index} style={styles.commandItem}>
                  <Text style={styles.commandText}>{cmd}</Text>
                </View>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.completeButton,
              getLessonStatus(selectedLesson.id) && styles.completeButtonDone,
            ]}
            onPress={() => handleCompleteLesson(selectedLesson.id)}
            disabled={getLessonStatus(selectedLesson.id)}
          >
            {getLessonStatus(selectedLesson.id) ? (
              <>
                <Ionicons name="checkmark-circle" size={22} color={Colors.white} />
                <Text style={styles.completeButtonText}>Completed</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle-outline" size={22} color={Colors.white} />
                <Text style={styles.completeButtonText}>Mark as Complete</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={[styles.iconContainer, { backgroundColor: Colors.primary + '20' }]}>
            <Ionicons name={module.icon as any} size={32} color={Colors.primary} />
          </View>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription}>{module.description}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="book-outline" size={16} color={Colors.textSecondary} />
              <Text style={styles.metaText}>{module.lessons.length} Lessons</Text>
            </View>
            <View style={[styles.difficultyBadge, { backgroundColor: Colors.primary + '20' }]}>
              <Text style={styles.difficultyText}>{module.difficulty}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.lessonsList}>
        <Text style={styles.sectionTitle}>Lessons</Text>
        {module.lessons.map((lesson, index) => {
          const isCompleted = getLessonStatus(lesson.id);
          return (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lessonItem, isCompleted && styles.lessonItemCompleted]}
              onPress={() => setSelectedLesson(lesson)}
            >
              <View style={[styles.lessonNumber, isCompleted && styles.lessonNumberCompleted]}>
                {isCompleted ? (
                  <Ionicons name="checkmark" size={18} color={Colors.white} />
                ) : (
                  <Text style={styles.lessonNumberText}>{index + 1}</Text>
                )}
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonItemTitle}>{lesson.title}</Text>
                <Text style={styles.lessonItemDescription}>{lesson.description}</Text>
              </View>
              <View style={styles.lessonMeta}>
                <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
                <Text style={styles.lessonDurationText}>{lesson.duration}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
};

const markdownStyles = {
  body: {
    color: Colors.text,
    fontSize: FontSize.md,
    lineHeight: 24,
  },
  heading1: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: 'bold' as const,
    marginBottom: Spacing.md,
  },
  heading2: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: 'bold' as const,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },
  heading3: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '600' as const,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  paragraph: {
    color: Colors.text,
    fontSize: FontSize.md,
    lineHeight: 24,
    marginBottom: Spacing.md,
  },
  strong: {
    color: Colors.primary,
    fontWeight: 'bold' as const,
  },
  code_inline: {
    color: Colors.accent,
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: FontSize.sm,
  },
  code_block: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  fence: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  list_item: {
    color: Colors.text,
    fontSize: FontSize.md,
    marginBottom: 4,
  },
  bullet_list: {
    marginBottom: Spacing.md,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.surface,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  headerContent: {
    paddingHorizontal: Spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  moduleTitle: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  metaText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  difficultyText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'capitalize',
  },
  lessonsList: {
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  lessonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  lessonItemCompleted: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.secondary + '30',
  },
  lessonNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  lessonNumberCompleted: {
    backgroundColor: Colors.secondary,
  },
  lessonNumberText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonItemTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  lessonItemDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDurationText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
  // Lesson view styles
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  lessonTitleContainer: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  lessonTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  lessonDuration: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  shareButton: {
    padding: Spacing.sm,
  },
  lessonContent: {
    padding: Spacing.md,
  },
  commandsSection: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  commandsTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  commandItem: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  commandText: {
    fontFamily: 'monospace',
    fontSize: FontSize.sm,
    color: Colors.accent,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  completeButtonDone: {
    backgroundColor: Colors.secondary,
  },
  completeButtonText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.white,
  },
});
