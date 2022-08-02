import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";

/**
 * Add Product.
 * @param data Data to save.
 */
export const firebaseAddProduct = async (data) => {
  await setDoc(doc(firestore, "products", `${Date.now()}`), data, {
    merge: true,
  });
};

/**
 * Fetch Products.
 * @returns Array of products.
 */
export const firebaseFetchProducts = async () => {
  const items = await getDocs(
    query(collection(firestore, "products"), orderBy("id", "desc"))
  );

  return items.docs.map((doc) => doc.data());
};
