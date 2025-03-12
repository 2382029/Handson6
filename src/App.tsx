<<<<<<< HEAD

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Carts from "./pages/Comments";
import Post from "./pages/Post";
import Product from "./pages/Product";
import Recipes from "./pages/Recipes";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Todos from "./pages/Todos";
const queryClient = new QueryClient()

function App() {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home/>} />
			<Route path="product" element={<Product />} />
			<Route path="product/add" element={<AddProduct />} />
			<Route path="product/:id" element={<ProductDetail/>}/>
			<Route path="product/:id/edit" element={<EditProduct/>}/>
			<Route path="recipes" element={<Recipes />} />
			<Route path="posts" element={<Post />} />
			<Route path="comments" element={<Carts />} />
			<Route path="/todos" element={<Todos />} />
		</Route>
	));
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	)
}

export default App
=======
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
  } from "react-router-dom";
  import RootLayout from "./layouts/RootLayout";
  import Carts from "./pages/Carts";
  import Post from "./pages/Post";
  import Product from "./pages/Product";
  import Recipes from "./pages/Recipes";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import ProductDetail from "./pages/ProductDetail";
  import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
  
  const queryClient = new QueryClient();
  
  function App() {
	const router = createBrowserRouter(
	  createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
		  <Route index element={<Home />} />
		  <Route path="/product" element={<Product />} />
		  <Route path="/product/add" element={<AddProduct/>}></Route>
		  <Route path="/product/:id" element={<ProductDetail />} />
		  <Route path="recipes" element={<Recipes />} />
		  <Route path="posts" element={<Post />} />
		  <Route path="carts" element={<Carts />} />
		</Route>
	  )
	);
	return (
	  <>
		<QueryClientProvider client={queryClient}>
		  <RouterProvider router={router} />
		</QueryClientProvider>
	  </>
	);
  }
  
  export default App;
  
>>>>>>> 9c3a06b332dea2eee06cdae0073f329a91f64d74
