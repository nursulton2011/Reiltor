import { useParams } from "react-router-dom";
import { useGetAllHouseQuery } from "../../store/api/Houses.api";
import "./HouseDetailsPage.css";

export const HouseDetailsPage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetAllHouseQuery();
  // Ищем дом по id
  const house = data?.hits.find((house) => String(house.id) === id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;

  if (!house) return <div>House not found</div>;

  console.log("House ID:", id);
  console.log(house.location[1].name);
  return (
    <div className="house-details">
      <h1>{house.title}</h1>
      <img
        className="house-image"
        src={house.coverPhoto?.url || "https://via.placeholder.com/300"}
        alt={house.title}
      />
      <p>цена: {house.price ? `$${house.price}` : "Price not available"}</p>
      <p>Площадь: {house.area || "площадь не найдена"} m²</p>
      <p>локация: {house.location[1].name || "Локация не найдена"}</p>
      <p>комнаты: {house.rooms}</p>
      <p>Мобильный телефон для связи: {house.phoneNumber.mobile}</p>
      <p>душ: {house.baths || "No baths"}</p>
    </div>
  );
};
