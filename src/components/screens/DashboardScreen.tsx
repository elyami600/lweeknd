import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useRouter } from "expo-router";
import Search from "./feature/Search/Search";

const screenWidth = Dimensions.get("window").width;
const spacing = 16;
const cardWidth = (screenWidth - spacing * 3) / 2;

const HomeScreen: React.FC = () => {
  const router = useRouter();

  const serviceCenters = useSelector((state: RootState) => state.servicecenter.serviceCenters);
  const centerList = useMemo(() => Object.values(serviceCenters), [serviceCenters]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.title}>Explore Nearby Services</Text>
        <Text style={styles.subtitle}>Top-rated salons, barbers & beauty centers</Text>

        <Search />

        {centerList.length > 0 ? (
          <FlatList
            data={centerList}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.card, { width: cardWidth }]}
                onPress={() => router.push({ pathname: "/ServiceCenterProfile", params: { id: item.id } })}
              >
                <Image source={{ uri: item.avatarURL }} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.location} numberOfLines={1}>📍 {item.location}</Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.details}>{item.type}</Text>
                    <Text style={styles.rating}>⭐ {item.average_rating.toFixed(1)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.emptyMessage}>No service centers available.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 6,
    color: "#111",
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 18,
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: spacing,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    height: 120,
    width: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
  },
  location: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  rating: {
    fontSize: 13,
    color: "#f39c12",
    fontWeight: "500",
  },
  details: {
    fontSize: 13,
    color: "#555",
    textTransform: "capitalize",
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginTop: 30,
  },
});
