const ToggleSwitch = ({ checked, onChange }) => {
    return (
    <label className="flex items-center gap-3 cursor-pointer">
        <input
        type="checkbox"
        className="toggle toggle-success"
        checked={checked}
        onChange={onChange}
        />
        <span className="text-sm font-medium">
        {checked ? "Show My Posts" : "Show All Posts"}
        </span>
    </label>
    );
};

export default ToggleSwitch;
