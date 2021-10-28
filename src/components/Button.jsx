const Button = (props) => {
   const handleClick = props.handleClick

	return (
		<button className="btn btn-container" onClick={e => handleClick(e)}>
			<div className="btn-body">{props.children}</div>
		</button>
	);
};

export default Button