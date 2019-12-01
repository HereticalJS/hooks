export const fixScope = (ReactDOM) => (win) => {
  win.ReactDOM = ReactDOM || win.ReactDOM;
}

