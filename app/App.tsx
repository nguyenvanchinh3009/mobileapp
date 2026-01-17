import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";

import AdminOrderScreen from "./AdminOrderScreen";
import BillScreen from "./BillScreen";
import Home from "./Home";
import Login from "./Login";
import PaymentScreen from "./PaymentScreen";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <Login {...props} onLoginSuccess={() => setIsLoggedIn(true)} />
              )}
            </Stack.Screen>

            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="Bill" component={BillScreen} />
            <Stack.Screen name="AdminOrders" component={AdminOrderScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
