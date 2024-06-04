import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AntDesign } from '@expo/vector-icons';

const Dashboardcard = ({data}) => {
    const { width, height } = Dimensions.get('window');
    const newWidth = width / 1.9;
    const newHeight = height / 2;

  return (
    <ScrollView horizontal contentContainerStyle={styles.contentContainer}
    showsHorizontalScrollIndicator={false}
    >

{data.map((item, index) => (
<ThemedView key={index} style={{padding:10, gap: 7, flexDirection:'column', justifyContent:'space-between', alignItems:'start',  width: newWidth, borderColor:'#1f1f1f1d', borderWidth:1, borderRadius: 4} } lightColor="#fff" darkColor="#111111">
<ThemedView style={styles.icon} lightColor='#f3f3f3' darkColor='#666'>
<AntDesign name={item.icon} size={20}  color={'#000'} />
</ThemedView>

<ThemedView darkColor='transparent'>
<ThemedText style={styles.toptext} lightColor='#000000e0' darkColor='#ffffff99'>{item.name || 'No Name'}</ThemedText>
<ThemedText style={styles.value} lightColor='#000000e0'>23</ThemedText>
</ThemedView>

</ThemedView>
    ))}
</ScrollView>
  )
}

export default Dashboardcard

const styles = StyleSheet.create({
    contentContainer:{
        gap: 20,
        paddingVertical: 20
          },value:{
            fontSize: 17
          },
          toptext:{
fontFamily: 'NunitoSansRegular'
          },
          icon:{
            padding: 7,
            width: '20%',
            borderRadius:10,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
          }
})