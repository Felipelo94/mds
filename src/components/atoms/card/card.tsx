import React from "react";
import "./Card.scss";
import { ImageObject } from "../../../types/api";
import { SlLike, SlReload } from "react-icons/sl";
import { postLike } from "../../../services/postLike";

type cardData = {
  data: ImageObject;
};

const Card: React.FC<cardData> = ({ data }) => {
  const handleClick = () => {
    postLike({ id: data.id });
  };

  return (
    <div className="card">
      <div className="card__price-wrapper">
        <div className="triangle"></div>
        <div className="card__price">{data.price}</div>
      </div>
      <img
        src={data.main_attachment.big}
        alt={data.title}
        className="card__image"
      />
      <div className="card__content">
        <h2 className="card__title">{data.title}</h2>
        <p className="card__subtitle">
          {" "}
          <span className="card__author">by</span> {data.author}
        </p>
      </div>
      <div className="card__footer">
        <button
          className="card__stat"
          onClick={handleClick}
          data-testid="like-button"
        >
          <span className="card__number">{data.likes_count}</span>
          <span className="card__icon">
            <SlLike />
          </span>
        </button>
        <button className="card__stat">
          <span className="card__icon">
            <SlReload />
          </span>
          <span className="card__number">0</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
