import { useState, useEffect } from 'react';

export default function ThemeToggle () {
    const [ theme, setTheme ] = useState( 'system' );
    const [ activeTheme, setActiveTheme ] = useState( 'system' );
    const modes = [ "system", "light", "dark", "cool" ];
    useEffect( () => {
        const theme = localStorage.getItem( 'theme' );
        if ( theme === 'dark' ) {
            document.documentElement.classList.add( 'dark' );
        }
    }, [] );

    // Handle changing the theme. 
    const toggleTheme = () => {
        if ( document.documentElement.classList.contains( 'dark' ) ) {
            document.documentElement.classList.remove( 'dark' );
            localStorage.setItem( 'theme', 'light' );
        } else {
            document.documentElement.classList.add( 'dark' );
            localStorage.setItem( 'theme', 'dark' );
        }
    };


    const setThemeMode = ( mode ) => {
        if ( modes.includes( mode ) ) {
            setTheme( mode.toString() );
            localStorage.setItem( [ 'sgb-portfolio', 'theme', 'mode' ].join( '_' ), 'dark' );
        }
    };

    useEffect( () => {
        const loadTheme = () => {
            // Fetch theme from localstorage if exists. 
            let modepath = [ 'sgb-portfolio', 'theme', 'mode' ].join( '_' );
            if ( localStorage.getItem( modepath ) ) {
                setTheme( localStorage.getItem( modepath ) );
            }
            else {
                // None set; default to system settings.
                setTheme( 'system' );
            }
        };

        // Fetch theme on component load. 
        loadTheme();

    }, [] );

    // The actual theme toggle component. 
    return (
        <main className="flex items-center justify-center p-96 pt-32">
            <div>
                <h1 className="text-center font-bold text-slate-900 dark:text-cyan-500 text-5xl leading-tight mb-3">Theme Changer: </h1>
                <button onClick={ toggleTheme } className="flex justify-center items-center m-auto text-lg w-fit dark:bg-sky-500/50 bg-cyan-700 hover:bg-cyan-800 transition-color duration-200 ease-in-out py-3 px-10 rounded-lg text-gray-50 font-semibold py-[10px] px-4">Toggle Theme</button>
            </div>
        </main>
    );
}

export function ThemeToggleSystem () {
    const [ activeTheme, setActiveTheme ] = useState( 'system' );

    useEffect( () => {
        const savedTheme = localStorage.getItem( "theme" );
        if ( savedTheme === "system" || !savedTheme ) {
            applySystemTheme();
            setActiveTheme( "system" );
        } else {
            applyTheme( savedTheme );
            setActiveTheme( savedTheme );
        }

        const mediaQuery = window.matchMedia( "(prefers-color-scheme: dark)" );
        const handleSystemThemeChange = () => {
            if ( !savedTheme || savedTheme === "system" ) {
                applySystemTheme();
            }
        };

        mediaQuery.addEventListener( "change", handleSystemThemeChange );

        return () => {
            mediaQuery.removeEventListener( "change", handleSystemThemeChange );
        };
    }, [] );

    const applyTheme = ( theme ) => {
        if ( theme === 'dark' ) {
            document.documentElement.classList.add( 'dark' );
        } else if ( theme === 'light' ) {
            document.documentElement.classList.remove( 'dark' );
        }
    };

    const handleThemeChange = ( newTheme ) => {
        setActiveTheme( newTheme );
        localStorage.setItem( 'theme', newTheme );
        if ( newTheme === 'system' ) {
            applySystemTheme();
        } else {
            applyTheme( newTheme );
        }
    };

    const applySystemTheme = () => {
        const systemPrefersDark = window.matchMedia( '(prefers-color-scheme: dark)' ).matches;
        if ( systemPrefersDark ) {
            document.documentElement.classList.add( 'dark' );
        } else {
            document.documentElement.classList.remove( 'dark' );
        }
    };

    return (
        <main className="flex items-center justify-center p-96 pt-32">
            <div>
                <h1 className="text-center font-bold text-slate-900 dark:text-cyan-500 text-5xl leading-tight mb-3">Tailwind CSS: Dark Mode Tutorial</h1>
                <p className="text-lg font-medium text-slate-700 dark:text-cyan-700 text-center mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam corporis officia illum saepe voluptates, assumenda molestiae exercitationem quisquam illo omnis? Fuga, voluptates? Eum dolor ipsam expedita perspiciatis doloremque, ad illo!</p>

                <div className="flex items-center">
                    <button onClick={ () => handleThemeChange( 'light' ) } className={ `flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${ activeTheme === "light"
                        ? "bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50"
                        : "bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-100 dark:text-gray-400"
                        }` }>Light Theme</button>
                    <button onClick={ () => handleThemeChange( 'dark' ) } className={ `flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${ activeTheme === "dark"
                        ? "bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50"
                        : "bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-50 dark:text-gray-400"
                        }` }>Dark Theme</button>
                    <button onClick={ () => handleThemeChange( 'system' ) } className={ `flex justify-center items-center m-auto text-lg w-fit transition-color duration-200 ease-in-out py-3 px-10 rounded-lg font-semibold py-[10px] px-4 ${ activeTheme === "system"
                        ? "bg-cyan-800 text-gray-50 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300 hover:bg-slate-600 text-gray-50"
                        : "bg-slate-500 dark:bg-slate-600 hover:bg-cyan-800 text-gray-50 dark:text-gray-400"
                        }` }>Use System Theme</button>
                </div>
            </div>
        </main>
    );
}


/*
"use client"

import { useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toCapitalCase } from "@/lib/utils"

export function ModeToggle () {
    const modes = [ "system", "light", "dark", "cool" ];
    const { setTheme } = useTheme();

    const setThemeMode = ( mode: string; ) => {
        if ( modes.includes( mode ) ) {
            setTheme( mode.toString() );
            localStorage.setItem( [ 'compass-app', 'theme', 'mode' ].join( '_' ), 'dark' );
        }
    }

    useEffect( () => {
        const loadTheme = () => {
            // Fetch theme from localstorage if exists. 
            let modepath = [ 'compass-app', 'theme', 'mode' ].join( '_' );
            if ( localStorage.getItem( modepath ) ) {
                setTheme( localStorage.getItem( modepath ) );
            }
            else {
                // None set; default to system settings.
                setTheme( 'system' );
            }
        }

        // Fetch theme on component load. 
        loadTheme();

    }, [] )


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {
                    modes.map( ( mode ) => {
                        return (
                            <DropdownMenuItem onClick={ () => { setThemeMode( mode.toString() ) } }>
                                { toCapitalCase( mode.toString() ) }
                            </DropdownMenuItem>
                        );
                    } )
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

*/