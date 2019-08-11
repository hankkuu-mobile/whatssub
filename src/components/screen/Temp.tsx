import {
  FlatList,
  Text,
} from 'react-native';
import React, { Component, useEffect } from 'react';
import { Button } from 'dooboo-native-widgets';
import { gql } from 'apollo-boost';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/react-hooks';

export const QUERY_USERS = gql`
  query users {
    users {
      id
      name
      email
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  navigation: any;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Users = () => {
  const { data, error, loading } = useQuery(QUERY_USERS);

  if (error) {
    return <Text>Error! {error.message}</Text>;
  }

  if (loading) {
    return <Text style={{
      color: 'rgba(255,255,255,07)',
      fontSize: 20,
    }}>Loading...</Text>;
  }

  return (
    <FlatList
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
      }}
      data={data.users ? data.users : []}
      keyExtractor={ (item: User) => String(item.id) }
      renderItem={({ item }) => <Text style={{
        color: 'rgba(255,255,255,07)',
        fontSize: 20,
      }}>{ item.email } - {item.name }</Text>}
    />
  );
};

function Page(props: Props) {
  return (
    <Container>
      <Users/>
    </Container>
  );
}

export default Page;
