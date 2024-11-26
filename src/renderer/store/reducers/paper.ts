import { createSlice } from '@reduxjs/toolkit';

interface PaperState {
    teacherPreviewId: string[];
    selectedQuestionIds: string[];
    studentAnswers: (string | null)[];
    setTime: number | null,
    paperId: string | null;
    
}

const initialState = {
    teacherPreviewId: [],
    selectedQuestionIds: [],
    studentAnswers: [],
    setTime: null,
    paperId:null,
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
        setTimeNumber(state,action){
            state.setTime = action.payload;
        },
        setPaperIdnow(state,action){
            state.paperId = action.payload;
        }
    },
});

export const { setTeacherPreviewId,setPaperIdnow, setSelectedQuestionIds, setSelectedStudentAnswers,setTimeNumber } = PaperSlice.actions
export default PaperSlice.reducer;
