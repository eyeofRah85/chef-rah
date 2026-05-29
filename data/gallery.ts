export type GalleryImage = {
  src: string;
  alt: string;
  title: string;
  category: "Plates" | "Meal Prep" | "Catering" | "Desserts" | "Behind the Scenes";
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/plate-1.jpg",
    alt: "Prepared Chef Rah meal plate",
    title: "Signature Plate",
    category: "Plates",
  },
  {
    src: "/gallery/plate-2.jpg",
    alt: "Chef Rah prepared food plate",
    title: "Seasonal Plate",
    category: "Plates",
  },
  {
    src: "/gallery/catering-1.jpg",
    alt: "Catering food setup",
    title: "Catering Setup",
    category: "Catering",
  },
  {
    src: "/gallery/meal-prep-1.jpg",
    alt: "Meal prep containers",
    title: "Meal Prep",
    category: "Meal Prep",
  },
];

