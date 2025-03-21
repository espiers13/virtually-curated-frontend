import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import SearchVA from "./pages/SearchVA";
import SearchResultsVA from "./pages/SearchResultsVA";
import ItemPage from "./pages/ItemPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyCollections from "./pages/MyCollections";
import ViewCollections from "./pages/ViewCollections";
import SearchAIOC from "./pages/SearchAIOC";
import SearchResultsAIOC from "./pages/SearchResultsAIOC";
import UserCollectionIndividual from "./pages/UserCollectionIndividual";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  useEffect(() => {
    if (currentUser && Object.keys(currentUser).length > 0) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage currentUser={currentUser} />} />
          <Route
            path="/search/va"
            element={<SearchVA currentUser={currentUser} />}
          />
          <Route
            path="/search/aioc"
            element={<SearchAIOC currentUser={currentUser} />}
          />
          <Route
            path="/search/va/:category/:search_query"
            element={<SearchResultsVA currentUser={currentUser} />}
          />
          <Route
            path="/search/aioc/:search_query"
            element={<SearchResultsAIOC currentUser={currentUser} />}
          />
          <Route
            path="/collections"
            element={<ViewCollections currentUser={currentUser} />}
          />
          <Route
            path="/item/:api/:item_id"
            element={<ItemPage currentUser={currentUser} />}
          />
          <Route
            path="/login"
            element={<Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/signup"
            element={<SignUp setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/mycollections/:username/:user_id"
            element={<MyCollections currentUser={currentUser} />}
          />
          <Route
            path="/mycollection/:user_id/:collection_id"
            element={<UserCollectionIndividual currentUser={currentUser} />}
          />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
