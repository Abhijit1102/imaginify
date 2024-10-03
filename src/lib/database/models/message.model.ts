import mongoose, { Document, Model, Schema } from "mongoose";

// Define the structure of the Message document
interface IMessage extends Document {
  content: string;  // Content of the message
  author: string;   // ID or username of the message author
  createdAt: Date;  // Timestamp for when the message was created
}

// Create the Message schema
const messageSchema: Schema<IMessage> = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  }
);

// Create the Message model
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
