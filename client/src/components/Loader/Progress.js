import React from "react";
import * as utils from 'akashatools';
const Progress = (props) => {
	const {
		id,
		// key,
		message,
		success,
		failure,
		results,
		startValue = 0,
		currValue = 0,
		endValue = 100,
		startTime,
		currTime,
		bgcolor,
		fillercolor,
		labelColor,
		border,
		height,
		width = 100,
		margin = 0,
		padding = 0,
		fillerMargin = 1,
		fillerPadding = 2,
        borderRadius = 50,
        labelPadding = 0,
        barWidth=`0.5`,
	} = props;

	// console.log( "progressbar :: props = ", props );
	const roundToDecimal = (value, decimal_places) => {
		// return Math.round( ( value + Number.EPSILON ) * 100 ) / 100;
		return +(Math.round(value + "e+" + decimal_places) + "e-" + decimal_places);
	};
	const containerStyles = {
		padding: `${labelPadding}px`,
		margin: `0px`,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};

	const bgStyles = {
		height: height,
		width: `${width > 100 ? 100 : width}%`,
		backgroundColor: bgcolor,
		borderRadius: borderRadius,
		border: `${border}`,
		padding: `${padding}px`,
		margin: `${margin}`,
		boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
		display: "flex",
		alignItems: "center",
	};

	const fillerStyles = {
		height: `${barWidth}rem`,
		width: `${Math.floor((currValue / endValue) * 100)}%`,
		padding: `${fillerPadding}px`,
		margin: `${fillerMargin}px`,
		backgroundColor: fillercolor,
		borderRadius: "inherit",
		transition: "width 1s ease-in-out",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		textAlign: "right",
		verticalAlign: "middle",
	};

	const labelStyles = {
		padding: `${padding}px`,
		textShadow: `rgba(0, 0, 0, 0.8) 0px 1px`,
		color: `${labelColor}`,
		fontWeight: "bold",
		fontSize: "0.75rem",
	};

	const getProgressBar = () => {
		return (
			<div
				className="loader-progress-container"
				style={containerStyles}
				id={id ?? ""}
				key={id ?? ""}>
				{message && (
					<div className="loader-progress-message-container">
						{message && <h2 className="loader-progress-message">{message}</h2>}
						{startTime && currTime && (
							<>
								<h2 className="loader-time-elapsed">
									{utils.time.timeElapsed(startTime.getTime(), currTime.getTime() ? currTime.getTime() : new Date().getTime())} Elapsed
								</h2>
								<h2 className="loader-time-elapsed">{utils.time.timeEstimate(startTime.getTime(), new Date().getTime(), currValue, endValue)} Left</h2>
							</>
						)}
						{success !== undefined && success !== null && <h2 className="loader-success-count">{success} successes</h2>}
						{failure !== undefined && failure !== null && <h2 className="loader-failure-count">{failure} errors</h2>}
						{results !== undefined && results !== null && <h2 className="loader-progress-message">{results} Results</h2>}
					</div>
				)}
				<div className="loader-progress-bar-container">
					<div
						className="progress-bar-container"
						style={bgStyles}>
						<div
							className="progress-bar-filler"
							style={fillerStyles}>
							<span
								className="progress-bar-label"
								style={labelStyles}>{`${Math.round((currValue / (endValue === 0 ? 1 : endValue)) * 100)}%`}</span>
						</div>
					</div>
				</div>
			</div>
		);
    };
    
	// return getProgressBar();
    return (
		<div
			className="loader-progress-bar-container"
			style={containerStyles}>
			<div
				className="progress-bar-container"
				style={bgStyles}>
				<div
					className="progress-bar-filler"
					style={fillerStyles}></div>
			</div>
			<span
				className="progress-bar-label"
				style={labelStyles}>{`${Math.round((currValue / (endValue === 0 ? 1 : endValue)) * 100)}%`}</span>
		</div>
	);
};

export default Progress;
