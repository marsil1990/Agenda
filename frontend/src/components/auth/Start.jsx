import React from "react";
import { Link } from 'react-router-dom';
function Start(){
     return (
       <div className="container">
            <Link to="/register">
                <button>Go to Register</button>
            </Link>
            <Link to="/login">
                <button>Go to Login</button>
            </Link>
       </div>
     );
   }
 
   export default Start;