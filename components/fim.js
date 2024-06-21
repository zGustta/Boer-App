import { Button, Text } from 'react-native';
import { StyleSheet, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/logo.jpg')}
      />
      <Text style={styles.text}>
       Quer se tornar um de nós.
        {"\n"}
       Cadastre sua loja
        {"\n"}
        e faça parte da nossa equipe de vendas.
        {"\n"}
        Entre em contato:
        {"\n"}
        17 9999-9999
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'fff0f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 210,
    height: 110,
    paddingTop: 10,
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
});
