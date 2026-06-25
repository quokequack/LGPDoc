<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useScanHistory } from '@/composables/useScanHistory';
import RiskBadge from '@/components/report/RiskBadge.vue';
import Badge from '@/components/ui/Badge.vue';
import Button from '@/components/ui/Button.vue';
import Skeleton from '@/components/ui/Skeleton.vue';
import { ChevronLeft, ChevronRight, ArrowRight } from '@lucide/vue';
import type { RiskLevel, ScanListItem } from '@/types/scan.types';

const router = useRouter();
const { scans, total, totalPages, currentPage, isLoading, error, loadHistory, prevPage, nextPage } = useScanHistory();

onMounted(() => loadHistory(1));

function viewReport(s: ScanListItem) { if (s.status === 'completed') router.push({ name: 'report', params: { id: s.id } }); }
function fmtDate(d: string) { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); }

const statusMap: Record<string, { label: string; variant: 'good' | 'default' | 'outline' | 'high' }> = {
  pending: { label: 'Pendente', variant: 'outline' },
  running: { label: 'Em andamento', variant: 'default' },
  completed: { label: 'Concluído', variant: 'good' },
  failed: { label: 'Falhou', variant: 'high' },
};
</script>

<template>
  <div class="space-y-8">
    <header class="space-y-2 border-b border-border pb-5">
      <p class="eyebrow">Registro de análises</p>
      <h1 class="font-display text-3xl font-extrabold tracking-tight">Histórico</h1>
      <p v-if="!isLoading && !error" class="font-mono text-xs text-muted-foreground">{{ total }} laudo(s) emitido(s)</p>
    </header>

    <div v-if="isLoading" class="space-y-2">
      <Skeleton v-for="i in 6" :key="i" class="h-14 w-full" />
    </div>
    <div v-else-if="error" class="py-10 text-center text-risk-high">{{ error }}</div>

    <div v-else-if="scans.length === 0" class="sheet space-y-3 p-10 text-center">
      <p class="prose-lei text-lg text-muted-foreground">Nenhuma análise ainda.</p>
      <router-link to="/" class="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
        Analisar o primeiro site <ArrowRight class="h-4 w-4" />
      </router-link>
    </div>

    <div v-else class="sheet overflow-x-auto">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-border bg-muted/50 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
            <th class="px-4 py-2.5 font-medium">Site</th>
            <th class="px-4 py-2.5 font-medium">Situação</th>
            <th class="px-4 py-2.5 font-medium text-right">Pontuação</th>
            <th class="px-4 py-2.5 font-medium">Risco</th>
            <th class="px-4 py-2.5 font-medium">Data</th>
            <th class="px-4 py-2.5"><span class="sr-only">Ações</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-border">
          <tr
            v-for="s in scans"
            :key="s.id"
            class="transition-colors"
            :class="s.status === 'completed' ? 'cursor-pointer hover:bg-muted/40' : ''"
            @click="viewReport(s)"
          >
            <td class="max-w-[220px] truncate px-4 py-3 font-mono text-xs" :title="s.url">{{ s.url }}</td>
            <td class="px-4 py-3"><Badge :variant="statusMap[s.status]?.variant || 'outline'">{{ statusMap[s.status]?.label || s.status }}</Badge></td>
            <td class="px-4 py-3 text-right font-mono font-semibold tabular-nums">{{ s.score !== null ? Math.round(s.score) : '—' }}</td>
            <td class="px-4 py-3"><RiskBadge v-if="s.riskLevel" :risk-level="s.riskLevel as RiskLevel" /></td>
            <td class="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{{ fmtDate(s.createdAt) }}</td>
            <td class="px-4 py-3 text-right">
              <Button v-if="s.status === 'completed'" size="sm" variant="outline" @click.stop="viewReport(s)">Abrir</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="totalPages > 1" class="flex items-center justify-center gap-4">
      <Button variant="outline" size="sm" :disabled="currentPage <= 1" @click="prevPage()">
        <ChevronLeft class="h-4 w-4" /> Anterior
      </Button>
      <span class="font-mono text-xs text-muted-foreground">{{ currentPage }} / {{ totalPages }}</span>
      <Button variant="outline" size="sm" :disabled="currentPage >= totalPages" @click="nextPage()">
        Próxima <ChevronRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
