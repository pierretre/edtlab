import { visit } from 'unist-util-visit';

const EMAIL_REGEX = /\b([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})\b/g;
const LABELS = { fr: "Afficher l'e-mail", en: 'Show email' };

function emailHtml(user, domain, lang) {
  const label = LABELS[lang] ?? LABELS.en;
  const onclick =
    "var d=this.dataset,e=d.user+'@'+d.domain,a=document.createElement('a');a.href='mailto:'+e;a.textContent=e;this.parentNode.replaceWith(a);";
  return `<span class="email-reveal"><button data-user="${user}" data-domain="${domain}" onclick="${onclick}" style="min-height: 0 !important;">${label}</button></span>`;
}

export default function emailObfuscator() {
  return (tree, file) => {
    const lang = file?.data?.astro?.frontmatter?.lang ?? 'en';

    // Handle auto-linked emails (remark-gfm turns foo@bar.com into a mailto link)
    visit(tree, 'link', (node, index, parent) => {
      if (!node.url.startsWith('mailto:')) return;

      const email = node.url.slice('mailto:'.length);
      EMAIL_REGEX.lastIndex = 0;
      const match = EMAIL_REGEX.exec(email);
      if (!match) return;

      const [, user, domain] = match;
      parent.children.splice(index, 1, { type: 'html', value: emailHtml(user, domain, lang) });
    });
  };
}
