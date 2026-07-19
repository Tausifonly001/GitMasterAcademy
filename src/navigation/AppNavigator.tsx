import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ModulesScreen } from '../screens/ModulesScreen';
import { ModuleDetailScreen } from '../screens/ModuleDetailScreen';
import { PlaygroundScreen } from '../screens/PlaygroundScreen';
import { QuizScreen } from '../screens/QuizScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
  </Stack.Navigator>
);

const ModulesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ModulesMain" component={ModulesScreen} />
    <Stack.Screen name="ModuleDetail" component={ModuleDetailScreen} />
  </Stack.Navigator>
);

const PlaygroundStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PlaygroundMain" component={PlaygroundScreen} />
  </Stack.Navigator>
);

const QuizStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="QuizMain" component={QuizScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
  </Stack.Navigator>
);

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'ModulesTab':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'PlaygroundTab':
              iconName = focused ? 'terminal' : 'terminal-outline';
              break;
            case 'QuizTab':
              iconName = focused ? 'help-circle' : 'help-circle-outline';
              break;
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="ModulesTab" component={ModulesStack} options={{ tabBarLabel: 'Learn' }} />
      <Tab.Screen name="PlaygroundTab" component={PlaygroundStack} options={{ tabBarLabel: 'Playground' }} />
      <Tab.Screen name="QuizTab" component={QuizStack} options={{ tabBarLabel: 'Quiz' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};
