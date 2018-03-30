export const menu = (
  state = {opened: false, menuItems: [], active: ''},
  action
) => {
  switch (action.type) {
    case 'toggle_opened':
      console.log('toggled');
      return {...state, opened: !state.opened};
    case 'init':
      return {...state, menuItems: action.menuItems};
    case 'change_active':
      return {...state, active: action.active};
    default:
      return state;
  }
};
