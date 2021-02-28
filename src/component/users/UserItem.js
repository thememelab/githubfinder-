import React  from 'react';
import {Link} from 'react-router-dom';

 const  UserItem =   (props) =>  {
    const  { login , avatar,  url } = props
    return (
        <div   className="card text-center" >
            <img src={ avatar } alt="user profile" className="round-img" style={{width: "60px"}}></img>
            <h3>{ login }</h3>
            <div>
                <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">More</Link>
            </div>
        </div>
    )
}

export default UserItem
