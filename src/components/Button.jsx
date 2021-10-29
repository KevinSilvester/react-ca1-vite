const Button = (props) => {
   const handleClick = props.handleClick
   const large = props.large
   const fill = props.fill

	return (
		<button className={`btn__container btn__container--${large ? 'lg' : 'sm'}`} onClick={e => handleClick(e)}>
			<div className={`btn__body btn__body--${fill ? 'fill' : 'clear'}`}>{props.children}</div>
		</button>
	);
};

export default Button