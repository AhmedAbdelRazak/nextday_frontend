import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import {Link} from "react-router-dom";

const TrendingCategories = ({allCategories}) => {
	const settings = {
		dots: true,
		infinite: true,
		autoplay: true,
		arrows: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		adaptiveHeight: true,

		responsive: [
			{
				breakpoint: 1200,
				settings: {
					dots: true,
					infinite: true,
					autoplay: true,
					arrows: true,
					speed: 1000,
					slidesToShow: 2,
					slidesToScroll: 1,
					autoplaySpeed: 5000,
					pauseOnHover: true,
					adaptiveHeight: true,
				},
			},
		],
	};

	return (
		<TrendingCategoriesWrapper>
			{allCategories && allCategories.length > 0 ? (
				<div className='container-fluid my-3 ProductSlider'>
					<h3 className=' p-3'>Trending categories</h3>
					<Slider {...settings} className='mb-5'>
						{allCategories &&
							allCategories.map((category, i) => (
								<div className='img-fluid images ml-2 ' key={i}>
									<Carousel
										showArrows={false}
										dynamicHeight={true}
										autoPlay
										infiniteLoop
										interval={5000}
										showStatus={false}
										showIndicators={false}
										showThumbs={false}
									>
										<Link
											key={i.public_id}
											to={`/our-products?filterby=category&categoryName=${category.categorySlug}`}
											onClick={() => {
												window.scrollTo({top: 0, behavior: "smooth"});
											}}
										>
											<img
												className=' mx-auto  product-imgs'
												alt={category.categoryName}
												src={category.thumbnail[0].url}
												style={{
													height: "50vh",
													width: "75%",
													maxHeight: "150px",
													objectFit: "cover",
													borderRadius: "50%",
												}}
											/>
										</Link>
									</Carousel>
									<div className='categoryName'>{category.categoryName}</div>
								</div>
							))}
					</Slider>
				</div>
			) : null}
		</TrendingCategoriesWrapper>
	);
};

export default TrendingCategories;

const TrendingCategoriesWrapper = styled.div`
	background-color: #fbfbf0;

	h3 {
		font-size: 2rem;
		font-weight: bolder;
	}

	.ProductSlider {
		padding: 0px 100px 0px 100px;
	}

	.images {
		margin-left: 20px;
		margin-bottom: 30px;
	}

	.slick-dots {
		color: blue;
	}

	.categoryName {
		font-weight: bolder;
		text-transform: capitalize;
		text-align: center;
		margin-top: 5px;
	}

	@media (max-width: 1400px) {
		.ProductSlider {
			padding: 0px;
		}
	}
	@media (max-width: 1200px) {
		.ProductSlider {
			padding: 0px 10px 0px 10px;
		}

		h3 {
			font-size: 1.4rem;
			font-weight: bolder;
		}
	}
`;
