'use client'
// page.tsx
import { FormEvent, useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobDescription: '',
    resume: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
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
    sendFormDataToServer();
  };

  const formatFormData = () => {
    const { name, email, jobDescription, resume } = formData;
    return {
      name,
      email,
      jobDescription,
      resume: resume ? resume.name : null,
    };
  };
  
  const sendFormDataToServer = () => {
    const formattedData = formatFormData();
    // Assuming your server endpoint is /api/sendFormData
    fetch('/api/coverletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to send form data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Form data sent successfully:', data);
        // Reset form data if needed
        setFormData({
          name: '',
          email: '',
          jobDescription: '',
          resume: null,
        });
      })
      .catch(error => {
        console.error('Error sending form data:', error);
      });
  };
  
      

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
    </main>
  );
}
