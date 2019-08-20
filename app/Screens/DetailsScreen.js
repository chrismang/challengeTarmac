import React from 'react';
import { View, Text, Image, Dimensions, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { withApollo } from 'react-apollo';
import Queries from '../Apollo/Queries';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('screen').width;

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        selectedMember: null,
     };
  }

  componentDidMount() {
    const { client } = this.props;
    client.query({ query: Queries.getSelectedMember }).then(res => this.setState({ selectedMember: res.data.selectedMember }));
  }
  
  goToURL = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      }
    });
  };

  render() {
    const { selectedMember } = this.state;
    if (selectedMember) {
      const { name, role, pic, github, twitter, description } = selectedMember;
      const imageURI = `http://tarmac.io/assets/members/${pic}.png`;
      return (
        <ScrollView style={{ flex:1 }}>
          <View style={styles.cardContainer}>
            <Image style={styles.image} resizeMode={'contain'} source={{ uri: imageURI }} />
            <Text style={styles.name}>{ name }</Text>
            <Text style={styles.role}>{ role }</Text>
            <Text style={styles.description}>{description !== '' ? description : `${name} is a ${role}`}</Text>
            { github && 
              <TouchableOpacity style={{ marginBottom: 5}} onPress={() => this.goToURL(github)}>
                <Text style={styles.link}>GitHub</Text>
              </TouchableOpacity> }
            { twitter && 
              <TouchableOpacity onPress={() => this.goToURL(twitter)}>
                <Text style={styles.link}>Twitter</Text>
              </TouchableOpacity> }
          </View>
        </ScrollView>
      );
    }
    else return null;
  }
}

export default withApollo(DetailsScreen);

const styles = StyleSheet.create({
  image: { width: screenWidth, height: screenWidth },
  name: { fontSize: 20, fontWeight: 'bold', marginVertical: 5 },
  role: { fontSize: 16, marginBottom: 5 },
  description: { marginBottom: 5 },
  cardContainer: { flex: 1, alignItems: "center", justifyContent: "center", flexDirection: 'column' },
  link: { color: '#0000FF' },
});
