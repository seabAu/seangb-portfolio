// Helper functions for fetching and saving files.
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { URL, fileURLToPath } from "url";

export const getFile = ( file, index ) =>
{
    // const filepath = file.path;
    const filePath = file.path.split( "%20" ).join( " " );
    const fileName = file.filename;
    console.log( "Fetching file from local storage :: file path = ", filePath, " :: ", "file name = ", fileName );

    if ( fs.existsSync( filePath ) )
    {
        /*
            const fileStream = fs.readFile(
                filePath,
                { encoding: "utf8" },
                function ( err, content )
                {
                    // Serve up the image.
                    console.log( "Fetching file from local storage :: fileStream = ", content.toString().substring( 0, 16 ) );
                    files.push( content );
                    // files.push( {
                    //     data: file,
                    //     file: content
                    // } );
                }
            );
        */
        const fileStream = fs.readFileSync( filePath, { encoding: 'base64', flag: 'r' } );

        // console.log( "getFile :: Returning data: ", {
        //     data: file,
        //     file: fileStream,
        // } );
        return {
            data: file,
            file: fileStream,
        };
    }
}

export const getFiles = async ( media ) =>
{
    // Expects a list of media document objects.

    let files = [];
    if ( media )
    {
        media.forEach(
            async ( file, index ) =>
            {
                // For each media document in the database, use its name and path to find the actual file saved on the server (locally, from this file's perspective).
                let f = getFile( file, index );
                if ( f && f.hasOwnProperty( 'data' ) && f.hasOwnProperty( 'file' ) )
                {
                    files.push( f );
                }
                // console.log( "Fetched file: ", f, " :: ", " f.hasOwnProperty( 'data' ) = ", f.hasOwnProperty( 'data' ), " :: ", "f.hasOwnProperty( 'file' ) = ", f.hasOwnProperty( 'file' ), " :: ", "files is now: ", files );
                // console.log( "Fetching files :: files is now ", files.length, " items long." );
            } );
    }

    return files;
    /*
    const filePath = file.path.split( "%20" ).join( " " );
    const fileName = file.filename;
    if ( fs.existsSync( filePath ) )
    {
        const fileStream = fs.readFileSync( filePath, { encoding: 'base64', flag: 'r' } );

        files.push( {
            data: file,
            file: fileStream,
        } );
    }
    */
}

export const deleteFile = async ( path ) =>
{
    // Delete a file from the server uploads folder by path.
    // fs.statSync( path, function ( err, stats )
    // {
    //     console.log( stats ); // here we got all information of file in stats variable
    //  
    //     if ( err )
    //     {
    //         return console.error( err );
    //     }
    //  
    //     fs.unlink( './server/upload/my.csv', function ( err )
    //     {
    //         if ( err ) return console.log( err );
    //         console.log( 'file deleted successfully' );
    //     } );
    // } );
    
    // let p = path.basename( path );
    let p = fileURLToPath( 'file://' + path );
    const filePath = path.split( "%20" ).join( " " );

    console.log(
        'deleteFile :: Attempting to delete file at path = ', path,
        " :: ", "p = ", p.toString(),
        " :: ", "filePath = ", filePath
    );

    if ( fs.existsSync( filePath ) )
    {
        try {
            fs.unlinkSync( filePath );
            console.log(`File at '${path}' has been deleted.`);
        } catch (err) {
            // An error occurred while deleting the file
            if (err.code === 'ENOENT') {
                // The file does not exist
                console.log('Error deleting file: The file does not exist.');
            } else {
                // Some other error
                console.log('Error deleting file: ', err.message, " {Error code: ", error.code, "} ");
            }
            return false;
        } finally
        {
            // Successfully deleted the file. 
            return true;
        }
    }
    else
    {
        console.error( `Error deleting file: `, `File not found` );
        return false;
    }
}

/*
fs.readFile('index.html', function(err, data) {
    if (err) {
    	console.log(err);
    	res.writeHead(500, {'Content-Type': 'text/plain'});
    	res.write(err.toString());
    	res.end();
    } else {
    	res.writeHead(200, {'Content-Type': 'text/html'});
    	res.write(data);
    	res.end();
    }
});
*/

export function importFile(filepath) {
    if (filepath) {
        let data;
        console.error(`importFile :: ${filepath} attempting to import`);
        fetch(`${filepath}`)
            .catch((error) => {
                console.error(`importFile :: ${filepath} returned an error: `, error);
                return;
            })
            .then((response) => {
                if (response) {
                    if (!response.ok) {
                        throw new Error("Http error: " + response.status);
                    } else {
                        return response.json();
                    }
                }
            })
            .catch((error) => {
                console.error(`importFile :: ${filepath} returned an error: `, error);
                return;
            })
            .then((result) => {
                data = result;
                console.log(result);
            });
        if (data) {
            return data;
        }
    }
}

// Source: https://gist.github.com/ZeeshanMukhtar1/d313da2c0aaa997c4125fcb2e2ca9c77
export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};