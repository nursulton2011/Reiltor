import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
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
  area?: number;
  rooms?: number;
  phoneNumber?: { mobile?: string };
  baths?: number;
}

export const HouseDetailsPage = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id дома из URL
  const { data, error, isLoading } = useGetAllHouseQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {JSON.stringify(error)}</div>;

  const house = data?.hits?.find((house: House) => String(house.id) === id);

  if (!house) return <div>House not found</div>;

  return (
    <>
      <Header />
      <div className="house-details-container">
        <div className="house-details">
          <h1>{house.title}</h1>
          <img
            src={house.coverPhoto?.url || "https://via.placeholder.com/300"}
            alt={house.title}
          />
          <p>Price: ${house.price}</p>
          <p>
            Location: {house.location?.[1]?.name || "Location not available"}
          </p>
          <p>Area: {house.area ? `${house.area} m²` : "Area not available"}</p>
          <p>Rooms: {house.rooms || "No information about rooms"}</p>
          <p>Phone Number: {house.phoneNumber?.mobile || "No phone number"}</p>
          <p>Baths: {house.baths || "No baths information"}</p>
        </div>

        <div className="recommendations">
          <h3>Рекомендации для вашего дома</h3>
          <iframe
            src="https://smartremont.uz/" // Замени на URL рекламного контента
            width="100%"
            height="400px"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />{" "}
          <iframe
            src="https://dafna.uz/" // Замени на URL рекламного контента
            width="100%"
            height="400px"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />{" "}
          <iframe
            src="https://scandihome.uz/carpet" // Замени на URL рекламного контента
            width="100%"
            height="400px"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
};
