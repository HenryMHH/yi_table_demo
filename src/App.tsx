import StyledTable from './components/StyledTable'
import { Box, Text } from '@chakra-ui/react'
function App() {
	return (
		<Box className="App" textAlign="center" pb="2em">
			<Text fontSize="4em">面試考題</Text>
			<StyledTable />
		</Box>
	)
}

export default App
