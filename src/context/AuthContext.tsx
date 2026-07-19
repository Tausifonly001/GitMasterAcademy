import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Progress {
  completedLessons: string[];
  quizScores: { [key: string]: number };
  totalPoints: number;
}

interface AuthContextType {
  user: User | null;
  progress: Progress;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  saveQuizScore: (quizId: string, score: number) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<Progress>({
    completedLessons: [],
    quizScores: {},
    totalPoints: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedProgress = await AsyncStorage.getItem('progress');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedProgress) setProgress(JSON.parse(storedProgress));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
    };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };
    setUser(newUser);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const completeLesson = async (lessonId: string) => {
    if (!progress.completedLessons.includes(lessonId)) {
      const newProgress = {
        ...progress,
        completedLessons: [...progress.completedLessons, lessonId],
        totalPoints: progress.totalPoints + 10,
      };
      setProgress(newProgress);
      await AsyncStorage.setItem('progress', JSON.stringify(newProgress));
    }
  };

  const saveQuizScore = async (quizId: string, score: number) => {
    const newProgress = {
      ...progress,
      quizScores: { ...progress.quizScores, [quizId]: score },
      totalPoints: progress.totalPoints + score * 5,
    };
    setProgress(newProgress);
    await AsyncStorage.setItem('progress', JSON.stringify(newProgress));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        progress,
        isLoading,
        login,
        register,
        logout,
        completeLesson,
        saveQuizScore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
