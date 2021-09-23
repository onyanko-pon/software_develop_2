import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

const initialState = {
  courseList: [],
  teacherList: [],
  title: "時間割自動生成",
  topTitle: "",
}

export const actionTypes = {
  CREATE_COURSE: 'CREATE_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  SET_COURSES: 'SET_COURSES',

  CREATE_TEACHER: 'CREATE_TEACHER',
  DELETE_TEACHER: 'DELETE_TEACHER',
  SET_TEACHERS: 'SET_TEACHERS',

  UPDATE_TITLE: 'UPDATE_TITLE',

  UPDATE_TOP_TITLE: 'UPDATE_TOP_TITLE'
}

export const reducer = (state = initialState, action) => {
  let courseList = []
  switch (action.type) {
    case actionTypes.CREATE_COURSE:
      return {
        ...state,
        courseList: [...state.courseList, action.data.course].map((course, i) => {return {...course, id: i}})
      }
    case actionTypes.UPDATE_COURSE:
      const updateCourseList = [...state.courseList]
      updateCourseList.splice(action.data.courseId, 1, action.data.course);
      return {
        ...state,
        courseList: updateCourseList
      }
    case actionTypes.DELETE_COURSE:
      courseList = state.courseList.filter(course => course.id !== action.data.deleteCourseId)
      return {
        ...state,
        courseList: courseList.map((course, i) => { return {...course, id: i} })
      }
    case actionTypes.SET_COURSES:
      return {
        ...state,
        courseList: action.data.courses
      }

    case actionTypes.CREATE_TEACHER:
      return {
        ...state,
        teacherList: [...state.teacherList, { id: state.teacherList.length, ...action.data.teacher }]
      }

    case actionTypes.SET_TEACHERS:
      return {
        ...state,
        teacherList: action.data.teachers
      }

    case actionTypes.DELETE_TEACHER:
      const deletedTeacherList = state.teacherList.filter(teacher => { return action.data.deleteTeacherId !== teacher.id })
      return {
        ...state,
        teacherList: deletedTeacherList.map((teacher, i) => {return {...teacher, id: i}} )
      }

    case actionTypes.UPDATE_TITLE:
      return {
        ...state,
        title: action.data.title
      }

    case actionTypes.UPDATE_TOP_TITLE:
      return {
        ...state,
        topTitle: action.data.topTitle
      }

    default:
      return state
  }
}

export const createCourse = (course) => {
  return {
    type: actionTypes.CREATE_COURSE,
    data: {
      course
    }
  }
}

export const updateCourse = (course, courseId) => {
  return {
    type: actionTypes.UPDATE_COURSE,
    data: {
      courseId,
      course
    }
  }
}

export const createTeacher = (teacher) => {
  return {
    type: actionTypes.CREATE_TEACHER,
    data: {
      teacher
    }
  }
}

export const deleteTeacher = (teacher) => {
  return {
    type: actionTypes.DELETE_TEACHER,
    data: {
      teacher
    }
  }
}

export const updateTitle = (title) => {
  return {
    type: actionTypes.UPDATE_TITLE,
    data: {
      title
    }
  }
}

export function initializeStore(initState = initialState) {
  return createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(logger))
  )
}