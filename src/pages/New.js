import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdCheckCircle,
} from "react-icons/md";
import { BsXCircleFill } from "react-icons/bs";
import { BiCategoryAlt, BiDollar } from "react-icons/bi";
import { TbSalt } from "react-icons/tb";
import { categories } from "../utils/data";
import { Loader } from "../components";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import {
  firebaseAddProduct,
  firebaseFetchProducts,
} from "../utils/firebaseFunctions";
import { useStateValue } from "../contexts/StateProvider";
import { useNavigate } from "react-router-dom";
import { actionType } from "../contexts/reducer";

function NewItem() {
  const [{ user }] = useStateValue();
  const [{ products }, dispatch] = useStateValue();

  const navigate = useNavigate();

  useEffect(() => {
    if (user.email != process.env.REACT_APP_ADMIN_EMAIL) {
      navigate("/");
    }
  }, []);

  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading, try again");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImage(downloadUrl);
          setLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 8000);
        });
      }
    );
  };

  const deleteImage = () => {
    setLoading(true);
    const deleteRef = ref(storage, image);
    deleteObject(deleteRef).then(() => {
      setImage(null);
      setLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 8000);
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!title || !calories || !price || !category || !image) {
        setFields(true);
        setMsg("Please fill the fields.");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: image,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        firebaseAddProduct(data).then(() => {
          clearData();
          setLoading(false);
          setFields(true);
          setMsg("Product added successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 8000);
        });
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading, try again");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setLoading(false);
      }, 4000);
    }

    fetchProducts();
  };

  const clearData = () => {
    setTitle("");
    setCategory("");
    setImage(null);
    setCalories("");
    setPrice(0);
  };

  const fetchProducts = async () => {
    await firebaseFetchProducts().then((data) => {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: data,
      });
    });
  };

  return (
    <form
      onSubmit={(e) => addProduct(e)}
      className="flex items-center justify-center w-full mt-4 mb-10"
      noValidate
    >
      <div className="flex flex-col items-center justify-center gap-4 w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4">
        {fields && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className={`fixed top-32 z-50 w-1/2 flex items-center justify-center gap-4 p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-600 text-white"
                : "bg-emerald-600 text-white"
            }`}
          >
            {alertStatus === "danger" ? (
              <BsXCircleFill size={22} />
            ) : (
              <MdCheckCircle size={22} />
            )}
            <p>{msg}</p>
          </motion.div>
        )}
        <div className="flex items-center gap-4 w-full py-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            className="w-full h-full text-lg bg-transparent border border-gray-300 font-semibold placeholder:text-gray-500 focus:ring-2 rounded-lg"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full pt-2 pb-4 border-b border-gray-300">
          <BiCategoryAlt className="text-xl text-gray-700" />
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full bg-transparent border border-gray-300 text-base font-medium p-2 rounded-lg cursor-pointer"
          >
            <option value="Other" className="bg-white">
              Category
            </option>
            {categories &&
              categories.map((c) => (
                <option
                  key={c.id}
                  className="text-base border-0 outline-none capitalize bg-white text-gray-800"
                  value={c.url}
                >
                  {c.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center justify-center group flex-col w-full h-225 md:h-420 cursor-pointer rounded-lgx border-2 border-dotted border-gray-300">
          {loading ? (
            <Loader />
          ) : (
            <>
              {!image ? (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <div className="w-full h-full flex items-center justify-center gap-4 text-gray-700 hover:text-gray-900">
                    <MdCloudUpload className="text-3xl" />
                    <p className="text-xl ">Click here to upload.</p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => uploadImage(e)}
                    className="w-0 h-0"
                  />
                </label>
              ) : (
                <div className="relative h-full">
                  <img
                    src={image}
                    alt="Product Image"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-lg transition-all ease-in-out duration-500"
                    onClick={() => deleteImage()}
                  >
                    <MdDelete className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <div className="py-2 flex items-center gap-4">
            <TbSalt className="text-2xl text-gray-700" />
            <input
              type="number"
              className="w-full h-full text-lg bg-transparent border border-gray-300 font-semibold placeholder:text-gray-500 focus:ring-2 rounded-lg"
              placeholder="Calories"
              value={calories}
              min={1}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className="py-2 flex items-center gap-4">
            <BiDollar className="text-2xl text-green-700" />
            <input
              type="number"
              className="w-full h-full text-lg bg-transparent border border-gray-300 font-semibold placeholder:text-gray-500 focus:ring-2 rounded-lg"
              placeholder="Price"
              value={price}
              min={0.05}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center w-full mt-5">
          <motion.button
            whileHover={{ scale: 0.97 }}
            transition={{ duration: 0.01 }}
            type="submit"
            className="ml-0 md:mx-auto w-full lg:w-1/2 text-white text-lg bg-gradient-to-br from-orange-400 to-orange-500 px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-200"
          >
            Add Product
          </motion.button>
        </div>
      </div>
    </form>
  );
}

export default NewItem;
