<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useGlossaryStore } from '@/stores/glossary.store';
import { getMockGlossaryTerms } from '@/mock/glossary';
import GlossarySearch from '@/components/glossary/GlossarySearch.vue';
import GlossaryTerm from '@/components/glossary/GlossaryTerm.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import { BookOpen, Search, ShieldCheck, Sparkles } from '@lucide/vue';

const store = useGlossaryStore();
const featuredNames = ['Consentimento', 'Bases legais', 'Tratamento', 'Dado sensível'];

const allTerms = computed(() => (store.terms.length ? store.terms : getMockGlossaryTerms()));

const featuredTerms = computed(() =>
  featuredNames
    .map((name) => allTerms.value.find((term) => term.term === name))
    .filter((term): term is NonNullable<typeof term> => Boolean(term)),
);

const groups = computed(() => {
  const sorted = [...store.terms].sort((a, b) => a.term.localeCompare(b.term, 'pt-BR'));
  const map = new Map<string, typeof sorted>();

  for (const term of sorted) {
    const letter = term.term.charAt(0).toUpperCase();
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(term);
  }

  return Array.from(map.entries()).map(([letter, terms]) => ({ letter, terms }));
});

const alphabet = computed(() => groups.value.map((g) => g.letter));
const activeLetter = ref<string | null>(null);

function scrollToLetter(letter: string) {
  const el = document.getElementById(`glossary-group-${letter}`);
  if (!el) return;

  const headerOffset = 96;
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: 'smooth' });
}

function handleSearch(q: string) {
  store.fetchTerms(q || undefined);
}

function onRelatedClick(term: string) {
  store.fetchTerms(term);
}

function updateActiveLetter() {
  if (store.searchQuery || groups.value.length === 0) {
    activeLetter.value = null;
    return;
  }

  const headerOffset = 104;
  for (const { letter } of groups.value) {
    const el = document.getElementById(`glossary-group-${letter}`);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= headerOffset) {
      activeLetter.value = letter;
    }
  }
}

let scrollRAF: number | null = null;
function onScroll() {
  if (scrollRAF) cancelAnimationFrame(scrollRAF);
  scrollRAF = requestAnimationFrame(updateActiveLetter);
}

onMounted(() => {
  store.fetchTerms();
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  if (scrollRAF) cancelAnimationFrame(scrollRAF);
});

watch(() => store.searchQuery, (q) => {
  if (q) activeLetter.value = null;
});
</script>

<template>
  <div class="space-y-10">
    <!-- Cabeçalho -->
    <header class="mx-auto max-w-3xl space-y-6 text-center">
      <div class="space-y-3">
        <p class="eyebrow">Vocabulário · LGPD</p>
        <h1 class="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
          Glossário
        </h1>
        <p class="prose-lei mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Os termos mais usados na análise aparecem aqui com contexto, artigo de referência e
          relação direta com a leitura do relatório.
        </p>
      </div>

      <div class="mx-auto max-w-xl">
        <GlossarySearch @search="handleSearch" />
      </div>

      <div class="grid gap-3 pt-2 sm:grid-cols-3">
        <div class="sheet flex flex-col items-center gap-2 border-border/70 bg-muted/30 p-4 text-center">
          <Search class="h-4 w-4 text-primary" />
          <p class="font-display text-sm font-semibold">Busca guiada</p>
          <p class="text-xs leading-relaxed text-muted-foreground">Filtre por termo, artigo ou conceito relacionado.</p>
        </div>
        <div class="sheet flex flex-col items-center gap-2 border-border/70 bg-muted/30 p-4 text-center">
          <BookOpen class="h-4 w-4 text-primary" />
          <p class="font-display text-sm font-semibold">Leitura contextual</p>
          <p class="text-xs leading-relaxed text-muted-foreground">Cada definição foi escrita para aparecer no fluxo da análise.</p>
        </div>
        <div class="sheet flex flex-col items-center gap-2 border-border/70 bg-muted/30 p-4 text-center">
          <ShieldCheck class="h-4 w-4 text-primary" />
          <p class="font-display text-sm font-semibold">Ligação com a LGPD</p>
          <p class="text-xs leading-relaxed text-muted-foreground">Os artigos ajudam a entender por que o item entra no relatório.</p>
        </div>
      </div>
    </header>

    <!-- Termos em foco -->
    <section v-if="!store.searchQuery" class="space-y-4">
      <div class="flex items-center gap-2">
        <Sparkles class="h-4 w-4 text-accent" />
        <p class="eyebrow">Termos em foco</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="term in featuredTerms"
          :key="term.id"
          class="sheet group flex flex-col justify-between p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
        >
          <div>
            <div class="flex items-baseline justify-between gap-2">
              <h2 class="font-display text-sm font-semibold">{{ term.term }}</h2>
              <span v-if="term.lgpdArticle" class="font-mono text-[0.65rem] text-accent">{{ term.lgpdArticle }}</span>
            </div>
            <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{{ term.definition }}</p>
          </div>
          <button
            class="mt-3 self-start text-xs font-medium text-primary hover:underline"
            @click="handleSearch(term.term)"
          >
            Ver no glossário
          </button>
        </article>
      </div>
    </section>

    <!-- Lista de termos com índice -->
    <div v-if="store.isLoading" class="space-y-3">
      <Skeleton v-for="i in 5" :key="i" class="h-28 w-full" />
    </div>

    <div v-else-if="store.error" class="py-10 text-center text-risk-high">{{ store.error }}</div>

    <div v-else class="relative grid gap-8 lg:grid-cols-[3.5rem_1fr]">
      <!-- Índice alfabético -->
      <nav
        v-if="!store.searchQuery && alphabet.length"
        class="no-print sticky top-24 z-10 flex gap-1 overflow-x-auto pb-2 lg:top-28 lg:-ml-2 lg:h-fit lg:w-14 lg:flex-col lg:items-center lg:overflow-visible lg:pb-0"
        aria-label="Índice alfabético"
      >
        <button
          v-for="letter in alphabet"
          :key="letter"
          :aria-current="activeLetter === letter ? 'true' : undefined"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm font-mono text-xs font-medium transition-colors lg:h-9 lg:w-9"
          :class="activeLetter === letter
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-muted-foreground ring-1 ring-border hover:bg-muted hover:text-foreground'"
          @click="scrollToLetter(letter)"
        >
          {{ letter }}
        </button>
      </nav>

      <!-- Grupos -->
      <div class="space-y-8">
        <p v-if="store.terms.length === 0" class="py-10 text-center text-muted-foreground">
          Nenhum termo encontrado para “{{ store.searchQuery }}”. Tente outra palavra.
        </p>

        <template v-if="store.searchQuery">
          <TransitionGroup name="list" tag="div" class="flex flex-col gap-3">
            <GlossaryTerm
              v-for="(term, index) in store.terms"
              :key="term.id"
              :term="term"
              :style="{ transitionDelay: `${Math.min(index * 40, 240)}ms` }"
              @related-click="onRelatedClick"
            />
          </TransitionGroup>
        </template>

        <template v-else>
          <section
            v-for="group in groups"
            :id="`glossary-group-${group.letter}`"
            :key="group.letter"
            class="scroll-mt-28 space-y-3"
          >
            <div class="flex items-baseline gap-3 border-b border-border pb-2">
              <h2 class="font-display text-2xl font-bold text-primary">{{ group.letter }}</h2>
              <span class="font-mono text-xs text-muted-foreground">{{ group.terms.length }} termo(s)</span>
            </div>
            <div class="flex flex-col gap-3">
              <GlossaryTerm
                v-for="term in group.terms"
                :key="term.id"
                :term="term"
                @related-click="onRelatedClick"
              />
            </div>
          </section>
        </template>

        <p v-if="store.terms.length" class="pt-2 font-mono text-xs text-muted-foreground">
          {{ store.terms.length }} termo(s)<span v-if="store.searchQuery"> · “{{ store.searchQuery }}”</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.list-leave-active { transition: all 0.2s ease; position: absolute; }
.list-enter-from { opacity: 0; transform: translateY(10px); }
.list-leave-to { opacity: 0; transform: translateY(6px); }
.list-move { transition: transform 0.3s ease; }

@media (prefers-reduced-motion: reduce) {
  .list-enter-from { transform: none; }
}
</style>
