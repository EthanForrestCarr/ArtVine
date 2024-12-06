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
    compositionText: string;
    compositionAuthor: string;
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
    followUser: async (_parent: any, { followId }: { followId: string }, context: any) => {
      if (context.user) {
        if (context.user._id === followId) {
          throw new Error("You cannot follow yourself.");
        }
    
        // Use $addToSet to ensure no duplicates
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { follows: followId } }, // Ensures no duplicate follows
          { new: true }
        ).populate('follows'); // Populate to return updated follows data
    
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    unfollowUser: async (_parent: any, { followId }: { followId: string }, context: any) => {
      if (context.user) {
        // Ensure the user is not trying to unfollow themselves
        if (context.user._id.toString() === followId) {
          throw new Error("You cannot unfollow yourself.");
        }
    
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { follows: followId } }, // Removes the followId from the follows array
          { new: true } // Return the updated user
        ).populate('follows'); //  update follows data
    
        return updatedUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    
    saveToCollection: async (_parent: any, { compositionId }: { compositionId: string }, context: any) => {
      if (context.user) {
        // Check if the composition exists
        const composition = await Composition.findById(compositionId);
        if (!composition) {
          throw new Error('Composition not found.');
        }
    
        // user cannot save their own composition
        if (composition.compositionAuthor === context.user.name) {
          throw new Error('You cannot save your own composition.');
        }
    
        // no duplicate compositions in the collection
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { collection: compositionId } }, // ensures unique compositions
          { new: true }
        ).populate('collection'); //update collection
    
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeFromCollection: async (_parent: any, { compositionId }: { compositionId: string }, context: any) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { collection: compositionId } }, // compositionId from the collection
          { new: true }
        ).populate('collection'); // update collection
    
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
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
