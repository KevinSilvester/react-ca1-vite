import Card from './Card'

const Table = (props) => {
	const data = props.data

	return (
		<div className='container mx-auto mt-4'>
			{console.log('Table rendered')}
			<div className='row'>
				{data.map((place) => (
					<Card place={place} key={place.id} />
				))}
			</div>
		</div>
	)
}

export default Table
