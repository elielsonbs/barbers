import React, { useState, useContext } from 'react';
import {
  Container, InputArea, CustomButton,
  CustonButttonText, SignMessageButton,
  SignMessageText, SignMessageTextBold
} from './style';
import { Text } from 'react-native';
import BarberLogo from '../../assets/barber.svg';
import SignInput from '../../components/SignInput';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';
import { useNavigation } from '@react-navigation/native';
import Api from '../../Api';
import AsyncStorage from '@react-native-community/async-storage';
import { UserContext } from '../../contexts/UserContext';

export default () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();
  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [nameField, setNameField] = useState('');

  const handleSignClick = async () => {
    if (emailField != '' && passwordField != '' && nameField != '') {
      let json = await Api.signUp(nameField, emailField, passwordField);

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
        alert("Erro: " + res.error);
      }
    } else {
      alert('Preencha os campos!');
    }
  }

  const handleMessageButtonClick = () => {
    navigation.reset({
      routes: [{ name: 'SignIn' }]
    });
  }

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={PersonIcon}
          placeholder="Digite o seu nome"
          value={nameField}
          onChangeText={(t) => setNameField(t)}
        />

        <SignInput
          IconSvg={EmailIcon}
          placeholder="Digite o seu e-mail"
          value={emailField}
          onChangeText={(t) => setEmailField(t)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeholder="Digite a sua senha"
          value={passwordField}
          onChangeText={(t) => setPasswordField(t)}
          password={true}
        />

        <CustomButton onPress={handleSignClick}>
          <CustonButttonText>CADASTRAR</CustonButttonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageText>Já possui uma conta?</SignMessageText>
        <SignMessageTextBold>Faça Login</SignMessageTextBold>
      </SignMessageButton>
    </Container>
  )
}