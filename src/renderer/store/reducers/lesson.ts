import { createSlice } from "@reduxjs/toolkit";
const lessonSlice=createSlice({
    name: "lesson",
    initialState: {
        lessonId: "",
        lessonName: "",
        lessonAvatar: "",
    },
    reducers: {
        setLessonId: (state, action) => {
            state.lessonId = action.payload;
        },
        setLessonName: (state, action) => {
            state.lessonName = action.payload;
        },
        setLessonAvatar: (state, action) => {
            state.lessonAvatar = action.payload;
        },
    }
})
export const { setLessonId, setLessonName, setLessonAvatar } = lessonSlice.actions;
export default lessonSlice.reducer;