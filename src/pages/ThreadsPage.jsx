import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getThreads } from '../states/threads/action';
import Button from '../components/Button';
import { extractCategoriesFromThreads, toggleCategorySelection } from '../states/categories/action';
import ThreadItem from '../components/ThreadItem';
import { Link } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { useLoading } from '../hooks/use-loading';
import LoadingTailwind from '../components/LoadingTailwind';

const ThreadsPage = () => {
  const threads = useSelector((states) => states.threads);
  const categories = useSelector((states) => states.categories);
  const dispatch = useDispatch();
  const isLoading = useLoading();

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

  if (isLoading) {
    return <LoadingTailwind />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <p className="text-lg">Categories:</p>
          <ul className="flex gap-x-2">
            {categories.map((category) => (
              <li key={category.category}>
                <Button.Normal onClick={() => toggleSelect(category.category)} className="text-3xl">
                  {category.category} {category.selected ? '✔️' : '❌'}
                </Button.Normal>
              </li>
            ))}
          </ul>
        </div>
        <Button.Dark as={Link} to="/threads/new" iconName="material-symbols-light:add">
          Add New
        </Button.Dark>
      </div>
      <h1 className="text-2xl">List Threads</h1>
      <div className="pt-2 pb-4">
        {filteredThreads.length > 0 ? (
          filteredThreads.map((thread) => <ThreadItem key={thread.id} id={thread.id} />)
        ) : (
          <NotFound>No threads available</NotFound>
        )}
      </div>
    </>
  );
};

export default ThreadsPage;
