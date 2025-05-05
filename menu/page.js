  "use client";
  import React, { useEffect, useState } from "react";
  import { useCart } from "../context/CartContext"; // Import the useCart hook
  import Navbar from "../components/navbar";
  import { Ubuntu } from "next/font/google";

  const ubuntu = Ubuntu({
    weight: ["300", "400", "700"], // Add "300" for lighter font weight
    subsets: ["latin"],
  });


  function Page() {
    const [recipes, setRecipes] = useState([]); // State to store recipes
    const { cart, setCart } = useCart(); // Access cart state

    useEffect(() => {
      fetch("https://dummyjson.com/recipes")
        .then((res) => res.json())
        .then((data) => setRecipes(data.recipes)) // Store recipes in state
        .catch((error) => console.error("Error fetching data:", error)); // Handle errors
    }, []);

    // Function to add items to the cart
    const addToCart = (recipe) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === recipe.id);
        if (existingItem) {
          // If item already exists, increase quantity
          return prevCart.map((item) =>
            item.id === recipe.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          // Otherwise, add new item with quantity 1
          return [...prevCart, { ...recipe, quantity: 1,  price: recipe.price || 10 }];
          
        }
      });
    };

    return (
      <div className={ubuntu.className}>
        <Navbar />
        <ul style={{ marginLeft: "6rem", marginTop: "4rem" }} className="grid grid-cols-3 gap-7">
          {recipes.map((recipe) => (
            <li key={recipe.id}> {/* Ensure unique keys */}
              <div style={{ padding: "1rem", maxWidth: "20rem" }} className="food-product m-4 border-2">
                <img src={recipe.image} alt={recipe.name} className="h-64" />
                <h2 className="text-xl font-semibold">{recipe.name}</h2>
                <p>({recipe.cuisine})</p>
                <p>Calories {recipe.caloriesPerServing}</p>
                <p>Price: ${recipe.price || 10}</p> {/* Add price field (default to 10 if missing) */}
                <button
                  style={{ padding: "0.5rem", marginTop: "1rem" }}
                  className="bg-blue-500 hover:bg-white hover:border-blue-500 border-opacity-100 text-white font-semibold hover:text-black p-2 border border-blue-500 rounded cursor-pointer"
                  onClick={() => addToCart(recipe)}
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  export default Page;
