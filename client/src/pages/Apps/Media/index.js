// A basic CDN for uploading and handling images in the portfolio.
import React, { useState, useEffect, useRef } from "react";
import { FaCheck, FaCheckCircle, FaEdit, FaPlus, FaTimes } from 'react-icons/fa';
import Section from '../../../components/Section';
// import { Tabs } from 'antd';
// import { TabsProps } from "antd";
// const { TabPane } = Tabs;
import Button from '../../../components/Button';
import Tabs from '../../../components/Tabs';
import Input from '../../../components/Form/Input';
import Card from '../../../components/Card/index.js';
import Image from '../../../components/Image/index.js';
import { useDispatch, useSelector } from "react-redux";
import { SetLoading, SetMedia } from "../../../redux/rootSlice.js";
import Dialog from "../../../components/Dialog/index.js";
import { Modal, message } from 'antd';
import Form from "../../../components/Form/index.js";

import axios from 'axios';
import useUpload from './../../../lib/hooks/useUpload.js';
import API from './../../../lib/services/api.js';
import { deleteImage, editImage, fetchAllImages, uploadImage } from "../../../lib/services/mediaService.js";
import * as utils from 'akashatools';

const Media = (props) =>
{
	const items = [
		{
			key: "0",
			label: `Media Form`,
			children: <Media.Upload />,
			enabled: true,
		},
		{
			key: "1",
			label: `Media Library`,
			children: <Media.Library />,
			enabled: true,
		}
	];

    // Layout consists of an upload field and a gallery. 
    // Each image should have a hover-over overlay showing options such as edit, delete, etc.
    return (
        <>
    		<Section>
    			<Section.Header>
    				<Section.Text
    					content="Media"
    					type="title"
    					scale={`3xl`}
    					separator={true}>
    				</Section.Text>
                </Section.Header>
                
                <Section.Content>

                    <Tabs
        				// Setup & Runtime
        				items={items}
        				type="card"
        				navPosition="top"
        				size={"small"}
        				defaultActiveIndex="0"
        				activeIndex="0"
        				// Styling
        				centered={true}
        				padContent={true}
        				padding={`0.5rem 0.5rem`}
        				fillArea={true}
        				roundedNav={true}
        				contentBoxShadow={true}
        				navBoxShadow={true}
        				// onChange={onChange}
                        style={ { margin: 0 } }>
                        
    				</Tabs>

                </Section.Content>
            </Section>
            
        </>
    )
}

const Library = (props) =>
{
    // Gallery for images and other media stored on the server.
    const {
        layout = "mosaic",
        useCards = true,
        showInfo = true,
        // files,
        // debug
    } = props;

	const dispatch = useDispatch();
	const { debug, loading, media } = useSelector((state) => state.root);
    // const [ media, setMedia ] = useState( null );
    const [showLightboxModal, setShowLightboxModal ] = useState( false );
    const [lightboxModalImage, setLightboxModalImage ] = useState( null );
	const [formModalOpen, setFormModalOpen] = React.useState(false);
	const [formModalInitialData, setFormModalInitialData] = React.useState(null); // null | { an existing item's data }
	const [formModalType, setFormModalType] = React.useState("add"); // "" | "ADD" | "EDIT"
    const [ formDataModel, setFormDataModel ] = React.useState( [] );
    const [ selectedFile, setSelectedFile ] = useState( null );
	const [currentData, setCurrentData] = React.useState(null);
    const [ confirmed, setConfirmed ] = React.useState( false ); // A basic TRUE / FALSe flag for handling asking to confirm when deleting an entry.
    
    
	useEffect(() => {
		// On initial mount, build data model.
		let model;
		if (utils.val.isValidArray(media, true)) {
			model = utils.ao.cleanJSON(media[0]);
		} else if (utils.val.isObject(media)) {
			model = utils.ao.cleanJSON(media);
		}
		if (debug) console.log("Media Library.js :: model: ", model);
		setFormDataModel(model);
	}, []);

	const fetchImages = async () => {
		try {
            dispatch( SetLoading( true ) );
            const res = await fetchAllImages();
            if ( res )
            {
                // Service function returns the data.
                dispatch( SetMedia( res ) );
            }

			// console.log( response.data );
            // dispatch( SetBlogData( response.data ) );
			dispatch(SetLoading(false));
		} catch (error) {
			dispatch(SetLoading(false));
		}
    };

    const onDelete = async ( filedata ) =>
    {
        let id = filedata._id;
        console.log( "Media Library.js :: onDelete(", filedata, ")", " :: ", "id = ", id );
		try {
            const res = await deleteImage( id );
            if ( res.success )
            {
                // Remove this specific file from the array.
                message.success(res.message);
                let updated = [ ...media ].filter( ( f ) => ( f._id !== id ) );
                dispatch( SetMedia( updated ) );
                onSetCancel();
                console.log( "Successfully deleted image. " );
            }
            else
            {
                console.error( "Error deleting image: ", res.message );
            }
        } catch ( error )
        {
            console.error( "Error deleting image: ", error.message );
            message.error(error.message);
		}
    }

    const onSubmit = async ( data ) =>
    {
        try
        {
            let res;
            if ( formModalType === "add" )
            {
                res = await uploadImage( data );
            }
            else if ( formModalType === "edit" )
            {
                res = await editImage( data );
            }

            if ( res.success )
            {
                // Returned data is the new or updated file. 
                message.success(res.message);
                let file = res.data;
                let updated = [ ...media ];
                updated = updated.map( ( f ) =>
                {
                    // Swap in the new or edited file. 
                    if ( f._id === file._id ) return file;
                    else return f;
                } );
                dispatch( SetMedia( updated ) );
            }
            else
            {
                console.error( "Media Library :: onSubmit(", data, ") :: Error with response: ", res );
                message.error(res.message);
            }
        } catch ( error )
        {
            console.error( "Error updating / uploading image: ", error.message );
            message.error(error.message);
        }
    }
    
    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        console.log( "Media Gallery :: Media list is now: ", media );
    }, [media]);

    const buildGallery = ( files ) =>
        {
            // Build a temporary gallery of images with X buttons to cancel specific files if needed.
            // Can add extra fields to each later.
            console.log( "Build Preview Gallery: Input = ", files );
            if ( files )
            {
                /*
					<Card.Grid
						data={input}
						enableControls={true}
						elementControls={adminControls}
						itemWidth={`25rem`}
					/>
                */
                // if ( utils.val.isValidArray( files, true ) )
                // {
                    // Is an array of images.
                    return (
                        <div className="masonry-container" classes='image-grid' padContent={ 0 } padding={ 0 }>
                            <div className="masonry-columns">
                            {
                                files.map(
                                    ( file, index ) =>
                                    {
                                        let filedata = file.data;
                                        let path = filedata.path;
                                        // path = encodeURI( path );
                                        // try
                                        // {
                                        //     path = decodeURI( path );
                                        //     // console.log(path);
                                        //     // Expected output: "https://mozilla.org/?x=шеллы"
                                        // } catch (e) {
                                        //     // Catches a malformed URI
                                        //     console.error(e);
                                        // }
        
                                        let fileURI = 'data:content/type;base64,' + file.file;
                                        let filePath = "file://" + path;
                                        // Clean the path name up further if needed.
                                        filePath = filePath.replace( '%20', ' ' );
                                        // let id = file._id;
                                        let key = `image-grid-item-${ filedata.uploadedAt ? filedata.uploadedAt : Math.random() * 1e9 }`;

                                        // console.log( "Media lib container :: filePath = ", filePath, " :: ", "file data = ", filedata );
                                        return (
                                            <div
                                                className="masonry-brick"
                                                classes="text-white shadow grid-card image-grid-item"
                                                padContent={ 0 }
                                                padding={ 0 }
                                                id={ key }
                                                key={ key }
                                            >
                                                <Card.Header classes="text-white shadow" borderBottom={false} >
                                                    { file.name }
                                                    <Button
                                                        classes={'close-button button-pos-corner'}
                                                        id={`image-close-button-${filedata.uploadedAt ? filedata.uploadedAt : Math.random() * 1e9 }`}
                                                        value="X"
                                                        label="X"
                                                        onClick={ () =>
                                                        {
                                                            // Remove this specific file from the array.
                                                            // let updated = [ ...files ].filter( ( f ) => ( f !== file ) );
                                                            // dispatch( SetMedia( updated ) );
                                                            onDelete( filedata );
                                                        } }
                                                    />
                                                    
                                                </Card.Header>
                                                
                                                <Card.Body classes='grid-item-container' >
                                                    <img 
                                                        src={ fileURI }
                                                        alt=''
                                                        className={ "h-60 w-80 grid-item image image-grid-item" }
                                                        onClick={ ( e ) =>
                                                            {
                                                                // Open the lightbox modal.
                                                                let selected = {
                                                                    ...filedata,
                                                                    URI: fileURI,
                                                                    filepath: filePath
                                                                };
                                                                // console.log( "Opening lightbox modal. :: selected = ", selected, " :: ", "URI = ", fileURI );
                                                                // filedata.URI = fileURI;
                                                                // filedata.path = filePath;
                                                                // setLightboxModalImage( fileURI );
                                                                // setSelectedFile( filedata );
                                                                onSetLightbox( selected );
                                                                // setShowLightboxModal( true );
                                                            }}
                                                    />
                                                    {/*
                                                    <Section.Image
                                                        classes="h-60 w-80 grid-item"
                                                        containerClasses="grid-item"
                                                        key={ `image-preview-${ index }-${ file.name }` }
                                                        id={ `image-preview-${ index }-${ file.name }` }
                                                        content={ {
                                                            image: fileURI,
                                                            link: '', // filePath
                                                        } }
                                                        onClick={ ( e ) =>
                                                        {
                                                            // Open the lightbox modal.
                                                            let selected = {
                                                                ...filedata,
                                                                URI: fileURI,
                                                                filepath: filePath
                                                            };
                                                            // console.log( "Opening lightbox modal. :: selected = ", selected, " :: ", "URI = ", fileURI );
                                                            // filedata.URI = fileURI;
                                                            // filedata.path = filePath;
                                                            // setLightboxModalImage( fileURI );
                                                            // setSelectedFile( filedata );
                                                            onSetLightbox( selected );
                                                            // setShowLightboxModal( true );
                                                        }}
                                                    />
                                                    */}
                                                    {
                                                        /*
                                                    <Image
                                                        containerClasses="grid-item"
                                                        src={ fileURI }
                                                        alt='preview'
                                                        key={ `image-preview-${ index }-${ file.name }` }
                                                        id={ `image-preview-${ index }-${ file.name }` }
                                                        content={ {
                                                            image: fileURI,
                                                            link: filePath
                                                        } }
                                                        boxShadowEnabled={ false }
                                                        padding={0}
                                                        lightbox={ false }
                                                    />
                                                        */
                                                    }
                                                </Card.Body>
                                            </div>
                                        );
                                    }
                                )
                                }
                            </div>
                        </div>
                    );
                // }
            }
            else
            {
                return (<>{ 'Nothing uploaded yet!' }</>);
            }
    }
    
    const onSetLightbox = (data) =>
    {
        // Sets the data to show in a lightbox modal.
		if (utils.val.isObject(data)) {
			setFormModalType("lightbox");
			setSelectedFile(data);
			setFormModalOpen(true);
			// updateCurrentData(data);
		}
    }
    
	const onClone = (data) => {
		if (utils.val.isObject(data)) {
			let valtemp = { ...data };
			valtemp = utils.ao.filterKeys(data, ["_id"]);
			data = valtemp;
			onSubmit(data);
		}
	};

	const onSetDelete = (data) => {
		// Prompt with a simple modal to confirm.
		if (utils.val.isObject(data)) {
			setFormModalType("delete");
			setSelectedFile(data);
			setFormModalOpen(true);
			// updateCurrentData(data);
		}
	};

	const onSetAdd = () => {
		setFormModalOpen(true);
		setSelectedFile(null);
		setFormModalType("add");
		// updateCurrentData(null);
	};

	const onSetEdit = (data = {}) => {
		if (utils.val.isObject(data)) {
			setFormModalOpen(true);
			setSelectedFile(data);
			setFormModalType("edit");
			// updateCurrentData(data);
		}
	};

	const onSetCancel = () => {
		setFormModalOpen(false);
		setSelectedFile(null);
		setFormModalType("");
		setConfirmed(false);
		// updateCurrentData(null);
	};

    const buildModal = ( input ) =>
    {
        if ( formModalType === "lightbox" )
        {
            return (
                
                <Dialog
                    open={ formModalOpen }
                    motion={ `slide` }
                    footer={
                        <div className="flex justify-end w-full">
                            <Button
                                classes="admin-button bg-white px-10 py-2 text-primary"
                                icon={ <FaTimes /> }
                                label={ `Cancel` }
                                onClick={ () =>
                                {
                                    onSetCancel();
                                } } />
                            <Button
                                classes="admin-button px-10 py-2 bg-primary text-white"
                                icon={ <FaEdit /> }
                                label={`Edit`}
                                onClick={ () =>
                                {
                                    onSetEdit(input);
                                } } />
                            <Button
                                label={`Delete`}
                                icon={<FaTimes />}
                                classes="button admin-button admin-button-red"
                                onClick={() => {
                                    onSetDelete(input);
                                }}
                            />
                            <Button
                                label={`Edit`}
                                classes="button admin-button admin-button-primary"
                                onClick={() => {
                                    onSetEdit(input);
                                }}
                            />
                        </div>
                    }
                    onCancel={ () =>
                    {
                        onSetCancel();
                    } }
                    onFinish={ () =>
                    {
                        onSetCancel();
                    } }
                >
                    {
                        // <img src={ `${ input.URI ? input.URI : 'https://placehold.co/400x700/EEE/31343C' }` } alt="Modal Image" />
                    }
                    
					<Section.Pane
						layout={`col`}
						flexDirection={"column !important"}
						alignContent={"flex-start"}
						justifyContent={"flex-start"}>
                        <Section.Image
                            classes="h-60 w-80"
                            content={ {
                                image: input.URI ? input.URI : `https://placehold.co/400x700/EEE/31343C`,
                                link: input.filepath ? input.filepath : ``
                            } }
                        />
                        <hr />
    					<Section.Pane
    						layout={`col`}
    						flexDirection={"column !important"}
    						alignContent={"flex-start"}
    						justifyContent={"flex-start"}>
    						<Section.List
    							data={input}
    							datakeys={ Object.keys( input ) }
    							datatype={"object"}
    						/>
                            </Section.Pane>
                        </Section.Pane>
                </Dialog>
            );
        }
		if (formModalType === "edit" || formModalType === "add") {
			// Build a modal with field inputs for each key in this data set's schema.
			// if (debug) console.log("MediaLibrary.js :: buildModal() :: selectedFile = ", selectedFile, " :: input = ", input);
			if (!selectedFile) {
				// let cleaned = utils.ao.cleanJSON(premodel);
				input = formDataModel;
			}
			return (
				<Dialog
					open={formModalOpen}
					motion={`slide`}
					footer={
						<div className="flex justify-end w-full">
							<Button
								classes="admin-button bg-white px-10 py-2 text-primary"
								icon={<FaTimes />}
								label={`Cancel`}
								onClick={() => {
									onSetCancel();
								}}
							/>
							<Button
								classes="admin-button px-10 py-2 bg-primary text-white"
								icon={<FaPlus />}
								label={`${
									formModalType === `edit` ? "Update" : formModalType === `add` ? "Add" : `Submit`
								}`}
								onClick={() => {
									onSubmit(selectedFile);
								}}
							/>
						</div>
					}
					title={selectedFile ? "Edit" : "Add"}
					onCancel={() => {
						onSetCancel();
					}}
                    onFinish={ onSubmit }>
                        {
                            formModalType === `edit` ? (
                                <>
                                    <Section.Image
                                        classes="h-60 w-80"
                                        content={ {
                                            image: input.URI ? input.URI : `https://placehold.co/400x700/EEE/31343C`,
                                            link: ``
                                        } }
                                    />
                					<Form
                						initialData={ { ...input, URI: '' } }
                						onSubmit={(values) => {
                							onSubmit(values);
                						}}
                						layout={`block`}
                						showViewport={true}></Form>
                                </>
                            ) : (
                                <Upload />
                            )
                        }
				</Dialog>
			);
		} else if (formModalType === "delete") {
			return (
				<Dialog
					open={formModalOpen}
					motion={`fade`}
					footer={null}
					title={"Are you sure?"}
					onCancel={() => {
						onSetCancel();
					}}
					onFinish={(e) => {
						onDelete(input);
					}}>
					<div className="flex justify-end w-full">
						<Button
							classes="admin-button bg-white px-10 py-2 text-primary"
							label={`Cancel`}
							icon={<FaTimes />}
							onClick={() => {
								onSetCancel();
							}}
						/>
						<Button
							classes="admin-button px-10 py-2 bg-primary text-white"
							label={`Confirm`}
							icon={<FaCheck />}
							onClick={() => {
								setConfirmed(true);
								setTimeout(() => {
									onDelete(input);
								}, 1000);
							}}
						/>
					</div>
				</Dialog>
			);
		}
	};

    return (
        <Section>
            <Section.Header>
                <Section.Text
                    content="Library"
                    type="title"
                    scale={`2xl`}
                    separator={true}>
                    <div className="section-nav">
                        <Button
                            icon={<FaPlus />}
                            label={`Upload`}
                            classes="admin-button bg-primary px-5 py-2 text-white"
                            onClick={() => {
                                onSetAdd();
                            }}
                        />
                    </div>
                </Section.Text>
            </Section.Header>
            
            
            {
                formModalOpen
                && (
                    [ 'add', 'edit', 'delete', 'lightbox' ].includes( formModalType )
                    ||
                    selectedFile
                )
                && buildModal( selectedFile )
            }
            
            <Section.Content padding={0} padContent={0}>
                <div className='media-library-container' name='mediaLibrary'>
                    <div className='media-library-content'>
                        {
                            !loading && utils.val.isValidArray( media ) && (
                                buildGallery( media )
                            )
                        }
                    
                    </div>
                </div>
            </Section.Content>
        </Section>
    )
}

/*

            <div id="imageLightbox" class="lightbox-modal">
                <div class="lightbox-modal-content">
                    <div class="lightbox-modal-header">
                            <span class="lightbox-close"
                            
                            onClick={ ( e ) =>
                                {
                                    // Open the lightbox modal.
                                    setLightboxModalImage( null );
                                    setShowLightboxModal( false );
                                }}
                            >&times;</span>
                        <button>Delete</button>
                        <button>Edit</button>
                        <button>Share</button>
                    </div>
                        <div class="lightbox-modal-body">
                        <img src={`${lightboxModalImage ? lightboxModalImage : 'https://placehold.co/400x700/EEE/31343C'}`} alt="Modal Image" />
                    </div>
                    <div class="lightbox-modal-footer">
                        Image details or additional info
                    </div>
                </div>
            </div>
*/

Media.Library = Library;

const Upload = (props) =>
{
    const {
        debug = true,
    } = props;
    const endpoint = "http://localhost:4000";
    const imageRef = useRef( null );
	const dispatch = useDispatch();
	const { portfolioData, appsData, reloadData, loggedIn, user, dataSchema } = useSelector((state) => state.root);

    const [ input, setInput ] = useState( [] );
    const [ loading, setLoading ] = useState( false );
    const [ formType, setFormType ] = useState( "upload" ); // Upload | Edit | DeleteConfirm
    const [ progress, setProgress ] = useState( { 
        started: false,
        pct: 0
    } );
    const [ progressMsg, setProgressMsg ] = useState( null );
    // const { handleImageChange, imgUrl, setImgUrl } = useUpload();

    useEffect(() => {
        console.log( "Input is now: ", input );
    }, [input]);

    function submitForm(e) {
        e.preventDefault();
        const name = document.getElementById("name");
        const files = document.getElementById("files");
        const formData = new FormData();
        formData.append("name", name.value);
        for(let i =0; i < files.files.length; i++) {
            formData.append("files", files.files[i]);
        }
        fetch("http://localhost:5000/upload_files", {
            method: 'POST',
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data"
            }
        })
            .then((res) => console.log(res))
            .catch((err) => ("Error occured", err));
    }

    const onSubmit = async (e) =>
    {
        e.preventDefault();
        // if ( !input && !utils.val.isValidArray( input, true ) )
        if ( !input || ( input.length === 0 ) )
        {
            console.error( "No file(s) selected." );
            message.error( "No file(s) selected." );
            setProgressMsg( "Error: No file(s) selected." );
            return;
        }

        // Append each uploaded image to the upload form data.
        const formData = new FormData();
        for(let i =0; i < input.length; i++) {
            formData.append("files", input[i].file);
        }

        // Add on the uploader's username.
        formData.append( "uploader", user.username );

        console.log( "onSubmit :: Input = ", input, ", ", "formData = ", formData );

        setProgressMsg( "Uploading..." );
        setProgress( prevState =>
        {
            return {
                ...prevState,
                started: true
            }
        } );

        let body = {
            // name: fileName,
            uploader: user.username,
            formData: formData,
        };

        // axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
        axios.defaults.headers.post[ "Access-Control-Allow-Origin" ] = "*";
        axios.defaults.headers.post[ "x-auth-token" ] = localStorage.getItem("token");
        axios.post(
            endpoint + '/api/media/upload',
            formData,
            {
                onUploadProgress: ( progressEvent ) =>
                {
                    // console.log( progressEvent.progress * 100 );
                    setProgress( prevState =>
                    {
                        return {
                            ...prevState,
                            pct: progressEvent.progress * 100
                        }
                    } );
                }
            },
            {
                header: {
                    "x-auth-token": localStorage.getItem("token"), 
                    "Content-Type": "multipart/form-data",
                    // "Content-type": "application/json",
                }
            }
        ).then( ( res ) =>
        {
            console.log( "Axios response.then :: res = ", res.data );
            setProgressMsg( "Finished." );
            // res.json();
        } ).catch( ( err ) =>
        {
            setProgressMsg( "Error Uploading: ", err );
            console.log( "Axios response.err :: err = ", err );
        } );
        // */
    }

    const buildPreviewGallery = ( files ) =>
    {
        // Build a temporary gallery of images with X buttons to cancel specific files if needed.
        // Can add extra fields to each later.
        console.log( "Build Preview Gallery: Input = ", files );
        if ( files )
        {
            // if ( utils.val.isValidArray( files, true ) )
            // {
                // Is an array of images.
                return (
			        <Section.Content classes='image-grid' padContent={0} padding={0}>
                        {
                            files.map(
                                ( file, index ) =>
                                {
                                    let fileURI = file.data;
                                    console.log( "Media lib container :: fileURI = ", fileURI );
                                    return (
                                        <Card classes="text-white shadow" padContent={0} padding={0}>
                                            <Card.Header>
                                                { file.name }
                                            </Card.Header>
                                            
                                            <div className='grid-item-container image-grid-item'>
    											<Image
                                                    containerClasses="grid-item"
                                                    src={ fileURI }
                                                    alt='preview'
                                                    key={ `image-preview-${ index }-${ file.name }` }
                                                    id={ `image-preview-${ index }-${ file.name }` }
    												content={ {
    													image: fileURI,
    													link: fileURI
                                                    } }
                                                    lightbox={true}
    											/>
                                                <Button
                                                    styles={ {
                                                        position: 'absolute', 
                                                        top: '2',
                                                        right: '2'
                                                    }}
                                                    name="X"
                                                    onClick={ () =>
                                                    {
                                                        // Remove this specific file from the array.
                                                        let updated = [ ...files ].filter( ( f ) => ( f !== file ) );
                                                        setInput( updated );
                                                    } }
                                                />
                                            </div>
                                        </Card>
                                    );
                                }
                            )
                        }
                    </Section.Content>
                );
            // }
        }
        else
        {
            return (<>{ 'Nothing uploaded yet!' }</>);
        }
    }

    const fileToDataURI = ( file ) =>
    {
        // if ( typeof file === 'blob' )
        if ( file )
        {
            const reader = new FileReader();
            reader.onloadend = () =>
            {
                // The file is now base64. 
                // Update state. 
                return reader.result;
            }

            // Call onloadend by reading it as a data URI.
            reader.readAsDataURL( file );
        }
    }

    const handleInputChange = ( e ) =>
    {
        // Handles the image(s) input field change event.
        let files = [ ...e.target.files ];
        let temp = [];
        if ( files ) {
            // Is at least one image / file.
            // Build each image object so it's ready for viewing / sending to the server.
            Object.keys( files ).forEach( ( key, index ) =>
            {
                let file = files[ key ];
                console.log( "File = ", file, "\nfile.type = ", file.type );
                // file.data = URL.createObjectURL( file );
                // file.data = fileToDataURI( file );
                if ( file && file.type.startsWith( "image/" ) )
                {
                    let f = {
                        file: file,
                        data: URL.createObjectURL( file )
                    };
                    temp.push( f );
                }
            }
            );
        }

        console.log( "Result of handling input change: {", temp, "} :: Saving into state. " );
        setInput( [ ...input, ...temp ] );
    }

    return (
        <Section>
            { /*
            <Section.Header>
                <Section.Text
                    content="Upload Form"
                    type="title"
                    scale={`2xl`}
                    separator={ true }>
                        <div className="section-nav">
                            <Button
                                icon={<FaPlus />}
                                label={`Upload`}
                                classes="admin-button bg-primary px-5 py-2 text-white"
                                onClick={() => {
                                    // onSetAdd();
                                }}
                            />
                        </div>
                </Section.Text>
            </Section.Header>
            */ }
            
            <Section.Content>

                <div className='media-container flex flex-col items-center justify-center w-[100%]' name='uploadForm'>
                    {
                        progress.started && <div className='progressBar'>
                            <progress max='100' value={ progress.pct }></progress>
                            <h5>{progressMsg}</h5>
                        </div>
                    }
                    <form
                        id={`file-upload-form`}
                        key={`file-upload-form`}
                        className='form-container'
                        onSubmit={ onSubmit }
                        // action='/upload'
                    >

                        <div className='form-inputs-container'>

                            <div className="upload-form ">

                                <div className="flex flex-col items-center justify-center w-[100%]">

                                    <div className={ `input-group input-group-inline` }>

                                        <label htmlFor="transactions">Select a file</label>
                                        <input
                                            type="file"
                                            name="files"
                                            id="formFiles"
                                            // hidden
                                            // ref={ imageRef }
                                            multiple
                                            onChange={ ( e ) =>
                                            {
                                                console.log( "Input change event :: e.target = ", e.target, e.target.files );
                                                handleInputChange( e );
                                            } }
                                        />

                                    </div>
                                    <div className={ `input-group input-group-inline` }>

                                        <div className="flex justify-end w-full">
                                            <Button
                                                icon={<FaCheckCircle />}
                                                label={`Upload`}
                                                className="admin-button px-10 py-2 bg-primary text-white"
                                                classes="admin-button bg-primary px-5 py-2 text-white"
                                                onClick={(e) => {
                                                    onSubmit(e);
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-end w-full">
                                            { /*
                                                <input type="submit" className='form-control form-button submit-button button' value={"Upload"} />
                                            */ }
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>
                    
                    <div className='media-grid-container'>
                        { buildPreviewGallery( input ) }
                    </div>
                </div>
            </Section.Content>

        </Section>
    )
}

Media.Upload = Upload;
            

export default Media

/*

                                <Input
                                    fieldtype={`text`}
                                    inputProps={{
                                        defaultValue: utils.ao.has("name") ? input.name : "",
                                    }}
                                    label={`name`}
                                    id={`name`}
                                    name={`name`}
                                    onChange={(e) => {
                                        setInput({
                                            ...input,
                                            name: e.target.value,
                                        });
                                    }}
                                    placeholder={`Name`}
                                    required={true}
                                />

*/