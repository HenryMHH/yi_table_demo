import { useEffect, useState } from 'react'
import { getCountryData } from '../api/countryData'

export default function useCountryData() {
	const [data, setData] = useState([])
	useEffect(() => {
		getCountryData().then((res) => setData(res.data))
	}, [])
	return data
}
