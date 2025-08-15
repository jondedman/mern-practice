const ToggleButton = ({ label, checked, onChange }) => {
	return (
		<div className="flex items-center gap-2 mb-4">
            <label htmlFor={label} className="text-sm font-medium">
                {label}
            </label>
			
			<div className="relative inline-block w-12 h-6">
				<input
					type="checkbox"
					className="sr-only peer"
					onChange={onChange}
					id={label}
                    checked={checked}
				/>
				<div className="w-full h-full bg-gray-300 peer-checked:bg-blue-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-500 transition-colors"></div>
				<div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
			</div>
		</div>
	);
};

export default ToggleButton