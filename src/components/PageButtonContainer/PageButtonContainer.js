import './PageButtonContainer.css'
const PageButtonContainer = (props) => {
    return (
        <div className='button-container'>
            {props.children}
        </div>
    )
}

export default PageButtonContainer;