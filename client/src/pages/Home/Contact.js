import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";
import { Form, Button, Input, Modal, message } from "antd";
import { SetLoading, ReloadData } from "../../redux/rootSlice";
import axios from "axios";

function Contact() {
    const dispatch = useDispatch();
    // Destructure data.
    const { portfolioData } = useSelector((state) => state.root);
    // const { contact } = portfolioData;
    // const user = contact;

    const sendMessage = async (values) => {
        try {
            console.log("Contact(): values => ", values);
            dispatch(SetLoading(true));
            let response;
            response = await axios.post("/api/portfolio/send-message", values);
            console.log( "Contact(): response => ", response );
            // dispatch(SetLoading(false));
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(SetLoading(false));
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(SetLoading(false));
            message.error(error.message);
        }
    };

    return (
        <>
            <SectionTitle title="Get In Touch"></SectionTitle>
            <div className="flex flex-col items-center justify-center w-[100%]">
                <div className="contact-form ">
                    <Form layout="vertical" onFinish={sendMessage}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Name"></Input>
                        </Form.Item>
                        <Form.Item name="email" label="Email Address">
                            <Input placeholder="Email Address"></Input>
                        </Form.Item>
                        <Form.Item name="company" label="Company">
                            <Input placeholder="Company"></Input>
                        </Form.Item>
                        <Form.Item name="subject" label="Subject">
                            <Input placeholder="Subject"></Input>
                        </Form.Item>
                        <Form.Item name="phone" label="Phone Number">
                            <Input placeholder="Phone Number"></Input>
                        </Form.Item>
                        <Form.Item name="message" label="Message">
                            <textarea placeholder="Message"></textarea>
                        </Form.Item>
                        <div className="flex justify-end w-full">
                            <button
                                className="admin-button px-10 py-2 bg-primary text-white"
                                //onClick={sendMessage()}
                            >
                                Submit
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
}

export default Contact;

/*

    <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
        background="transparent"
        speed="1"
        loop="1"
        autoplay></lottie-player>

        <div>
            <SectionTitle title="Say Hello"></SectionTitle>
            <div className="flex sm:flex-col items-center justify-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-xl">
                        {"{"}
                        { Object.keys( user ).map( ( key ) => (
                            // if ( key != "_id" )
                            key !== "_id" && <p className="ml-5">
                                &emsp;&emsp;&emsp;
                                <span className="text-highlightColor2">
                                    {key}
                                </span>
                                :{" "}
                                <span className="text-white">{user[key]}</span>
                            </p>
                        ))}
                        {"}"}
                    </h1>
                </div>
                <div className="h-[400px]">
                    <lottie-player
                        src="https://assets9.lottiefiles.com/packages/lf20_eroqjb7w.json"
                        background="transparent"
                        speed="1"
                        loop="1"
                        autoplay></lottie-player>
                </div>
            </div>
        </div>
*/
