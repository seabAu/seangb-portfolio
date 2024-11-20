import React from "react";
import * as utils from "akashatools";
import {
    AiFillGithub,
    AiOutlineMail,
    AiFillLinkedin,
    AiOutlineTwitter,
    AiFillFacebook
} from "react-icons/ai";

function Icons ( props ) {
    const { model } = props;


    const getSiteIcon = ( site = "" ) => {
        switch ( site ) {
            case "email":
                return <AiOutlineMail className={ `social-icon` } />;
            case "github":
                return <AiFillGithub className={ `social-icon` } />;
            case "linkedin":
                return <AiFillLinkedin className={ `social-icon` } />;
            case "twitter":
                return <AiOutlineTwitter className={ `social-icon` } />;
            case "facebook":
                return <AiFillFacebook className={ `social-icon` } />;
            default:
                break;
        }
    };

    const getIcons = ( icons ) => {
        if ( utils.val.isValidArray( icons, true ) // && utils.ao.has( icons, [ "site", "url", "icon" ] ) 
        ) {
            return (
                <ul className="social-icons">
                    { icons.map( ( icon, index ) => {
                        return (
                            <li className="social-icon" key={ `social-icons-${ icon.site }` }>
                                <a href={ icon.url }>
                                    {
                                        getSiteIcon( icon.site )
                                    }
                                </a>
                            </li>
                        );
                    } ) }
                </ul>
            );
        }
        // console.log(Array.fill("A", 2000));
    };

    return (
        getIcons( model )
    );
}

export default Icons;
