import { createSlice } from '@reduxjs/toolkit';

interface PaperState {
    teacherPreviewId: string[];
    selectedQuestionIds: string[];
    studentAnswers: (string | null)[];
}

const initialState = {
    teacherPreviewId: [],
    selectedQuestionIds: [],
    studentAnswers: [],
}

const PaperSlice = createSlice({
    name: 'person',
    initialState: initialState,
    reducers: {
        setTeacherPreviewId(state, action) {
            state.teacherPreviewId = action.payload;
        },
        setSelectedQuestionIds(state, action) {
            state.selectedQuestionIds = action.payload;
            console.log(state.selectedQuestionIds);
        },
        setSelectedStudentAnswers(state, action) {
            state.studentAnswers = action.payload;
        },

    },
});

export const { setTeacherPreviewId, setSelectedQuestionIds,setSelectedStudentAnswers } = PaperSlice.actions
export default PaperSlice.reducer;
