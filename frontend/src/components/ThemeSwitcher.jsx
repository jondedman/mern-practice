function ThemeSwitcher() {
  const setTheme = (themeName) => {
    document.documentElement.setAttribute('data-theme', themeName);
    console.log('Theme changed to:', themeName);
    console.log('Current theme attribute:', document.documentElement.getAttribute('data-theme'));
    
    // Debug: Check if CSS variables exist
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--p');
    const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--b1');
    console.log('Primary color CSS var (--p):', primaryColor);
    console.log('Background color CSS var (--b1):', backgroundColor);
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Theme Test:</h3>
      <div className="flex gap-2 mb-4">
        <button className="btn btn-sm btn-outline" onClick={() => setTheme('light')}>Light</button>
        <button className="btn btn-sm btn-outline" onClick={() => setTheme('dark')}>Dark</button>
        <button className="btn btn-sm btn-outline" onClick={() => setTheme('cupcake')}>Cupcake</button>
        <button className="btn btn-sm btn-outline" onClick={() => setTheme('valentine')}>Valentine</button>
      </div>
      <div className="space-y-2">
        <button className="btn btn-primary">Primary Button</button>
        <button className="btn btn-secondary">Secondary Button</button>
        <div className="bg-base-200 p-4 rounded">Base-200 Background</div>
        <div className="bg-primary text-primary-content p-4 rounded">Primary Background</div>
      </div>
    </div>
  );
}

export default ThemeSwitcher;