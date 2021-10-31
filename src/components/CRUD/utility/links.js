// Генерирует и возвращает ссылки для продакшена или разработки в зависимости от того,
// где разворачивается проект.

const url = new URL(window.location.href);

console.log('url', url);
console.log('url.hostname', url.hostname);

// Параметры для разработки.
if (url.hostname === 'localhost') {
  url.port = '4000';
}

if (url.hostname === 'mksinc.github.io') {
  console.log('frontend on git-hub');
  url.hostname = 'ra-6-2-crud.herokuapp.com';
  url.protocol = 'https';
}

const root = url;
root.pathname = ''; // Убираем ненужный путь (/ru, /en, ...), чтобы ссылка была на корень.

export default {
  root: root.origin,
  notes: new URL('notes', url.href).href,
};
