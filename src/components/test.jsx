import { useEffect, useState } from 'react';

const TestPage = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const countId = setInterval(() => {
      setCount(count + 1);
    }, 3000);

    return () => clearInterval(countId);

    // 👇 React Hook useEffect has a missing dependency: 'count'.
    // Either include it or remove the dependency array.
  }, [count]);

  return (
    <div>
      <p>You clicked: {count} times </p>
      <button
        style={{ marginRight: 10 }}
        onClick={() => setCount((prev) => prev + 1)}
      >
        Click me
      </button>
    </div>
  );
};

export default TestPage;
