import * as React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

// Store
import {useSessionStore} from '../zustand/store';

import Modal from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Feather from 'react-native-vector-icons/Feather';

const StopSessionButton = ({style}) => {
  const shouldSessionRun = useSessionStore(state => state.shouldSessionRun);

  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={[style, styles.container]}>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}>
        <Feather style={styles.icon} name="x" />
      </Pressable>

      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.4}
        deviceHeight={hp(100)}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
        deviceWidth={wp(100)}>
        <View style={styles.modalView}>
          <Text style={styles.modalHeader}>Are you sure?</Text>
          <Text style={styles.modalSubHeader}>
            Session will still be counted.
          </Text>

          <View style={styles.modalButtonContainer}>
            <Pressable
              onPress={() => shouldSessionRun('', false)}
              style={[styles.modalButton, {backgroundColor: '#CA2121'}]}>
              <Text style={[styles.modalButtonText, {color: '#FFFFFF'}]}>
                End Session
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={[styles.modalButton]}>
              <Text style={[styles.modalButtonText, {color: '#CA2121'}]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  modalView: {
    backgroundColor: '#FFFFFF',
    height: hp(30),
    width: wp(70),
    alignSelf: 'center',
    borderRadius: 3,
  },
  modalHeader: {
    fontFamily: 'Lato-Bold',
    fontSize: wp(7),
    width: wp(50),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: hp(4),
  },
  modalSubHeader: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    marginTop: hp(2),
    fontSize: wp(4.5),
  },
  modalButton: {
    width: wp(65),
    alignSelf: 'center',
    height: hp(6),
    justifyContent: 'center',
    borderRadius: 6,
  },
  modalButtonText: {
    fontFamily: 'NunitoSans-Bold',
    textAlign: 'center',
    fontSize: wp(5.5),
  },
  modalButtonContainer: {
    marginTop: 'auto',
  },
  icon: {
    fontSize: 40,
    color: '#FFFFFF',
  },
});

export default StopSessionButton;
