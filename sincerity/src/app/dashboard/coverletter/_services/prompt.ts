import { TextItem, TextContent, TextMarkedContent } from 'pdfjs-dist/types/src/display/api';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

/**
 * Sends form data to the server
 * @param {FormData} formData
 * @returns {Promise<any>} A promise that is resolved when the form data is sent.
 */
export const sendFormDataToServer = async (formData: FormData) => {

    const prompt: string = await createPrompt(formData);

    const jsonData = {
        "role" : "user",
        "content": prompt
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

 /**
  * Creates a prompt for the user based on the job description and resume
  * @param {FormData} formData
  * @returns {Promise<string>} A promise that is resolved when the prompt is created.
  */
async function createPrompt(formData: FormData): Promise<string> {
    const jobDesc: string = formData.get('jobDesc') as string;
    const resumeFile: File | null = formData.get('resume') as File | null;

    let prompt: string = "";

    try {
        const resumeText = resumeFile ? await getResumeText(resumeFile!) : "";
        if (resumeText === "") prompt = "No resume";
        else {
            // Engineer the Prompt here.
            prompt = `Create a cover letter based on this ${jobDesc} \n ${resumeText}.`;
        }
    } catch (error) {
        console.error("Error processing resume:", error);
    }

    return prompt;
}


/**
 * Gets Resume Text from a PDF file
 * @param {File} fileName
 * @returns {Promise<string>} A promise that is resolved when pdf is processed and text is extracted.
 */
async function getResumeText(file: File): Promise<string> {
    let extractedText: string = "";
    const pdfBuffer: ArrayBuffer = await file.arrayBuffer();
    const pdfJS = await import('pdfjs-dist');
    pdfJS.GlobalWorkerOptions.workerSrc = window.location.origin + "/pdf.worker.min.mjs";

    const pdfDocument: PDFDocumentProxy = await pdfJS.getDocument(pdfBuffer).promise;

    try {
        const page: PDFPageProxy = await pdfDocument.getPage(1);
        extractedText = await extractText(page);
    } catch ( error ){
        throw error;
    } finally {
        pdfDocument.destroy();
    }

    return extractedText;
}

/**
 * Helper function to extract text from a PDF page
 * @param {PDFPageProxy} page
 * @returns {Promise<string>} A promise that is resolved when the text is extracted.
 */
async function extractText(page: PDFPageProxy): Promise<string> {
    const content: TextContent = await page.getTextContent();
    const textItems: TextItem[] = content.items.filter((item: TextItem | TextMarkedContent): item is TextItem => {
        return typeof (item as TextItem).str === "string";
    });
    
    return textItems.map((item: TextItem) => item.str).join("");
}