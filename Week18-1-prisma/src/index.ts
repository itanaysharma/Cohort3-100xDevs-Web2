import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function createTodo(title: string, description: string, userId: number) {
  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId,
    },
  });
  console.log(todo);
}

createTodo("other work", "Complete by this day", 1);

async function getTodo(userId: number) {
  const todo = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      email: true,
      todos: true,
    },
  });
  console.log(todo);
}
getTodo(1);
