export const sendFormDataToServer = (formData: FormData) => {
    const jsonData = {
        jobDesc: formData.get('jobDesc'),
        resume: formData.get('resume'),
    };

    return fetch('/api/coverletter', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
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
