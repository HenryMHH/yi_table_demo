import { Box, Image, Spinner } from '@chakra-ui/react'
import React from 'react'
import useCountryData from '../useState/useCountryData'
import { useTable, usePagination, Column, useSortBy } from 'react-table'
import CountryDetailModal from './CountryDetailModal'

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
				Cell: (row) => {
					return <Image src={row.value} w="50px" mx="auto" />
				},
			},
			{
				Header: 'Name',
				accessor: 'name',
				Cell: (row) => {
					return <CountryDetailModal countryName={row.value} />
				},
			},
			{
				Header: 'Alpha2Code',
				accessor: 'alpha2Code',
			},
			{
				Header: 'Alpha3Code',
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
		page,
		prepareRow,

		// pagination
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		state: { pageIndex },
	} = useTable(
		{ columns, data, initialState: { pageIndex: 1, pageSize: 25 } },
		useSortBy,
		usePagination
	)

	return countryData.length !== 0 ? (
		<>
			<table {...getTableProps()}>
				<thead>
					{
						// Loop over the header rows
						headerGroups.map((headerGroup) => (
							// Apply the header row props
							<tr {...headerGroup.getHeaderGroupProps()}>
								{
									// Loop over the headers in each row
									headerGroup.headers.map((column) => {
										// Apply the header cell props

										return (
											<th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
											>
												{
													// Render the header
													column.render('Header')
												}
											</th>
										)
									})
								}
							</tr>
						))
					}
				</thead>
				{/* Apply the table body props */}
				<tbody {...getTableBodyProps()}>
					{
						// Loop over the table rows
						page.map((row) => {
							// Prepare the row for display
							prepareRow(row)
							return (
								// Apply the row props
								<tr {...row.getRowProps()}>
									{
										// Loop over the rows cells
										row.cells.map((cell) => {
											// console.log(cell.column.Header)
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
			<div className="pagination">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'<<'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'<'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'>'}
				</button>{' '}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{'>>'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
			</div>
		</>
	) : (
		<Box d="flex" alignItems="center" fontSize="3rem">
			資料讀取中
			<Spinner ml={5} size="xl" />
		</Box>
	)
}
