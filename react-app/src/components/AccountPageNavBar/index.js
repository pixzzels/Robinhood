import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './AccountPageNavBar.css';

function AccountPageNavBar({ changeContent }) {
    const user = useSelector(state => state.session.user);

    // const [content, setContent] = useState('')


    return (
        <>
            <nav className="account-page-nav-container">
                <div>

                </div>
                <h1 id="account-page-user-name">{user.first_name} {user.last_name}</h1>
                <div>
                    <span>
                        <a
                            className="account-page-option" id="apo-1"
                            href="/account"
                        >
                            Account
                        </a>
                    </span>
                    <span>
                        <a
                            className="account-page-option"
                            href="/account/history"
                            onClick={changeContent('history')}
                        >
                            History
                        </a>
                    </span>
                    <span>
                        <a className="account-page-option" href="/account/settings">Settings</a>
                    </span>
                </div>
            </nav>
            <div style={{ borderBottom: "1px solid #e3e9ed" }}></div>
        </>
    )
}

export default AccountPageNavBar;