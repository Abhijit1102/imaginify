"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants";
import { CustomField } from "./CustomField";
import { useState } from "react";
import { AspectRatioKey } from "@/lib/utils";
import { Button } from "../ui/button";

// Define the schema for form validation
export const formSchema = z.object({
  title: z.string().min(2).max(50),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

type TransformationFormProps = {
  action: "Update" | "Create" | "Add";
  data?: z.infer<typeof formSchema> | null;
  userId: string;
  type: string;
  creditBalance: number;
};

const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null
}: TransformationFormProps) => {
  const transformation = transformationTypes[type];

  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);  
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setNewTransformationConfig] = useState(config);

  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  // Function to handle Select field changes
  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey];
    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));
    onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    // Update the field value using the `onChangeField` callback
    onChangeField(value);

    // You can also add additional logic based on `type` or `fieldName`
    setImage((prevState: any) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const onTransformHandler = async () => {
    setIsTransforming(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title Field */}
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => (
            <Input {...field} className="input-field" placeholder="Title" />
          )}
        />

        {/* Aspect Ratio Field for 'fill' type */}
        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}>
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map
                  ((key)=> (
                    <SelectItem key={key} value={key}
                     className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>  
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <div className="prompt-field">
            <CustomField
                name="prompt"
              control={form.control}
              formLabel={type === 'remove' ? 'Object to remove' : 'Object to recolor'}
              className="w-full"
              render={(({ field }) => (
              <Input
              value={field.value}
              className="input-field"
              onChange={(e) => onInputChangeHandler(
                'prompt',
                e.target.value,
                type,
                field.onChange
              )}
               />
            ))}
            />
            {type === 'recolor' && (
              <CustomField
                name="color"
                control={form.control}
                formLabel="Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) => onInputChangeHandler(
                    'color',
                    e.target.value,
                    'recolor',
                    field.onChange
                  )}
                  />
                )}
              />
            )}
          </div>
        )}
        <div className="flex flex-col gap-4">
        <Button 
        type="button"
        className="submit-button capitalize"
        disabled={isTransforming || newTransformation === null}
        onClick={onTransformHandler}
        >
          {isTransforming ? 'Transforming...' : 'Apply transformation'}
        </Button>
        </div>
        <Button 
        type="submit"
        className="submit-button capitalize"
        disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting' : 'Save Image'}
        </Button>
      </form>
    </Form>
  );
};

export default TransformationForm;