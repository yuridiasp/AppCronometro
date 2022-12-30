import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment/moment";

export default class AppCronometro extends Component {
  
  constructor(props) {
    super(props)
    this.state = {timer: '00:00:00', botao: 'Iniciar Timer'}
    this.interval = null

    this.iniciar = this.iniciar.bind(this)
    this.reiniciar = this.reiniciar.bind(this)
  }

  reiniciar() {
    this.parar()
    let s = this.state

    s.botao = 'Iniciar Timer'
    s.timer = '00:00:00'
    this.setState(s)
  }

  iniciar() {
    let s = this.state
    if (this.interval != null) {
      s.botao = 'Iniciar Timer'
      this.setState(s)
      this.parar()
    } else {
      s.botao = 'Parar Timer'
      this.setState(s)
      this.interval = setInterval(() => {
        let seconds = moment.duration(s.timer).asSeconds() + 1
        s.timer = moment().startOf('day').seconds(seconds).format("HH:mm:ss")
        this.setState(s)
      }, 1000);
    }
  }

  parar() {
    clearInterval(this.interval)
    this.interval = null
  }

  atualizar(texto) {
    let s = this.state
    s.texto = texto

    this.setState(s)
  }

  render() {
    return (
      <View style={styles.view} >
        <Text style={styles.titulo} >App Cronômetro</Text>
        <View style={styles.area} >
          <Image source={require('./images/relogio.png')} />
          <Text style={styles.timer} >{this.state.timer}</Text>
        </View>
        <View style={{flex: 5}}>
        <TouchableOpacity style={styles.botao} onPress={this.iniciar}>
            <View>
              <Text style={styles.texto} >{this.state.botao}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} onPress={this.reiniciar}>
            <View>
              <Text style={styles.texto} >Reiniciar Timer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  titulo: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center"
  },
  area: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  timer: {
    fontSize: 25,
    marginTop: -120,
    color: '#BAA07A'
  },
  botao: {
    color: '#BAA07A',
    borderColor: '#BAA07A',
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    margin: 10
  },
  texto: {
    fontSize: 15,
    color: '#BAA07A',
    fontWeight: "bold",
    textAlign: "center"
  }
})