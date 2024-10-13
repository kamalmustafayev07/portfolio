import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Lead } from "../types";

interface DealsSlice {
    leads: Array<Lead>,
    openedCardId: number | null,
    openedCardInfo: Lead | null,
    notFound: boolean,
    isLoading: boolean;
    isLoadingCard: boolean;
    error: boolean;
}

export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async (urlInfo: string) => {
        const res = await fetch(urlInfo);
        const data = await res.json();
        return { data, urlInfo };
    }
);

const initialState: DealsSlice = {
    leads: [],
    openedCardId: null,
    openedCardInfo: null,
    notFound: false,
    isLoading: false,
    isLoadingCard: false,
    error: false,
}

const dealsSlice = createSlice({
    name: 'deals',
    initialState,
    reducers: {
        addToOpenedLoad: (state, action: PayloadAction<number | null>) => {
            state.openedCardId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state, action) => {
            if (action.meta.arg.includes('id')) {
                state.isLoadingCard = true;
            }else{
                state.isLoading=true;
            }
        });
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            const { data, urlInfo } = action.payload;
            if (data) {
                state.notFound = false;

                if (urlInfo.includes('id')) {
                    state.openedCardInfo = data;
                    state.isLoadingCard = false;
                } else {
                    data._embedded.leads.forEach((element: Lead) => {
                        state.leads.push(element);
                    });
                    state.isLoading = false;
                }
            } else {
                state.notFound = true;
            }
        });
        builder.addCase(fetchContent.rejected, (state) => {
            state.isLoading = false;
            state.isLoadingCard = false;
            state.error = true;
        });
    },
});

export const { addToOpenedLoad } = dealsSlice.actions;

export default dealsSlice.reducer;
