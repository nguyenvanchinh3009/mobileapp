import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminOrderScreen from "./AdminOrderScreen";
import CartScreen from "./CartScreen";
import Checkout from "./Checkout";
import Home from "./Home";
import Login from "./Login";
import OrderSuccess from "./OrderSuccess";
import PaymentScreen from "./PaymentScreen";
import Register from "./Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
        <Stack.Screen name="AdminOrders" component={AdminOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
