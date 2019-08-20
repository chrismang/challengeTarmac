import React from 'react';
import { Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withApollo } from 'react-apollo';
import Queries from '../Apollo/Queries';

const defaultImage = require('../../assets/images/defaultSource.jpg');

class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            data: []
         };
      }

    componentDidMount() {
        const { client } = this.props;
        Queries.loadMembers(client);
        client.query({ query: Queries.getMembers }).then(res => this.setState({ data: res.data.members }));
    }

    goDetails = item => {
        const { client, navigation } = this.props;
        Queries.selectMember(client, item);
        navigation.navigate('Details');
    }

    renderItem = ({ item }) => {
        const { pic, name } = item;
        let imageURI = `http://tarmac.io/assets/members/${pic}.png`;
        let loadFailed = false;
        return (
            <TouchableOpacity onPress={() => this.goDetails(item)} style={styles.container}>
                <Image style={styles.image} source={loadFailed ? defaultImage : { uri: imageURI }} defaultSource={defaultImage}/>
                <Text style={styles.name}>{ name }</Text>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => item.name;

    render() {

        const { data } = this.state;
        return (
            <FlatList 
            data={data}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
            />
        );
    }
}

export default withApollo(HomeScreen);

const styles = StyleSheet.create({
    container: { flexDirection: 'row', marginHorizontal: 15, marginVertical: 5, borderColor: '#000000', borderWidth: 2, alignItems: 'center' },
    image: { width: 75, height: 75, marginRight: 25 },
    name: { fontSize: 20, fontWeight: 'bold' },
  });