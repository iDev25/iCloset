import { createContext, useState, useContext } from 'react';
import { outfits as initialOutfitData } from '../data/outfits';

// Sample data for initial closet items
const initialItems = [
  {
    id: '1',
    name: 'White Button-Down Shirt',
    category: 'tops',
    color: 'white',
    season: ['spring', 'summer', 'fall', 'winter'],
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favorite: true,
  },
  {
    id: '2',
    name: 'Blue Jeans',
    category: 'bottoms',
    color: 'blue',
    season: ['spring', 'fall', 'winter'],
    image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favorite: false,
  },
  {
    id: '3',
    name: 'Black Blazer',
    category: 'outerwear',
    color: 'black',
    season: ['fall', 'winter'],
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favorite: true,
  },
  {
    id: '4',
    name: 'Brown Leather Boots',
    category: 'shoes',
    color: 'brown',
    season: ['fall', 'winter'],
    image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favorite: false,
  },
  {
    id: '5',
    name: 'Gold Necklace',
    category: 'accessories',
    color: 'gold',
    season: ['spring', 'summer', 'fall', 'winter'],
    image: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favorite: true,
  },
  {
    id: '6',
    name: 'Floral Summer Dress',
    category: 'dresses',
    color: 'multicolor',
    season: ['spring', 'summer'],
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    favorite: true,
  },
];

// Sample data for initial outfits
const initialOutfits = [
  {
    id: '1',
    name: 'Business Casual',
    items: ['1', '2', '3', '5'],
    favorite: true,
    createdAt: new Date('2023-06-15').toISOString(),
  },
  {
    id: '2',
    name: 'Summer Day Out',
    items: ['6', '5'],
    favorite: false,
    createdAt: new Date('2023-07-20').toISOString(),
  },
];

const ClosetContext = createContext();

export function useCloset() {
  return useContext(ClosetContext);
}

export function ClosetProvider({ children }) {
  const [items, setItems] = useState(initialItems);
  const [outfits, setOutfits] = useState(initialOutfits);
  
  // Add outfitHistory for RecentOutfits component
  const outfitHistory = initialOutfitData.map(outfit => ({
    ...outfit,
    created: outfit.created || new Date().toISOString()
  }));
  
  // Add a new item to the closet
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      favorite: false,
    };
    setItems([...items, newItem]);
    return newItem;
  };
  
  // Update an existing item
  const updateItem = (id, updatedItem) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };
  
  // Remove an item from the closet
  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    // Also remove the item from any outfits
    setOutfits(outfits.map(outfit => ({
      ...outfit,
      items: outfit.items.filter(itemId => itemId !== id)
    })));
  };
  
  // Toggle favorite status of an item
  const toggleItemFavorite = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, favorite: !item.favorite } : item
    ));
  };
  
  // Create a new outfit
  const createOutfit = (name, itemIds) => {
    const newOutfit = {
      id: Date.now().toString(),
      name,
      items: itemIds,
      favorite: false,
      createdAt: new Date().toISOString(),
    };
    setOutfits([...outfits, newOutfit]);
    return newOutfit;
  };
  
  // Update an existing outfit
  const updateOutfit = (id, updatedOutfit) => {
    setOutfits(outfits.map(outfit => 
      outfit.id === id ? { ...outfit, ...updatedOutfit } : outfit
    ));
  };
  
  // Remove an outfit
  const removeOutfit = (id) => {
    setOutfits(outfits.filter(outfit => outfit.id !== id));
  };
  
  // Toggle favorite status of an outfit
  const toggleOutfitFavorite = (id) => {
    setOutfits(outfits.map(outfit => 
      outfit.id === id ? { ...outfit, favorite: !outfit.favorite } : outfit
    ));
  };
  
  // Get an item by ID
  const getItem = (id) => {
    return items.find(item => item.id === id);
  };
  
  // Get an outfit by ID
  const getOutfit = (id) => {
    return outfits.find(outfit => outfit.id === id);
  };
  
  // Get all favorite items
  const getFavoriteItems = () => {
    return items.filter(item => item.favorite);
  };
  
  // Get all favorite outfits
  const getFavoriteOutfits = () => {
    return outfits.filter(outfit => outfit.favorite);
  };
  
  // Get items by category
  const getItemsByCategory = (category) => {
    return items.filter(item => item.category === category);
  };
  
  // Get items by season
  const getItemsBySeason = (season) => {
    return items.filter(item => item.season.includes(season));
  };
  
  const value = {
    items,
    outfits,
    outfitHistory,
    addItem,
    updateItem,
    removeItem,
    toggleItemFavorite,
    createOutfit,
    updateOutfit,
    removeOutfit,
    toggleOutfitFavorite,
    getItem,
    getOutfit,
    getFavoriteItems,
    getFavoriteOutfits,
    getItemsByCategory,
    getItemsBySeason,
  };
  
  return (
    <ClosetContext.Provider value={value}>
      {children}
    </ClosetContext.Provider>
  );
}
