import React from "react";
import { useSelector } from "react-redux";
import Tabs from "../../components/Tabs";
// import { courses } from "../../resources/courses";
import * as utils from 'akashatools';
import Section from "../../components/Section";

function Education () {
	// Destructure data.
	const { portfolioData } = useSelector( ( state ) => state.root );
	const { educations } = portfolioData;

	const getEducations = ( data ) => {
		if ( utils.val.isValidArray( data, true ) ) {
			let sortedData = [ ...data ].sort( ( a, b ) => {
				if ( a.showIndex > b.showIndex ) return 1;
				if ( a.showIndex < b.showIndex ) return -1;
				return 0;
			} );
			return sortedData.map( ( degree, index ) => {
				return (
					<div
						className="p-4"
						label={ degree.degree }
						key={ degree._id }
						id={ degree._id }
						index={ index }
					>
						<div className="display-info-content">

							<div className="flex-group">
								<div className="flex-col-spread gap-4">
									<div className="flex-h-start flex-row-shrink">
										<div className="flex-col-spread flex-spread-full gap-2">
											<h1 className="text-highlightColor text-2xl">{ degree.location }</h1>
											<h1 className="header-section text-xl">{ degree.degree }{ ( degree?.major && degree?.major !== 'N/A' ) ? `, ${ degree.major }` : '' }</h1>
										</div>
										<div className="flex-col flex-spread-full flex-v-end flex-h-start">
											<h2 className="text-highlightColor text-lg">{ degree.date }</h2>
										</div>
									</div>

									<div className="flex-row-spread px-4">
										{/* <p className="text-white">{ experience.description }</p> */ }
										{
											utils.val.isValidArray( degree.subjects, true ) && (
												<div className="flex-col flex-v-start gap-3">
													<h2 className={ `text-orange-200 text-2xl` }>Degrees: </h2>
													<ul className="info-list">
														{ degree.subjects.map( ( subject ) => (
															<li
																className="info-list-item"
																key={ `education-subjects-${ degree.index }-list-item-${ subject }` }
																id={ `education-subjects-${ degree.index }-list-item-${ subject }` }>
																<h3 className="text-white text-md text-align list-item-text">{ subject }</h3>
															</li>
														) ) }
													</ul>
												</div>
											)
										}
										<div className="display-image-container">
											<div
												className="link-button-absolute"
												style={ {
													position: 'absolute',
													top: '30%',
													right: '2%',
												} }
											>
												<a
													href={ degree.link }
													className="button">
													{ `University Website` }
												</a>
											</div>

											<img
												className="display-image"
												src={ degree.image }
												alt="Degree Image"
											/>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				);
			} );
		}
	};

	return (
		<>
			<Section.Text
				type="title"
				content="Education"
				// scale={ `3xl` }
				classes={ 'text-3xl' }
				separator={ true }
			/>
			{ portfolioData && (
				<Tabs
					type={ "top" }
					rounded={ false }
					centered={ true }
					padContent={ true }
					contentPadding={ `0.25rem 0.25rem` }
					fillArea={ false }
					roundedNav={ false }
					contentBoxShadow={ true }
					navBoxShadow={ true }>
					{ getEducations( educations ) }
				</Tabs>
			) }
		</>
	);
}

export default Education;
