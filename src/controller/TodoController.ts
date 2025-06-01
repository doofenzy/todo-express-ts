import { User } from '../model/User';
import { Todo } from '../model/Todo';

const createTodo = async (req: any, res: any) => {
  const { title } = req.body;
  // Extract userId from req.user (handle both id and userId fields)
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

export { createTodo };
