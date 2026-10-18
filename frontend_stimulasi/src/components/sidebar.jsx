import React from 'react';

export function Sidebar({
  isOpen = false,
  onClose,
  activeMenu = 'Dashboard',
  onSelectMenu,
  onNewAssessment,
  onLogout,
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'students', label: 'Students', icon: 'school' },
    { id: 'teachers', label: 'Teachers', icon: 'person_4' },
    { id: 'parents', label: 'Parents', icon: 'family_restroom' },
    { id: 'assessment', label: 'Assessment', icon: 'assignment' },
    { id: 'classification', label: 'Classification', icon: 'category' },
    { id: 'recommendations', label: 'Recommendations', icon: 'auto_awesome' },
    { id: 'journey', label: 'Journey', icon: 'timeline' },
    { id: 'reports', label: 'Reports', icon: 'description' },
  ];

  const handleMenuClick = (item) => {
    if (onSelectMenu) {
      onSelectMenu(item.label);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* SideNavBar Shell */}
      <aside
        className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant shadow-sm z-50 flex flex-col py-lg gap-base transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Identity */}
        <div className="px-lg mb-xl flex items-center justify-between">
          <div className="flex items-center gap-md">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary shadow-sm shadow-primary/20">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div>
              <h1 className="font-headline-lg text-[24px] leading-tight font-bold text-primary">
                B-Star
              </h1>
              <p className="font-label-md text-on-surface-variant text-xs">
                Academic Growth
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="md:hidden p-1.5 text-outline hover:text-on-surface rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-md space-y-base">
          {navItems.map((item) => {
            const isActive = activeMenu.toLowerCase() === item.label.toLowerCase();
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item);
                }}
                className={`flex items-center gap-3 px-4 py-3 font-label-md text-xs transition-all rounded-lg ${
                  isActive
                    ? 'bg-primary-container/10 text-primary border-l-4 border-primary font-semibold rounded-l-none scale-95 duration-150'
                    : 'text-on-surface-variant hover:bg-surface-container-high font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* CTA & Bottom Items */}
        <div className="px-md mt-auto pt-lg border-t border-outline-variant space-y-md">
          <button
            type="button"
            onClick={onNewAssessment}
            className="w-full bg-primary text-on-primary py-sm px-md rounded-xl font-label-md text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm shadow-primary/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>New Assessment</span>
          </button>

          <div className="space-y-base">
            <a
              href="#settings"
              onClick={(e) => {
                e.preventDefault();
                if (onSelectMenu) onSelectMenu('Settings');
                if (onClose) onClose();
              }}
              className="flex items-center gap-3 text-on-surface-variant hover:bg-surface-container-high px-4 py-2 font-label-md text-xs transition-colors rounded-lg"
            >
              <span className="material-symbols-outlined text-[20px]">
                settings
              </span>
              <span>Settings</span>
            </a>

            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-3 text-error hover:bg-error-container/20 px-4 py-2 font-label-md text-xs font-semibold transition-colors rounded-lg text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
