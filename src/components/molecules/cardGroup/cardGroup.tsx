import { useEffect, useState } from "react";
import { ImageObject } from "../../../types/api";
import Card from "../../atoms/card/card";
import "./cardGroup.scss";

type CardGroupProps = {
  cardsData: ImageObject[];
  searchQuery?: string;
};

const CardGroup = ({ cardsData, searchQuery = "" }: CardGroupProps) => {
  const [visibleCards, setVisibleCards] = useState<ImageObject[]>([]);
  const [cardsToShow, setCardsToShow] = useState(5);
  const [filteredCards, setFilteredCards] = useState<ImageObject[]>(cardsData);

  const loadMoreCards = () => {
    setCardsToShow((prev) => prev + 5);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      loadMoreCards();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filtrar los cards basado en el searchQuery
  useEffect(() => {
    const filtered = cardsData.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchQuery, cardsData]);

  // Actualizar visibleCards basándose en los filteredCards
  useEffect(() => {
    setVisibleCards(filteredCards.slice(0, cardsToShow));
  }, [cardsToShow, filteredCards]);

  return (
    <div className="card-group">
      {visibleCards.map((data: ImageObject) => (
        <Card key={data.id} data={data} />
      ))}
    </div>
  );
};

export default CardGroup;
