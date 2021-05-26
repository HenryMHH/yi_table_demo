import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Spinner,
} from '@chakra-ui/react'

export default function CustomModal({
	isOpen,
	onClose,
	data,
}: {
	isOpen: boolean
	onClose: () => void
	data: any
}) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>其他資訊</ModalHeader>
				<ModalCloseButton />
				<ModalBody textAlign="center">
					{data ? data : <Spinner size="xl" />}
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="blue" mr={3} onClick={onClose}>
						關閉
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
