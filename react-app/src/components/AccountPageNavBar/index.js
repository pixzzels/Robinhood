

import './AccountPageNavBar.css';

function AccountPageNavBar() {
    return (
        <>
            <nav className="account-page-nav-container">
                <div>
                    
                </div>
                <h1 id="account-page-user-name">Ellen Park</h1>
                <div>
                    <span>
                        <a className="account-page-option1" href="/account">Account</a>
                    </span>
                    <span>
                        <a className="account-page-option" href="/account/history">History</a>
                    </span>
                    <span>
                        <a className="account-page-option" href="/account/settings">Settings</a>
                    </span>
                </div>
            </nav>
            <div style={{borderBottom: "1px solid #e3e9ed"}}></div>
        </>
    )
}

export default AccountPageNavBar;