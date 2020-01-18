import React from "react"
import AntButton from 'antd/es/button';

const Button = ({ children, ...rest }) => (
	<AntButton {...rest}>{children}</AntButton>
)

export default Button