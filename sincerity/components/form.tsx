import { FormEvent, useState } from 'react';
import { sendFormDataToServer } from '../src/app/dashboard/coverletter/_services/prompt';

export default function Form() {
    const [formData, setFormData] = useState<{ jobDesc: string, resume: File | null}>({
        jobDesc: '',
        resume: null,
    });

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            "jobDesc": value,
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();
    
        formDataToSend.append('jobDesc', formData.jobDesc);
        if (formData.resume) {
            formDataToSend.append('resume', formData.resume);
        }
        console.log(formDataToSend);
    
        try {
            await sendFormDataToServer(formDataToSend);
            setFormData({
                jobDesc: '',
                resume: null,
            });
        } catch (error) {
            console.error('Failed to send form data:', error);
        }
    };

    return (
        <form data-testid="coverletter-form" className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <label htmlFor="job-description">Job Description:</label>
            <textarea id="job-description" className="h-48" name="jobDesc" value={formData.jobDesc} onChange={handleChange} />

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