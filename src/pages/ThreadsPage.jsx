import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getThreads } from '../states/threads/action';
import Button from '../components/Button';
import { extractCategoriesFromThreads, toggleCategorySelection } from '../states/categories/action';
import ThreadItem from '../components/ThreadItem';

const ThreadsPage = () => {
  const threads = useSelector((states) => states.threads);
  const categories = useSelector((states) => states.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreads());
  }, [dispatch]);

  useEffect(() => {
    if (threads.length > 0) {
      dispatch(extractCategoriesFromThreads());
    }
  }, [threads, dispatch]);

  function toggleSelect(category) {
    dispatch(toggleCategorySelection(category));
  }

  const filteredThreads = threads.filter((thread) => {
    const category = categories.find((cat) => cat.category === thread.category);
    return category && category.selected;
  });

  return (
    <>
      <div className="flex items-center justify-start gap-2">
        <p className="text-lg">Categories:</p>
        <ul className="flex">
          {categories.map((category) => (
            <li key={category.category}>
              <Button.Normal onClick={() => toggleSelect(category.category)} className="text-3xl">
                {category.category} {category.selected ? '✔️' : '❌'}
              </Button.Normal>
            </li>
          ))}
        </ul>
      </div>
      <h1 className="text-2xl">List Threads</h1>
      {filteredThreads.length > 0 ? (
        filteredThreads.map((thread) => <ThreadItem key={thread.id} {...thread} />)
      ) : (
        <p className="text-lg">No threads available</p>
      )}
    </>
  );
};

export default ThreadsPage;
