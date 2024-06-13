import { Dimensions, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState, useContext, useEffect } from 'react'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { VeeContext } from '@/components/Veecontext';
import { Redirect, router } from 'expo-router';
import ShimmerEffect from './ShimmerEffect';
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import * as SecureStore from 'expo-secure-store';
const Dashlayout = ({children}) => {
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [refreshing, setRefreshing] = useState(false);
  const colorScheme = useColorScheme();
  const loaddata = ['Item 1', 'Item 2', 'Item 3'];
  const {fetchVisitors, fetchQrCode, fetchEmployeeData, fetchCompanySetup,
    authenticated, setAuthenticated, checkAuth, isauth
  } = useContext(VeeContext);
 
  // useEffect(() => {


  //   checkAuth();
  // }, []);
  

  useEffect(() => {
    const navigateIfAuthenticated = async () => {
      const myAuthStatus = await checkAuth();
      console.log('myAuthStatus is', myAuthStatus);
      if (!myAuthStatus) {
        router.replace('onboarding');
      } 
      else if(myAuthStatus && !isauth){
        router.replace('(auth)/welcomeback');
      }
    };

    navigateIfAuthenticated();
  }, [router, isauth]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchEmployeeData();
    fetchQrCode();
    fetchVisitors();
    fetchCompanySetup();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  if (authenticated === null) {
    // Render a loading indicator or nothing while checking authentication
    return null;
  }

  if (!authenticated) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <ThemedView style={styles.mylayout} lightColor="#f8f8f8" darkColor="#000" >

      <SafeAreaView>
          <ScrollView 
          showsVerticalScrollIndicator={false} 
          showsHorizontalScrollIndicator={false} 
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#E57F06"]} // Use your primary color for the refresh indicator
              tintColor={"#E57F06"} // iOS fallback color
              progressBackgroundColor="#ffffff" // Background color on Android
            />
          }
          >
            <View style={styles.scrollgap}>
  {
    isauth ? (
      <>
       {children} 
      </>
     
      ) : 
    
    ( 
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

    )

     
  }
    

      </View>
      </ScrollView>
      </SafeAreaView>
      </ThemedView>

  )
}

export default Dashlayout

const styles = StyleSheet.create({
    mylayout:{

        paddingHorizontal: 15,
        flex: 1,
        
          },
          titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            fontFamily: 'OutfitRegular'
          },
          nofont:{
            // fontFamily: 'OutfitMid',
            fontSize: 17
          },
          stepContainer: {
            gap: 8,
            marginBottom: 8,
          },
          icon:{
            backgroundColor: 'transparent',
          paddingVertical: 15,
          paddingHorizontal: 14,
          borderWidth: 1,
          borderRadius: 9,
          alignItems: 'center',
          justifyContent:'center',
          textAlign: 'center'
        
        },
          scrollgap:{
            gap: 10,
        flexDirection:'column',
            paddingBottom: 40,
        
              },
              fd:{
                justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end'
        
              },
              newbtn:{
        backgroundColor: '#6a1039',
        color: 'white',
        padding: 7,
        borderRadius: 4,
        
              },
              gtext:{
                textAlign:'start',
                fontSize: 16,
                fontFamily: 'OutfitRegular'
           
              },
              small:{
                fontSize: 12,
                fontFamily: 'OutfitLight'
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
        
})