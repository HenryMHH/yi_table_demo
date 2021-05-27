import Table from './Table'
import styled from 'styled-components'
import { Box, Text } from '@chakra-ui/react'

const CustomTable = styled(Box)`
	display: flex;
	align-items: center;

	flex-direction: column;

	table {
		max-width: 90vw;
	}
	td,
	th {
		border: 1px solid;
		text-align: center;
		width: 200px;
	}
	button {
		font-size: 2em;
		margin: 0 0.2em;
		text-decoration: underline;
	}
`

export default function StyledTable() {
	return (
		<CustomTable>
			<Table />
		</CustomTable>
	)
}
