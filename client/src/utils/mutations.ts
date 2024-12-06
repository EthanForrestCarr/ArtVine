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
      # comments {
      #   _id
      #   commentText
      # }
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
