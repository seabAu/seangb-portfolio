import axios from 'axios';
import mongoose from "mongoose";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { storage, fileFilter, upload } from '../middleware/multer.js';
import dotenv from 'dotenv';
dotenv.config();
const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "http://localhost";

import { Image, Media } from "../models/mediaModel.js";
// import { getFile, getFiles, deleteFile } from '../utilities/file.js';
import * as file from "../utilities/file.js";

// @route       POST /api/media/upload
// @desc        Upload files
// @access      Private

// Membuat fungsi untuk menghapus file
const deleteFile = ( file ) =>
{
    fs.unlink( file.path, ( err ) =>
    {
        if ( err )
        {
            console.error( err );
            throw new Error( "Could not delete file." );
        }
    } );
};

// Middleware to handle file upload
const uploadFilesMiddleware = ( req, res, next ) =>
{
    upload( req, res, function ( err )
    {
        if ( err instanceof multer.MulterError )
        {
            return res.status( 500 ).json( err );
        } else if ( err )
        {
            return res.status( 500 ).json( err );
        }
        next();
    } );
};

// @route       POST /api/media/upload
// @desc        Upload files
// @access      Private
const Upload = async ( req, res, next ) =>
{
    const mediaData = req.body;
    var success = false;
    // console.log( "Upload request received: ", JSON.stringify( mediaData ), JSON.stringify( req ) );
    let allFiles;
    if ( mediaData )
    {
        console.log( "Object.keys( mediaData ) = ", Object.keys( mediaData ) );
        Object.keys( mediaData ).forEach( async ( key, index ) => 
        {
            let file = mediaData[ key ];
            console.log( "file = ", JSON.stringify( file ), " :: Key = ", key, file.name, " :: data = ", Object.keys( file ) );
            let data = file;
            let { type, size, name, fieldname, mimetype, buffer, lastModified } = data;
            const temp = {
                enabled: true,
                filename: data.name,
                title: data.name,
                tags: [],
                categories: [],
                size: size, // buffer.length,
                path: "",
                uploader: "",
                link: "",
                contentType: type,
                uploadedAt: Date.now().toString(),
                modifiedAt: lastModified,
            };

            try
            {
                const media = new Media( temp );
                await media.save();
                allFiles.push( media );
            } catch ( error )
            {
                console.log( "Error saving media :: ", temp );
            }
        } );
    }
    // const image = new Image( req.body );
    // await image.save();

}

const uploadMedia = async ( req, res, next ) =>
{
    const body = req.body;
    const uploadFiles = req.files;
    const uploadName = body.uploader.toString();
    console.log( "UploadMedia called. uploadFiles = ", uploadFiles, " :: ", "uploadName = ", uploadName, " :: ", "body = ", body );
    /*  // Multer file key-value reference: 
        Key 	        Description 	                                        Note
        fieldname 	    Field name specified in the form 	
        originalname 	Name of the file on the user's computer 	
        encoding 	    Encoding type of the file 	
        mimetype 	    Mime type of the file 	
        size 	        Size of the file in bytes 	
        destination 	The folder to which the file has been saved 	        DiskStorage
        filename 	    The name of the file within the destination 	        DiskStorage
        path 	        The full path to the uploaded file 	                    DiskStorage
        buffer 	        A Buffer of the entire file 	                        MemoryStorage
    */

    /*  // Media schema fields: 
        enabled
        filetype
        filename
        title
        contentType
        size
        uploader
        path
        link
        base64URI
        tags
        categories
        uploadedAt
        modifiedAt
    */

    var success = false;
    let allFiles = [];
    let errorFiles = []; // Files that were unable to be uploaded for some raisin.

    try
    {
        let files = [];
        uploadFiles.forEach( async ( file, index ) => 
        {
            const filePath = path.join(
                __dirname,
                // file.destination.toString(),
                file.filename
            );
            // const filePath = `${ HOST }:${ PORT }/uploads/${ file.filename }`;

            const f = {
                enabled: true,
                filename: file.filename,
                title: file.filename,
                uploader: uploadName.toString() | "",
                size: file.size,
                link: filePath,
                // path: `${ HOST }/${ PORT }/uploads/${ file.filename }`,
                path: filePath,
                contentType: file.mimetype,
                uploadedAt: Date.now().toString(),
                modifiedAt: Date.now().toString(),
                tags: [],
                categories: [],
            };
            console.log( `Processing file #${ index }: `, file, " :: ", "Processed: ", f );
            files.push( f );
        } );
        // 
        let media = await Media.insertMany( files );
        
        // res.status( 201 ).send( 'Files uploaded successfully' );
        res.send( {
            data: files,
            success: true,
            message: "Files uploaded successfully",
            status: 201,
        } );
    } catch ( error )
    {
        // res.status( 500 ).send( { message: error.message } );
        res.send( {
            data: error,
            message: "Error uploading files: " + error.message,
            success: false,
            status: 500,
        } );
    }

    // uploadFiles.forEach( async ( file, index ) => 
    // {
    //     // let file = uploadFiles[ index ];
    //     console.log( "file = ", JSON.stringify( file ), " :: file = ", file, file.name, " :: data = ", Object.keys(file) );
    //     let data = file;
    //     let { type, size, name, fieldname, mimetype, buffer, lastModified } = data;
    //     const filePath = path.join( __dirname, file.destination.toString(), file.filename );
    //     const temp = {
    //         enabled: true,
    //         filename: file.filename,
    //         title: file.filename,
    //         uploader: "",
    //         size: file.size,
    //         link: filePath,
    //         // path: `${ HOST }/${ PORT }/uploads/${ file.filename }`,
    //         path: filePath,
    //         contentType: file.mimetype,
    //         uploadedAt: Date.now().toString(),
    //         modifiedAt: Date.now().toString(),
    //         tags: [],
    //         categories: [],
    //     };
    //     
    //     try {
    //         const media = new Media( temp );
    //         await media.save();
    //         allFiles.push( media );
    //         console.log( "Success saving media :: ", temp, " :: ", "allFiles is now = ", allFiles );
    //         // res.send({
    //         //     data: media,
    //         //     success: true,
    //         //     message: "Files uploaded successfully",
    //         //     status: 201,
    //         // });
    //     } catch (error) {
    //         console.log( "Error saving media :: ", temp, error.message );
    //         errorFiles.push( { file: file, message: error.message } )
    //         // res.send( {
    //         //     data: error,
    //         //     message: error.message,
    //         //     success: false,
    //         //     message: error.message,
    //         //     status: 500,
    //         // } );
    //     }
    // 
    // } );
    // 
    // // If it works, throw a success message.
    // if ( allFiles )
    // {
    //     success = true;
    // }
    // 
    // if ( success )
    // {
    //     res.send( {
    //         data: allFiles,
    //         success: true,
    //         message: "File(s) uploaded added successfully",
    //         status: 201,
    //     } );
    // } else 
    // {
    //     res.send( {
    //         data: errorFiles,
    //         error: "Error uploading files.",
    //         success: false,
    //         message: "500 Error.",
    //         status: 500,
    //     } );
    // }
    // try
    // {
    //     const files = uploadFiles.map( ( file, index ) =>
    //     {
    //         console.log( `Processing file #${index}: `, file );
    //         return {
    //             title: file.filename,
    //             filename: file.filename,
    //             contentType: file.mimetype,
    //             size: file.size,
    //             uploadedAt: new Date(),
    //             modifiedAt: new Date(),
    //             // path: `${ HOST }/${ PORT }/uploads/${ file.filename }`,
    //             path: path.join(__dirname, file.destination, file),
    //         };
    //     } );
    // 
    //     await Media.insertMany( files );
    //     // res.status( 201 ).send( 'Files uploaded successfully' );
    //     res.send({
    //         data: files,
    //         success: true,
    //         message: "Files uploaded successfully",
    //         status: 201,
    //     });
    // } catch ( error )
    // {
    //     // res.status( 500 ).send( { message: error.message } );
    //     res.send( {
    //         data: error,
    //         message: error.message,
    //         success: false,
    //         message: error.message,
    //         status: 500,
    //     } );
    // }
};

const fetchMedia = async ( req, res ) =>
{
    try
    {
        const { id } = req.params;
        const media = await Media.findById( id );
        console.log( "fetchMedia :: media found = ", media );
        const file = req.params.filename;
        const filePath = path.join( __dirname, "uploads", file );
        if ( media )
        {
            // Now that we have a batch of files, we get the file path of each located on the server and return the actual files themselves. 
            // console.log( "Media found: ", json.stringify )
            // res.status( 200 ).json( media );
            // const file = fs.readFileSync(media.path);
            res.send( {
                data: media,
                success: true,
                message: "File fetched successfully",
                status: 201,
            } );
        }
        else
        {
            return res.status( 404 ).send( 'File not found' );
        }
    } catch ( error )
    {
        // res.status( 500 ).send( { message: error.message } );
        res.send( {
            data: error,
            message: error.message,
            success: false,
            message: error.message,
            status: 500,
        } );
    }
};

const fetchAllMedia = async ( req, res ) =>
{
    try
    {
        const { limit } = req.query;
        const media = await Media.find( {} ).limit( Number( limit ) || 0 );
        // console.log( "fetchAllMedia :: media found = ", media );

        // Now that we have a batch of files, we get the file path of each located on the server and return the actual files themselves. 
        // const files = media.map(file => fs.readFileSync(file.path));
        
        let files = [];
        files = await file.getFiles( media );

        /*
        let files = [];
        if ( media )
        {
            media.forEach(
                async ( file, index ) =>
                {
                    // For each media document in the database, use its name and path to find the actual file saved on the server (locally, from this file's perspective).
                    let f = file.getFile( file, index );
                    if ( f && f.hasOwnProperty( 'data' ) && f.hasOwnProperty( 'file' ) )
                    {
                        files.push( f );
                    }
                    // console.log( "Fetching files :: files is now ", files.length, " items long." );
                } );
        }
        */

        console.log( "fetchAllMedia :: ", files.length, " files collected: " );
        // res.status( 200 ).json( media );

        // Extracting file extension
        // const ext = path.extname(action);

        // Setting default Content-Type
        const contentType = "text/plain";

        // Checking if the extension of
        // image is '.png'
        // if (ext === ".png") {
        //     contentType = "image/png";
        // }

        // Setting the headers
        res.setHeader( 'Content-Type', contentType );
        // res.writeHead(200, {
        //     "Content-Type": contentType
        // });

        res.send( {
            data: files,
            success: true,
            message: "Files fetched successfully",
            status: 201,
        } );
    } catch ( error )
    {
        // res.status( 500 ).send( { message: error.message } );

        res.send( {
            data: error,
            message: error.message,
            success: false,
            message: error.message,
            status: 500,
        } );
    }
};

const fetchFilteredMedia = async ( req, res ) =>
{
    try
    {
        const { limit, filename, size, uploadedAt, modifiedAt } = req.query;
        const query = {};
        if ( filename ) query.filename = { $regex: filename, $options: 'i' };
        if ( size ) query.size = { $lte: Number( size ) };
        if ( uploadedAt ) query.uploadedAt = { $gte: new Date( uploadedAt ) };
        if ( modifiedAt ) query.modifiedAt = { $gte: new Date( modifiedAt ) };

        const media = await Media.find( query ).limit( Number( limit ) || 0 );
        
        let files = [];
        files = await file.getFiles( media );

        // Now that we have a batch of files, we get the file path of each located on the server and return the actual files themselves. 
        res.send( {
            data: files,
            success: true,
            message: "Files filtered and fetched successfully",
            status: 201,
        } );
    } catch ( error )
    {
        // res.status( 500 ).send( { message: error.message } );

        res.send( {
            data: error,
            message: error.message,
            success: false,
            message: error.message,
            status: 500,
        } );
    }
};

const editMediaDetails = async ( req, res ) =>
{
    try
    {
        const { id } = req.params;
        const {update} = req.body;
        update.modifiedAt = new Date();
        const updatedMedia = await Media.findByIdAndUpdate(
            id,
            update,
            { new: true }
        );

        res.send( {
            data: updatedMedia,
            success: true,
            message: "File updated successfully",
            status: 201,
        } );
    } catch ( error )
    {
        // res.status( 500 ).send( { message: error.message } );
        res.send( {
            data: error,
            message: error.message,
            success: false,
            message: error.message,
            status: 500,
        } );
    }
};

// app.put( '/api/media/:id', upload.single( 'file' ), async ( req, res ) =>
// {
//     try
//     {
//         const file = req.file;
//         const { id } = req.params;
//         const buffer = await sharp( file.path ).resize( 800 ).toBuffer();
//         const updatedFile = {
//             filename: file.filename,
//             contentType: file.mimetype,
//             imageBase64: buffer.toString( 'base64' )
//         };
//         await Media.findByIdAndUpdate( id, updatedFile );
//         res.status( 200 ).send( 'File updated successfully' );
//     } catch ( error )
//     {
//         res.status( 500 ).send( error.message );
//     }
// } );

const deleteMedia = async ( req, res ) =>
{
    try
    {
        const { id } = req.params;
        const media = await Media.findById( id );
        // const media = await Media.findByIdAndDelete( id );

        if ( media )
        {
            console.log(
                "deleteMedia :: id = ", id, 
                " :: ", "media = ", media, 
                // " :: ", "mediaDeleted = ", mediaDeleted, 
                " :: ", "Media path to be removed: ", media.path 
            );

            // Using the path, delete the file itself on the server's uploads location.
            const wasDeleted = await file.deleteFile(
                media.path
            );

            if ( wasDeleted )
            {
                // Was successfully deleted from server uploads folder.
                // NOW, delete the database copy.
                try {
                    const media = await Media.findByIdAndDelete( id );
                    console.log( "File was successfully removed from the server and database." );
                    res.send( {
                        data: id,
                        success: true,
                        message: "File was successfully removed from the server and database.",
                        status: 201,
                    } );
                } catch (error) {
                    console.error( "Error deleting file from database." );
                    res.send( {
                        data: id,
                        success: false,
                        message: "Error deleting file from database.",
                        status: 501,
                    } );
                }
            }
            else
            {
                // Failed to be deleted from the server uploads folder for some reason.
                console.error( "Failed to delete file from database." );
                res.send( {
                    data: id,
                    success: false,
                    message: "Failed to delete file from database.",
                    status: 501,
                } );
            }
        }
        else
        {
            // Media document not found, regardless of whether the actual file exists or not. 
            console.error( "Failed to find file in database to delete (unlinked)." );
            res.send( {
                data: id,
                success: false,
                message: "Failed to find file in database to delete (unlinked).",
                status: 404,
            } );
        }

    } catch ( error )
    {
        // res.status( 500 ).send( { message: error.message } );
        res.send( {
            data: error,
            message: error.message,
            success: false,
            message: error.message,
            status: 500,
        } );
    }
};

export
{
    Upload,
    uploadMedia,
    editMediaDetails,
    deleteMedia,
    fetchMedia,
    fetchAllMedia,
    fetchFilteredMedia,
};

/*  // Attempt 1 without multer, uploading multiple files to MongoDB.

    // @route       POST /api/media/upload
    // @desc        Upload files
    // @access      Private
    const UploadMedia = async ( req, res ) =>
    {
        const imgData = req.body;
        var success = false;
        console.log( "Upload request received: ", JSON.stringify( imgData ) );
        let allFiles;
        if ( imgData )
        {
            console.log( "Object.keys( imgData ) = ", Object.keys( imgData ) );
            Object.keys( imgData ).forEach( async ( key, index ) => 
            {
                let file = imgData[ key ];
                console.log( "file = ", JSON.stringify( file ), " :: Key = ", key, file.name );
                let data = file;
                    let { type, size, name, fieldname, mimetype, buffer, lastModified } = data;
                    const temp = {
                        enabled: true,
                        filename: data.name,
                        title: data.name,
                        tags: [],
                        categories: [],
                        size: size, // buffer.length,
                        path: "",
                        uploader: "",
                        link: "",
                        contentType: type,
                        uploadedAt: Date.now().toString(),
                        modifiedAt: lastModified,
                };
                
                try {
                    const image = new Image( temp );
                    await image.save();
                    allFiles.push( image );
                } catch (error) {
                    console.log( "Error saving image :: ", temp );
                }
            } );
        }
        // const image = new Image( req.body );
        // await image.save();

        // If it works, throw a success message.
        if ( success )
        {
            res.send( {
                data: allFiles,
                success: true,
                message: "Image(s) uploaded added successfully",
                status: 200,
            } );
        } else 
        {
            res.send( {
                data: imgData,
                error: "Error uploading.",
                success: false,
                message: "500 Error.",
                status: 500,
            } );
        }
    }

    const FetchAllMedia = async (req, res) => {

    }

    // Fetch file by ID
    const FetchFile = async (req, res) => {
        const { id: id } = req.params;
    }

    const FetchFileFiltered = async (req, res) => {

    }


    // @route       POST /api/media/upload
    // @desc        Upload files
    // @access      Private
    const UploadMedia2 = async ( req, res ) =>
        {
            const imgData = req.body;
            console.log( "Upload request received: ", JSON.stringify( imgData ) );
            try
            {
                let allFiles;
                if ( imgData )
                {
                    console.log( "imgDataimgData = ", file );
                    Object.keys( imgData ).foreach( async ( key, index ) => 
                    {
                        let file = imgData[ key ];
                        console.log( "file = ", file, " :: Key = ", key );
                            let { type, size, name, fieldname, mimetype, buffer, lastModified } = file;
                            const temp = {
                                enabled: true,
                                filename: file.name,
                                title: file.name,
                                tags: [],
                                categories: [],
                                size: buffer.length,
                                path: "",
                                uploader: "",
                                link: "",
                                contentType: type,
                                uploadedAt: Date.now().toString(),
                                modifiedAt: lastModified,
                        };
                        
                        try {
                            const image = new Image( temp );
                            await image.save();
                            allFiles.push( image );
                        } catch (error) {
                            console.log( "Error saving image :: ", temp );
                        }
                    } );
                }
                // const image = new Image( req.body );
                // await image.save();
        
                // If it works, throw a success message.
                res.send( {
                    data: allFiles,
                    success: true,
                    message: "Image(s) uploaded added successfully",
                    status: 200,
                } );
            } catch ( error )
            {
                res.send( {
                    data: imgData,
                    error: error,
                    success: false,
                    message: "500 Error.",
                    status: 500,
                } );
            }
    }

    export
    {
        UploadMedia,
        FetchAllMedia,
        FetchFile,
        FetchFileFiltered,
    };
*/