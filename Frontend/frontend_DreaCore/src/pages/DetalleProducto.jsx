import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados principales del componente
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [reseña, setReseña] = useState("");
  const [reviews, setReviews] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [loading, setLoading] = useState(false); // Para mostrar estado de carga
  const [error, setError] = useState(""); // Para mostrar errores

  // Al montar el componente: intento obtener el token y decodificar el usuario
  useEffect(() => {
    console.log("=== VERIFICANDO AUTENTICACIÓN ===");
    
    const allCookies = document.cookie;
    console.log("🍪 Todas las cookies:", allCookies);
    
    // Busquemos diferentes nombres posibles de token
    const possibleTokenNames = ['authToken', 'token', 'jwt', 'accessToken', 'verificationToken'];
let token = null;

// 🔍 Primero revisar en localStorage
for (const name of possibleTokenNames) {
  const storedToken = localStorage.getItem(name);
  if (storedToken) {
    token = storedToken;
    console.log(`🔑 Token encontrado en localStorage: ${name}`);
    break;
  }
}

// 🔍 Si no está en localStorage, revisar cookies (por compatibilidad)
if (!token) {
  for (const name of possibleTokenNames) {
    const cookieToken = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${name}=`))?.split("=")[1];
    if (cookieToken) {
      token = cookieToken;
      console.log(`🔑 Token encontrado en cookies: ${name}`);
      break;
    }
  }
}

    console.log("🔑 Token encontrado:", token ? "SÍ" : "NO");
    
    if (token) {
      console.log("🔑 Token completo:", token);
      
      try {
        const decoded = jwtDecode(token);
        console.log("📝 Token decodificado completo:", decoded);
        
        // Busquemos diferentes campos posibles para el identificador del usuario
        const possibleEmailFields = ['email', 'user', 'username', 'userEmail'];
        const possibleIdFields = ['id', 'userId', '_id', 'clientId'];
        
        let userIdentifier = null;
        let identifierType = null;
        
        // Primero buscar email
        for (const field of possibleEmailFields) {
          if (decoded[field]) {
            userIdentifier = decoded[field];
            identifierType = 'email';
            console.log(`📧 ${field} encontrado:`, userIdentifier);
            break;
          }
        }
        
        // Si no hay email, buscar ID directo
        if (!userIdentifier) {
          for (const field of possibleIdFields) {
            if (decoded[field]) {
              userIdentifier = decoded[field];
              identifierType = 'id';
              console.log(`🆔 ${field} encontrado:`, userIdentifier);
              break;
            }
          }
        }
        
        if (userIdentifier) {
          if (identifierType === 'email') {
            console.log("🔍 Buscando usuario por email...");
            
            fetch(`http://localhost:4000/api/clients/email/${userIdentifier}`)
              .then((res) => {
                console.log("👤 Respuesta búsqueda usuario - Status:", res.status);
                if (!res.ok) throw new Error('Error al obtener usuario');
                return res.json();
              })
              .then((data) => {
                console.log("👤 Datos del usuario obtenidos:", data);
                console.log("👤 ID del usuario:", data._id);
                setUsuarioActual(data._id);
                console.log("✅ Usuario establecido correctamente");
              })
              .catch((error) => {
                console.error("❌ Error al obtener usuario por email:", error);
              });
          } else {
            // Si ya tenemos el ID directamente
            console.log("👤 Usando ID directo del token");
            setUsuarioActual(userIdentifier);
            console.log("✅ Usuario establecido correctamente");
          }
        } else {
          console.log("❌ No se encontró identificador de usuario en el token");
          console.log("🔍 Campos disponibles en el token:", Object.keys(decoded));
        }
      } catch (error) {
        console.error("❌ Error al decodificar token:", error);
      }
    } else {
      console.log("❌ No se encontró ningún token de autenticación");
      console.log("🔍 Nombres buscados:", possibleTokenNames);
    }
    
    console.log("=== FIN VERIFICACIÓN AUTENTICACIÓN ===");
  }, []);

  // Al cargar o cambiar el ID del producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
        setError("Error al cargar el producto");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/reviews");
        if (!res.ok) throw new Error('Error al obtener reviews');
        const data = await res.json();
        const productReviews = data.filter((r) => r.idProduct?._id === id);
        setReviews(productReviews);
        console.log("Reviews cargadas:", productReviews); // Para debug
      } catch (error) {
        console.error("Error al obtener reviews:", error);
      }
    };

    if (id) {
      fetchProducto();
      fetchReviews();
    }
  }, [id]);

  // Función mejorada para agregar reseña
  const handleAgregarReview = async () => {
    console.log("=== INICIANDO PROCESO DE AGREGAR RESEÑA ===");
    console.log("Usuario actual:", usuarioActual);
    console.log("ID del producto:", id);
    console.log("Reseña escrita:", reseña);
    console.log("Reseña después de trim:", reseña.trim());
    
    // Validaciones
    if (!reseña.trim()) {
      console.log("❌ Error: Reseña vacía");
      setError("Por favor escribe una reseña");
      return;
    }
    
    if (!usuarioActual) {
      console.log("❌ Error: No hay usuario logueado");
      setError("Debes iniciar sesión para dejar una reseña");
      return;
    }

    console.log("✅ Validaciones pasadas, enviando petición...");
    setLoading(true);
    setError("");

    const requestData = {
      idClient: usuarioActual,
      idProduct: id,
      message: reseña.trim(),
    };

    console.log("📤 Datos a enviar:", requestData);

    try {
      const response = await fetch("http://localhost:4000/api/reviews", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData),
      });

      console.log("📨 Respuesta del servidor - Status:", response.status);
      console.log("📨 Respuesta del servidor - OK:", response.ok);

      if (!response.ok) {
        const errorData = await response.text(); // Cambio a text() por si no es JSON válido
        console.log("❌ Error del servidor:", errorData);
        throw new Error(errorData || `Error HTTP: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("✅ Reseña creada exitosamente:", responseData);

      // Limpiar input
      setReseña("");

      // Recargar reviews
      console.log("🔄 Recargando lista de reseñas...");
      await fetchReviewsUpdated();
      
      console.log("✅ Proceso completado exitosamente");
      
    } catch (err) {
      console.error("❌ Error completo:", err);
      console.error("❌ Mensaje de error:", err.message);
      setError(err.message || "Error al guardar la reseña");
    } finally {
      setLoading(false);
      console.log("=== FIN DEL PROCESO ===");
    }
  };

  // Función auxiliar para recargar reviews
  const fetchReviewsUpdated = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/reviews");
      if (!res.ok) throw new Error('Error al actualizar reviews');
      const data = await res.json();
      const productReviews = data.filter((r) => r.idProduct?._id === id);
      setReviews(productReviews);
    } catch (error) {
      console.error("Error al actualizar reviews:", error);
    }
  };

  // Función mejorada para eliminar review
  const handleEliminarReview = async (reviewId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta reseña?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la reseña');
      }

      // Actualizar la lista local inmediatamente
      setReviews(reviews.filter((r) => r._id !== reviewId));
      console.log("Reseña eliminada:", reviewId); // Para debug
      
    } catch (error) {
      console.error("Error al eliminar review:", error);
      setError("Error al eliminar la reseña");
    }
  };

  // Función para manejar Enter en el input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleAgregarReview();
    }
  };

  // Si el producto aún no se ha cargado, muestro mensaje
  if (!producto && !error) {
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;
  }

  if (error && !producto) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:flex gap-10 bg-white relative">
      {/* 🔙 Flechita para volver */}
      <button
        onClick={() => navigate("/productos")}
        className="absolute top-4 left-4 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow text-2xl hover:bg-gray-100 hover:border-gray-400 transition-colors"
      >
        ←
      </button>

      {/* 🖼 Imagen del producto */}
      <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          src={producto.productImage}
          alt={producto.productName}
          className="w-80 h-80 object-contain rounded-lg shadow"
        />
      </div>

      {/* 📋 Información del producto */}
      <div className="md:w-1/2 space-y-4 text-gray-900">
        <h2 className="text-2xl font-bold break-words">{producto.productName}</h2>
        <p className="text-gray-700 font-medium">
          {producto.idBrand?.brandName}
        </p>

        <div className="flex items-center text-yellow-500 space-x-1">
          <span>★ ★ ★ ★ ☆</span>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Descripción</h3>
          <p className="text-gray-700">{producto.description}</p>
        </div>

        <p className="text-green-700 font-medium">Disponible en stock</p>

        {/* Mostrar errores */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* ✏️ Input para agregar una reseña */}
        <div className="flex items-center gap-2">
          <input
            className="flex-1 border border-gray-300 rounded px-3 py-2 text-black bg-white focus:border-green-500 focus:outline-none"
            placeholder="Deja una reseña de este producto"
            value={reseña}
            onChange={(e) => {
              setReseña(e.target.value);
              if (error) setError(""); // Limpiar error al escribir
            }}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button
            className={`border rounded-full p-2 transition-colors ${
              loading 
                ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-white border-green-800 text-green-800 hover:bg-green-50"
            }`}
            onClick={handleAgregarReview}
            disabled={loading || !reseña.trim()}
          >
            <span className="text-lg">{loading ? "⏳" : "➤"}</span>
          </button>
        </div>

        {/* Mostrar estado del usuario */}
        {!usuarioActual && (
          <p className="text-sm text-gray-500">
            Inicia sesión para dejar reseñas
          </p>
        )}

        {/* 💬 Lista de reseñas */}
        <div className="grid sm:grid-cols-2 gap-2">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm col-span-2">
              No hay reseñas aún. ¡Sé el primero en dejar una!
            </p>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="border rounded p-3 text-sm shadow bg-white text-gray-800 relative"
              >
                <p className="font-semibold">
                  {r.idClient?.name || "Anónimo"}
                </p>
                <p className="mt-1">{r.message}</p>
                {/* Solo puede borrar su reseña */}
                {r.idClient?._id === usuarioActual && (
                  <button
                    onClick={() => handleEliminarReview(r._id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Eliminar reseña"
                  >
                    ×
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* 💲 Precio y cantidad */}
        <div className="text-xl font-bold mt-2 text-gray-900">
          ${producto.price}
        </div>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            <FaMinus />
          </button>
          <span className="min-w-[2rem] text-center">{cantidad}</span>
          <button
            onClick={() => setCantidad(cantidad + 1)}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors"
          >
            <FaPlus />
          </button>
        </div>

        {/* 🛒 Botón para agregar al carrito */}
        <div className="bg-white p-4 rounded shadow">
          <button className="w-full bg-green-700 text-white px-5 py-2 rounded flex justify-center items-center gap-2 hover:bg-green-800 transition-colors">
            <FaShoppingCart />
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;