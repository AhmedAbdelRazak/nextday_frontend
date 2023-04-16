/** @format */

import React, { useEffect, useState } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import ReactGA from "react-ga4";
import NavbarTop from "./Navbar/NavbarTop";
import NavbarBottom from "./Navbar/NavbarBottom";
import NavbarAds from "./Navbar/NavbarAds";
import { getAllAds } from "./apiCore";
import Login from "./pages/SingleProduct/SigninModal/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import RetExchPolicy from "./pages/RetExchPolicy";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import AboutArabic from "./pages/About/AboutArabic";
import Contactus from "./pages/Contact/Contackus";
import ContactArabic from "./pages/Contact/ContactArabic";
import UserWishlist from "./pages/User/UserWishlist";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import ShopPageMain from "./pages/ShopPage/ShopPageMain";
import Cart from "./Checkout/Cart";
import UserDashboard from "./pages/User/UserDashboard";
import CheckoutMain from "./Checkout/CheckoutForm/CheckoutMain";
import PrivateRoute from "./auth/PrivateRoute";
import Footer from "./Footer";

function App() {
	// eslint-disable-next-line
	const [language, setLanguage] = useState("English");
	const [allAdsCombined, setAllAdsCombined] = useState([]);

	useEffect(() => {
		ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENTID);
		ReactGA.send(window.location.pathname + window.location.search);

		setLanguage("English");

		// eslint-disable-next-line
	}, [window.location.pathname]);

	const languageToggle = () => {
		console.log(language);
		localStorage.setItem("lang", JSON.stringify(language));
		// window.location.reload(false);
	};

	useEffect(() => {
		languageToggle();
		// eslint-disable-next-line
	}, [language]);

	const gettingAllAds = () => {
		getAllAds().then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setAllAdsCombined(data[data.length - 1] && data[data.length - 1]);
			}
		});
	};

	useEffect(() => {
		// if (
		// 	isAuthenticated() &&
		// 	isAuthenticated().user &&
		// 	!window.location.pathname.includes("admin")
		// ) {
		// 	window.location.href = `${process.env.REACT_APP_MAIN_URL}/admin/dashboard`;
		// } else {
		// 	return null;
		// }

		gettingAllAds();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (window.location.pathname.includes("/checkout")) {
			return;
		} else {
			localStorage.removeItem("PaidNow");
			localStorage.removeItem("storedData");
			localStorage.removeItem("chosenShippingOption");
			localStorage.removeItem("orderDataStored");
		}

		// eslint-disable-next-line
	}, []);

	return (
		<BrowserRouter>
			<ToastContainer />
			{window.location.pathname.includes("admin") ? null : allAdsCombined &&
			  allAdsCombined.show_ad ? (
				<>
					<NavbarAds />
				</>
			) : null}
			{window.location.pathname.includes("admin") ? null : (
				<>
					<NavbarTop language={language} setLanguage={setLanguage} />

					<NavbarBottom chosenLanguage={language} />
				</>
			)}

			<Switch>
				<Route path='/signin' exact component={Login} />

				<Route
					path='/'
					exact
					component={() => <Home chosenLanguage={language} />}
				/>
				<Route
					path='/product/:categoryslug/:slug/:productId'
					exact
					component={SingleProduct}
				/>
				<Route path='/privacy-policy' exact component={PrivacyPolicy} />
				<Route path='/cookie-policy' exact component={CookiePolicy} />
				<Route path='/return-exchange-policy' exact component={RetExchPolicy} />
				<Route path='/user/wishlist' exact component={UserWishlist} />
				<Route path='/signup' exact component={Register} />
				<Route
					path='/our-products'
					exact
					component={() => <ShopPageMain chosenLanguage={language} />}
				/>
				<Route
					path='/cart'
					exact
					component={() => <Cart chosenLanguage={language} />}
				/>
				<Route path='/checkout' exact component={CheckoutMain} />

				{language === "Arabic" ? (
					<Route path='/contact' exact component={ContactArabic} />
				) : (
					<Route path='/contact' exact component={Contactus} />
				)}

				{language === "Arabic" ? (
					<Route path='/about' exact component={AboutArabic} />
				) : (
					<Route path='/about' exact component={About} />
				)}
				<PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
