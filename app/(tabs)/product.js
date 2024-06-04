import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,

} from 'react-native';
import { Colors } from "@/constants/Colors";
import Dashboardlayout from "@/components/Dashlayout";
import { useColorScheme } from "@/hooks/useColorScheme";
import bg from "../../assets/images/avatar.png";
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import FeatherIcon from 'react-native-vector-icons/Feather';
import ShimmerEffect from '@/components/ShimmerEffect';
import { VeeContext } from "@/components/Veecontext";
export default function Example() {
  const colorScheme = useColorScheme();
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const {
    companySetup,
    username
  } = useContext(VeeContext);
  return (
    <ThemedView style={{ flex: 1 }}  lightColor="#f8f8f8" darkColor="#000"  >
      <ThemedView  style={styles.container} lightColor="transparent"
          darkColor="transparent" >


        <ScrollView contentContainerStyle={styles.content}>
          <ThemedView style={[styles.section, { paddingTop: 4 }]} lightColor="transparent"
          darkColor="transparent" >
            <ThemedText style={styles.sectionTitle}>Account</ThemedText>

            <ThemedView style={styles.sectionBody} lightColor="#fbfcfd" darkColor="#000">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.profile}>
     <Image
      alt=""
      source={
        companySetup && companySetup.logo
          ? { uri: companySetup.logo }
          : require('../../assets/images/avatar.png')
      }
      style={styles.profileAvatar}
    />

                <ThemedView style={styles.profileBody} lightColor="transparent"
          darkColor="transparent">
                  <ThemedText style={styles.profileName}>{username}</ThemedText>

                  <ThemedText style={styles.profileHandle}>
                    {companySetup ? (companySetup?.organization_name) : ('sss')}
                  </ThemedText>
                </ThemedView>

                <FeatherIcon
                  color="#bcbcbc"
                  name="chevron-right"
                  size={22} />
              </TouchableOpacity>
            </ThemedView>
         
          </ThemedView>

          <ThemedView style={styles.section} lightColor="transparent"
          darkColor="transparent">
            <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>

            <ThemedView style={styles.sectionBody}
            >
              <ThemedView style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Language</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <ThemedText style={styles.rowValue}>English</ThemedText>

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </ThemedView>

              <ThemedView style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Location</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <ThemedText style={styles.rowValue}>Los Angeles, CA</ThemedText>

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </ThemedView>

              <ThemedView style={styles.rowWrapper}>
                <ThemedView style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Email Notifications</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <Switch
                    onValueChange={emailNotifications =>
                      setForm({ ...form, emailNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.emailNotifications} />
                </ThemedView>
              </ThemedView>

              {/* <ThemedView style={[styles.rowWrapper, styles.rowLast]}>
                <ThemedView style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Whatsapp Notifications</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <Switch
                    onValueChange={pushNotifications =>
                      setForm({ ...form, pushNotifications })
                    }
                    style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }}
                    value={form.pushNotifications} />
                </ThemedView>
              </ThemedView> */}
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section} lightColor="transparent"
          darkColor="transparent">
            <ThemedText style={styles.sectionTitle}>Resources</ThemedText>

            <ThemedView style={styles.sectionBody}>
              <ThemedView style={[styles.rowWrapper, styles.rowFirst]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Contact Us</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </ThemedView>

              <ThemedView style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Report Bug</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </ThemedView>

              <ThemedView style={styles.rowWrapper}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Rate in App Store</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </ThemedView>

              <ThemedView style={[styles.rowWrapper, styles.rowLast]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={styles.rowLabel}>Terms and Privacy</ThemedText>

                  <ThemedView style={styles.rowSpacer} />

                  <FeatherIcon
                    color="#bcbcbc"
                    name="chevron-right"
                    size={19} />
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.section} lightColor="transparent"
          darkColor="transparent">
            <ThemedView style={styles.sectionBody}>
              <ThemedView
                style={[
                  styles.rowWrapper,
                  styles.rowFirst,
                  styles.rowLast,
                  { alignItems: 'center' },
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                  <ThemedText style={[styles.rowLabel, styles.rowLabelLogout]}>
                    Log Out
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          <ThemedText style={styles.contentFooter}>App Version 2.24 #50491</ThemedText>
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,

  },
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
  },
  /** Content */
  content: {
    paddingHorizontal: 16,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 4,
borderWidth: 1,
borderColor:'#1f1f1f1d'
  },
  /** Profile */
  profile: {
    padding: 12,
    // backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 17,

    color: '#292929',
  },
  profileHandle: {
    marginTop: 0,
    fontSize: 15,
    color: '#858585',
  },
  /** Row */
  row: {
    height: 48,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    // backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#1f1f1f1d',
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderTopWidth: 0,

  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    // color: '#000',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
});