const Button = ({ style, txt, onClick, id }) => {
    return (
      <button className={`${style}`} onClick={() => onClick(id)}>
        {txt}
      </button>
    );
  };
  
  export default Button;
  