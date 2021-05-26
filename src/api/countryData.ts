import axios from 'axios'

export const getCountryData = async () => {
	const res = await axios.get(
		'https://restcountries.eu/rest/v2/all?fields=flag;name;alpha2Code;alpha3Code;nativeName;nativeName;callingCodes'
	)

	return res
}
