import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          contentStyle: { backgroundColor: '#0F172A' }
        }}
      >
        <Stack.Screen name="index" /> {/* AuthHome */}
        <Stack.Screen name="SignInForm" />
        <Stack.Screen name="RegisterForm" />
        <Stack.Screen name="orgotpassword" />
        <Stack.Screen name="home" />
         <Stack.Screen name="game-dashboard" /> {/* Thêm dòng này */}
      </Stack>
      <StatusBar style="light" />
    </>
  );
}