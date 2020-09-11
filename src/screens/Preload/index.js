import React, { useEffect, useContext } from 'react';
import { Container, LoadIcon } from './style';
import BarberLogo from '../../assets/barber.svg';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import { UserContext } from '../../contexts/UserContext';

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        let json = await Api.checkToken(token);

        if (json.token) {
          await AsyncStorage.setItem('token', json.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: json.data.avatar
            }
          });

          navigation.reset({
            routes: [{ name: 'MainTab' }]
          });
        } else {
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    }
    checkToken();
  }, [])
  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadIcon size="large" color="#FFFFFF" />
    </Container>
  )
}