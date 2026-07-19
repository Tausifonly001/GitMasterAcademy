import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';

interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  variant?: 'default' | 'gradient' | 'outlined';
}

export const Card = ({ title, description, icon, onPress, rightElement, variant = 'default' }: CardProps) => {
  const getCardStyle = () => {
    switch (variant) {
      case 'gradient':
        return styles.gradientCard;
      case 'outlined':
        return styles.outlinedCard;
      default:
        return styles.defaultCard;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, getCardStyle()]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            <Ionicons name={icon as any} size={24} color={Colors.primaryLight} />
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      </View>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  defaultCard: {
    backgroundColor: Colors.surface,
  },
  gradientCard: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
