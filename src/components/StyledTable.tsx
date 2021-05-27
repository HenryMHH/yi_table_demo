import Table from './Table'
import styled from 'styled-components'
import { Box } from '@chakra-ui/react'

const CustomTable = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;
	table {
		max-width: 90vw;
		margin-bottom: 2rem;
	}
	td,
	th {
		border: 1px solid;
		text-align: center;
		width: 200px;
	}
`

export default function StyledTable() {
	return (
		<CustomTable>
			<Table />
		</CustomTable>
	)
}
