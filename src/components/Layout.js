import React from "react"
import SignOut from "./SignOut"

const Layout = ({ children }) => (
	<div>
		<main>{children}</main>
		<footer>
			<SignOut />
		</footer>
	</div>
)

export default Layout