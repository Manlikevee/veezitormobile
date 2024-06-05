import { Link, Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons, SimpleLineIcons } from '@expo/vector-icons';
import { Pressable, SafeAreaView, View } from 'react-native';
import Avatar from '@/components/Avatar'

export default function TabLayout() {



  const colorScheme = useColorScheme();
  const tabhead = () => {
   
  


    
    return {
      headerLeft: () => (
        <Link href="/onboarding" asChild>
          <Pressable>
            {({ pressed }) => <Avatar />}
          </Pressable>
        </Link>
      ),
      headerRight: () => (
        <Link href="/(auth)/login" asChild>
          <Pressable>
            {({ pressed }) => (
              <SimpleLineIcons
                name="logout"
                size={18}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </Link>
      ),
      headerStyle: {
        borderBottomWidth: 1, // Border bottom width
        borderBottomColor: '#1f1f1f1d', // Border bottom color
      },
    };
  };
  return (
    <SafeAreaView style={{flex: 1}}>
    <Tabs
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
            // <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            <View style={{paddingHorizontal: 10, paddingVertical:10, alignItems:'center', borderRadius:10, justifyContent:'center', backgroundColor:'#F3F3F3'}}>
         <MaterialCommunityIcons color={color} name={focused ? 'qrcode' : 'qrcode-scan'}  size={25}  style={{marginTop: -3}} />
            </View>
   
          ),
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
