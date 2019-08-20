
import React from 'react';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import Navigator from './app/Navigation/Navigator';
import dataList from './app/data';
import Queries from './app/Apollo/Queries';

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache,
  clientState: {
    defaults: {
      members: [],
      selectedMember: {} 
    },
    resolvers: {
      Query: {},
      Mutation: {}
    } 
  }
});



const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
};

export default App;
