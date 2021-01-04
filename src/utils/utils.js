export const parseJwt = () => {
  const token = localStorage.getItem('TOKEN_KEY');
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+')
    .replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${(`00${c.charCodeAt(0)
        .toString(16)}`).slice(-2)}`)
      .join(''),
  );
  return JSON.parse(jsonPayload);
};

// склонение слов - declOfNumber(1, ['минута', 'минуты', 'минут']); // вернёт — минута
export const declOfNumber = (number, words) => words[
  (number % 100 > 4 && number % 100 < 20)
    ? 2
    : [2, 0, 1, 1, 1, 2][
      (number % 10 < 5)
        ? number % 10
        : 5]
];
