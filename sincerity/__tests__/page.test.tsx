import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import Form from '../src/app/page'

describe('signing in', () => {
    it('renders google sign in', () => {
        render(<Home />)

        // Form itself
        const formElement = screen.getByTestId('sign-in-button');
        expect(formElement).toBeInTheDocument();
    })
})