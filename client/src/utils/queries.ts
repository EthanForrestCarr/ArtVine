import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($name: String!) {
    user(name: $name) {
      _id
      name
      email
      compositions {
        _id
        compositionText
        createdAt
      }
    }
  }
`;

export const QUERY_COMPOSITIONS = gql`
  query getCompositions {
    compositions {
      _id
      compositionTitle
      compositionText
      compositionAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_COMPOSITION = gql`
  query getSingleComposition($compositionId: ID!) {
    composition(compositionId: $compositionId) {
      _id
      compositionTitle
      compositionText
      compositionAuthor
      createdAt
      # comments {
      #   _id
      #   commentText
      #   commentAuthor
      #   createdAt
      # }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      compositions {
        _id
        compositionTitle
        compositionText
        compositionAuthor
        createdAt
      }
    }
  }
`;

export const SEARCH_COMPOSITIONS_AND_USERS = gql`
  query SearchCompositionsAndUsers($query: String!) {
    searchCompositionsAndUsers(query: $query) {
      users {
        _id
        name
        email
      }
      compositions {
        _id
        title
        text
        compositionAuthor
        createdAt
        tags
      }
    }
  }
`;