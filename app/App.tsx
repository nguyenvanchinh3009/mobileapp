import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PaymentScreen from "./PaymentScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            {/* Màn hình Đăng nhập */}
            <Stack.Screen name="Login">
              {(props) => (
                <Login
                  {...props}
                  onLoginSuccess={() => setIsLoggedIn(true)}
                  onGoRegister={() => props.navigation.navigate("Register")}
                  onForgotPassword={() => alert("Chưa làm phần này")}
                />
              )}
            </Stack.Screen>

            {/* Màn hình Đăng ký */}
            <Stack.Screen name="Register">
              {(props) => (
                <Register
                  {...props}
                  onBackToLogin={() => props.navigation.navigate("Login")}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          <>
            {/* Màn hình chính */}
            <Stack.Screen name="Home">
              {(props) => (
                <Home
                  {...props}
                  onLogout={() => setIsLoggedIn(false)}
                  onChangePassword={() => alert("Đổi mật khẩu")}
                />
              )}
            </Stack.Screen>

            {/* Màn hình thanh toán */}
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
