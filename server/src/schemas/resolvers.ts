import { Composition, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments
interface AddUserArgs {
  input:{
    name: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  name: string;
}

interface CompositionArgs {
  compositionId: string;
}

interface AddCompositionArgs {
  input:{
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    tags: string[];
  }
}

/* interface AddCommentArgs {
  compositionId: string;
  commentText: string;
} */

/* interface RemoveCommentArgs {
  compositionId: string;
  commentId: string;
} */

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('compositions');
    },
    user: async (_parent: any, { name }: UserArgs) => {
      return User.findOne({ name }).populate('compositions');
    },
    compositions: async () => {
      return await Composition.find().sort({ createdAt: -1 });
    },
    composition: async (_parent: any, { compositionId }: CompositionArgs) => {
      return await Composition.findOne({ _id: compositionId });
    },
    // Query to get the authenticated user's information
    // The 'me' query relies on the context to check if the user is authenticated
    me: async (_parent: any, _args: any, context: any) => {
      // If the user is authenticated, find and return the user's information along with their compositions
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('compositions');
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      // Create a new user with the provided name, email, and password
      const user = await User.create({ ...input });
    
      // Sign a token with the user's information
      const token = signToken(user.name, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    
    login: async (_parent: any, { email, password }: LoginUserArgs) => {
      // Find a user with the provided email
      const user = await User.findOne({ email });
    
      // If no user is found, throw an AuthenticationError
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);
    
      // If the password is incorrect, throw an AuthenticationError
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      // Sign a token with the user's information
      const token = signToken(user.name, user.email, user._id);
    
      // Return the token and the user
      return { token, user };
    },
    addComposition: async (_parent: any, { input }: AddCompositionArgs, context: any) => {
      if (context.user) {
        const composition = await Composition.create({ ...input });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { compositions: composition._id } }
        );

        return composition;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    /* addComment: async (_parent: any, { compositionId, commentText }: AddCommentArgs, context: any) => {
      if (context.user) {
        return Composition.findOneAndUpdate(
          { _id: compositionId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.name },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    }, */
    removeComposition: async (_parent: any, { compositionId }: CompositionArgs, context: any) => {
      if (context.user) {
        const composition = await Composition.findOneAndDelete({
          _id: compositionId,
          compositionAuthor: context.user.name,
        });

        if(!composition){
          throw AuthenticationError;
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { compositions: composition._id } }
        );

        return composition;
      }
      throw AuthenticationError;
    },
    /* removeComment: async (_parent: any, { compositionId, commentId }: RemoveCommentArgs, context: any) => {
      if (context.user) {
        return Composition.findOneAndUpdate(
          { _id: compositionId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.name,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    }, */
  },
};

export default resolvers;
