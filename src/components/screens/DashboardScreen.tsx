import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
//import { ServiceCenter } from "@/src/types/ServiceCenter";

const DashboardScreen: React.FC = () => {
  const serviceCenters = useSelector(
    (state: RootState) => state.servicecenter.serviceCenters
  );

  const centerList = useMemo(() => Object.values(serviceCenters), [serviceCenters]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Nearby Businesses</Text>
      <Text style={styles.subtitle}>Top-rated service centers</Text>

      {centerList.length > 0 ? (
        <FlatList
          data={centerList}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => console.log("Clicked:", item.name)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.avatarURL }} style={styles.image} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.location}>{item.location}</Text>
                  </View>
                  <Text >⭐ {item.average_rating.toFixed(1)}</Text>
                </View>
                <Text style={styles.details}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No service centers available.</Text>
      )}
    </View>
  );
};

export default DashboardScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 160,
    width: "100%",
    resizeMode: "cover",
  },
  cardContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  location: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  details: {
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
 
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    marginTop: 30,
  },
});
