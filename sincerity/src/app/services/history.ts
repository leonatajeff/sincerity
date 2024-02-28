export const getHistory = (userid: string) => {
    return fetch(`/api/history?userid=${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to get history');
            }
            return response.json();
        })
};
