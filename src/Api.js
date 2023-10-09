/**
 * API Key for accessing the API.
 * @type {string}
 */
 const APIKEY = '7xQk61SYxQ';

 /**
  * Base URL for the API.
  * @type {string}
  */
 const BASE_URL = 'https://comp2140.uqcloud.net/api/';
 
 /**
  * Fetches a sample by ID from the API.
  *
  * @param {string} id - The ID of the sample to fetch.
  * @throws {Error} Throws an error if the fetch operation fails.
  * @returns {Promise<Object>} A promise that resolves to the fetched sample data.
  */
 export const fetchSample = async (id) => {
   try {
     const response = await fetch(`${BASE_URL}/sample/${id}/?api_key=${APIKEY}`);
     if (!response.ok) {
       throw new Error(`Failed to fetch sample with ID ${id}`);
     }
 
     const responseData = await response.text(); // Get the response as text
     try {
       const sampleData = JSON.parse(responseData);
       // Handle the sample data here
       return sampleData;
     } catch (error) {
       console.error('Error parsing JSON response:', error);
       throw new Error('Invalid JSON response');
     }
   } catch (error) {
     console.error('Error fetching sample:', error);
     throw error; // Re-throw the error for handling in the calling function
   }
 };
 
 /**
  * Fetches all samples from the API.
  *
  * @throws {Error} Throws an error if the fetch operation fails.
  * @returns {Promise<Object[]>} A promise that resolves to an array of fetched sample data.
  */
 export const getAllSamples = async () => {
   const response = await fetch(`${BASE_URL}/sample/?api_key=${APIKEY}`);
   return response.json();
 };
 
 /**
  * Fetches a sample by ID from the API.
  *
  * @param {string} id - The ID of the sample to fetch.
  * @throws {Error} Throws an error if the fetch operation fails.
  * @returns {Promise<Object>} A promise that resolves to the fetched sample data.
  */
 export const getSampleById = async (id) => {
   const response = await fetch(`${BASE_URL}/sample/${id}/?api_key=${APIKEY}`);
   return response.json();
 };
 
 /**
  * Creates a new sample and sends it to the API.
  *
  * @param {Object} sampleData - The sample data to create.
  * @param {string} instrument - The instrument associated with the sample.
  * @throws {Error} Throws an error if the creation process fails.
  * @returns {Promise<Object>} A promise that resolves to the created sample data.
  */
 export async function createNewSample(sampleData, instrument) {
   console.log("Inside createNewSample function, sending request...");
 
   const url = `${BASE_URL}sample/?api_key=${APIKEY}`;
   const { name, recording_data, key_states } = sampleData;
   
   if (instrument) {
     const data = {
       type: instrument,
       name: name,
       recording_data: JSON.stringify(recording_data), // Convert to JSON
       key_states: JSON.stringify(key_states), // Convert to JSON
     };
 
     const response = await fetch(url, {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     });
 
     if (!response.ok) {
       throw new Error('Failed to create sample');
     }
 
     return response.json();
   } else {
     // Use the original version of the function without 'instrument'
     const { name, instrument, noteSequences } = sampleData;
     const data = {
       'type': instrument,
       'name': name,
       'recording_data': JSON.stringify(noteSequences)
     };
 
     const response = await fetch(url, {
       method: "POST",
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
     });
 
     console.log('API Response:', response); // Add this line
     
     if (!response.ok) {
       throw  Error('Failed to create sample');
     }
 
     return response.json();
   }
 }
 
 /**
  * Updates a sample by ID in the API.
  *
  * @param {string} id - The ID of the sample to update.
  * @param {Object} sample - The updated sample data.
  * @throws {Error} Throws an error if the update operation fails.
  * @returns {Promise<Object>} A promise that resolves to the updated sample data.
  */
 export const updateSample = async (id, sample) => {
   const response = await fetch(`${BASE_URL}/sample/${id}/?api_key=${APIKEY}`, {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(sample),
   });
   return response.json();
 };
 
 /**
  * Edits a sample by sending it to the API.
  *
  * @param {Object} sample - The sample data to edit.
  * @throws {Error} Throws an error if the edit operation fails.
  * @returns {Promise<Object>} A promise that resolves to the edited sample data.
  */
 export const EditSample = async (sample) => {
   const response = await fetch(`${BASE_URL}/sample/?api_key=${APIKEY}`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(sample),
   });
   return response.json();
 };
 
 /**
  * Fetches all locations from the API.
  *
  * @throws {Error} Throws an error if the fetch operation fails.
  * @returns {Promise<Object[]>} A promise that resolves to an array of fetched location data.
  */
 export const getAllLocations = async () => {
   const response = await fetch(`${BASE_URL}/location/?api_key=${APIKEY}`);
   return response.json();
 };
 
 /**
  * Creates a sample-to-location association and sends it to the API.
  *
  * @param {Object} sampleLocationData - The data representing the sample-to-location association.
  * @throws {Error} Throws an error if the creation process fails.
  * @returns {Promise<Object>} A promise that resolves to the created association object.
  */
 export async function createSampletoLocation(sampleLocationData) {
   console.log("Inside createSampletoLocation function, sending request...");
 
   const url = `${BASE_URL}/sampletolocation/?api_key=${APIKEY}`;
   
   const response = await fetch(url, {
     method: "POST",
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(sampleLocationData)
   });
 
   if (!response.ok) {
     throw new Error('Failed to create sample-to-location association');
   }
 
   return response.json(); // Return the created association object
 };
 
 /**
  * Deletes a sample-to-location association by sample and location IDs.
  *
  * @param {string} sampleId - The ID of the sample in the association.
  * @param {string} locationId - The ID of the location in the association.
  * @throws {Error} Throws an error if the delete operation fails.
  * @returns {Promise<Object>} A promise that resolves to a success message.
  */
 export const deleteSampletoLocation = async (sampleId, locationId) => {
   try {
     const url = `${BASE_URL}/sampletolocation/${sampleId}/?api_key=${APIKEY}`;
     console.log('Delete URL:', url); // Log the delete URL for debugging
 
     const response = await fetch(url, {
       method: 'DELETE', // Use 'DELETE' method to properly delete the resource
       headers: {
         'Content-Type': 'application/json',
       },
     });
 
     if (!response.ok) {
       console.error('Delete request failed:', response.status, response.statusText);
       throw new Error('Failed to delete sample-to-location relationship');
     }
 
     return { success: true, message: 'Sample-to-location relationship deleted successfully' };
   } catch (error) {
     console.error('Error deleting sample-to-location relationship:', error);
     throw error; 
   }
 };
 