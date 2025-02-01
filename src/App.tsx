import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { useGetAllHouseQuery } from "./store/api/Houses.api";
import "./App.scss";
import { Link } from "react-router-dom";

export const App = () => {
  const { data, error, isLoading } = useGetAllHouseQuery();
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const toggleFavorite = (id: string) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (data) {
      console.log(data); // Проверим, что данные приходят
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;

  return (
    <>
      <Header />
      <div className="card-container">
        {data?.hits.map((house) => (
          <Link to={`/house/${house.id}`} key={house.id} className="card">
            <img
              className="card-image"
              src={house.coverPhoto?.url || "https://via.placeholder.com/300"}
              alt={house.title || "House"}
            />
            <div className="card-content">
              <h2 className="card-title">
                {house.title || "No title available"}
              </h2>
              <p className="card-price">
                {house.price ? `$${house.price}` : "Price not available"}
              </p>
              <p className="card-location">
                {house.location[1].name || "Location not available"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
