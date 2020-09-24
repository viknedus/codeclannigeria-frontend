import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Form } from 'antd';
import MentorDashboardLayout from '../MentorDashboardHOC';
import { connect, useDispatch } from 'react-redux';
import {
  getAllMentorSubmissions,
  gradeTaskAction,
} from '../../../state/tasks/tasksActionCreator';
import { getUserMenteesProfileApi } from '../../../state/user/userActionCreator';
import TaskForm from '../common/TaskForm';

function SubmissionList({
  mentorTasks,

  loading,
  getUserMenteesProfileApi,
  getAllMentorSubmissions,
  gradeTaskAction,
}) {
  const [visible, setVisible] = useState();
  const [currentRecord, setCurrentRecord] = useState();
  const dispatch = useDispatch();

  const onCreate = (values, initialData) => {
    values.id = initialData.id;
    gradeTaskAction(values);
  };
  const [form] = Form.useForm();

  const onCancel = () => {
    setCurrentRecord(null);
  };

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({ ...currentRecord });
      setVisible(true);

      // setCurrentRecord(null);
    } else {
      setVisible(false);
    }
  }, [currentRecord]);

  const handleModalVisiblity = record => {
    dispatch({ type: 'TASKS_RESET' });

    setCurrentRecord(record);
  };

  useEffect(() => {
    getAllMentorSubmissions();
  }, [getAllMentorSubmissions]);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Grade %',
      dataIndex: 'gradePercentage',
      filters: [
        {
          text: 'Not Graded',
          value: 'notGraded',
        },
        {
          text: 'Graded',
          value: 'graded',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) =>
        value === 'graded'
          ? record.gradePercentage > 0
          : record.gradePercentage <= 0,
      // render: bool => <Switch checked={bool} />,
    },
    {
      title: 'Grade',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleModalVisiblity(record)}>
            Grade
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="ml-4">Mentees Task Submissions</h2>
      <Table
        className="mentee-table ml-4"
        columns={columns}
        dataSource={mentorTasks}
        size="small"
        pagination={{ pageSize: 10 }}
        // scroll={{ y: 240 }}
      />
      <TaskForm
        initialData={currentRecord}
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        loadiing={loading}
        form={form}
      />
    </div>
  );
}

const mapStateToProps = store => {
  const { loading, error, errResponse, mentorTasks } = store.tasks;

  return {
    loading,
    error,
    mentorTasks,
    errResponse,
  };
};

const mapDispatchToProps = {
  getUserMenteesProfileApi,
  getAllMentorSubmissions,
  gradeTaskAction,
};

export default MentorDashboardLayout(
  connect(mapStateToProps, mapDispatchToProps)(SubmissionList)
);
