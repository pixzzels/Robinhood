import { NavLink } from "react-router-dom";
import "./PageNotFound.css"
import errorImg from "../../images/error-img.png"

const PageNotFound = () => {
  return (
    <div className="error-container">
      <div className="error-text__container">
        <h2 className='error-header1'>404</h2>
        <h2 className='error-header2'>Page Not Found</h2>
        <h4 id='error-txt'>Not all those who wander are lost, but it seems you may have taken a wrong turn.</h4>
        <NavLink to="/" className='error-link'>Go Home</NavLink>
      </div>

      <div className='error-image__container'>
        <img alt='error image' className='error-image' src={errorImg}></img>
      </div>
    </div>
  )
}

export default PageNotFound