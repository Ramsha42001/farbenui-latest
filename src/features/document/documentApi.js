import network from '../../services/network';

// API to create a document
export const createDocumentApi = async (documentData) => {
    try {
        const queryString = new URLSearchParams(documentData).toString();
        const response = await network.get(`/api/documents?${queryString}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to create document');
    }
};

// API to list documents by username
export const listDocumentsApi = async (username) => {
    try {
        const response = await network.get(`/api/documents/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch documents');
    }
};

// API to delete a document by ID
export const deleteDocumentApi = async (documentId) => {
    try {
        const response = await network.get(`/api/deletedocuments/${documentId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to delete document');
    }
};
