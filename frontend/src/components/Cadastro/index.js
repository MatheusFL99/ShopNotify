import React, { Component } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import styles from './style';

class RegisterUser extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  handleRegister = () => {
    fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword
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
                placeholder="Nome"
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                />
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
                <TextInput
                style={styles.input}
                placeholder="Confirmar senha"
                secureTextEntry={true}
                onChangeText={(confirmpassword) => this.setState({confirmpassword})}
                value={this.state.confirmpassword}
                />
                <Button
                title="Registrar"
                onPress={this.handleRegister}
                />
                <br></br>
                <View>
                    <Button
                    title="Voltar"
                    onPress={() => this.props.navigation.navigate('Login')}
                    />
                </View>
                <p>Já possui cadastro? Clique aqui!</p>
            </View>
        </View>
    );
  }
}

export default RegisterUser;