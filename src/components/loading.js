import React from "react";
import MetaMaskContext from "../metamask";
import MetaMaskButton from "../MetaMaskButton";

class Loading extends React.Component {
	render() {
		return (
			<div>
				<div id="loading-container" className="container">
					<h3 id="start-message">
						Please connect your metamask account to begin.
					</h3>
				</div>

				<div id="welcome-container">
					<h1>Welcome!</h1>
					<img
						alt="metamask logo"
						src="/images/metamask.png"
						className="metamaks-logo"
					/>
					<MetaMaskContext.Provider immediate>
					<div className="row">
						<MetaMaskButton className="btn mx-auto d-block" id="connect-button" />
					</div>
					</MetaMaskContext.Provider>
				</div>
			</div>
		);
	}
}
export default Loading;
