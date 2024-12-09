import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'mongoose';

// Define an interface for the Composition document
/* interface IComment extends Document {
    commentText: string;
    createdAt: Date;
} */

interface IComposition extends Document {
    compositionTitle: string;
    compositionText: string;
    compositionAuthor: string;
    compositions: ObjectId[];
    library: ObjectId[];
    createdAt: Date;
    tags: string[];
    /* comments: IComment[]; */
}

// Define the schema for the Comment subdocument
/* const commentSchema = new Schema<IComment>(
    {
        commentText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
    },
    {
        _id: false,
        toJSON: { getters: true },
        toObject: { getters: true },
        timestamps: true,
    }
); */

// Define the schema for the Composition document
const compositionSchema = new Schema<IComposition>(
    {
        compositionTitle: {
            type: String,
            required: true,
            minlength: 1,
        },
        compositionText: {
            type: String,
            required: true,
            minlength: 1,
            // maxlength: 280,
            trim: true,
        },
        compositionAuthor: {
            type: String,
            required: true,
            trim: true,
        },
        tags: {
            type: [String],
        },
        /* comments: [commentSchema], */
    },
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true },
    }
);

const Composition = model<IComposition>('Composition', compositionSchema);

export default Composition;
