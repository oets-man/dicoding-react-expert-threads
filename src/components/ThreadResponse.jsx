import { Icon } from '@iconify/react/dist/iconify.js';
import PropTypes from 'prop-types';

function ThreadResponse({ as: Component = 'button', iconName, count, onClick }) {
  return (
    <Component className="flex items-center gap-x-1" onClick={onClick}>
      <Icon icon={iconName} width="24" height="24" />
      {count}
    </Component>
  );
}

ThreadResponse.propTypes = {
  iconName: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  as: PropTypes.elementType,
};
export default ThreadResponse;
