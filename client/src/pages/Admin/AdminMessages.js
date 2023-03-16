import React from "react";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ReloadData, SetLoading } from "../../redux/rootSlice";
import axios from "axios";
import SectionTitle from "../../components/SectionTitle";
// import { Form, Button, Row, Col } from "react-bootstrap";
function AdminMessages() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector((state) => state.root);
    const { messages } = portfolioData;

    const onDelete = async (item) => {
        try {
            dispatch(SetLoading(true));
            const response = await axios.post("/api/portfolio/delete-message", {
                _id: item._id,
            });
            dispatch(SetLoading(false));
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
            <div className="table-container">
                <div className="flex justify-start">
                    <SectionTitle title="Messages"></SectionTitle>
                </div>

                <table className="admin-table">
                    <thead className="admin-table-header">
                        <tr className="admin-table-row-labels">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Age</th>
                            <th>Location</th>
                            <th>Preference</th>
                            <th>Message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="admin-table-body">
                        {messages.map((message) => (
                            <tr className="admin-table-row" id={message._id}>
                                <td className="admin-table-cell ">
                                    {message.name != null ? message.name : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.email != null ? message.email : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.phone != null ? message.phone : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.company != null
                                        ? message.company
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.age != null ? message.age : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.location != null
                                        ? message.location
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.preference != null
                                        ? message.preference
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.message != null
                                        ? message.message
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    <div className="flex justify-end items-end">
                                        <button
                                            className="button admin-button-red bg-red-500 text-white rounded-sm"
                                            onClick={() => {}}>
                                            Del
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
}

export default AdminMessages;

/*
                            {Object.keys(messages[0]).map((key) => {
                                return (
                                    key !== "_id" && (
                                        <th>{key.toUpperCase()}</th>
                                    )
                                );
                            })}
                            <th>ACTIONS</th>
                            {Object.keys(messages[0]).map(
                                (key) =>
                                    // if ( key != "_id" )
                                    key !== "_id" && (
                                        <p className="ml-5">
                                            &emsp;&emsp;&emsp;
                                            <span className="text-highlightColor2">
                                                {key}
                                            </span>
                                            :{" "}
                                            <span className="text-white">
                                                {messages[0][key]}
                                            </span>
                                        </p>
                                    ),
                            )}
                                {Object.keys(message).map(
                                    ( key ) =>
                                    {
                                        console.log( key );
                                    return (
                                        <th>
                                            {message[key]}
                                        </th>
                                    );
                                }
                            )}
                    <tbody className="admin-table-body">
                        {messages.map((message) => (
                            <tr className="admin-table-row" id={message._id}>
                                <td className="admin-table-cell ">
                                    {message.name != null ? message.mame : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.email != null ? message.email : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.phone != null ? message.phone : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.company != null
                                        ? message.company
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.age != null ? message.age : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.location != null
                                        ? message.location
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.preference != null
                                        ? message.preference
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    {message.message != null
                                        ? message.message
                                        : ""}
                                </td>
                                <td className="admin-table-cell ">
                                    <div className="flex justify-end items-end">
                                        <button
                                            className="button admin-button-red bg-red-500 text-white rounded-sm"
                                            onClick={() => {}}>
                                            Del
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
*/