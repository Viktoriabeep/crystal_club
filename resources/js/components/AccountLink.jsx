import React from 'react';

const AccountLink = ({ isAuthenticated }) => {
    return (
        <li id="account">
            {isAuthenticated ? (
                <a href="/en/dashboard">Dashboard</a>
            ) : (
                <a href="/en/login">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                </a>
            )}
        </li>
    );
};

export default AccountLink;
