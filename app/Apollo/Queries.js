import { gql } from "apollo-boost";
import dataList from '../data';

const loadMembers = client => {
  const members = dataList.map(item => { return {...item, github: (item.github || null), twitter: (item.twitter || null), __typename: 'Member'} });
  client.writeData({ data: { members } });
};

const selectMember = (client, member) => {
  client.writeData({data: {selectedMember: member}});
}

const getMembers = gql`
    query {
        members @client {
            name
            role
            pic
            github
            width
            height
            description
            twitter
        }
    }`;

const getSelectedMember = gql`
  query {
      selectedMember @client {
          name
          role
          pic
          github
          width
          height
          description
          twitter
      }
  }`;

export default { loadMembers, getMembers, selectMember, getSelectedMember };