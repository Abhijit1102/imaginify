import { Schema, model, models } from "mongoose";
import { Document, Types } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  securedUrl: string;
  width?: number;
  height?: number;
  config?: object;
  tranformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}


const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType: { type: String, required: true },
  publicId: { type: String, required: true },
  securedUrl: { type: String, required: true },
  width: {type: Number},
  height: {type: Number},
  config: {type: Object},
  tranformationUrl: {type: URL},
  aspectRatio: {type: String},
  color: {type: String},
  prompt: {type: String},
  author: {type: Schema.Types.ObjectId, ref: "User"},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

const Image = models?.Image || model("Image", ImageSchema);

export default Image;