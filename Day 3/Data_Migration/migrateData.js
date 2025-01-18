import client from './sanityClient.js';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://template1-neon-nu.vercel.app/api/products';

const uploadProduct = async (product) => {
  try {
    const document = {
      _id: product._id || uuidv4(),
      _type: 'products',
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.imageUrl,
      category: product.category.toLowerCase(),
      discountPercent: product.discountPercent || 0,
      new: product.isNew || false,
      colors: product.colors || [],
      sizes: product.sizes || [],
    };

    const result = await client.createIfNotExists(document);
    console.log(`Product uploaded successfully: ${result._id}`);
  } catch (error) {
    console.error(`Error uploading product "${product.name}": ${error.message}`);
  }
};

const migrateData = async () => {
  try {
    console.log('Fetching data from API...');
    const response = await fetch(API_URL);
    const products = await response.json();

    console.log('Data fetched successfully. Migrating products...');
    await Promise.all(products.map((product) => uploadProduct(product)));

    console.log('Data migration completed!');
  } catch (error) {
    console.error('Error during data migration:', error.message);
  }
};

migrateData();