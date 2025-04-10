import React, { useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "@/src/store/store";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const ServiceCenterProfile = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const serviceCenters = useSelector(
    (state: RootState) => state.servicecenter.serviceCenters
  );

  const serviceCenterId = Array.isArray(id) ? id[0] : id;

  const serviceCenter = useMemo(() => {
    return Object.values(serviceCenters).find(
      (center: any) => center.id === serviceCenterId
    );
  }, [serviceCenters, serviceCenterId]);

  if (!serviceCenter) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Service Center not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const renderStylist = ({ item }: { item: string }) => {
    const displayName = item.replace(/([a-z])([A-Z])/g, "$1 $2"); // "johnDoe" → "john Doe"

    return (
      <TouchableOpacity style={styles.card}
       //onPress={() => router.push({ pathname: "/BookingSlot", params: { id: item } })}
      onPress={() => router.push({ pathname: "/StylistProfile", params: { id: item } })}
      >
        <Image
          source={{ uri: `https://i.pravatar.cc/100?u=${item}` }}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.stylistName}>{displayName}</Text>
          <Text style={styles.service}>Haircut / Styling</Text>
          <Text style={styles.time}>✅ Available</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={serviceCenter.stylists}
        keyExtractor={(id) => id}
        renderItem={renderStylist}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <Image source={{ uri: serviceCenter.avatarURL }} style={styles.headerImage} />
            <View style={styles.profileContent}>
              <Text style={styles.name}>{serviceCenter.name}</Text>
              <Text style={styles.details}>📍 {serviceCenter.location}</Text>
              <Text style={styles.details}>Type: {serviceCenter.type}</Text>
              <Text style={styles.details}>
                Rating: ⭐ {serviceCenter.average_rating.toFixed(1)}
              </Text>
              <Text style={styles.stylistHeader}>Our Stylists</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginVertical: 20 }}>
            No stylists available.
          </Text>
        }
      />

      {/* Back Button at Bottom */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ServiceCenterProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  headerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  profileContent: {
    padding: 20,
    alignItems: "center",
  },
  name: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    color: "#111",
  },
  details: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
    textAlign: "center",
  },
  stylistHeader: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    alignSelf: "flex-start",
    color: "#222",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fefefe",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  stylistName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  service: {
    fontSize: 14,
    color: "#666",
  },
  time: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  notFoundText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff6347",
    paddingVertical: 14,
    margin: 16,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
});
