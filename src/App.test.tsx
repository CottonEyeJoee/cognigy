import { render, screen } from '@testing-library/react'
import { App } from 'App'

test('renders app links', () => {
	render(<App />)

	expect(screen.getByText(/Chatbot/i)).toBeInTheDocument()
})
