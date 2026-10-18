import React, { useState, useRef, useEffect } from 'react';

export function Navbar({
  onOpenSidebar,
  pageTitle,
  actionButton,
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search students or data...',
  user = {
    name: 'Dr. Sarah Chen',
    role: 'Head of Admissions',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDb-K-t9nNfRGw9BUp46IO8XmXsOGG30RtqnYrzbrngpDoChEFsdxeokLO27W7RVJNtzROaSS9D6acZPwwenUGRR1CvXaLf5FnTxDV1HOyw2fZTkmI60eFsf5PMybNyd2Ux_SGR_SUAdB3aepUE3nmlSX2P1T5_Fx2KKj6NfMl4T5l1crSjBdUR0f1UIVUl8B7tw9Ki9SWFGR6vBBTJ2k3l6lHXwA-klntHTWFH8lkz3nYoVuJ4msoj6HQYZDry_iN7CBZjJMjSixah',
  },
  notifications = [
    {
      id: 1,
      title: 'Review Needed: Leo S.',
      desc: 'Growth curve below average for 3 weeks.',
      type: 'error',
      time: '10m ago',
    },
    {
      id: 2,
      title: 'New Parent Report',
      desc: 'Journey completion for "Social Integration".',
      type: 'success',
      time: '1h ago',
    },
    {
      id: 3,
      title: 'System Update',
      desc: 'New classification metrics applied to K-2.',
      type: 'info',
      time: '3h ago',
    },
  ],
  onLogout,
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="flex justify-between items-center w-full px-lg py-sm sticky top-0 z-40 bg-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant/30">
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-md sm:gap-lg flex-1">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-primary hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer"
          aria-label="Open Navigation"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        {pageTitle && (
          <h2 className="font-headline-lg text-lg sm:text-2xl font-bold text-primary shrink-0">
            {pageTitle}
          </h2>
        )}

        {/* Desktop Search Bar */}
        <div className="relative hidden sm:block max-w-md w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2 bg-surface-container-low border border-transparent focus:border-outline-variant rounded-full font-body-md text-xs text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder={searchPlaceholder}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange && onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {/* Mobile Search Toggle */}
        <button
          type="button"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="sm:hidden p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors"
          aria-label="Toggle Search"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
      </div>

      {/* Mobile Search Drawer (collapsible) */}
      {showMobileSearch && (
        <div className="absolute top-full left-0 w-full p-3 bg-surface border-b border-outline-variant shadow-md sm:hidden z-50">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              className="w-full pl-10 pr-8 py-2 bg-surface-container-low border border-outline-variant/50 rounded-full font-body-md text-xs text-on-surface outline-none"
              placeholder={searchPlaceholder}
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Right: Actions, Notifications, User Profile */}
      <div className="flex items-center gap-md">
        {actionButton && <div>{actionButton}</div>}
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-full relative cursor-pointer"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">
              notifications
            </span>
            {notifications && notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown Menu */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40">
                <div className="flex items-center gap-2">
                  <h4 className="font-title-lg text-sm font-bold text-on-surface">
                    Notifications
                  </h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-primary-fixed text-primary rounded-full">
                    {notifications.length} New
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-xs text-primary hover:underline font-medium cursor-pointer"
                >
                  Mark all read
                </button>
              </div>

              <div className="divide-y divide-outline-variant/30 max-h-72 overflow-y-auto my-2">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="py-3 px-1 flex gap-3 hover:bg-surface-container-low/60 rounded-lg transition-colors cursor-pointer"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] shrink-0 mt-0.5 ${
                        notif.type === 'error'
                          ? 'text-error'
                          : notif.type === 'success'
                          ? 'text-secondary'
                          : 'text-primary'
                      }`}
                    >
                      {notif.type === 'error'
                        ? 'feedback'
                        : notif.type === 'success'
                        ? 'verified'
                        : 'update'}
                    </span>
                    <div className="flex-1">
                      <p className="font-label-md text-xs font-bold text-on-surface">
                        {notif.title}
                      </p>
                      <p className="font-body-md text-[11px] text-on-surface-variant leading-snug">
                        {notif.desc}
                      </p>
                      <span className="text-[10px] text-outline mt-1 block">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-outline-variant/40 text-center">
                <a
                  href="#alerts"
                  onClick={() => setShowNotifications(false)}
                  className="font-label-md text-xs text-primary font-semibold hover:underline"
                >
                  View All System Alerts
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-outline-variant mx-1"></div>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-sm text-left hover:opacity-90 transition-opacity p-1 rounded-xl cursor-pointer"
            aria-label="User profile menu"
          >
            <div className="text-right hidden sm:block">
              <p className="font-label-md text-xs font-bold text-on-surface">
                {user.name}
              </p>
              <p className="font-label-md text-on-surface-variant text-[10px]">
                {user.role}
              </p>
            </div>
            <img
              className="w-10 h-10 rounded-full object-cover border border-outline-variant shadow-xs ring-2 ring-primary/10"
              alt={`Profile avatar for ${user.name}`}
              src={user.avatar}
            />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-outline-variant/40 sm:hidden">
                <p className="font-label-md text-xs font-bold text-on-surface">
                  {user.name}
                </p>
                <p className="font-label-md text-on-surface-variant text-[10px]">
                  {user.role}
                </p>
              </div>

              <div className="space-y-1 py-1">
                <a
                  href="#profile"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">
                    person
                  </span>
                  <span>My Profile</span>
                </a>
                <a
                  href="#settings"
                  onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px] text-outline">
                    settings
                  </span>
                  <span>Account Settings</span>
                </a>
              </div>

              <div className="pt-1 border-t border-outline-variant/40">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onLogout) onLogout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-error hover:bg-error-container/20 rounded-lg transition-colors cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    logout
                  </span>
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
