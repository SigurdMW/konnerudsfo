import React, { useState } from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Datepicker.scss"

export const Datepicker = ({ id, label, date, onChange, showWeekNumbers = true, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<React.Fragment>
			<label htmlFor={id}>{label}</label>
			<span className="ant-input-affix-wrapper">
				<span className="ant-input-prefix" onClick={() => setIsOpen(true)}>
					<i aria-label="icon: calendar" className="anticon anticon-calendar">
						<svg viewBox="64 64 896 896" focusable="false" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true">
							<path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
						</svg>
					</i>
				</span>
				<DatePicker
					selected={date && typeof date === "string" ? new Date(date) : date}	
					onChange={onChange}
					dateFormat="dd.MM.yyyy"
					id={id}
					showWeekNumbers={showWeekNumbers}
					className={"ant-input sfo-input " + className}
					open={isOpen}
					onFocus={() => setIsOpen(true)}
					onClickOutside={() => setIsOpen(false)}				
				/>
			</span>
		</React.Fragment>
	)
}

export default Datepicker