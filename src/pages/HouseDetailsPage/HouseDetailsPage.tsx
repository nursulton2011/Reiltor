import { useParams } from "react-router-dom";
import { useGetAllHouseQuery } from "../../store/api/Houses.api";
import "./HouseDetailsPage.css";

// Типизация данных дома
export interface House {
  coverPhoto?: {
    url: string;
  };
  title: string;
  price: number;
  id: string;
  location: {
    [key: number]: { name: string };
  };
  area?: number; // Добавить площадь
  rooms?: number; // Добавить количество комнат
  phoneNumber?: { mobile?: string }; // Добавить номер телефона
  baths?: number; // Добавить количество ванных
}

export const HouseDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Убедитесь, что id всегда строка
  const { data, error, isLoading } = useGetAllHouseQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;

  const house = data?.hits?.find((house: House) => String(house.id) === id);

  if (!house) return <div>House not found</div>;

  return (
    <div className="house-details">
      <h1>{house.title}</h1>
      <img
        src={house.coverPhoto?.url || "https://via.placeholder.com/300"}
        alt={house.title}
      />
      <p>Price: ${house.price}</p>
      <p>Location: {house.location?.[1]?.name || "Location not available"}</p>
      <p>Area: {house.area ? `${house.area} m²` : "Area not available"}</p>
      <p>Rooms: {house.rooms || "No information about rooms"}</p>
      <p>Phone Number: {house.phoneNumber?.mobile || "No phone number"}</p>
      <p>Baths: {house.baths || "No baths information"}</p>
    </div>
  );
};
