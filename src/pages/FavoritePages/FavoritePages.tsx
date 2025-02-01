import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import { Heading } from "../../components/typography/Heading";
import { useGetAllHouseQuery } from "../../store/api/Houses.api";
import "./FvoritePages.style.scss";

// Тип для дома
interface House {
  id: string;
  coverPhoto: { url: string };
  title: string;
  price: number;
  location: { region: string };
}

export const FavoritesPage = () => {
  const { data, isLoading, error } = useGetAllHouseQuery();
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  ); // Извлекаем избранные из localStorage

  // Сохраняем избранные дома в localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;

  // Фильтруем избранные карточки по id
  const favoriteHouses = data?.hits.filter((house: House) =>
    favorites.includes(house.id)
  );

  return (
    <>
      <Header />
      <Heading text="Избранные" />
      <div className="card-container">
        {favoriteHouses?.length > 0 ? (
          favoriteHouses.map((house: House) => (
            <div className="card" key={house.id}>
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
                  {house.location?.region || "Location not available"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>No favorites yet. Go add some!</div>
        )}
      </div>
    </>
  );
};
