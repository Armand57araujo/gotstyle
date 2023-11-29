import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Initialize the database
initdb();

// Function to add content to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  await store.put(content); // Add the content to the store
  await tx.done; // Ensure the transaction is completed
};

// Function to get content from the database by ID
export const getDb = async (id) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const result = await store.get(id); // Get content by ID
  await tx.done; // Ensure the transaction is completed

  return result; // Return the retrieved content
};

// Usage example:
// Add content to the database
const contentToAdd = { id: 1, info: 'Some information' };
putDb(contentToAdd);

// Get content from the database by ID
const retrievedContent = await getDb(1);
console.log('Retrieved content:', retrievedContent);

