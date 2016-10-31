
import marked from 'marked';
import escapeHtml from 'escape-html';

export default function render(section) {
    if (section.plugin) return `<b>??? ${escapeHtml(section.plugin)}</b>`;
    return marked(section.data, {
        gfm: true,
        tables: true,
        sanitize: false,
        smartLists: true,
    });
}
