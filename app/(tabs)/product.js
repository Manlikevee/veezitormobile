import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { ThemedView } from '../../components/ThemedView'
import { ThemedText } from '../../components/ThemedText'
import { Colors } from "@/constants/Colors";
import Dashboardlayout from "@/components/Dashlayout";
import { useColorScheme } from "@/hooks/useColorScheme";
import { VeeContext } from "@/components/Veecontext";
import ShimmerEffect from "@/components/ShimmerEffect";
import { Ionicons } from '@expo/vector-icons';
import Employeetable from '../../components/Employeetable';
const product = () => {
  const colorScheme = useColorScheme();
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const loaddata = ['Item 1', 'Item 2', 'Item 3', , 'Item 4'];
  const {
    employeedataloaded,
    employee
  } = useContext(VeeContext);
  return (
    <Dashboardlayout>
      <ThemedView style={styles.myqr}  />
<ThemedText style={styles.sectiontitle}>Employee's</ThemedText>
<TouchableOpacity style={styles.sectionbtn} >
  <ThemedText lightColor='white' style={styles.sectionbtntext}> <Ionicons name="qr-code-outline" size={15} color="white" /> New Employee</ThemedText>
</TouchableOpacity>


{employeedataloaded ? (
  <Employeetable data={employee}/>
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


    </Dashboardlayout>

  )
}

export default product

const styles = StyleSheet.create({
  myqr:{
    marginTop:10,
  },
  sectiontitle:{
fontFamily: 'SpaceGroteskMedium',
fontSize: 19
  },
  sectionbtn:{
backgroundColor:'#6a1039',
padding:10,
flexDirection:'row',
alignItems:'center',
gap:3,
justifyContent:'center',
flexShrink: 1,
marginBottom:10,
alignSelf: 'flex-start', // Ensures the container fits its content
borderRadius:5
  },
  sectionbtntext:{
    fontFamily: 'SpaceGroteskMedium',
    fontSize: 14,

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
  fontFamily: 'SpaceGroteskMedium',
  },
  small: {
    fontSize: 12,
    fontFamily: "OutfitLight",
  },
})