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



// Function to add content to the database
export const putDb = async (content) => {

  console.log('update content');
  const jatedb = await openDB('jate', 1);
  const tx = jatedb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content});
  const result = await request; // Add the content to the store
  console.log('Saved data', result);
  await tx.done; // Ensure the transaction is completed
};

// Function to get content from the database by ID
export const getDb = async (id) => {
  const textdb = await openDB('jate', 1);
  const tx = textdb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1); // Get content by ID
  const result = await request; // Retrieve the content
  await tx.done; // Ensure the transaction is completed

  return result?.value; // Return the retrieved content
};

// Usage example:
// Add content to the database
const contentToAdd = { id: 1, info: 'Some information' };
putDb(contentToAdd);

// Get content from the database by ID
const retrievedContent = await getDb(1);
console.log('Retrieved content:', retrievedContent);

// Initialize the database
initdb();