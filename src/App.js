import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProduct from "./products/AddProduct";
import EditProduct from "./products/EditProduct";
import ViewProduct from "./products/ViewProduct";
import { useAuth } from "react-oidc-context";



function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "7c035odu35vc66p71d5qtj0kge";
    const redirect_uri = "https://d1g0nvvjcxwas0.cloudfront.net/";
    const cognitoDomain = "https://ap-south-1xuuv7myad.auth.ap-south-1.amazoncognito.com";
    const response_type = "code";
    window.location.href = `${cognitoDomain}/logout?response_type=${response_type}&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

 if (auth.isAuthenticated) {
  return (
    <div>
      <pre> Hello: {auth.user?.profile.email} </pre>
      <pre> ID Token: {auth.user?.id_token} </pre>
      <pre> Access Token: {auth.user?.access_token} </pre>
      <pre> Refresh Token: {auth.user?.refresh_token} </pre>
      <button onClick={() => auth.removeUser()}>Sign out</button>
    </div>
  );
}


  return (

    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addproduct" element={<AddProduct />} />
          <Route exact path="/editproduct/:id" element={<EditProduct />} />
          <Route exact path="/viewproduct/:id" element={<ViewProduct />} />
        </Routes>
      </Router>
        <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
