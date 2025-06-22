import api from '@/axios/axios.instance';

const init = '/todo';

const getTodosService = async () => {
  try {
    const res = await api.get(init);
    return res.data;
  } catch (error) {
    return { error: `GET TODOS ERROR: ${error}` };
  }
};

const addTodoService = async (data: { name: string; isFinished: boolean }) => {
  try {
    const res = await api.post(init, {
      name: data.name,
      isFinished: data.isFinished,
    });
    return res.data;
  } catch (error) {
    return { error: `ADD TODO ERROR: ${error}` };
  }
};

const updateTodoService = async (data: {
  id: number;
  name: string;
  isFinished: boolean;
}) => {
  try {
    const res = await api.put(`${init}/${data.id}`, {
      name: data.name,
      isFinished: data.isFinished,
    });
    return res.data;
  } catch (error) {
    return { error: `UPDATE TODO ERROR: ${error}` };
  }
};

const deleteTodoService = async (id: number) => {
  try {
    const res = await api.delete(`${init}/${id}`);
    return res.data;
  } catch (error) {
    return { error: `DELETE TODO ERROR: ${error}` };
  }
};

export {
  getTodosService,
  addTodoService,
  updateTodoService,
  deleteTodoService,
};
