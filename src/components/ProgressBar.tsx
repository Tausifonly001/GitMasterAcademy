import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';

interface ProgressBarProps {
  progress: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  height?: number;
  color?: string;
}

export const ProgressBar = ({
  progress,
  label,
  showPercentage = true,
  height = 8,
  color = Colors.primary,
}: ProgressBarProps) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      {(label || showPercentage) && (
        <View style={styles.header}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showPercentage && <Text style={styles.percentage}>{Math.round(clampedProgress)}%</Text>}
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              height,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  label: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  percentage: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  track: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    borderRadius: BorderRadius.full,
  },
});
