import { createContext, useContext, useState } from 'react';

// Sample data for the closet
const sampleClothingItems = [
  {
    id: '1',
    name: 'White Button-Down Shirt',
    category: 'tops',
    subcategory: 'Shirts',
    color: 'White',
    brand: 'Brooks Brothers',
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
    seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
    occasions: ['Work', 'Casual', 'Semi-formal'],
    favorite: true,
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'bottoms',
    subcategory: 'Jeans',
    color: 'Blue',
    brand: "Levi's",
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
    seasons: ['Spring', 'Fall', 'Winter'],
    occasions: ['Casual'],
    favorite: true,
  },
  {
    id: '3',
    name: 'Black Leather Jacket',
    category: 'outerwear',
    subcategory: 'Jackets',
    color: 'Black',
    brand: 'AllSaints',
    image: 'https://images.pexels.com/photos/16170/pexels-photo.jpg',
    seasons: ['Fall', 'Winter'],
    occasions: ['Casual', 'Night Out'],
    favorite: false,
  },
  {
    id: '4',
    name: 'Brown Leather Boots',
    category: 'shoes',
    subcategory: 'Boots',
    color: 'Brown',
    brand: 'Red Wing',
    image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg',
    seasons: ['Fall', 'Winter'],
    occasions: ['Casual', 'Outdoor'],
    favorite: true,
  },
  {
    id: '5',
    name: 'Silver Watch',
    category: 'accessories',
    subcategory: 'Watches',
    color: 'Silver',
    brand: 'Seiko',
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    seasons: ['Spring', 'Summer', 'Fall', 'Winter'],
    occasions: ['Work', 'Casual', 'Formal'],
    favorite: false,
  },
  {
    id: '6',
    name: 'Navy Blazer',
    category: 'outerwear',
    subcategory: 'Blazers',
    color: 'Navy',
    brand: 'Ralph Lauren',
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
    seasons: ['Spring', 'Fall'],
    occasions: ['Work', 'Semi-formal', 'Formal'],
    favorite: true,
  }
];

// Create the context
const ClosetContext = createContext();

// Create a provider component
export const ClosetProvider = ({ children }) => {
  const [clothingItems, setClothingItems] = useState(sampleClothingItems);
  const [outfits, setOutfits] = useState([]);

  // Get items by category
  const getItemsByCategory = (category) => {
    return clothingItems.filter(item => item.category === category);
  };

  // Add a new clothing item
  const addClothingItem = (item) => {
    setClothingItems([...clothingItems, { ...item, id: Date.now().toString() }]);
  };

  // Remove a clothing item
  const removeClothingItem = (id) => {
    setClothingItems(clothingItems.filter(item => item.id !== id));
  };

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setClothingItems(
      clothingItems.map(item => 
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  // Create a new outfit
  const createOutfit = (outfit) => {
    setOutfits([...outfits, { ...outfit, id: Date.now().toString() }]);
  };

  // Get favorite items
  const getFavoriteItems = () => {
    return clothingItems.filter(item => item.favorite);
  };

  return (
    <ClosetContext.Provider
      value={{
        clothingItems,
        outfits,
        getItemsByCategory,
        addClothingItem,
        removeClothingItem,
        toggleFavorite,
        createOutfit,
        getFavoriteItems
      }}
    >
      {children}
    </ClosetContext.Provider>
  );
};

// Create a custom hook to use the context
export const useCloset = () => {
  const context = useContext(ClosetContext);
  if (!context) {
    throw new Error('useCloset must be used within a ClosetProvider');
  }
  return context;
};
