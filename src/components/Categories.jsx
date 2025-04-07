import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleCategorySelection } from '../states/categories/action';
import Button from './Button';

function Categories() {
  const categories = useSelector((states) => states.categories);
  const dispatch = useDispatch();

  function toggleSelect(category) {
    dispatch(toggleCategorySelection(category));
  }

  return (
    <>
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
    </>
  );
}
export default Categories;
