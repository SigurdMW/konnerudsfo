import React from "react"
import SignOut from "../SignOut"
import "./Layout.scss"
import { Layout } from 'antd';
import { Link } from "react-router-dom";

const {  Content, Footer } = Layout;

class SiderDemo extends React.Component {

	render() {
		return (
			<Layout>
				<div className="header">
					<div className="container">
						<div className="header__logo">
							<Link to="/">
								<img src="./aks.png" alt="AKS Drammen" />
							</Link>
						</div>
						<div class="header__right">
							<SignOut />
						</div>
					</div>
				</div>
				<div className="container container--main">
					{this.props.children}
				</div>
				<Footer style={{ textAlign: 'center' }}>@2020</Footer>
			</Layout>
		);
	}
}

export default SiderDemo