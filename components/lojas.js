import React, { useState, useEffect, useRef } from "react";
import ListProd from "../components/lojaslist";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import { TextInput } from "react-native-paper";
import firebase from "../services/connectionFirebase";

// Importações aqui

const Separator = () => {
  return <View style={styles.separator} />;
};

export default function Lojas() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState("");
    const inputNameRef = useRef(null);
    const inputBrandRef = useRef(null);
    const inputTypeRef = useRef(null);
    const inputPriceRef = useRef(null);
    
  useEffect(() => {
    async function search() {
      await firebase
        .database()
        .ref("lojas")
        .on("value", (snapshot) => {
          const productList = [];
  
          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
              cidade: childItem.val().cidade,
              estado: childItem.val().estado,
              seguimento: childItem.val().seguimento,
            };
            productList.unshift(data); // Adiciona novos itens na frente da lista
          });
          setProducts(productList);
          setLoading(false);
        });
    }
    search();
  }, []);

  async function insertUpdate() {
    if (name !== "" && brand !== "" && type !== "" && price !== "") {
      if (!isValidEmail(type)) {
        alert("Por favor, insira um e-mail válido.");
        return;
      }
      if (!isValidCNPJ(price)) {
        alert("Por favor, insira um CNPJ válido.");
        return;
      }
      
      if (key !== "") {
        await firebase.database().ref("lojas").child(key).update({
          nome: name,
          cidade: brand,
          estado: type,
          seguimento: price,
        });
      } else {
        let keyprod = firebase.database().ref("lojas").push().key;
        await firebase.database().ref("lojas").child(keyprod).set({
          nome: name,
          cidade: brand,
          estado: type,
          seguimento: price,
        });
      }
  
      Keyboard.dismiss();
      alert("Loja Salva!");
      clearData();
      setKey("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }
  
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  
  function isValidCNPJ(cnpj) {
    return /^\d{14}$/.test(cnpj);
  }

  function clearData() {
    setName("");
    setBrand("");
    setPrice("");
    setType("");
  }

  function handleDelete(key) {
    const isConfirmed = confirm('Tem certeza que deseja excluir esta loja?');
    if (isConfirmed) {
        firebase.database().ref('lojas').child(key).remove()
            .then(() => {
                const findProducts = products.filter(item => item.key !== key)
                setProducts(findProducts)
            })
    }
}

function handleEdit(data) {
    const isConfirmed = confirm('Tem certeza que deseja editar esta loja?');
    if (isConfirmed) {
        setKey(data.key),
            setName(data.nome),
            setBrand(data.cidade),
            setType(data.estado),
            setPrice(data.seguimento)
        }
    }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome da Loja"
        left={<TextInput.Icon icon="home-heart" />}
        maxLength={40}
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        ref={inputNameRef}
      />

      <Separator />

      <TextInput
        placeholder="Endereço"
        left={<TextInput.Icon icon="map-marker" />}
        style={styles.input}
        onChangeText={(text) => setBrand(text)}
        value={brand}
        ref={inputBrandRef}
      />

      <Separator />

      <TextInput
        placeholder="e-mail"
        left={<TextInput.Icon icon="star" />}
        style={styles.input}
        onChangeText={(text) => setType(text)}
        value={type}
        ref={inputTypeRef}
      />

      <Separator />

      <TextInput
        placeholder="CNPJ"
        left={<TextInput.Icon icon="tag" />}
        style={styles.input}
        onChangeText={(text) => setPrice(text)}
        value={price}
        ref={inputPriceRef}
      />

      <Separator />

      <TouchableOpacity
        onPress={insertUpdate}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonTextStyle}>Salvar</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.listar}>Listagem de Lojas Cadastradas</Text>
      </View>

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
        keyExtractor={(item, index) => item.key || index.toString()}
        data={products}
        renderItem={({ item }) => (
          <ListProd
            data={item}
            deleteItem={() => handleDelete(item.key)} 
            editItem={() => handleEdit(item)} 
          />
        )}
      />
      
      
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#121212",
    height: 40,
    fontSize: 13,
    borderRadius: 8,
  },
  separator: {
    marginVertical: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#808080",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 5,
  },
  buttonTextStyle: {
    color: "000",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  listar: {
    fontSize: 20,
    textAlign: "center",
  },
});
