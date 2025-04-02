import { Icon } from '@iconify/react/dist/iconify.js';
import PropTypes from 'prop-types';

function ButtonNormal({ children = 'Tombol', iconName, disabled, ...props }) {
	return (
		<button
			{...props}
			disabled={disabled}
			className={`
                flex items-center px-4 py-2 m-2 text-sm rounded-md shadow-sm
                ${
					disabled
						? 'bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400'
						: 'bg-white text-slate-900 ring-1 ring-inset ring-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
				}
            `}
		>
			{iconName && !disabled && <Icon className='inline mr-2' icon={iconName} width='1.5em' height='1.5em' />}
			{children}
		</button>
	);
}

function ButtonDanger({ children = 'Tombol', iconName, disabled, ...props }) {
	return (
		<button
			{...props}
			disabled={disabled}
			className={`
                px-4 py-2 m-2 text-sm rounded-md shadow-sm
                ${
					disabled
						? 'bg-red-200 text-red-400 cursor-not-allowed'
						: 'text-red-700 bg-white ring-1 ring-inset ring-red-600 hover:bg-red-100'
				}
            `}
		>
			{iconName && !disabled && <Icon className='inline mr-2' icon={iconName} width='1.5em' height='1.5em' />}
			{children}
		</button>
	);
}

ButtonNormal.propTypes = {
	children: PropTypes.node,
	iconName: PropTypes.string,
	disabled: PropTypes.bool,
};

ButtonDanger.propTypes = {
	children: PropTypes.node,
	iconName: PropTypes.string,
	disabled: PropTypes.bool,
};

export { ButtonNormal, ButtonDanger };
