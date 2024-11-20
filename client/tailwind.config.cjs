
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        asideScrollbars: {
            light: 'light',
            gray: 'gray',
        },
        extend: {
            spacing: {
                // ...
            },
            backgroundSize: ( { theme } ) => ( {
                auto: 'auto',
                cover: 'cover',
                contain: 'contain',
                ...theme( 'spacing' )
            } ),
            colors: {
                'primary': {
                    DEFAULT: '#343434',
                    50: '#E1E1E1',
                    100: '#D7D7D7',
                    200: '#C3C3C3',
                    300: '#AEAEAE',
                    400: '#9A9A9A',
                    500: '#868686',
                    600: '#717171',
                    700: '#5D5D5D',
                    800: '#484848',
                    900: '#343434',
                    950: '#262626'
                },
                'secondary': {
                    DEFAULT: '#282828',
                    50: '#D5D5D5',
                    100: '#CBCBCB',
                    200: '#B7B7B7',
                    300: '#A2A2A2',
                    400: '#8E8E8E',
                    500: '#7A7A7A',
                    600: '#656565',
                    700: '#515151',
                    800: '#3C3C3C',
                    900: '#282828',
                    950: '#1A1A1A'
                },
                'tertiary': {
                    // Reddish
                    DEFAULT: '#3E3E3E',
                    50: '#EBEBEB',
                    100: '#E1E1E1',
                    200: '#CDCDCD',
                    300: '#B8B8B8',
                    400: '#A4A4A4',
                    500: '#909090',
                    600: '#7B7B7B',
                    700: '#676767',
                    800: '#525252',
                    900: '#3E3E3E',
                    950: '#303030'
                },
                'quaternary': {
                    DEFAULT: '#4A4A4A',
                    50: '#F7F7F7',
                    100: '#EDEDED',
                    200: '#D9D9D9',
                    300: '#C4C4C4',
                    400: '#B0B0B0',
                    500: '#9C9C9C',
                    600: '#878787',
                    700: '#737373',
                    800: '#5E5E5E',
                    900: '#4A4A4A',
                    950: '#3C3C3C'
                },
                'quinary': {
                    DEFAULT: '#242B44',
                    50: '#D8DCEB',
                    100: '#CBD0E3',
                    200: '#B0B8D5',
                    300: '#96A0C7',
                    400: '#7B89B9',
                    500: '#6071AB',
                    600: '#4E5E94',
                    700: '#404D79',
                    800: '#323C5F',
                    900: '#242B44',
                    950: '#1A1F32'
                },
                error: "#ff2222",
                bodyprimary: "#e5032e",
                bodysecondary: "#50026e", // Dark blue
                header: "#453979", // Bluish
                body: "#242b44", // Dull Bluish
                highlightColor: "#fdad51", // Light Orangeish
                highlightColor2: "#fef48b",
                textColor: "#f2f4ec", // Yellow-white
                primary: '#343434',
                secondary: '#212121',
                secondaryAlt: '#291c21',
                tertiary: '#3e3e3e',
                quaternary: '#282828',
                quinary: '#2e2e2e',
                quaternaryAlt: '#4a4a4a',
                quinaryAlt: '#242b44',
                quaternaryHighlight: '#453979',
                quinaryHighlight: '#242b44',
                text: '#cccccc',
                transparent: 'transparent',
                current: 'currentColor',
                'white': '#ffffff',
                primaryAlt: {
                    100: "#b2d8d8",
                    200: "#66b2b2",
                    // 300: '#66b2b2', you can skip some colors like this or not even commnet them
                    // 400: '',
                    500: "#008080",
                    700: "#66b2b2",
                    900: "#004c4c",
                },
                secondaryAlt: {
                    100: "##ff9c3c",
                    200: "#ff9022",
                    300: "#ff8308",
                    400: "#ee7600",
                    500: "#d56900",
                    600: "#bb5d00",
                    700: "#a25000",
                    800: "#5f2f00",
                    900: "#472300",
                },
                brown: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#bfa094',
                    600: '#a18072',
                    700: '#977669',
                    800: '#846358',
                    900: '#43302b',
                },
                'tahiti': {
                    light: '#67e8f9',
                    DEFAULT: '#06b6d4',
                    dark: '#0e7490',
                    100: '#cffafe',
                    200: '#a5f3fc',
                    300: '#67e8f9',
                    400: '#22d3ee',
                    500: '#06b6d4',
                    600: '#0891b2',
                    700: '#0e7490',
                    800: '#155e75',
                    900: '#164e63',
                },
                'washed-blue-50': '#f0f3ff',
                'washed-blue-100': '#d0daff',
                'washed-blue-200': '#bac9ff',
                'washed-blue-300': '#9ab0ff',
                'washed-blue-400': '#86a1ff',
                'washed-blue-500': '#6889ff',
                'washed-blue-600': '#5f7de8',
                'washed-blue-700': '#4a61b5',
                'washed-blue-800': '#394b8c',
                'washed-blue-900': '#2c3a6b',
                'washed-purple-50': '#f8f7ff',
                'washed-purple-100': '#e8e7ff',
                'washed-purple-200': '#dddcff',
                'washed-purple-300': '#cecbff',
                'washed-purple-400': '#c5c1ff',
                'washed-purple-500': '#b6b2ff',
                'washed-purple-600': '#a6a2e8',
                'washed-purple-700': '#817eb5',
                'washed-purple-800': '#64628c',
                'washed-purple-900': '#4c4b6b',
                'primary-blue-50': '#e6f0ff',
                'primary-blue-100': '#b2d1ff',
                'primary-blue-200': '#8cbaff',
                'primary-blue-300': '#589bff',
                'primary-blue-400': '#3787ff',
                'primary-blue-500': '#0569ff',
                'primary-blue-600': '#0560e8',
                'primary-blue-700': '#044bb5',
                'primary-blue-800': '#033a8c',
                'primary-blue-900': '#022c6b',
                'primary-purple-50': '#f1e6ff',
                'primary-purple-100': '#d3b0ff',
                'primary-purple-200': '#bd8aff',
                'primary-purple-300': '#9f54ff',
                'primary-purple-400': '#8d33ff',
                'primary-purple-500': '#7000ff',
                'primary-purple-600': '#6600e8',
                'primary-purple-700': '#5000b5',
                'primary-purple-800': '#3e008c',
                'primary-purple-900': '#2f006b',
                'Neutrals/neutrals-1': '#ffffff',
                'Neutrals/neutrals-2': '#fcfcfd',
                'Neutrals/neutrals-3': '#f5f5f6',
                'Neutrals/neutrals-4': '#f0f0f1',
                'Neutrals/neutrals-5': '#d9d9dc',
                'Neutrals/neutrals-6': '#c0bfc4',
                'Neutrals/neutrals-7': '#8d8c95',
                'Neutrals/neutrals-8': '#5b5966',
                'Neutrals/neutrals-9': '#464553',
                'Neutrals/neutrals-10': '#282637',
                'Neutrals/neutrals-11': '#201f30',
                'Neutrals/neutrals-12': '#161427',
                'Neutrals/neutrals-13': '#020014',
                'brand-washedPurple': '#b5b2ff',
                'brand-washedBlue': '#6889ff',
                'brand-primaryBlue': '#0469ff',
                'brand-primaryPurple': '#7000ff',
                'brand-dark': '#030014',
            },
            zIndex: {
                '-1': '-1',
            },
            flexGrow: {
                5: '5',
            },
            maxHeight: {
                'screen-menu': 'calc(100vh - 3.5rem)',
                modal: 'calc(100vh - 160px)',
            },
            transitionProperty: {
                position: 'right, left, top, bottom, margin, padding',
                textColor: 'color',
            },
            fontFamily: {
                inter: [ 'Inter', 'sans-serif' ],
            },
            keyframes: {
                wave: {
                    '0%': { transform: 'rotate(0.0deg)' },
                    '10%': { transform: 'rotate(14deg)' },
                    '20%': { transform: 'rotate(-8deg)' },
                    '30%': { transform: 'rotate(14deg)' },
                    '40%': { transform: 'rotate(-4deg)' },
                    '50%': { transform: 'rotate(10.0deg)' },
                    '60%': { transform: 'rotate(0.0deg)' },
                    '100%': { transform: 'rotate(0.0deg)' },
                },
                rotate: {
                    "0%, 100%": {
                        transform: "rotate(0deg) scale(1.2)",
                    },
                    "50%": {
                        transform: "scale(0.9) rotate(180deg)",
                    }
                },
                'text-slide-1': {
                    '0%, 16%': {
                        transform: 'translateY(0%)',
                    },
                    '20%, 36%': {
                        transform: 'translateY(-16.66%)',
                    },
                    '40%, 56%': {
                        transform: 'translateY(-33.33%)',
                    },
                    '60%, 76%': {
                        transform: 'translateY(-50%)',
                    },
                    '80%, 96%': {
                        transform: 'translateY(-66.66%)',
                    },
                    '100%': {
                        transform: 'translateY(-83.33%)',
                    },
                },
                'text-slide-2': {
                    '0%, 40%': {
                        transform: 'translateY(0%)',
                    },
                    '50%, 90%': {
                        transform: 'translateY(-33.33%)',
                    },
                    '100%': {
                        transform: 'translateY(-66.66%)',
                    },
                },
                'text-slide-3': {
                    '0%, 26.66%': {
                        transform: 'translateY(0%)',
                    },
                    '33.33%, 60%': {
                        transform: 'translateY(-25%)',
                    },
                    '66.66%, 93.33%': {
                        transform: 'translateY(-50%)',
                    },
                    '100%': {
                        transform: 'translateY(-75%)',
                    },
                },
                'text-slide-4': {
                    '0%, 20%': {
                        transform: 'translateY(0%)',
                    },
                    '25%, 45%': {
                        transform: 'translateY(-20%)',
                    },
                    '50%, 70%': {
                        transform: 'translateY(-40%)',
                    },
                    '75%, 95%': {
                        transform: 'translateY(-60%)',
                    },
                    '100%': {
                        transform: 'translateY(-80%)',
                    },
                },
                'text-slide-5': {
                    '0%, 16%': {
                        transform: 'translateY(0%)',
                    },
                    '20%, 36%': {
                        transform: 'translateY(-16.66%)',
                    },
                    '40%, 56%': {
                        transform: 'translateY(-33.33%)',
                    },
                    '60%, 76%': {
                        transform: 'translateY(-50%)',
                    },
                    '80%, 96%': {
                        transform: 'translateY(-66.66%)',
                    },
                    '100%': {
                        transform: 'translateY(-83.33%)',
                    },
                },
                'text-slide-6': {
                    '0%, 13.33%': {
                        transform: 'translateY(0%)',
                    },
                    '16.66%, 30%': {
                        transform: 'translateY(-14.28%)',
                    },
                    '33.33%, 46.66%': {
                        transform: 'translateY(-28.57%)',
                    },
                    '50%, 63.33%': {
                        transform: 'translateY(-42.85%)',
                    },
                    '66.66%, 80%': {
                        transform: 'translateY(-57.14%)',
                    },
                    '83.33%, 96.66%': {
                        transform: 'translateY(-71.42%)',
                    },
                    '100%': {
                        transform: 'translateY(-85.71%)',
                    },
                },
                'text-slide-7': {
                    '0%, 11.43%': {
                        transform: 'translateY(0%)',
                    },
                    '14.28%, 25.71%': {
                        transform: 'translateY(-12.5%)',
                    },
                    '28.57%, 40%': {
                        transform: 'translateY(-25%)',
                    },
                    '42.85%, 54.28%': {
                        transform: 'translateY(-37.5%)',
                    },
                    '57.14%, 68.57%': {
                        transform: 'translateY(-50%)',
                    },
                    '71.42%, 82.85%': {
                        transform: 'translateY(-62.5%)',
                    },
                    '85.71%, 97.14%': {
                        transform: 'translateY(-75%)',
                    },
                    '100%': {
                        transform: 'translateY(-87.5%)',
                    },
                },
                'text-slide-8': {
                    '0%, 10%': {
                        transform: 'translateY(0%)',
                    },
                    '12.5%, 22.5%': {
                        transform: 'translateY(-11.11%)',
                    },
                    '25%, 35%': {
                        transform: 'translateY(-22.22%)',
                    },
                    '37.5%, 47.5%': {
                        transform: 'translateY(-33.33%)',
                    },
                    '50%, 60%': {
                        transform: 'translateY(-44.44%)',
                    },
                    '62.5%, 72.5%': {
                        transform: 'translateY(-55.55%)',
                    },
                    '75%, 85%': {
                        transform: 'translateY(-66.66%)',
                    },
                    '87.5%, 97.5%': {
                        transform: 'translateY(-77.77%)',
                    },
                    '100%': {
                        transform: 'translateY(-88.88%)',
                    },
                },
                'slidein': {
                    from: {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    to: {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                'fade-out': {
                    from: { opacity: 1 },
                    to: { opacity: 0 },
                },
                'fade-in': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
            animation: {
                'waving-hand': 'wave 2s linear infinite',
                rotate: "rotate 4s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
                'text-slide-1': 'text-slide-1 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-2': 'text-slide-2 5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-3': 'text-slide-3 7.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-4': 'text-slide-4 10s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-5': 'text-slide-5 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-6': 'text-slide-6 15s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-7': 'text-slide-7 17.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'text-slide-8': 'text-slide-8 20s cubic-bezier(0.83, 0, 0.17, 1) infinite',
                'fade-out': 'fade-out 250ms ease-in-out',
                'fade-in': 'fade-in 250ms ease-in-out',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'slidein': "slidein 1s ease 250ms",
                'slidein100': "slidein 1s ease 100ms",
                'slidein200': "slidein 1s ease 200ms",
                'slidein300': "slidein 1s ease 300ms",
                'slidein400': "slidein 1s ease 400ms",
                'slidein500': "slidein 1s ease 500ms",
                'slidein600': "slidein 1s ease 500ms",
                'slidein700': "slidein 1s ease 700ms",
                'slidein800': "slidein 1s ease 800ms",
                'slidein900': "slidein 1s ease 900ms",
                'slidein1000': "slidein 1s ease 1000ms",
            },
            fontFamily: {
                display: 'Oswald, ui-serif', // Adds a new `font-display` class
            },

        },
        scale: {
            header: "40px",
        },

        // backgroundSize: ( { theme } ) => ( {
        //     auto: 'auto',
        //     cover: 'cover',
        //     contain: 'contain',
        //     ...theme( 'spacing' )
        // } ),
        screens: {
            xs: { min: "480px" }, // max: "639px" },
            xsmax: { max: "639px" },
            // => @media (min-width: 480px and max-width: 639px) { ... }

            sm: { min: "640px" }, // max: "767px" },
            smmax: { max: "767px" },
            // => @media (min-width: 640px and max-width: 767px) { ... }

            md: { min: "768px" }, // max: "1023px" },
            mdmax: { max: "1023px" },
            // => @media (min-width: 768px and max-width: 1023px) { ... }

            lg: { min: "1024px" }, // max: "1279px" },
            lgmax: { max: "1279px" },
            // => @media (min-width: 1024px and max-width: 1279px) { ... }

            xl: { min: "1280px" }, // max: "1535px" },
            xlmax: { max: "1535px" },
            // => @media (min-width: 1280px and max-width: 1535px) { ... }

            "2xl": { min: "1536px" },
            // => @media (min-width: 1536px) { ... }
        },

        plugins: [
        ],
    },
};

/*
  screens: {
      xs: { min: "480px" }, // max: "639px" },
      xsmax: { max: "639px" },
      // => @media (min-width: 480px and max-width: 639px) { ... }

      sm: { min: "640px" }, // max: "767px" },
      smmax: { max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px" }, // max: "1023px" },
      mdmax: { max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px" }, // max: "1279px" },
      lgmax: { max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px" }, // max: "1535px" },
      xlmax: { max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
  },
  screens: {
      xs: { min: "480px", max: "639px" },
      // => @media (min-width: 480px and max-width: 639px) { ... }

      sm: { min: "640px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "1023px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "1024px", max: "1279px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1280px", max: "1535px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      "2xl": { min: "1536px" },
      // => @media (min-width: 1536px) { ... }
  },
*/
/*
    screens: {
        //// Min-Width Breakpoints:
        //// sm: "640px",
        //// // => @media (min-width: 640px) { ... }

        //// md: "768px",
        //// // => @media (min-width: 768px) { ... }

        //// lg: "1024px",
        //// // => @media (min-width: 1024px) { ... }

        //// xl: "1280px",
        //// // => @media (min-width: 1280px) { ... }

        //// "2xl": "1536px",
        //// // => @media (min-width: 1536px) { ... }

        //// Max-Width Breakpoints:
        //// "2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        //// xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        //// lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        //// md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        lg: { max: "2023px" },
        sm: { max: "1000px" },
        // => @media (max-width: 639px) { ... }
    },
*/



