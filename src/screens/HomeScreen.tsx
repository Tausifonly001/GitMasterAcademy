import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { modules } from '../data/courses';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user, progress } = useAuth();

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  const recentModules = modules.slice(0, 3);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name || 'Learner'}! 👋</Text>
          <Text style={styles.subtitle}>Ready to master Git?</Text>
        </View>
        <TouchableOpacity
          style={styles.avatar}
          onPress={() => navigation.navigate('ProfileTab')}
        >
          <Ionicons name="person" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <ProgressBar progress={overallProgress} label="Overall Completion" />
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{completedCount}</Text>
            <Text style={styles.statLabel}>Lessons Done</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{progress.totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{totalLessons - completedCount}</Text>
            <Text style={styles.statLabel}>Remaining</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Learning Roadmap</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ModulesTab')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentModules.map((module, index) => {
          const moduleProgress = module.lessons.filter(l =>
            progress.completedLessons.includes(l.id)
          ).length;
          const progressPercent = (moduleProgress / module.lessons.length) * 100;

          return (
            <Card
              key={module.id}
              title={module.title}
              description={`${module.lessons.length} lessons • ${module.difficulty}`}
              icon={module.icon as any}
              variant={index === 0 ? 'gradient' : 'default'}
              onPress={() =>
                navigation.navigate('ModulesTab', {
                  screen: 'ModuleDetail',
                  params: { module },
                })
              }
              rightElement={
                <View style={styles.moduleProgress}>
                  <Text style={styles.moduleProgressText}>{Math.round(progressPercent)}%</Text>
                </View>
              }
            />
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('PlaygroundTab')}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.primary + '20' }]}>
              <Ionicons name="terminal" size={24} color={Colors.primary} />
            </View>
            <Text style={styles.actionTitle}>Playground</Text>
            <Text style={styles.actionSubtitle}>Practice Commands</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ModulesTab')}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.secondary + '20' }]}>
              <Ionicons name="book" size={24} color={Colors.secondary} />
            </View>
            <Text style={styles.actionTitle}>Lessons</Text>
            <Text style={styles.actionSubtitle}>Continue Learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('QuizTab')}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.accent + '20' }]}>
              <Ionicons name="help-circle" size={24} color={Colors.accent} />
            </View>
            <Text style={styles.actionTitle}>Quiz</Text>
            <Text style={styles.actionSubtitle}>Test Knowledge</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate('ProfileTab')}
          >
            <View style={[styles.actionIcon, { backgroundColor: Colors.danger + '20' }]}>
              <Ionicons name="trophy" size={24} color={Colors.danger} />
            </View>
            <Text style={styles.actionTitle}>Profile</Text>
            <Text style={styles.actionSubtitle}>View Stats</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
  },
  progressTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  moduleProgress: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleProgressText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  actionTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
