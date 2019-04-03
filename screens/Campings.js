import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { MapView } from "expo";
import { Ionicons, FontAwesome, SimpleLineIcons } from "@expo/vector-icons";

import { MonoText } from "../components/StyledText";

const { height, width } = Dimensions.get("screen");

export default class Campings extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    active: "all"
  };

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View style={styles.settings}>
              <View style={styles.location}>
                <FontAwesome name="location-arrow" size={14} color="white" />
              </View>
            </View>
            <View style={styles.options}>
              <Text style={{ fontSize: 12, color: "#A5A5A5", marginBottom: 5 }}>
                Detected Location
              </Text>
              <Text style={{ fontSize: 14, fontWeight: "300" }}>
                Northern Island
              </Text>
            </View>
          </View>
          <View style={styles.settings}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Settings")}
            >
              <Ionicons name="ios-settings" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderTabs()}
      </View>
    );
  }

  renderMap() {
    return (
      <View style={styles.map}>
        <MapView
          style={{ flex: 1, height: height * 0.5, width }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      </View>
    );
  }

  renderTabs() {
    const { active } = this.state;

    return (
      <View style={styles.tabs}>
        <View style={[styles.tab, active === "all" ? styles.tabActive : null]}>
          <Text
            onPress={() => this.setState({ active: "all" })}
            style={[
              styles.tabTitle,
              active === "all" ? styles.tabActiveTitle : null
            ]}
          >
            All Spots
          </Text>
        </View>
        <View style={[styles.tab, active === "tent" ? styles.tabActive : null]}>
          <Text
            onPress={() => this.setState({ active: "tent" })}
            style={[
              styles.tabTitle,
              active === "tent" ? styles.tabActiveTitle : null
            ]}
          >
            Tenting
          </Text>
        </View>
        <View style={[styles.tab, active === "rv" ? styles.tabActive : null]}>
          <Text
            onPress={() => this.setState({ active: "rv" })}
            style={[
              styles.tabTitle,
              active === "rv" ? styles.tabActiveTitle : null
            ]}
          >
            RV Camping
          </Text>
        </View>
      </View>
    );
  }

  renderList() {
    const campings = [
      {
        id: 1,
        name: "Camping Paradise",
        description: "Popular spot for local trekkers.",
        rating: 4.9,
        distance: 2.0,
        price: "Free",
        image:
          "https://images.unsplash.com/photo-1525811902-f2342640856e?fit=crop&w=900&h=600&q=130"
      },
      {
        id: 2,
        name: "Lake Florida",
        description: "This is for all sunset lovers.",
        rating: 4.9,
        distance: 2.9,
        price: "Free",
        image:
          "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?fit=crop&w=900&h=600&q=130"
      }
    ];

    return campings.map(camping => (
      <View key={camping.id} style={styles.camping}>
        <ImageBackground
          imageStyle={styles.campingImage}
          source={{ uri: camping.image }}
          style={styles.campingImage}
        />
        <View style={styles.campingDetails}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              {camping.name}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#A5A5A5",
                paddingTop: 5
              }}
            >
              {camping.description}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.campingInfo}>
              <FontAwesome name="star" color="#FFBA5A" size={12} />
              <Text style={{ color: "#FFBA5A", marginLeft: 4 }}>
                {camping.rating}
              </Text>
            </View>
            <View style={styles.campingInfo}>
              <FontAwesome name="location-arrow" color="#FF7657" size={12} />
              <Text style={{ color: "#FF7657", marginLeft: 4 }}>{`${
                camping.distance
              } miles`}</Text>
            </View>
            <View style={styles.campingInfo}>
              <Ionicons name="md-pricetag" color="black" size={12} />
              <Text style={{ color: "black", marginLeft: 4 }}>
                {camping.price}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.2, justifyContent: "center" }}>
          <SimpleLineIcons name="options-vertical" color="#A5A5A5" size={24} />
        </View>
      </View>
    ));
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>
          {this.renderMap()}
          {this.renderList()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  camping: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#A5A5A5",
    borderBottomWidth: 0.5,
    padding: 20
  },
  campingDetails: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 20
  },
  campingImage: {
    borderRadius: 6,
    height: width * 0.25,
    width: width * 0.3
  },
  campingInfo: {
    alignItems: "center",
    flexDirection: "row",
    marginRight: 14
  },
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: height * 0.15,
    justifyContent: "center",
    paddingHorizontal: 14
  },
  headerContainer: {
    height: height * 0.15,
    width
  },
  location: {
    alignItems: "center",
    backgroundColor: "#FF7657",
    borderRadius: 14,
    height: 24,
    justifyContent: "center",
    width: 24
  },
  map: {
    flex: 1
  },
  options: {
    flex: 1,
    paddingHorizontal: 14
  },
  settings: {
    alignItems: "center",
    justifyContent: "center"
  },
  tab: {
    borderBottomColor: "transparent",
    borderBottomWidth: 2,
    marginHorizontal: 10,
    paddingHorizontal: 14
  },
  tabs: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  tabActive: {
    borderBottomColor: "#FF7657",
    borderBottomWidth: 2
  },
  tabActiveTitle: {
    color: "#FF7657"
  },
  tabTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10
  }
});
