import { Box, Image, Input, Spinner, Text } from '@chakra-ui/react'
import React from 'react'
import useCountryData from '../useState/useCountryData'
import {
	useTable,
	usePagination,
	Column,
	useSortBy,
	useFilters,
} from 'react-table'
import CountryDetailModal from './CountryDetailModal'

interface countryData {
	flag: string
	name: string
	alpha2Code: string
	alpha3Code: string
	callingCodes: string[]
	nativeName: string
}

function DefaultColumnFilter({ column: { filterValue, setFilter } }: any) {
	return (
		<Input
			value={filterValue || ''}
			onChange={(e) => {
				setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
			}}
			placeholder={`請輸入國家`}
			borderColor="black"
		/>
	)
}

export default function Table() {
	const countryData: Array<countryData> = useCountryData()

	const data = React.useMemo(() => countryData, [countryData])

	const defaultColumn = React.useMemo(
		() => ({
			// Let's set up our default Filter UI
			Filter: DefaultColumnFilter,
		}),
		[]
	)

	const columns: Array<Column<countryData>> = React.useMemo(
		() => [
			{
				Header: 'Flag',
				accessor: 'flag', // accessor is the "key" in the data
				Cell: (row) => {
					return <Image src={row.value} w="50px" mx="auto" />
				},

				disableFilters: true,
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
				disableFilters: true,
			},
			{
				Header: 'Alpha3Code',
				accessor: 'alpha3Code',
				disableFilters: true,
			},
			{
				Header: 'CallingCodes',
				accessor: 'callingCodes',
				disableFilters: true,
			},
			{
				Header: 'NativeName',
				accessor: 'nativeName',
				disableFilters: true,
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
		{
			columns,
			data,
			defaultColumn,
			initialState: { pageIndex: 0, pageSize: 25 },
		},
		useFilters,
		useSortBy,
		usePagination
	)

	return countryData.length !== 0 ? (
		<>
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
				<Box d="inline" fontSize="1.5em">
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</Box>
			</div>
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
											<th>
												<Box
													py=".5em"
													{...column.getHeaderProps(
														column.getSortByToggleProps()
													)}
												>
													{
														// Render the header
														column.render('Header')
													}
													{column.isSorted ? (
														column.isSortedDesc ? (
															<Text d="inline" ml="1em">
																&uarr;
															</Text>
														) : (
															<Text d="inline" ml="1em">
																&darr;
															</Text>
														)
													) : (
														' '
													)}
												</Box>
												<Box borderTop="1px solid" py=".5em" px="1em">
													{column.canFilter ? (
														// <Input
														// 	placeholder="請輸入國家"
														// 	borderColor="black"
														// 	type="text"
														// 	onChange={(e) => column.setFilter(e.target.value)}
														// />
														column.render('Filter')
													) : (
														<Input disabled defaultValue="暫不開放" />
													)}
												</Box>
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
		</>
	) : (
		<Box d="flex" alignItems="center" fontSize="3rem">
			資料讀取中
			<Spinner ml={5} size="xl" />
		</Box>
	)
}
