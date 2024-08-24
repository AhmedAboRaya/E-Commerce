
const Button = ({style, txt, onClick}) => {
    return (
        <button onClick={onClick} className={`${style}`}>{txt}</button>
    )
}

export default Button