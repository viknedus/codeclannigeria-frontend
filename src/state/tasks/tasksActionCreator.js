import * as types from './tasksActionTypes';
import codeClanApi from '../../api/apiUtils';
import history from '../../history';

export const getAllTasksAction = trackId => {
  return async dispatch => {
    dispatch({ type: types.TASKS_START });
    return codeClanApi
      .get('/tasks')
      .then(res => {
        const tasks = res.data.items.filter(task => task.track === trackId);
        const submittedTasksUnfiltered = async () => {
          return Promise.all(tasks.map(task => checkTaskSubmission(task)));
        };
        // const submittedTasks = submittedTasksUnfiltered().then(
        //   res => res !== undefined
        // );
        const submittedTasks = submittedTasksUnfiltered()
          .then(res => {
            return res.filter(task => task !== undefined);
          })
          .then(submitted => {
            const unsubmittedTasks = tasks.filter(
              ({ id: id1 }) => !submitted.some(({ id: id2 }) => id2 === id1)
            );
            // console.log(tasks);
            // console.log(submitted);
            const tasksObj = {
              items: unsubmittedTasks,
              totalCount: unsubmittedTasks.length,
            };
            const submittedTasksObj = {
              items: submitted,
              totalCount: submitted.length,
            };
            dispatch({
              type: types.MENTEE_SUBMITTED_TASKS_SUCCESS,
              payload: submittedTasksObj,
            });
            dispatch({ type: types.TASKS_SUCCESS, payload: tasksObj });
          });

        console.log(submittedTasks());

        history.push(`/dashboard`);
      })
      .catch(err => {
        const error_msg = err.response
          ? err.response.data.message
          : 'An error occurred';

        dispatch({
          type: types.TASKS_FAILURE,
          payload: error_msg,
        });
      });
  };
};

export const getSingleTaskAction = id => {
  return async dispatch => {
    dispatch({ type: types.TASKS_START });
    try {
      const res = await codeClanApi.get(`/tasks/${id}`);
      dispatch({ type: types.GET_TASK, payload: res.data });
    } catch (err) {
      const error_msg = err.response
        ? err.response.data.message
        : 'An error occurred';
      dispatch({
        type: types.TASKS_FAILURE,
        payload: error_msg,
      });
    }
  };
};

export const submitTaskAction = (taskId, url, comments) => {
  return async dispatch => {
    dispatch({ type: types.TASKS_START });

    try {
      const res = await codeClanApi.post(`/tasks/${taskId}/submissions`, {
        menteeComment: comments,
        taskUrl: url,
      });
      console.log(res);
      dispatch({ type: types.SUBMIT_TASK, payload: taskId });
    } catch (err) {
      const error_msg = err.response
        ? err.response.data.message
        : 'An error occurred';

      dispatch({
        type: types.TASKS_FAILURE,
        payload: error_msg,
      });
    }
  };
};

export const getAllMentorSubmissions = () => {
  return async dispatch => {
    dispatch({ type: types.TASKS_START });
    try {
      const res = await codeClanApi.get('mentors/submissions');
      dispatch({ type: types.MENTOR_SUBMISSIONS, payload: res.data.items });
    } catch (err) {
      const error_msg = err.response
        ? err.response.data.message
        : 'An error occurred';

      dispatch({
        type: types.TASKS_FAILURE,
        payload: error_msg,
      });
    }
  };
};

export const gradeTaskAction = data => {
  return async dispatch => {
    dispatch({ type: types.TASKS_START });
    // const payloadData = { ...data };
    // const id = data.id;
    // delete payloadData.id;
    // delete payloadData.taskUrl;
    // delete payloadData.menteeComment;
    const { gradePercentage, mentorComment } = data;
    const req = { gradePercentage, mentorComment };
    try {
      const res = await codeClanApi.post(`/mentors/grade/${data.id}/`, req);
      console.log(res);
      dispatch({ type: types.GRADE_TASK, payload: data });
    } catch (err) {
      const error_msg = err.response
        ? err.response.data.message
        : 'An error occurred';

      dispatch({
        type: types.TASKS_FAILURE,
        payload: error_msg,
      });
    }
  };
};

export const checkTaskSubmission = async task => {
  try {
    const res = await codeClanApi.get(`tasks/${task.id}/submissions`);
    if (res.data.totalCount > 0) {
      return task;
    }
  } catch (err) {
    throw err;
  }
};

export const getTaskSubmissionAction = taskId => {
  return async dispatch => {
    dispatch({ type: types.GET_MENTEE_TASK_SUBMISSION });
    try {
      const res = await codeClanApi.get(`tasks/${taskId}/submissions`);
      dispatch({
        type: types.GET_MENTEE_TASK_SUBMISSION_SUCCESS,
        payload: res.data.items[0],
      });
    } catch (err) {
      const error_msg = err.response
        ? err.response.data.message
        : 'An error occurred';

      dispatch({
        type: types.GET_MENTEE_TASK_SUBMISSION_FAILURE,
        payload: error_msg,
      });
    }
  };
};
