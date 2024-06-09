import { Link, Tabs } from 'expo-router';
import React, { useState, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Pressable, SafeAreaView, View } from 'react-native';
import ModalPopup from '@/components/ModalPopup'
import Avatar from '@/components/Avatar'
import { VeeContext } from '@/components/Veecontext';
export default function TabLayout() {
  const {
    authenticated, setAuthenticated, checkAuth
  } = useContext(VeeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const colorScheme = useColorScheme();
  const tabhead = () => {
   
  
    const handleLogout = async () => {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('userdata_token');
      setAuthenticated(false);
    };

    
    return {
      headerLeft: () => (
      
          <Pressable>
            {({ pressed }) => <Avatar />}
          </Pressable>
 
      ),
      headerRight: () => (
    
          <Pressable onPress={handleLogout}>
            {({ pressed }) => (
              <SimpleLineIcons
                name="logout"
                size={18}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
   
      ),
      headerStyle: {
        borderBottomWidth: 1, // Border bottom width
        borderBottomColor: '#1f1f1f1d', // Border bottom color
      },
    };
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {modalVisible && (<ModalPopup visible={modalVisible} onClose={toggleModal} />)}
            
    <Tabs
    initialRouteName='analytics'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarStyle: {
          height: 72,
    
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10, // Adjust the padding as needed
        },
      }}>
    
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          headerShadowVisible:true,
         headerTintColor:'red',
          tabBarIcon: ({ color, focused }) => (
            <>
            {/* <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} /> */}
            <MaterialCommunityIcons color={color} name={focused ? 'pentagon' : 'pentagon-outline'}  size={25} />
            </>
       
          )          ,
          ...tabhead()
        }}
      />

<Tabs.Screen
        name="product"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <>
            {/* <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} /> */}
            <MaterialCommunityIcons color={color} name={focused ? 'file-document' : 'file-document-outline'}  size={25}  />
            </>
       
          )
          ,
          ...tabhead()
        }}
      />

<Tabs.Screen
        name="explore"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <View style={{paddingHorizontal: 10, paddingVertical: 10, alignItems:'center', borderRadius: 10, justifyContent: 'center', backgroundColor: '#F3F3F3'}}>
              <MaterialCommunityIcons color={color} name={focused ? 'qrcode' : 'qrcode-scan'} size={25} style={{ marginTop: -3 }} />
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            toggleModal();
          },
        }}
      />

<Tabs.Screen
        name="analytics"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            <MaterialCommunityIcons color={color} name={focused ? 'chart-donut-variant' : 'chart-donut'}  size={25}  />
          ),
          ...tabhead()
        }}
      />

<Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            <MaterialCommunityIcons color={color} name={focused ? 'account' : 'account-outline'}  size={25}  />
          ),
          ...tabhead()
        }}
      />
    </Tabs>
    </SafeAreaView>
  );
}
