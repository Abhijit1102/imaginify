// types.ts (or in the same file)
export type TransformationKey = 'restore' | 'removeBackground' | 'fill' | 'remove' | 'recolor';

export interface Transformation {
  type: string;
  title: string;
  subTitle: string;
  config: Record<string, boolean>;
  icon: string;
}

export interface TransformationTypes {
  [key: string]: Transformation; // You can also use TransformationKey here if you want to restrict it
}

export const transformationTypes: TransformationTypes = {
  restore: {
    type: 'restore',
    title: 'Restore Image',
    subTitle: 'Restore the original image',
    config: { restore: true },
    icon: 'restore_icon_path', // replace with actual icon path
  },
  removeBackground: {
    type: 'removeBackground',
    title: 'Remove Background',
    subTitle: 'Remove the image background',
    config: { removeBackground: true },
    icon: 'remove_background_icon_path',
  },
  // Define other transformations similarly...
};
