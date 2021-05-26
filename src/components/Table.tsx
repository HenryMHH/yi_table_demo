import { Box, Spinner } from '@chakra-ui/react'
import React from 'react'
import useCountryData from '../useState/useCountryData'
import { useTable, usePagination, Column } from 'react-table'

interface countryData {
	flag: string
	name: string
	alpha2Code: string
	alpha3Code: string
	callingCodes: string[]
	nativeName: string
}

export default function Table() {
	const countryData: Array<countryData> = useCountryData()

	const data = React.useMemo(() => countryData, [countryData])

	const columns: Array<Column<countryData>> = React.useMemo(
		() => [
			{
				Header: 'Flag',
				accessor: 'flag', // accessor is the "key" in the data
			},
			{
				Header: 'Name',
				accessor: 'name',
			},
			{
				Header: 'Alpha2Code',
				accessor: 'alpha2Code',
			},
			{
				Header: 'Alpha2Code',
				accessor: 'alpha3Code',
			},
			{
				Header: 'CallingCodes',
				accessor: 'callingCodes',
			},
			{
				Header: 'NativeName',
				accessor: 'nativeName',
			},
		],
		[]
	)

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,

		// pagination
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable({ columns, data }, usePagination)

	return countryData.length !== 0 ? (
		<table {...getTableProps()}>
			<thead>
				{
					// Loop over the header rows
					headerGroups.map((headerGroup) => (
						// Apply the header row props
						<tr {...headerGroup.getHeaderGroupProps()}>
							{
								// Loop over the headers in each row
								headerGroup.headers.map((column) => (
									// Apply the header cell props
									<th {...column.getHeaderProps()}>
										{
											// Render the header
											column.render('Header')
										}
									</th>
								))
							}
						</tr>
					))
				}
			</thead>
			{/* Apply the table body props */}
			<tbody {...getTableBodyProps()}>
				{
					// Loop over the table rows
					rows.map((row) => {
						// Prepare the row for display
						prepareRow(row)
						return (
							// Apply the row props
							<tr {...row.getRowProps()}>
								{
									// Loop over the rows cells
									row.cells.map((cell) => {
										// Apply the cell props
										return (
											<td {...cell.getCellProps()}>
												{
													// Render the cell contents
													cell.render('Cell')
												}
											</td>
										)
									})
								}
							</tr>
						)
					})
				}
			</tbody>
		</table>
	) : (
		<Box d="flex" alignItems="center" fontSize="3rem">
			資料讀取中
			<Spinner ml={5} size="xl" />
		</Box>
	)
}
