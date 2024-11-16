import { createSlice } from '@reduxjs/toolkit';

const PaperSlice = createSlice({
    name: 'person',
    initialState: {
        teacherPreviewId: [],
        selectedQuestionIds: [], 
    },
    reducers: {
        setTeacherPreviewId(state, action) {
            state.teacherPreviewId = action.payload;
        },
        setSelectedQuestionIds(state, action) {
            state.selectedQuestionIds = action.payload;
            console.log(state.selectedQuestionIds);
            
        },
    },
});

export const { setTeacherPreviewId, setSelectedQuestionIds } = PaperSlice.actions
export default PaperSlice.reducer;
