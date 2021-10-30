import React, {
	useState,
	useEffect,
	useContext,
	useMemo,
	useCallback
} from 'react'
import ReactDOM from 'react-dom'
import './scss/index.scss'
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.css'
import Search from './components/Search'
import Table from './components/Table'
import { DataCtx, DataProvider } from './contexts/DataCtx'

const App = () => {
	const { e, r, a } = useContext(DataCtx)
	const [edit, setEdit] = e
	const [add, setAdd] = a
	const [remove, setRemove] = r
	const [fetchInfo, setFetchInfo] = useState({ error: null, loaded: false })
	const [filterData, setFilterData] = useState(null)
	const [displayData, setDisplayData] = useState(null)

	useEffect(() => {
		fetch('http://localhost:8000/results')
			.then((res) => res.json())
			.then((jsonData) => {
				let temp = []
				let index = 0
				jsonData.map((e) => {
					const place = {
						id: index,
						name: e.name,
						type: e['@type'],
						address: {
							locality: e.address.addressLocality,
							county: e.address.addressRegion
						},
						image: e.image.url,
						tags: e.tags,
						phone: e.telephone,
						website: e.url
					}
					console.log(place)
					temp.push(place)
					index++
				})
				setFetchInfo({ error: null, loaded: true })
				setFilterData(temp)
				setDisplayData(temp)
			})
			.catch((err) => setFetchInfo({ error: err, loaded: true }))
	}, [])

	const handleFilterSort = (data, sortVal) => {}

	const handleSearch = (searchTerm) => {
		if (searchTerm.length === 0) {
			setDisplayData([...filterData])
			console.log('handleSearch')
			return
		}
		console.log('handleSearch')
		setDisplayData([
			...filterData.filter((place) =>
				place.name.toLowerCase().match(new RegExp(searchTerm.toLowerCase()))
			)
		])
	}

	const TableComp = useMemo(() => <Table data={displayData} />, [displayData])

	if (fetchInfo.error) return <div>Fetch Failed</div>

	if (displayData === null) return <div>Loading....</div>

	return (
		<div>
			{console.log(edit, add, remove)}
			<Search searchTerm={handleSearch} />
			{TableComp}
		</div>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<DataProvider>
			<App />
		</DataProvider>
	</React.StrictMode>,
	document.getElementById('root')
)
