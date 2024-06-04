import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Dashboardcard from "@/components/Dashboardcard";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import Dashboardlayout from "@/components/Dashlayout";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { VeeContext } from "@/components/Veecontext";
import { Redirect } from "expo-router";
import SegmentedControl from "@/components/segmented-control/SegmentedControl";
import Visitortable from "@/components/Visitortable";
import bg from "../../assets/images/Head.png";
import ShimmerEffect from "@/components/ShimmerEffect";
export default function HomeScreen() {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const options = ["Pending", "Awaiting", "Inprogress"];
  const data = [
    {
      icon: "adduser",
      number: 0,
      name: "Pending Approval",
    },
    {
      icon: "hourglass",
      number: 0,
      name: "Awaiting Confirmation",
    },
    {
      icon: "calendar",
      number: 0,
      name: "Reshedules",
    },
  ];
  const [selectedOption, setSelectedOption] = useState("Awaiting");
  const colorScheme = useColorScheme();
  const loaddata = ['Item 1', 'Item 2', 'Item 3'];
  const {
    visitordataloaded,
    isOpen,
    test,
    setTest,
    loadingaccept,
    username,
    fetchvisitors,
    acceptvisitor,
    visitors,
    awaiting,
    pendingApproval,
    reshedule,
    inProgress,
    employeedataloaded,
    toggleVisitorBar,
    visitationdata,
    timeAgo
  } = useContext(VeeContext);

  return (
    <Dashboardlayout>
      <View style={styles.scrollgap}>
        <ImageBackground
          source={bg}
          style={{
            backgroundColor: "red",
            minHeight: 110,
            marginTop: 20,
            paddingHorizontal: 10,
            borderRadius: 14,
            gap: 7,
            justifyContent: "center",
          }}
        >
          <View style={styles.fd} lightColor="#fbfcfd" darkColor="#000">
            <View>
              <ThemedText
                style={styles.gtext}
                lightColor="#fff"
                darkColor="#ccc"
              >
                {" "}
                Welcome back, {username}
              </ThemedText>
              <ThemedText
                style={styles.small}
                lightColor="#fff"
                darkColor="#ccc"
              >
                {" "}
                Here is what we have for you today{" "}
              </ThemedText>
            </View>
            <View>
              <Pressable style={styles.newbtn}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "OutfitLight",
                  }}
                >
                  {" "}
                  Add Visitor{" "}
                </Text>
              </Pressable>
            </View>
          </View>
        </ImageBackground>

        <Dashboardcard data={data} />

        <SegmentedControl
          options={options}
          selectedOption={selectedOption}
          onOptionPress={setSelectedOption}
        />

        <ThemedView
          style={styles.mybox}
          lightColor="transparent"
          darkColor="transparent"
        >
          {visitordataloaded ? (
            <>
              {selectedOption == "Awaiting" && (
                <Visitortable
                timeAgo={timeAgo}
                  data={awaiting}
                  toggleVisitorBar={toggleVisitorBar}
                  visitationdata={visitationdata}
                  loadingaccept={loadingaccept}
                />
              )}
              {selectedOption == "Inprogress" && (
                <Visitortable
                timeAgo={timeAgo}
                  data={inProgress}
                  toggleVisitorBar={toggleVisitorBar}
                  visitationdata={visitationdata}
                  loadingaccept={loadingaccept}
                />
              )}
              {selectedOption == "Pending" && (
                <Visitortable
                timeAgo={timeAgo}
                  data={pendingApproval}
                  toggleVisitorBar={toggleVisitorBar}
                  visitationdata={visitationdata}
                  loadingaccept={loadingaccept}
                />
              )}
            </>
          ) : (
            <>
            {loaddata.map(ld => ( 
            <ThemedView key={ld}  darkColor="#111111"
                        style={[
                            {
                              borderColor: Colors[colorScheme ?? "light"].cardborderColor,
                            },
                            styles.mbx,
                          ]} >
                <ThemedView darkColor="transparent">
                  <ShimmerEffect
                    width={39}
                    height={30}
                    style={{
                      flexDirection: "row",
                      alignSelf: "flex-start",
                      height: 39,
                      width: 39,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                    }}
                  />
                </ThemedView>
                <ThemedView
                  darkColor="#111111"
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <ShimmerEffect
                    width={SCREEN_WIDTH / 3.2}
                    height={20}
                    style={styles.shimmer}
                  />
                  <ShimmerEffect
                    width={SCREEN_WIDTH / 3}
                    height={20}
                    style={styles.shimmer}
                  />
                </ThemedView>
                <ThemedView
                  darkColor="#111111"
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <ShimmerEffect
                    width={SCREEN_WIDTH / 4}
                    height={20}
                    style={styles.shimmer}
                  />
                  <ShimmerEffect
                    width={SCREEN_WIDTH / 3}
                    height={20}
                    style={styles.shimmer}
                  />
                </ThemedView>
                <ThemedView
                  darkColor="#111111"
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <ShimmerEffect
                    width={SCREEN_WIDTH / 4}
                    height={20}
                    style={styles.shimmer}
                  />
                  <ShimmerEffect
                    width={SCREEN_WIDTH / 3}
                    height={20}
                    style={styles.shimmer}
                  />
                </ThemedView>
              </ThemedView>))}



            </>
          )}
        </ThemedView>
      </View>
    </Dashboardlayout>
  );
}

const styles = StyleSheet.create({
  mylayout: {
    paddingHorizontal: 15,
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    fontFamily: "OutfitRegular",
  },
  nofont: {
    // fontFamily: 'OutfitMid',
    fontSize: 17,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  mbx:{
    padding: 11,
    borderWidth: 1,
    gap: 3,
    paddingVertical: 17,
    borderRadius: 10,
    marginTop:15
        },
  icon: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  scrollgap: {
    gap: 10,
    flexDirection: "column",
    paddingBottom: 40,
  },
  fd: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  newbtn: {
    backgroundColor: "#6a1039",
    color: "white",
    padding: 7,
    borderRadius: 4,
  },
  gtext: {
    textAlign: "start",
    fontSize: 18,
    fontFamily: "OutfitRegular",
  },
  small: {
    fontSize: 12,
    fontFamily: "OutfitLight",
  },
});
