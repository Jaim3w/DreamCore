import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Obtener productos
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error("Error al obtener los productos");
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  // Agregar producto
 const addProduct = async (formData) => {
  try {
    const response = await fetch("http://localhost:4000/api/products", {
      method: "POST",
      body: formData, // Aquí se pasa el FormData
    });
    const result = await response.json();
    console.log(result); // Verifica que la respuesta sea la esperada
    getData()
  } catch (error) {
    console.error("Error al agregar producto:", error);
  }
};

  // Actualizar producto
const updateProduct = async (formData, productId) => {
  try {
    const response = await fetch(`http://localhost:4000/api/products/${productId}`, {
      method: "PUT",
      body: formData, // Aquí se pasa el FormData
    });
    const result = await response.json();
    console.log(result); // Verifica que la respuesta sea la esperada
  } catch (error) {
    console.error("Error al actualizar producto:", error);
  }
};

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el producto");

      const updated = products.filter((p) => p._id !== id);
      setProducts(updated);
      setFilteredProducts(updated);
      toast.success("Producto eliminado correctamente");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el producto");
    }
  };

  // Buscar productos (con debounce)
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) =>
        p.productName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    products: filteredProducts,
    deleteProduct,
    loading,
    searchQuery,
    handleSearch,
    addProduct,
    updateProduct,
  };
};

export default useDataProducts;