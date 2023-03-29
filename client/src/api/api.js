import axios from "axios";

// REACT_APP_API_PORT = 4000
// REACT_APP_API_IP = 147.182.184.250
// REACT_APP_API_PATH = 'http://147.182.184.250:4000/api/portfolio'

// Axios docs: https://github.com/axios/axios#request-config //
// https://stackoverflow.com/questions/47407564/change-the-default-base-url-for-axios //
// ~ // `url` is the server URL that will be used for the request
// url: '/user',
//
// ~ // `baseURL` will be prepended to `url` unless `url` is absolute.
// ~ // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
// ~ // to methods of that instance.
// baseURL: 'https://some-domain.com/api/',

export default axios.create({
    // baseURL: `http://${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}`,
    baseURL: `${
        process.env.NODE_ENV === "development"
            ? // Development API path.
              `//${process.env.REACT_APP_API_IP}:${process.env.REACT_APP_API_PORT}`
            : process.env.NODE_ENV === "production"
            ? // Production API path.
              `//${process.env.REACT_APP_API_IP}`
            : // Default (no env set) API path.
              process.env.PUBLIC_URL
    }`,
    // httpsAgent: new https.Agent({
    //     ca: fs.readFileSync(`${path}CA.pem`),
    //     cert: fs.readFileSync(`${path}CERT.pem`),
    //     key: fs.readFileSync(`${path}KEY.pem`),
    //     rejectUnauthorized: false,
    // }),
    // auth: {
    //     username: "username",
    //     password: "password",
    // },
});

    // const axiosDefaultConfig = {
    //     proxy: {
    //         host: "http://localhost:3000",
    //         hostname: "127.0.0.1",
    //         port: 5000,
    //         protocol: "http",
    //     },
    // };
    // const axiosFixed = require("axios-https-proxy-fix").create(axiosDefaultConfig);
    // console.log(
    //     "AXIOS DEFAULTS :: ",
    //     axios.defaults,
    //     ", axios overall = ",
    //     axios,
    //     "API DEFAULTS :: ",
    //     API.defaults,
    //     ", API overall = ",
    //     API,
    //     ", env variables = ",
    //     process.env,
    //     process.env.REACT_APP_API_PORT,
    //     process.env.REACT_APP_API_IP,
    //     process.env.REACT_APP_API_PATH,
    // );
    // axios.defaults.baseURL = `http://localhost:4000`;
    // axios.defaults.baseURL = `http://127.0.0.1:4000`;
    // Axios for some reason calls this by default:
    // http://147.182.184.250:3000/seabAu/seangb-portfolio/api/portfolio/get-portfolio-data
    // axios.defaults.baseURL = `http://147.182.184.250:4000`;


    

    // axios.defaults.baseURL = "http://localhost:4000";
    //
    // const getPortfolioData = async () => {
    //     try {
    //         // Set reloadData flag false.
    //         dispatch(SetLoading(true));
    //         dispatch(ReloadData(false));
    //         console.log("getPortfolioData :: Before axios fetch.");
    //         // For some reason this function dies right here.
    //         const response = await axios
    //             .get("/api/portfolio/get-portfolio-data")
    //             .then((res) => {
    //                 console.log("getPortfolioData :: res = ", res);
    //                 dispatch(SetPortfolioData(res.data));
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //
    //         dispatch(SetLoading(false));
    //     } catch ( error )
    //     {
    //         console.error( error );
    //         dispatch(SetLoading(false));
    //     }
    // };