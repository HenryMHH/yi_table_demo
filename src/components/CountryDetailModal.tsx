import { Box, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { getCountryDetailData } from '../api/countryData'

import CustomModal from './Modal'

interface props {
	countryName: string
}

export default function CountryDetailModal({ countryName }: props) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [data, setData] = useState<any>()

	useEffect(() => {
		if (isOpen)
			getCountryDetailData(countryName).then((res) => {
				setData(JSON.stringify(res.data[0]))
				onOpen()
			})
	}, [isOpen])
	return (
		<>
			<Box onClick={onOpen} cursor="pointer">
				{countryName}
			</Box>
			{isOpen ? (
				<CustomModal isOpen={isOpen} onClose={onClose} data={data} />
			) : null}
		</>
	)
}
