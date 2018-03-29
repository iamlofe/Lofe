function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, days = 10) {
  var date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}`;
}

function deleteCookie(name) {
  var date = new Date(0);
  document.cookie = `${name}=; path=/; expires=${date.toUTCString()}`;
}

export {getCookie, setCookie, deleteCookie};
