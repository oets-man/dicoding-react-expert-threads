import InputField from '../components/InputField';

const ThreadNewPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl p-2">Create New Thread</h1>
        <div className="border border-slate-400 rounded ">
          <form onSubmit={onSubmit}>
            <InputField label="Category" name="category" id="category" placeholder="thread category (optional)" />
          </form>
        </div>
      </div>
    </>
  );
};

export default ThreadNewPage;
