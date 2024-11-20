import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as utils from 'akashatools';
import "./Dialog.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdOutlinePushPin } from "react-icons/md";

import Button from "../Button/index.js";
import { useState } from "react";

/*  // ANTD Example
	<div class="ant-message ant-message-top css-dev-only-do-not-override-ixblex" style="left: 50%; transform: translateX(-50%); top: 8px;">
		<div class="ant-message-notice ant-message-notice-error css-dev-only-do-not-override-ixblex">
			<div class="ant-message-notice-content">
				<div class="ant-message-custom-content ant-message-error">
					<span role="img" aria-label="close-circle" class="anticon anticon-close-circle">
						<svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
							<path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z">
							</path>
						</svg>
					</span>
					<span>Request failed with status code 400</span>
				</div>
			</div>
		</div>
	</div>
*/

export function Notify ( props ) {
	const {
		// Child components passed inside this component's element.
		children,
		showChildren = true,
		id = "",
		key = "",
		icon,
		duration = 3000.0, // Duration in milliseconds.
		show = true,
		content,
		type = "default",
		level = "info", // LOADING | WARNING | INFO | ERROR | SUCCESS
		onClick,
		onClose,
		title = "",
		controls = [],
		motionEnabled = true,
		motion = "fade", // ZOOM | FADE
		// Render overrides, if ever needed.
		// Style settings.
		// Can import extra styles.
		classes = "text-highlightColor",
		styles = {},
		debug = false,
	} = props;

	const [ durationTime, setDurationTime ] = useState( false );
	const [ active, setActive ] = useState( false );

	useEffect( () => {
		if ( debug ) console.log( "Notify.JS :: Props = ", props, " :: duration is now: ", duration );
		setDurationTime( new Date().now );
	}, [] );

	const componentStyles = {
		// Default styles go here.
		// User-set styles override default settings.
		...styles,
		// Responsiveness overrides go here.
	};

	const getMotion = ( input ) => {
		switch ( input ) {
			case `zoom`:
				return "text-9xl";
			case `fade`:
				return "text-8xl";
			default:
				return "";
		}
	};

	const onDismiss = () => {
		if ( debug ) console.log( "Notify.js :: onDismiss :: setActive is now: ", false );
		setActive( false );
	};

	return (
		show && (
			<div className={ `notify-root` }>
				<div className={ `notify-mask` }></div>
				<div
					className={ `notify-container ${ !active ? `notify-hidden` : `` } ${ motionEnabled ? ( motion === `fade` ? `${ `notify-fade` }` : motion === `zoom` ? `${ `notify-zoom` }` : motion === `slide` ? `${ `notify-slide` }` : `` ) : ``
						}` }
					onClick={ ( e ) => {
						let classes = e.target.classList;
						if ( classes.contains( `notify-container` ) ) {
							onDismiss();
						}
					} }>
					<div className={ `modal` }>
						{ active ? (
							<div
								className={ `notify-content notify-dark` }
								style={ componentStyles }
								id={ id === `` ? `notify-${ Math.random() * 100 }` : `notify-${ id }` }
								key={ id === `` ? `notify-${ Math.random() * 100 }` : `notify-${ id }` }>
								<div className={ `notify-menu` }>
									<Button
										icon={ <FaCheck className="notify-close-x notify-menu-icon" /> }
										classes={ `notify-menu-button notify-check-button` }
										overrideStyles={ true }
										onClick={ onClick }
									/>
									<Button
										icon={ <FaTimes className="notify-close-x notify-menu-icon" /> }
										classes={ `notify-menu-button notify-close-button` }
										overrideStyles={ true }
										onClick={ onClose }
									/>
								</div>

								<div className={ `notify-body` }>
									{ showChildren && children && children !== false && children }
									{ content && utils.val.isDefined( content ) && content }
								</div>
							</div>
						) : (
							<></>
						) }
					</div>
				</div>
			</div>
		)
	);
}
