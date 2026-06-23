import { describe, it, expect } from 'vitest';
import { detectForms, parseHtml } from '../../../src/utils/html-parser.js';
import { classifyPersonalDataField } from '../../../src/utils/text-analyzer.js';

describe('formAnalyzer - detection', () => {
  it('should detect form with personal data fields', () => {
    const $ = parseHtml(`
      <form action="/contato" method="POST">
        <label for="nome">Nome</label>
        <input id="nome" name="nome" type="text" required>
        <label for="email">E-mail</label>
        <input id="email" name="email" type="email" required>
        <label for="cpf">CPF</label>
        <input id="cpf" name="cpf" type="text">
      </form>
    `);
    const forms = detectForms($);

    expect(forms).toHaveLength(1);
    expect(forms[0].method).toBe('POST');
    expect(forms[0].action).toBe('/contato');
    expect(forms[0].fields).toHaveLength(3);

    // Classify fields
    const classified = forms[0].fields.map((f) =>
      classifyPersonalDataField(f.name, f.type, f.label)
    );

    expect(classified[0].isPersonalData).toBe(true); // nome
    expect(classified[1].isPersonalData).toBe(true); // email
    expect(classified[2].isPersonalData).toBe(true); // cpf
  });

  it('should detect sensitive data fields', () => {
    const result = classifyPersonalDataField('saude', 'text', 'Condicoes de saude');
    expect(result.isSensitive).toBe(true);

    const result2 = classifyPersonalDataField('religiao', 'text', 'Religiao');
    expect(result2.isSensitive).toBe(true);
  });

  it('should handle forms without action', () => {
    const $ = parseHtml('<form><input name="busca" type="text"></form>');
    const forms = detectForms($);
    expect(forms).toHaveLength(1);
    expect(forms[0].action).toBeUndefined();
  });
});
