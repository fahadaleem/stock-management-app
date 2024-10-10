import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";

export const apiUtilServices = (() => {
  const url = `${import.meta.env.VITE_BE_URL}/api`;

  function getRequest(endpoint) {
    return axios.get(`${url}${endpoint}`).then((res) => res.data);
  }

  function postRequest(endpoint, payload) {
    return axios.post(`${url}${endpoint}`, payload).then((res) => res.data);
  }

  function deleteRequest(endpoint) {
    return axios.delete(`${url}${endpoint}`).then((res) => res.data);
  }

  async function uploadFileRequest(file) {
    // Create a storage reference
    const storageRef = ref(storage, `uploads/${file.name}`);

    try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the download URL
      const url = await getDownloadURL(snapshot.ref);
      console.log("File uploaded! URL:", url);

      return url;

      // Now you can store this URL in your database or use it
    } catch (error) {
      console.error("File upload failed:", error);
    }
  }

  return {
    getRequest,
    postRequest,
    deleteRequest,
    uploadFileRequest,
  };
})();
