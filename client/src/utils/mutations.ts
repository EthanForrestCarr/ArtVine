import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
    user {
      name
      _id
      # email
    }
    token
  }
}
`;

export const ADD_COMPOSITION = gql`
  mutation AddComposition($input: CompositionInput!) {
    addComposition(input: $input) {
      _id
      compositionTitle
      compositionText
      compositionAuthor
      createdAt
    }
  }
`;

export const REMOVE_COMPOSITION = gql`
  mutation removeComposition($compositionId: ID!) {
    removeComposition(compositionId: $compositionId) {
      _id
      compositionTitle
      compositionText
      compositionAuthor
      createdAt
      tags
    }
  }
`;

export const SAVE_TO_LIBRARY = gql`
  mutation saveToLibrary($compositionId: ID!) {
    saveToLibrary(compositionId: $compositionId) {
      _id
      library {
        _id
        compositionTitle
        compositionText
        compositionAuthor
        createdAt
        tags
      }
    }
  }
`;

export const REMOVE_FROM_LIBRARY = gql`
  mutation removeFromLibrary($compositionId: ID!) {
    removeFromLibrary(compositionId: $compositionId) {
      _id
      library {
        _id
        compositionTitle
        compositionText
        compositionAuthor
        createdAt
        tags
      }
    }
  }
`;

// export const ADD_COMMENT = gql`
//   mutation addComment($thoughtId: ID!, $commentText: String!) {
//     addComment(thoughtId: $thoughtId, commentText: $commentText) {
//       _id
//       thoughtText
//       thoughtAuthor
//       createdAt
//       comments {
//         _id
//         commentText
//         createdAt
//       }
//     }
//   }
// `;

export const FOLLOW_USER = gql`
mutation followUser($followId: ID!) {
  followUser(followId: $followId) {
    _id
    follows {
      _id
      name
      email
    }
  }
}
`;

export const UPDATE_COMPOSITION = gql`
  mutation updateComposition($compositionId: ID!, $input: CompositionInput!) {
    updateComposition(compositionId: $compositionId, input: $input) {
      _id
      compositionTitle
      compositionText
      compositionAuthor
      createdAt
      tags
    }
  }
`;