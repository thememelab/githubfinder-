import React, { Fragment } from 'react'
import UserItem from "./UserItem"
import Spinner from "../layout/Spinner.js"
import PropTypes from 'prop-types'

const  Users = (props)  => {
    const {users, loading } = props
        
    
    return (  loading ? <Spinner/>  :
            <div style={userStyle}>
                {users.map(user => (
                    <Fragment >
                    <UserItem
                    key={user.id}
                    avatar={user.avatar_url}
                    login={user.login}
                    url={user.url} />
                    </Fragment>
                ))} 
            </div>
        )
    
}


Users.propTypes = {
    user: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired 
}

const userStyle = {
    display: "grid",
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap:"1rem"
}

export default Users
