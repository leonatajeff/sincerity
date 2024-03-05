import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CoverLetter from '../src/app/dashboard/coverletter/page'
import { sendFormDataToServer } from '../src/app/dashboard/coverletter/_services/prompt'


jest.mock('../src/app/dashboard/coverletter/_services/prompt', () => ({
    sendFormDataToServer: jest.fn(() => Promise.resolve('ok'))
}));

describe('form submission', () => {
    it('fills form data', async () => { // TODO: Split this up to text-fields and file-upload
        render(<CoverLetter />);

        // Fill out the form
        fireEvent.change(screen.getByLabelText('Job Description:'), { target: { value: 'Lorem ipsum dolor sit amet' } });
        const file = new File(['resume content'], 'resume.pdf', { type: 'application/pdf' });
        fireEvent.change(screen.getByLabelText('Upload Resume:'), { target: { files: [file] } });

        // Check if the form data is ready to be sent
        expect(screen.getByLabelText('Job Description:')).toHaveValue('Lorem ipsum dolor sit amet');
    });

    it('submits the form data', async () => { // TODO: Add specific check for the body of the request
        render(<CoverLetter />);

        // Submit the form
        fireEvent.click(screen.getByText('Create Cover Letter'));

        // Wait for promises to resolve
        await waitFor(() => expect(sendFormDataToServer).toHaveBeenCalled());

        // Check if the service is called with the correct form data
        expect(sendFormDataToServer).toHaveBeenCalledWith(
            expect.any(FormData)
        );
    });
});


