import { CLForm } from '../../../../ts/CLForm';
export const sendFormDataToServer = (formData: CLForm) => {
    const formattedData = formatFormData(formData);
    return fetch('/api/coverletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to send form data');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Form data sent successfully:', data);
            return data;
        })
        .catch((error) => {
            console.error('Error sending form data:', error);
            throw error;
        });
};

const formatFormData = (formData: CLForm) => ({
    name: formData.name ?? '',
    email: formData.email ?? '',
    jobDescription: formData.jobDescription ?? '',
    resume: formData.resume instanceof File ? formData.resume.name : null,
});

