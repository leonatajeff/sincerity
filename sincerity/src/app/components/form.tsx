import { FormEvent, useState } from 'react';
import { CLForm } from '../../ts/CLForm';
import { sendFormDataToServer } from '../services/prompt';

export default function Form() {
    const [formData, setFormData] = useState<CLForm>({
        name: '',
        email: '',
        jobDescription: '',
        resume: null,
    });

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file && file.size > MAX_FILE_SIZE) {
            alert('File size exceeds the limit. Please choose a smaller file.');
            return;
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            resume: file,
        }));
    };

    const handleDeleteFile = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            resume: null,
        }));

        // Reset the file input element
        const fileInput = document.getElementById('resume') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Use formData for your logic (e.g., send it to an API)
        console.log(formData);
        sendFormDataToServer(formData)
            .then(() => {
                // Reset form data if needed
                setFormData({
                    name: '',
                    email: '',
                    jobDescription: '',
                    resume: null,
                });
            })
            .catch((error) => {
                // Handle error (e.g., display error message)
                console.error('Failed to send form data:', error);
            });
    };

    return (
        <form data-testid="coverletter-form" className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />

            <label htmlFor="job-description">Job Description:</label>
            <input type="text" id="job-description" name="jobDescription" value={formData.jobDescription} onChange={handleChange} />

            <label htmlFor="resume">Upload Resume:</label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            {formData.resume && (
                <div>
                    <p>Resume: {formData.resume.name}</p>
                    <button type="button" onClick={handleDeleteFile}>Delete Resume</button>
                </div>
            )}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Cover Letter</button>
        </form>
    );
}