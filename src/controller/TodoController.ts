import { Todo } from '../model/Todo';

const createTodo = async (req: any, res: any) => {
  const { title } = req.body;

  const userId = req.user?.id;
  console.log('User ID:', userId);
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const todo = await Todo.create({
      user: userId,
      title,
      status: false,
      createdAt: new Date(),
    });
    return res.status(201).json({ message: 'Todo created successfully', todo });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getTodos = async (req: any, res: any) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const todos = await Todo.find({ user: userId });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: 'No todos found' });
    }
    res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTodo = async (req: any, res: any) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTodo = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, status } = req.body;
  const userId = req.user?.id;

  try {
    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    // Update the todo fields
    if (title !== undefined) todo.title = title;
    if (status !== undefined) todo.status = status;
    await todo.save();
    return res.status(200).json({ message: 'Todo updated successfully', todo });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export { createTodo, getTodos, deleteTodo, updateTodo };
