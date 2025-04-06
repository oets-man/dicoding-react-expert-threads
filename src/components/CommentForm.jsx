import { useDispatch } from 'react-redux';
import { useLoading } from '../hooks/use-loading';
import Button from './Button';
import useInput from '../hooks/use-input';
import { addComment } from '../states/threadDetail/action';
function CommentForm() {
  const isLoading = useLoading();
  const dispatch = useDispatch();
  const [content, onChangeContent, setContent] = useInput('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      alert('Konten diperlukan');
      return;
    }
    dispatch(addComment(content)).then((result) => {
      if (result) setContent('');
    });
  };
  return (
    <div>
      <h3 className="text-xl">New Comment</h3>
      <div className="border-slate-500 p-2 rounded border">
        <form action="" onSubmit={onSubmit}>
          <div className="w-full">
            <label htmlFor="message" className="block text-sm font-medium text-slate-900">
              Your Comment
            </label>
            <textarea
              disabled={isLoading}
              required
              onChange={onChangeContent}
              value={content}
              id="message"
              rows="3"
              className={`mt-1 p-2 block w-full border rounded-md focus:outline focus:outline-blue-500 ${isLoading ? 'bg-slate-200' : ''}`}
              placeholder="Type your comment here..."
            ></textarea>
          </div>
          <div className="mt-2 flex justify-end">
            <Button.Dark iconName="solar:card-send-outline" disabled={isLoading}>
              Kirim
            </Button.Dark>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CommentForm;
