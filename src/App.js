import { Heading, VStack } from '@chakra-ui/react';
import Login from './components/login';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <VStack p={4} minH="100vh">
         <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/todo" element={<TodoList />} />
        </Routes>
      </VStack>
    </Router>
  );
}

function TodoList() {
  return (
    <>
       <Heading
          mt="20"
          p="5"
          fontWeight="extrabold"
          size="xl"
        
          bgGradient="linear(to-l, blue.300, blue.500)"
          bgClip="text"
        >
          Todo List
        </Heading>
      <AddTask />
      <TaskList />
    
    </>
  );
}