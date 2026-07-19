import React from 'react';
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
import { useAuth } from '../context/AuthContext';
import { ProgressBar } from '../components/ProgressBar';
import { modules } from '../data/courses';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, progress, logout } = useAuth();

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={Colors.primary} />
          </View>
          <TouchableOpacity style={styles.editAvatar}>
            <Ionicons name="camera" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user?.name || 'Learner'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'learner@example.com'}</Text>
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{completedLessons}</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{progress.totalPoints}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {Object.keys(progress.quizScores).length}
            </Text>
            <Text style={styles.statLabel}>Quizzes</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Overall Progress</Text>
        <ProgressBar progress={overallProgress} height={12} />
        <Text style={styles.progressText}>
          {completedLessons} of {totalLessons} lessons completed
        </Text>
      </View>

      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: Colors.primary + '20' }]}>
            <Ionicons name="trophy" size={22} color={Colors.primary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Achievements</Text>
            <Text style={styles.menuSubtitle}>View your badges</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: Colors.secondary + '20' }]}>
            <Ionicons name="download" size={22} color={Colors.secondary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Download Content</Text>
            <Text style={styles.menuSubtitle}>Access lessons offline</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: Colors.accent + '20' }]}>
            <Ionicons name="notifications" size={22} color={Colors.accent} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Notifications</Text>
            <Text style={styles.menuSubtitle}>Manage alerts</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: Colors.textSecondary + '20' }]}>
            <Ionicons name="help-circle" size={22} color={Colors.textSecondary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>Help & Support</Text>
            <Text style={styles.menuSubtitle}>Get assistance</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.menuIcon, { backgroundColor: Colors.textSecondary + '20' }]}>
            <Ionicons name="information-circle" size={22} color={Colors.textSecondary} />
          </View>
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>About</Text>
            <Text style={styles.menuSubtitle}>Version 1.0.0</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color={Colors.danger} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

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
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  userName: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    marginTop: -Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  progressSection: {
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  progressText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  menuSection: {
    padding: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  menuSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.danger + '10',
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.danger + '30',
    gap: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.danger,
  },
  bottomPadding: {
    height: Spacing.xxl,
  },
});
