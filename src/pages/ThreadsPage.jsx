import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getThreads } from '../states/threads/action';
import Button from '../components/Button';
import { extractCategoriesFromThreads } from '../states/categories/action';
import ThreadItem from '../components/ThreadItem';
import { Link } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { useLoading } from '../hooks/use-loading';
import LoadingTailwind from '../components/LoadingTailwind';
import Categories from '../components/Categories';

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
        <Categories />
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
