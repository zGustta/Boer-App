import React, { useState, useEffect, useRef } from "react";
import ListProd from "../components/productslist";

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

export default function ProductsManager() {
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
        .ref("products")
        .on("value", (snapshot) => {
          const productList = [];

          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              name: childItem.val().name,
              brand: childItem.val().brand,
              type: childItem.val().type,
              price: childItem.val().price,
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
    if (name !== "" && brand !== "" && price !== "" && type !== "") {
      if (key !== "") {
        await firebase.database().ref("products").child(key).update({
          name: name,
          brand: brand,
          type: type,
          price: price,
        });
      } else {
        let keyprod = firebase.database().ref("products").push().key;
        await firebase.database().ref("products").child(keyprod).set({
          name: name,
          brand: brand,
          price: price,
          type: type,
        });
      }

      Keyboard.dismiss();
      alert("Produto Salvo!");
      clearData();
      setKey("");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  function clearData() {
    setName("");
    setBrand("");
    setPrice("");
    setType("");
  }

  function handleDelete(key) {
    const isConfirmed = confirm('Tem certeza que deseja excluir este produto?');
    if (isConfirmed) {
        firebase.database().ref('products').child(key).remove()
            .then(() => {
                const findProducts = products.filter(item => item.key !== key)
                setProducts(findProducts)
            })
    }
}

function handleEdit(data) {
    const isConfirmed = confirm('Tem certeza que deseja editar este produto?');
    if (isConfirmed) {
        setKey(data.key),
            setName(data.name),
            setBrand(data.brand),
            setType(data.type),
            setPrice(data.price)
        }
    }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Produto"
        left={<TextInput.Icon icon="star-circle" />}
        maxLength={40}
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
        ref={inputNameRef}
      />

      <Separator />

      <TextInput
        placeholder="Marca"
        left={<TextInput.Icon icon="sale" />}
        style={styles.input}
        onChangeText={(text) => setBrand(text)}
        value={brand}
        ref={inputBrandRef}
      />

      <Separator />

      <TextInput
        placeholder="Tipo"
        left={<TextInput.Icon icon="salesforce" />}
        style={styles.input}
        onChangeText={(text) => setType(text)}
        value={type}
        ref={inputTypeRef}
      />

      <Separator />

      <TextInput
        placeholder="Preço"
        left={<TextInput.Icon icon="sack" />}
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
        <Text style={styles.listar}>Listagem de Produtos</Text>
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
            deleteItem={() => handleDelete(item.key)} // Correção na passagem da função
            editItem={() => handleEdit(item)} // Correção na passagem da função
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
    color: "##808080",
    fontSize: 20,
    textAlign: "center",
    flex: 1,
  },
  listar: {
    fontSize: 20,
    textAlign: "center",
  },
});