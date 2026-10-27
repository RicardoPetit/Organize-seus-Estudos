export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export interface StudyGoal {
  id: string;
  titulo: string;
  descricao: string;
  prazo: string; // formato YYYY-MM-DD
  status: GoalStatus;
  criadoEm: string;
  atualizadoEm?: string;
}

export interface GoalFormData {
  titulo: string;
  descricao: string;
  prazo: string;
  status: GoalStatus;
}

export const STATUS_LABELS: Record<GoalStatus, string> = {
  nao_iniciado: 'Não iniciado',
  em_andamento: 'Em andamento',
  concluido: 'Concluído',
};

export const STATUS_COLORS: Record<GoalStatus, {
  text: string;
  border: string;
  bgLight: string;
  dot: string;
}> = {
  nao_iniciado: {
    text: 'text-amber-800',
    border: 'border-amber-200',
    bgLight: 'bg-amber-50/70',
    dot: 'bg-amber-500',
  },
  em_andamento: {
    text: 'text-sky-800',
    border: 'border-sky-200',
    bgLight: 'bg-sky-50/70',
    dot: 'bg-sky-500',
  },
  concluido: {
    text: 'text-emerald-800',
    border: 'border-emerald-200',
    bgLight: 'bg-emerald-50/70',
    dot: 'bg-emerald-500',
  },
};
