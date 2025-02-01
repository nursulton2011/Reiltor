import { Heading } from "../../components/typography/Heading";

const card = () => {
  return (
    <>
      <img src="" alt="" />
      <div style={{ display: "flex" }}>
        <img src="" alt="" />
        <Heading level="6" />
      </div>
      <Heading level="2" text="price" />
      <div style={{ disply: "flex" }}>
        <Heading level="5" text={`${home.bedcount} bed`} />
        <Heading level="5" text={`${home.bathcount} bath`} />
        <Heading level="5" text={`${home.sqfcount} sqft`} />
      </div>
      <Heading level="5" text={`${home.adress}`} />
    </>
  );
};
export const MainPage = () => {
  return <></>;
};
