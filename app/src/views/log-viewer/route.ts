const routes: RouteConfig[] = [
  {
    key: 'logViewer',
    path: '/log-viewer',
    windowOptions: {
      width: 1200,
      height: 800,
      // frame: false,
      resizable: false,
      movable: true,
      autoHideMenuBar: true,
      // titleBarStyle: 'hidden',
      alwaysOnTop: false,
      thickFrame:false
    },
    createConfig: {
      // single: true,
      showTitlebar: false,
      showSidebar: true,
      // hideMenus: true
    }
  },
]

export default routes
