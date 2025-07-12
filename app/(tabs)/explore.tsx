import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">⚙️ Settings</ThemedText>
          <ThemedText style={styles.subtitle}>
            SpinRoll - Your Ultimate Random Generator
          </ThemedText>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <View style={[
            styles.infoCard,
            { backgroundColor: Colors[colorScheme ?? 'light'].background }
          ]}>
            <ThemedText type="subtitle" style={styles.cardTitle}>About SpinRoll</ThemedText>
            <ThemedText style={styles.cardText}>
              SpinRoll is your all-in-one random generator app featuring:
            </ThemedText>
            <View style={styles.featureList}>
              <ThemedText style={styles.feature}>🎲 Dice Roller - Roll 1 or 2 dice</ThemedText>
              <ThemedText style={styles.feature}>🔢 Number Generator - Custom ranges</ThemedText>
              <ThemedText style={styles.feature}>🎡 Spin Wheel - Custom options</ThemedText>
              <ThemedText style={styles.feature}>👤 Name Picker - Choose from lists</ThemedText>
            </View>
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.section}>
          <View style={[
            styles.infoCard,
            { backgroundColor: Colors[colorScheme ?? 'light'].background }
          ]}>
            <ThemedText type="subtitle" style={styles.cardTitle}>App Information</ThemedText>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Version:</ThemedText>
              <ThemedText style={styles.infoValue}>1.0.0</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Platform:</ThemedText>
              <ThemedText style={styles.infoValue}>React Native</ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText style={styles.infoLabel}>Framework:</ThemedText>
              <ThemedText style={styles.infoValue}>Expo</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 20,
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 15,
    textAlign: 'center',
    opacity: 0.8,
  },
  featureList: {
    gap: 8,
  },
  feature: {
    fontSize: 15,
    lineHeight: 20,
    opacity: 0.9,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    opacity: 0.7,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
});
