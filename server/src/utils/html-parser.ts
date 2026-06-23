import * as cheerio from 'cheerio';
import type { CheerioAPI } from 'cheerio';

export function parseHtml(html: string): CheerioAPI {
  return cheerio.load(html);
}

export function extractLinks($: CheerioAPI, baseUrl: string): string[] {
  const links: string[] = [];
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (href) {
      try {
        const resolved = new URL(href, baseUrl);
        if (resolved.protocol === 'http:' || resolved.protocol === 'https:') {
          links.push(resolved.href);
        }
      } catch {
        // Skip invalid URLs
      }
    }
  });
  return [...new Set(links)];
}

export function extractText($: CheerioAPI): string {
  // Remove script and style content
  $('script, style, noscript').remove();
  return $('body').text().replace(/\s+/g, ' ').trim();
}

export function findPrivacyPolicyLinks(links: string[]): string[] {
  const privacyPatterns = [
    /privacidade/i,
    /privacy/i,
    /politica.*privacidade/i,
    /politica.*dados/i,
    /lgpd/i,
    /cookies/i,
    /termos.*uso/i,
    /aviso.*privacidade/i,
  ];
  return links.filter((link) =>
    privacyPatterns.some((pattern) => pattern.test(link))
  );
}

export function detectForms($: CheerioAPI): Array<{
  action: string | undefined;
  method: string;
  fields: Array<{ name: string; type: string; label: string; required: boolean }>;
}> {
  const forms: Array<{
    action: string | undefined;
    method: string;
    fields: Array<{ name: string; type: string; label: string; required: boolean }>;
  }> = [];

  $('form').each((_, formEl) => {
    const $form = $(formEl);
    const action = $form.attr('action') || undefined;
    const method = ($form.attr('method') || 'GET').toUpperCase();
    const fields: Array<{ name: string; type: string; label: string; required: boolean }> = [];

    $form.find('input, select, textarea').each((_, fieldEl) => {
      const $field = $(fieldEl);
      const name = $field.attr('name') || '';
      const type = $field.attr('type') || 'text';
      const required = $field.attr('required') !== undefined || $field.attr('aria-required') === 'true';

      // Find associated label
      const id = $field.attr('id');
      let label = '';
      if (id) {
        const $label = $(`label[for="${id}"]`);
        label = $label.text().trim();
      }
      if (!label) {
        const $parentLabel = $field.closest('label');
        if ($parentLabel.length) {
          label = $parentLabel.text().trim().replace(fieldEl.tagName, '');
        }
      }
      if (!label) {
        label = name;
      }

      if (name || type === 'submit' || type === 'button' || type === 'hidden') {
        // Skip hidden, submit, button types but include them if they have meaningful names
        if (type === 'submit' || type === 'button') return;
        if (type === 'hidden') return;
      }

      fields.push({ name: name || type, type, label, required });
    });

    if (fields.length > 0) {
      forms.push({ action, method, fields });
    }
  });

  return forms;
}

export function detectScripts($: CheerioAPI, baseUrl: string): Array<{ src: string; isExternal: boolean }> {
  const scripts: Array<{ src: string; isExternal: boolean }> = [];
  const baseHost = new URL(baseUrl).hostname;

  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src) {
      try {
        const resolved = new URL(src, baseUrl);
        scripts.push({
          src: resolved.href,
          isExternal: resolved.hostname !== baseHost,
        });
      } catch {
        scripts.push({ src, isExternal: false });
      }
    }
  });

  return scripts;
}
