/* global FB */

import React, {useEffect} from "react";

const FacebookChat = () => {
	useEffect(() => {
		// Load the SDK asynchronously
		window.fbAsyncInit = function () {
			FB.init({
				xfbml: true,
				version: "v16.0",
			});
			if (typeof FB !== "undefined") {
				FB.CustomerChat.showDialog();
			}
		};
		(function (d, s, id) {
			var js,
				fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) return;
			js = d.createElement(s);
			js.id = id;
			js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
			fjs.parentNode.insertBefore(js, fjs);
		})(document, "script", "facebook-jssdk");
	}, []);

	return (
		<>
			<div id='fb-root'></div>
			<div id='fb-customer-chat' className='fb-customerchat'></div>
			<script
				dangerouslySetInnerHTML={{
					__html: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "107169288975957");
            chatbox.setAttribute("attribution", "biz_inbox");
          `,
				}}
			/>
		</>
	);
};

export default FacebookChat;
