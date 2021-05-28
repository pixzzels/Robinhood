import React, { useState } from 'react'
import AccountHistory from '../AccountHistory'
import AccountPageNavBar from '../AccountPageNavBar'

import './AccountPage.css'

function AccountPage() {
    const [content, setContent] = useState('')
    
    let component;
    const changeContent = (type) => {
        if (type === "history") {
            // setContent("history")
            component = (<AccountHistory/>)
        }
    }


    return (
        <>
            <AccountPageNavBar changeContent={changeContent} />
            <div className="account-page-wrapper">
                <AccountHistory />
            </div>

        </>
    )
}

export default AccountPage;