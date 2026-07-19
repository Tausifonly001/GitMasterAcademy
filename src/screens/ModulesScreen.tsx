import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';
import { modules } from '../data/courses';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';

interface ModulesScreenProps {
  navigation: any;
}

export const ModulesScreen = ({ navigation }: ModulesScreenProps) => {
  const { progress } = useAuth();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return Colors.secondary;
      case 'intermediate':
        return Colors.accent;
      case 'advanced':
        return Colors.danger;
      default:
        return Colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Roadmap</Text>
        <Text style={styles.subtitle}>Master Git step by step</Text>
      </View>

      <View style={styles.pathContainer}>
        <View style={styles.pathLine} />
        {modules.map((module, index) => {
          const completedLessons = module.lessons.filter(l =>
            progress.completedLessons.includes(l.id)
          ).length;
          const progressPercent = (completedLessons / module.lessons.length) * 100;
          const isCompleted = progressPercent === 100;
          const isActive = progressPercent > 0 && !isCompleted;

          return (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleItem}
              onPress={() => navigation.navigate('ModuleDetail', { module })}
            >
              <View
                style={[
                  styles.moduleIndicator,
                  isCompleted && styles.moduleIndicatorCompleted,
                  isActive && styles.moduleIndicatorActive,
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={20} color={Colors.white} />
                ) : (
                  <Text style={styles.moduleNumber}>{index + 1}</Text>
                )}
              </View>

              <View style={styles.moduleContent}>
                <View style={styles.moduleHeader}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <View
                    style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(module.difficulty) + '20' },
                    ]}
                  >
                    <Text
                      style={[
                        styles.difficultyText,
                        { color: getDifficultyColor(module.difficulty) },
                      ]}
                    >
                      {module.difficulty}
                    </Text>
                  </View>
                </View>
                <Text style={styles.moduleDescription}>{module.description}</Text>
                <View style={styles.moduleMeta}>
                  <Ionicons name="book-outline" size={14} color={Colors.textMuted} />
                  <Text style={styles.moduleMetaText}>
                    {completedLessons}/{module.lessons.length} lessons
                  </Text>
                  {progressPercent > 0 && (
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          {
                            width: `${progressPercent}%`,
                            backgroundColor: isCompleted ? Colors.secondary : Colors.primary,
                          },
                        ]}
                      />
                    </View>
                  )}
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          );
        })}
      </View>

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
    paddingBottom: Spacing.lg,
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
  pathContainer: {
    paddingHorizontal: Spacing.md,
  },
  pathLine: {
    position: 'absolute',
    left: 35,
    top: 24,
    bottom: 24,
    width: 2,
    backgroundColor: Colors.border,
  },
  moduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  moduleIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    zIndex: 1,
  },
  moduleIndicatorCompleted: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  moduleIndicatorActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  moduleNumber: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  moduleContent: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  moduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  moduleTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  difficultyText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  moduleDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  moduleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moduleMetaText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginLeft: 4,
    marginRight: Spacing.sm,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
