import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface DiceResult {
  id: number;
  value: number;
}

export default function DiceScreen() {
  const colorScheme = useColorScheme();
  const [diceCount, setDiceCount] = useState(1);
  const [results, setResults] = useState<DiceResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  
  // Animation refs
  const dice1Animation = useRef(new Animated.Value(0)).current;
  const dice2Animation = useRef(new Animated.Value(0)).current;

  const getDiceDisplay = (value: number) => {
    const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceFaces[value - 1] || '🎲';
  };

  const animateDice = (animation: Animated.Value) => {
    return Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animation, {
        toValue: 0,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);
  };

  const rollDice = async () => {
    if (isRolling) return;
    
    setIsRolling(true);
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Start animations
    const animations = [animateDice(dice1Animation)];
    if (diceCount === 2) {
      animations.push(animateDice(dice2Animation));
    }

    Animated.parallel(animations).start();

    // Generate results
    setTimeout(() => {
      const newResults: DiceResult[] = [];
      for (let i = 0; i < diceCount; i++) {
        newResults.push({
          id: Date.now() + i,
          value: Math.floor(Math.random() * 6) + 1,
        });
      }
      setResults(newResults);
      setIsRolling(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 600);
  };

  const getTotalValue = () => {
    return results.reduce((sum, dice) => sum + dice.value, 0);
  };

  const getDiceTransform = (animation: Animated.Value) => {
    const rotate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const scale = animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 1],
    });

    return [{ rotate }, { scale }];
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="title">🎲 Dice Roller</ThemedText>
          <ThemedText style={styles.subtitle}>
            Roll the dice and see your luck!
          </ThemedText>
        </View>

        {/* Dice Count Selector */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Number of Dice
          </ThemedText>
          <View style={styles.countSelector}>
            {[1, 2].map((count) => (
              <TouchableOpacity
                key={count}
                style={[
                  styles.countButton,
                  { backgroundColor: Colors[colorScheme ?? 'light'].background },
                  diceCount === count && {
                    backgroundColor: Colors[colorScheme ?? 'light'].tint,
                  }
                ]}
                onPress={() => {
                  setDiceCount(count);
                  setResults([]);
                }}
                disabled={isRolling}
              >
                <ThemedText 
                  style={[
                    styles.countButtonText,
                    diceCount === count && { 
                      color: colorScheme === 'dark' ? '#000' : 'white' 
                    }
                  ]}
                >
                  {count}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dice Display */}
        <View style={styles.diceContainer}>
          <Animated.View 
            style={[
              styles.diceWrapper,
              { transform: getDiceTransform(dice1Animation) }
            ]}
          >
            <View style={[
              styles.dice,
              { backgroundColor: Colors[colorScheme ?? 'light'].background }
            ]}>
              <ThemedText style={styles.diceText}>
                {isRolling ? '🎲' : (results[0] ? getDiceDisplay(results[0].value) : '🎲')}
              </ThemedText>
              {!isRolling && results[0] && (
                <ThemedText style={styles.diceNumber}>
                  {results[0].value}
                </ThemedText>
              )}
            </View>
          </Animated.View>

          {diceCount === 2 && (
            <Animated.View 
              style={[
                styles.diceWrapper,
                { transform: getDiceTransform(dice2Animation) }
              ]}
            >
              <View style={[
                styles.dice,
                { backgroundColor: Colors[colorScheme ?? 'light'].background }
              ]}>
                <ThemedText style={styles.diceText}>
                  {isRolling ? '🎲' : (results[1] ? getDiceDisplay(results[1].value) : '🎲')}
                </ThemedText>
                {!isRolling && results[1] && (
                  <ThemedText style={styles.diceNumber}>
                    {results[1].value}
                  </ThemedText>
                )}
              </View>
            </Animated.View>
          )}
        </View>

        {/* Total Display */}
        {results.length > 0 && !isRolling && (
          <View style={[
            styles.totalCard,
            { backgroundColor: Colors[colorScheme ?? 'light'].background }
          ]}>
            <ThemedText style={styles.totalLabel}>Total</ThemedText>
            <ThemedText style={[
              styles.totalValue,
              { color: Colors[colorScheme ?? 'light'].tint }
            ]}>
              {getTotalValue()}
            </ThemedText>
          </View>
        )}

        {/* Roll Button */}
        <TouchableOpacity
          style={[
            styles.rollButton,
            { backgroundColor: Colors[colorScheme ?? 'light'].tint },
            isRolling && styles.rollingButton
          ]}
          onPress={rollDice}
          disabled={isRolling}
        >
          <ThemedText style={[
            styles.rollButtonText,
            { color: colorScheme === 'dark' ? '#000' : 'white' }
          ]}>
            {isRolling ? '🎲 Rolling...' : '🎲 ROLL DICE'}
          </ThemedText>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
    textAlign: 'center',
  },
  countSelector: {
    flexDirection: 'row',
    gap: 20,
  },
  countButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  countButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  diceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginVertical: 40,
    minHeight: 120,
  },
  diceWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dice: {
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  diceText: {
    fontSize: 40,
    textAlign: 'center',
  },
  diceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  totalCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    minWidth: 100,
  },
  totalLabel: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 5,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  rollButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 200,
    marginTop: 20,
  },
  rollingButton: {
    opacity: 0.8,
  },
  rollButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
