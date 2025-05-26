import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //Obtener productos
  const getData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error("Error al obtener los productos");
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  //Eliminar productos
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar el producto");

      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Producto eliminado correctamente");
    } catch (err) {
      console.error(err);
      toast.error("No se pudo eliminar el producto");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    products,
    setProducts,
    loading,
    deleteProduct,
  };
};

export default useDataProducts;
