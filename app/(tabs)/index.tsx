// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { Provider } from "react-redux";
// import { store } from "@/src/store/store"; // Adjust 
// import RootNavigator from "@/src/components/navigaton/RootNavigator"

// const App: React.FC = () => {
//   return (
//     <Provider store={store}>
//       <SafeAreaProvider>
//         <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//         <NavigationContainer>
//           <SafeAreaView style={styles.container}>
//             <RootNavigator />
//           </SafeAreaView>
//         </NavigationContainer>
//       </SafeAreaProvider>
//     </Provider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
// });

// export default App;

import React from "react";
import { View, Text } from "react-native";

const IndexScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Welcome to the Explore Tab!</Text>
  </View>
);

export default IndexScreen;