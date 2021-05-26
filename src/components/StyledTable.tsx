import React from 'react'
import Table from './Table'
import styled from 'styled-components'
import { Box } from '@chakra-ui/react'

const CustomTable = styled(Box)`
	width: 100vw;
	height: 100vh;
	display: grid;
	place-items: center;
	table {
		max-width: 90vw;
	}
	td,
	th {
		border: 1px solid;
		text-align: center;
	}

	th {
		padding: 0.5em 1em;
	}
`

export default function StyledTable() {
	return (
		<CustomTable>
			<Table />
		</CustomTable>
	)
}
