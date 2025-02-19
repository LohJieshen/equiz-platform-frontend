import Button from '@mui/material/Button';

const PromptModal = (props) => {
    return (
      <React.Fragment>
        {/* backdrop */}
        <div className={classes.backdrop} onClick={props.onConfirm} />
  
        {/* {ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} />,
          document.getElementById('backdrop-root')
        )} */}
  
        {/* modal box */}
        <Card className={classes.modal}>
          <header className={classes.header}>
            <h2>{props.title}</h2>
          </header>
          <div className={classes.content}>
            <p>{props.message}</p>
          </div>
          <footer className={classes.actions}>
            <Button onClick={props.onConfirm}>Okay</Button>
          </footer>
        </Card>
  
        {/* {ReactDOM.createPortal(
          <ModalOverlay
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
          />,
          document.getElementById('overlay-root')
        )} */}
      </React.Fragment>
    );
  };

  export default PromptModal;