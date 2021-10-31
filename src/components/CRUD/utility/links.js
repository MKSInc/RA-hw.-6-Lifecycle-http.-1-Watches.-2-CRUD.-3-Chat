// Генерирует и возвращает ссылки для продакшена или разработки в зависимости от того,
// где разворачивается проект.

const url = new URL(window.location.href);

console.log('url', url);
console.log('url.hostname', url.hostname);

// Параметры для разработки.
if (url.hostname === 'localhost') {
  url.port = '4000';
}

const root = url;
root.pathname = ''; // Убираем ненужный путь (/ru, /en, ...), чтобы ссылка была на корень.

export default {
  root: root.origin,
  notes: new URL('notes', url.href).href,
};
