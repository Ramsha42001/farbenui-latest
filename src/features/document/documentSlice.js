import { createSlice } from '@reduxjs/toolkit';
import { createDocumentApi, listDocumentsApi, deleteDocumentApi } from './documentApi';

const initialState = {
    document: null,
    documents: [],
    loading: false,
    isLoading: false, // New state for background loading
    error: null,
};

const documentSlice = createSlice({
    name: 'document',
    initialState,
    reducers: {
        // Existing reducers
        createDocumentRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createDocumentSuccess(state, action) {
            state.document = action.payload;
            state.loading = false;
        },
        createDocumentFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        listDocumentsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        listDocumentsSuccess(state, action) {
            state.documents = action.payload;
            state.loading = false;
        },
        listDocumentsFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        deleteDocumentRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteDocumentSuccess(state, action) {
            state.documents = state.documents.filter(doc => doc.id !== action.payload);
            state.loading = false;
        },
        deleteDocumentFailure(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        // New reducer for background loading state
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const {
    createDocumentRequest,
    createDocumentSuccess,
    createDocumentFailure,
    listDocumentsRequest,
    listDocumentsSuccess,
    listDocumentsFailure,
    deleteDocumentRequest,
    deleteDocumentSuccess,
    deleteDocumentFailure,
    setLoading, // Export the new action
} = documentSlice.actions;

// Existing async thunks
export const createDocument = (documentData) => async (dispatch) => {
    dispatch(createDocumentRequest());
    try {
        const documentResponse = await createDocumentApi(documentData);
        dispatch(createDocumentSuccess(documentResponse));
    } catch (error) {
        dispatch(createDocumentFailure(error.message));
    }
};

export const listDocuments = (username) => async (dispatch) => {
    dispatch(listDocumentsRequest());
    try {
        const documentsResponse = await listDocumentsApi(username);
        dispatch(listDocumentsSuccess(documentsResponse));
    } catch (error) {
        dispatch(listDocumentsFailure(error.message));
    }
};

export const deleteDocument = (documentId) => async (dispatch) => {
    dispatch(deleteDocumentRequest());
    try {
        await deleteDocumentApi(documentId);
        dispatch(deleteDocumentSuccess(documentId));
    } catch (error) {
        dispatch(deleteDocumentFailure(error.message));
    }
};

export default documentSlice.reducer;