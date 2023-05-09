import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import styles from './style';

class LoginUser extends Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // faça alguma ação com a resposta
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
        <View>
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                />
                <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                />
                <Button
                title="Login"
                onPress={this.handleLogin}
                />
                <br></br>
                <View>
                    <Button
                    title="Voltar"
                    onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
                <p>Não possui cadastro? Clique aqui!</p>
            </View>
        </View>
    );
  }
}

export default LoginUser;