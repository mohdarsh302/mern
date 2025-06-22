// BannerCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const BannerCarousel = () => {
  const bannerImages = [
    "/img/carousel-1.jpg",
    "/img/carousel-2.jpg",
    "/img/carousel-3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="banner-carousel" style={{ margin: "0 auto", width: "100%" }}>
      <Slider {...settings}>
        {bannerImages.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerCarousel;
