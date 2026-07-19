import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize } from '../constants/colors';
import { gitCommands } from '../data/courses';

interface HistoryItem {
  command: string;
  output: string;
  timestamp: Date;
}

export const PlaygroundScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [commandHistory, setCommandHistory] = useState<HistoryItem[]>([]);
  const [customCommand, setCustomCommand] = useState('');

  const categories = ['All', 'Setup', 'Staging', 'Commit', 'Branching', 'Remote', 'Info', 'Advanced'];

  const filteredCommands = gitCommands.filter(cmd => {
    const matchesSearch =
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const simulateCommand = (command: string) => {
    const outputs: { [key: string]: string } = {
      'git init': 'Initialized empty Git repository in /project/.git/',
      'git clone <url>': 'Cloning into "repo"...\nremote: Enumerating objects: 1234, done.\nremote: Total 1234 (delta 0), reused 0 (delta 0)\nReceiving objects: 100% (1234/1234), 2.5 MiB | 5.12 MiB/s, done.',
      'git add <file>': '',
      'git add .': '',
      'git commit -m "message"': '[main abc1234] Your commit message\n 1 file changed, 10 insertions(+)',
      'git status': 'On branch main\nYour branch is up to date.\n\nChanges to be committed:\n  new file:   file.txt',
      'git log': 'abc1234 (HEAD -> main) Your commit message\ndef5678 Initial commit',
      'git log --oneline': 'abc1234 Your commit message\ndef5678 Initial commit',
      'git diff': 'diff --git a/file.txt b/file.txt\n--- a/file.txt\n+++ b/file.txt\n@@ -1 +1 @@\n-old content\n+new content',
      'git branch': '* main\n  feature-branch',
      'git checkout <branch>': 'Switched to branch "feature-branch"',
      'git checkout -b <branch>': 'Switched to a new branch "feature-branch"',
      'git merge <branch>': 'Updating abc1234..def5678\nFast-forward\n file.txt | 2 ++\n 1 file changed, 2 insertions(+)',
      'git pull': 'Already up to date.',
      'git push': 'Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nTo https://github.com/user/repo.git\n   abc1234..def5678  main -> main',
      'git remote add origin <url>': '',
      'git stash': 'Saved working directory and index state WIP on main: abc1234 commit message',
      'git stash pop': 'On branch main\nChanges not staged for commit:\n  modified:   file.txt\n\nDropped refs/stash@{0} (stash@{0})',
      'git reset HEAD~1': 'Unstaged changes after reset:\nM\tfile.txt',
      'git revert <commit>': '[main def5678] Revert "commit message"\n 1 file changed, 5 insertions(+), 5 deletions(-)',
    };

    const output = outputs[command] || `Command executed: ${command}\n$ `;

    setCommandHistory(prev => [
      { command, output, timestamp: new Date() },
      ...prev,
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Git Playground</Text>
        <Text style={styles.subtitle}>Practice Git commands safely</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search commands..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {commandHistory.length > 0 && (
        <View style={styles.terminalContainer}>
          <View style={styles.terminalHeader}>
            <View style={styles.terminalDots}>
              <View style={[styles.dot, { backgroundColor: '#ff5f56' }]} />
              <View style={[styles.dot, { backgroundColor: '#ffbd2e' }]} />
              <View style={[styles.dot, { backgroundColor: '#27c93f' }]} />
            </View>
            <Text style={styles.terminalTitle}>Terminal</Text>
          </View>
          <ScrollView style={styles.terminalContent} showsVerticalScrollIndicator={false}>
            {commandHistory.map((item, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyCommand}>$ {item.command}</Text>
                {item.output ? (
                  <Text style={styles.historyOutput}>{item.output}</Text>
                ) : null}
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.commandsContainer}>
        <Text style={styles.sectionTitle}>Commands Library</Text>
        <FlatList
          data={filteredCommands}
          keyExtractor={(item, index) => `${item.command}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.commandCard}
              onPress={() => simulateCommand(item.command)}
            >
              <View style={styles.commandHeader}>
                <Text style={styles.commandText}>{item.command}</Text>
                <TouchableOpacity
                  style={styles.runButton}
                  onPress={() => simulateCommand(item.command)}
                >
                  <Ionicons name="play" size={14} color={Colors.white} />
                </TouchableOpacity>
              </View>
              <Text style={styles.commandDescription}>{item.description}</Text>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryTagText}>{item.category}</Text>
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={false}
        />
      </View>
    </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  categoryChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    marginRight: Spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: Colors.white,
  },
  terminalContainer: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  terminalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.surfaceLight,
  },
  terminalDots: {
    flexDirection: 'row',
    marginRight: Spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  terminalTitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  terminalContent: {
    padding: Spacing.md,
    maxHeight: 150,
  },
  historyItem: {
    marginBottom: Spacing.sm,
  },
  historyCommand: {
    fontFamily: 'monospace',
    fontSize: FontSize.sm,
    color: Colors.secondary,
  },
  historyOutput: {
    fontFamily: 'monospace',
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  commandsContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  commandCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  commandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commandText: {
    fontFamily: 'monospace',
    fontSize: FontSize.md,
    color: Colors.accent,
    fontWeight: '500',
    flex: 1,
  },
  runButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commandDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.sm,
  },
  categoryTagText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
