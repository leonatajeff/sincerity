import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'
import Form from '../src/app/page'

describe('Page tests', () => {
    it('renders sincerity form', () => {
        render(<Home />)

        // Form itself
        const formElement = screen.getByTestId('coverletter-form');
        expect(formElement).toBeInTheDocument();
    })
})