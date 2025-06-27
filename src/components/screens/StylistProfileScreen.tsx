import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { Ionicons } from "@expo/vector-icons";

const StylistProfile: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const stylistId = Array.isArray(id) ? id[0] : id;

  const stylists = useSelector((state: RootState) =>
    Object.values(state.stylists.stylists)
  );
  const bookings = useSelector((state: RootState) =>
    Object.values(state.bookings.bookings)
  );

  const stylist = useMemo(
    () => stylists.find((s) => s.id === stylistId),
    [stylists, stylistId]
  );

  const stylistBookings = useMemo(
    () => bookings.filter((b) => b.stylist_id === stylistId),
    [bookings, stylistId]
  );

  const totalIncome = useMemo(() => {
    return stylistBookings.reduce((acc, curr) => acc + curr.price, 0);
  }, [stylistBookings]);

  if (!stylist) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFoundText}>Stylist not found.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
          <Text style={styles.backText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const displayName = stylist.name || stylist.id.replace(/([a-z])([A-Z])/g, "$1 $2");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: stylist.avatarURL || `https://i.pravatar.cc/250?u=${stylist.id}` }}
          style={styles.profileImage}
        />
        <View style={styles.profileRight}>
          <Text style={styles.profileName}>{displayName}</Text>
          <View style={styles.profileStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{stylistBookings.length}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>${totalIncome.toFixed(2)}</Text>
              <Text style={styles.statLabel}>Earned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>🟢</Text>
              <Text style={styles.statLabel}>Status</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Appointments</Text>

      {/* List */}
      {stylistBookings.length > 0 ? (
        <FlatList
          data={stylistBookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
                  <Text style={styles.bookingText}><Text style={styles.bold}>Customer:</Text> {item.user_id}</Text>
              <Text style={styles.bookingText}><Text style={styles.bold}>Service:</Text> {item.service}</Text>
              <Text style={styles.bookingText}><Text style={styles.bold}>Date:</Text> {new Date(item.scheduled_datetime).toLocaleString()}</Text>
              <Text style={styles.bookingText}><Text style={styles.bold}>Price:</Text> ${item.price}</Text>
              <Text style={styles.bookingText}><Text style={styles.bold}>Status:</Text> {item.status}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyMessage}>No appointments yet.</Text>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default StylistProfile;


// Updated accent color version
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileRight: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  superhost: {
    fontSize: 14,
    color: "#A3512B", // updated color
    fontWeight: "500",
    marginBottom: 8,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
  },
  statLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 12,
    color: "#222",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bookingText: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "600",
    color: "#111",
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 24,
  },
  listContainer: {
    paddingBottom: 30,
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
    backgroundColor: "#A3512B", // updated color
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
});
