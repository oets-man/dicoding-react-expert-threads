import { Icon } from '@iconify/react/dist/iconify.js';
import PropTypes from 'prop-types';

function ButtonNormal({ as: Component = 'button', children = 'Tombol', iconName, disabled, ...props }) {
  const className = `
        flex items-center px-4 py-2 text-sm rounded-md shadow-sm 
        ${
          disabled
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400'
            : 'cursor-pointer bg-white text-slate-900 ring-1 ring-inset ring-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
        }
    `;

  return (
    <Component
      {...props}
      disabled={Component === 'button' ? disabled : undefined}
      className={className}
      aria-disabled={disabled}
    >
      {iconName && <Icon className="inline mr-2" icon={iconName} width="1.5em" height="1.5em" />}
      {children}
    </Component>
  );
}

function ButtonDanger({ as: Component = 'button', children = 'Tombol', iconName, disabled, ...props }) {
  const className = `
        px-4 py-2 text-sm rounded-md shadow-sm
        ${
          disabled
            ? 'bg-red-200 text-red-400 cursor-not-allowed'
            : 'cursor-pointer text-red-700 bg-white ring-1 ring-inset ring-red-600 hover:bg-red-100'
        }
    `;

  return (
    <Component
      {...props}
      disabled={Component === 'button' ? disabled : undefined}
      className={className}
      aria-disabled={disabled}
    >
      {iconName && <Icon className="inline mr-2" icon={iconName} width="1.5em" height="1.5em" />}
      {children}
    </Component>
  );
}

function ButtonDark({ as: Component = 'button', children = 'Tombol', iconName, disabled, ...props }) {
  const className = `
        px-4 py-2 text-sm rounded-md shadow-sm
        ${
          disabled
            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
            : 'cursor-pointer text-slate-200 bg-slate-800 ring-1 ring-inset ring-slate-600 hover:bg-slate-700'
        }
    `;

  return (
    <Component
      {...props}
      disabled={Component === 'button' ? disabled : undefined}
      className={className}
      aria-disabled={disabled}
    >
      {iconName && <Icon className="inline mr-2" icon={iconName} width="1.5em" height="1.5em" />}
      {children}
    </Component>
  );
}

ButtonDark.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonNormal.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonDanger.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  iconName: PropTypes.string,
  disabled: PropTypes.bool,
};
const Button = {
  Normal: ButtonNormal,
  Danger: ButtonDanger,
  Dark: ButtonDark,
};
export default Button;
export { ButtonNormal, ButtonDanger, ButtonDark };
