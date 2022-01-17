import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";

export function SettingsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch(
        "https://api.sampleapis.com/presidents/presidents"
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  function handleSettingsPress() {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.screen}>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList horizontal={true}
          
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.itemWrapper}>
                <View style={styles.item}>
                  <View style={styles.image}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: `${item.photo}`,
                      }}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text style={styles.text}>ORDINAL: {item.ordinal}</Text>
                    <Text style={styles.text}>NAME: {item.name}</Text>
                    <Text style={styles.text}>YEARS IN OFFICE: {item.yearsInOffice}</Text>
                    <Text style={styles.text}>VICE PRESIDENTS: {item.vicePresidents}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.textCon}>
        <Text style={styles.text2} >
          THAT WAS MY TED TALK
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    margin: 10,
    borderWidth: 2,
    borderColor:"white",
    borderRadius: 10,
  },
  text: {
    padding: 5,
    color:"white",
  },
  text2: {
    fontSize: 80,
    padding: 15,
    color:"red",
    textAlign: "center",
  },
  textCon: {

  alignItems:"center",
  },
});
