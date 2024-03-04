import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CoverLetter from '../src/app/dashboard/coverletter/page'
import { sendFormDataToServer } from '../src/app/dashboard/coverletter/_services/prompt'

jest.mock('../src/app/dashboard/coverletter/_services/prompt', () => ({
    sendFormDataToServer: jest.fn(() => Promise.resolve('ok'))
}));

describe('form submission', () => {
    it('sends form data for cleaning', async () => {
        render(<CoverLetter />)

        // Fill out the form
        fireEvent.change(screen.getByLabelText('Job Description:'), { target: { value: 'Lorem ipsum dolor sit amet' } })

        // Check if the form data is ready to be sent
        expect(screen.getByLabelText('Job Description:')).toHaveValue('Lorem ipsum dolor sit amet')

        // Submit the form
        fireEvent.click(screen.getByText('Create Cover Letter'))
        
        // Wait for promises to resolve
        await waitFor(() => expect(sendFormDataToServer).toHaveBeenCalled())


        // Add assertions for sending the form data
        // Check if the service is called with the correct form data
        expect(sendFormDataToServer).toHaveBeenCalledWith(
            expect.any(FormData)
        );
    })
})
