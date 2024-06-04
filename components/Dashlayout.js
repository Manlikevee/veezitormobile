import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState, useContext } from 'react'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { VeeContext } from '@/components/Veecontext';
const Dashlayout = ({children}) => {
  const [refreshing, setRefreshing] = useState(false);
  
  const {fetchVisitors} = useContext(VeeContext);
  
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchVisitors();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
  
    {children}

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
              }
        
})