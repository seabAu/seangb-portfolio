// React
import React, { Children, Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// Redux state management
import { useDispatch, useSelector } from 'react-redux';
import {
    SetEnvironment,
    SetDebug,
    SetLoading,
    SetFetching,
    SetMenu,
    SetCache,
    ReloadData,
} from '../../../redux/rootSlice';

// Components
import { FaDatabase, FaChartBar, FaMap, FaCog } from 'react-icons/fa';

// Utilities
import * as utils from 'akashatools';
import Nav from '../Nav/Nav';

const Sidebar = props => {
    const dispatch = useDispatch();
    const { menu, environment } = useSelector(state => state.root);

    const { children, isFetching, showSidebar } = props;

    const nav = [
        {
            id: 'query',
            index: 0,
            name: 'query',
            icon: <FaChartBar />,
            onClick: e => {
                dispatch(SetMenu('query'));
            },
            classes: `header-nav-button ${menu === `query` ? 'active' : ''}`,
            enabled: true,
        },
        {
            id: 'database',
            index: 1,
            name: 'database',
            icon: <FaDatabase />,
            onClick: e => {
                dispatch(SetMenu('database'));
            },
            classes: `header-nav-button ${menu === `database` ? 'active' : ''}`,
            enabled: environment ? environment === 'development' : true,
        },
        {
            id: 'map',
            index: 2,
            name: 'map',
            icon: <FaMap />,
            onClick: e => {
                dispatch(SetMenu('map'));
            },
            classes: `header-nav-button ${menu === `map` ? 'active' : ''}`,
            enabled: environment ? environment === 'development' : true,
        },
        {
            id: 'options',
            index: 3,
            name: 'options',
            icon: <FaCog />,
            onClick: e => {
                dispatch(SetMenu('options'));
            },
            classes: `header-nav-button ${menu === `options` ? 'active' : ''}`,
            enabled: true,
        },
    ];

    // const childContents = Children.toArray(children);
    // console.log("Sidebar :: props = ", props, childContents);
    return (
        <div className={`page-sidebar ${showSidebar ? '' : 'hidden'}`}>
            <div className="sidebar-header">
                <div className="nav-button-group">
                    <Nav nav={nav}></Nav>
                </div>
            </div>
            <div className="sidebar-body">
                {props.showSidebar && props.children && <>{props.children}</>}
            </div>
            <div className="sidebar-footer"></div>
        </div>
    );
};

Sidebar.propTypes = {
    children: PropTypes.object.isRequired,
    menu: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    // categoryIsInvalid: PropTypes.bool.isRequired,
    // forceIsInvalid: PropTypes.bool.isRequired,
    // setCategoryIsInvalid: PropTypes.func.isRequired,
    // setForceIsInvalid: PropTypes.func.isRequired,
};

export default Sidebar;
