export type Allergen=
|"Dairy"
|"Egg"
|"Fish"
|"Shellfish"
|"Tree Nuts"
|"Peanuts"
|"Wheat"
|"Soy"
|"Sesame"

export type MenuItemOption ={
    name:string;
    priceDelta?: number;
}

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  available: boolean;
  seasonal?: boolean;
  allergens?: Allergen[];
  options?: {
    groupName: string;
    required?: boolean;
    choices: MenuItemOption[];
  }[];
};