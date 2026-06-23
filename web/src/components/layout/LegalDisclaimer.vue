<template>
  <aside class="legal-disclaimer" role="alert" aria-label="Aviso legal">
    <p class="disclaimer-text">
      <strong>ATENCAO:</strong> Esta ferramenta e um prototipo educacional. O relatorio gerado tem carater
      exclusivamente didatico e informativo. Ele nao constitui parecer juridico, nao certifica conformidade com a LGPD
      e nao substitui a consultoria de um profissional especializado em protecao de dados.
    </p>
  </aside>
</template>

<style scoped>
.legal-disclaimer {
  background: #fef7e0;
  border: 1px solid #fbbc04;
  border-radius: var(--radius-sm);
  padding: 12px 16px;
}

.disclaimer-text {
  color: #5f4b00;
  font-size: 0.82rem;
  line-height: 1.5;
}

.disclaimer-text strong {
  color: #d93025;
}
</style>
