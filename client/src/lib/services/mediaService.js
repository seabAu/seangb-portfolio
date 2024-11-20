// mediaService.js
import axios from 'axios';
import API from './api';

export const fetchAllImages = async () =>
{
    try
    {
        const response = await API.get( `/api/media/` );
        console.log( "mediaService.js :: fetchAllImages :: response = ", response );
        let res = response.data;
        if ( res.success )
        {
            // Successful fetch
            if ( res.data )
            {
                return res.data;
            } else
            {
                return [];
            }
        } else
        {
            // Unsuccessful fetch
            return [];
        }
    } catch ( error )
    {
        console.error( error );
    }
};

export const fetchImage = async ( id ) =>
{
    // Fetch an image by id.
    if ( id )
    {
        try
        {
            const response = await API.get( `/api/media/${ id }` );
            console.log( "mediaService.js :: fetchImage :: id = ", id, " :: response = ", response );
            let res = response.data;
            if ( res.success )
            {
                // Successful fetch
                if ( res.data )
                {
                    return res.data;
                } else
                {
                    return [];
                }
            } else
            {
                // Unsuccessful fetch
                return [];
            }
        } catch ( error )
        {
            console.error( error );
        }
    }
}

export const uploadImage = async ( data ) =>
{
    
}

export const fetchImagesFiltered = async (
    query = {
        limit: null,
        filename: null,
        size: null,
        uploadedAt: null,
        modifiedAt: null,
    }
) =>
{
    try
    {
        const response = await API.get( `/api/media/filter`, {
            query: query,
        } );
        console.log( "mediaService.js :: fetchImagesFiltered :: query = ", query, " :: response = ", response );
        let res = response.data;
        if ( res.success )
        {
            // Successful fetch
            if ( res.data )
            {
                return res.data;
            } else
            {
                return [];
            }
        } else
        {
            // Unsuccessful fetch
            return [];
        }
    } catch ( error )
    {
        console.error( error );
    }
}

export const editImage = async ( id, update ) =>
{
    // Edit an image by id.
    if ( id )
    {
        try
        {
            const response = await API.put( `/api/media/${ id }`, {
                update: update,
            } );
            console.log( "mediaService.js :: editImageDetails :: id = ", id, " :: ", "update = ", update, " :: response = ", response );
            let res = response.data;
            if ( res.success )
            {
                // Successful fetch
                if ( res.data )
                {
                    return res.data;
                } else
                {
                    return [];
                }
            } else
            {
                // Unsuccessful fetch
                return [];
            }
        } catch ( error )
        {
            console.error( error );
        }
    }
}

export const deleteImage = async ( id ) =>
{
    if ( id )
    {
        try
        {
            const response = await API.delete( `/api/media/${ id }` );
            console.log( "mediaService.js :: deleteImage :: id = ", id, " :: response = ", response );
            let res = response.data;
            return res;

            // if ( res.success )
            // {
            //     // Successful fetch
            //     if ( res.data )
            //     {
            //         return res.data;
            //     } else
            //     {
            //         return [];
            //     }
            // } else
            // {
            //     // Unsuccessful fetch
            //     return [];
            // }
        } catch ( error )
        {
            console.error( error );
        }
    }
}

const handleResponse = ( response ) =>
{
    let res = response.data;
    if ( res.success )
    {
        // Successful call
        if ( res.data )
        {
            return res.data;
        } else
        {
            return [];
        }
    } else
    {
        // Unsuccessful call
        return [];
    }
}



/*
const API_URL = 'https://api.findacofounder.online/auth';

export async function registerUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/register`, {email, password});
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.token); // Store the JWT token
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function loginUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password
        }, {withCredentials: true});
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', response.data.token); // Store the JWT token
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}
*/