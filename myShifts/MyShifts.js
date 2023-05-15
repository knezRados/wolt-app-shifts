import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { bookedShifts, fetchShifts } from "../maintenance/shiftFetch";
import { useEffect, useState } from "react";

const MyShifts = () => {
  const [shifts, setShifts] = useState([]);
  useEffect(() => {
    bookedShifts(setShifts);
  }, []);
  return (
    <View style={styles.shiftsContainer}>
      <StatusBar style="dark" />
      <FlatList
        style={styles.fullSizeView}
        data={shifts}
        renderItem={({ item }) => {
          return (
            <View>
              <View style={styles.dayHeader}>
                <Text style={styles.dayTitle}>{item.displayDate}</Text>
                <Text style={styles.shiftText}>
                  {item.shifts.length} {item.shifts.length > 1 ? "shifts" : "shift"}, {item.dailyShiftsLength} hours
                </Text>
              </View>
              <FlatList
                data={item.shifts}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.singleShiftView}>
                      <View>
                        <Text style={styles.shiftTime}>{item.startTime}-{item.endTime}</Text>
                        <Text style={styles.shiftCity}>{item.city}</Text>
                      </View>
                      <TouchableOpacity style={styles.shiftButton}>
                        <Text style={styles.shiftButtonText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dayHeader: {
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#CBD2E1",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  dayTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4F6C92",
  },
  shiftsContainer: {
    marginTop: 50,
    flex: 1,
  },
  shiftText: {
    color: "#4F6C92",
    fontSize: 18,
    marginLeft: 20,
  },
  singleShiftView: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#adbbd9",
    borderBottomWidth: 1,
  },
  shiftTime: {
    fontSize: 18,
    color: "#4F6C92",
    fontWeight: "bold",
  },
  shiftCity: {
    fontSize: 15,
    color: "#A4B8D3",
    fontWeight: "bold",
  },
  shiftButton: {
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#adbbd9",
  },
  shiftButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#adbbd9",
  },
  fullSizeView: {
    height: "100%",
    width: "100%",
  },
});

export default MyShifts;
