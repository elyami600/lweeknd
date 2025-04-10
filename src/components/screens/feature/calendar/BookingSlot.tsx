import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { Ionicons } from "@expo/vector-icons";
import CalendarDataPicker from "./CalendarDataPicker";

const serviceColors = ["#f87171", "#a78bfa", "#34d399", "#38bdf8", "#fb923c"];

const BookingSlots: React.FC = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const stylistId = Array.isArray(id) ? id[0] : id;

  const stylists = useSelector((state: RootState) =>
    Object.values(state.stylists.stylists)
  );

  const stylist = useMemo(() => {
    return stylists.find((s: any) => s.id === stylistId);
  }, [stylists, stylistId]);

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
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Profile header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: stylist.avatarURL || `https://i.pravatar.cc/100?u=${stylist.id}` }}
            style={styles.profileImage}
          />
          <View style={styles.profileRight}>
            <Text style={styles.profileName}>{displayName}</Text>
            <Text style={styles.superhost}>🌟 Top Rated Stylist</Text>
            <View style={styles.profileStats}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{stylist.ratings.length}</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{stylist.average_rating.toFixed(2)}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>2</Text>
                <Text style={styles.statLabel}>Years</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Services */}
        <View style={styles.serviceGrid}>
          {Object.entries(stylist.pricing).map(([service, price], index) => (
            <View
              key={service}
              style={[
                styles.serviceCard,
                { backgroundColor: serviceColors[index % serviceColors.length] },
              ]}
            >
              <Text style={styles.serviceText}>{service}</Text>
              <Text style={styles.priceText}>${price}</Text>
            </View>
          ))}
        </View>

        {/* Calendar + Book Button */}
        <View style={styles.content}>
          <CalendarDataPicker />

          <TouchableOpacity style={styles.bookButton} onPress={() => console.log("Booking slot...")}>
            <Text style={styles.bookText}>Book Slot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BookingSlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
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
    color: "#ff6347",
    fontWeight: "500",
    marginBottom: 10,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
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
  serviceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  serviceCard: {
    width: "48%",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  serviceText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  priceText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  bookButton: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  bookText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#ff6347",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "500",
  },
  notFoundText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
