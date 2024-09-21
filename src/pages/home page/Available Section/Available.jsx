import Title from "../../../components/Title/Title";
import { useEffect, useState } from "react";
import "./available.css";
import AvailableCart from "../../../components/cart/AvailableCart";

const Available = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("./featuredAndAvaiable.json")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);
  console.log(data);


  return (
    <div className="pt-28">
      <Title title={"Available Cars"}></Title>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-center justify-items-center lg:px-40">
        {data.map((car) => (
         <AvailableCart key={car.name} car={car}></AvailableCart>
        ))}
      </div>
    </div>
  );
};

export default Available;