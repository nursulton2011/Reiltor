import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type House = {
  id: string;
  title: string;
  price: number;
  location?: {
    region?: string;
  };
  coverPhoto?: {
    url?: string;
  };
};

type HousesResponse = {
  hits: House[];
};

export const HousesApi = createApi({
  reducerPath: "HousesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bayut.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", "dbcf46afc6msh728eaff081972cbp1326e0jsn0124a9ff2f24");
      headers.set("X-RapidAPI-Host", "bayut.p.rapidapi.com");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAllHouse: builder.query<HousesResponse, void>({
      query: () => '/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=10',
    }),
  }),
});

export const { useGetAllHouseQuery } = HousesApi;
