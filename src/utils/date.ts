/**
 * Utilitários de data formatados para pt-BR
 */

export function formatDateBr(dateString: string): string {
  if (!dateString) return '';
  // Se estiver no formato YYYY-MM-DD
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }

  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('pt-BR').format(d);
  } catch {
    return dateString;
  }
}

export interface DeadlineInfo {
  status: 'atrasado' | 'hoje' | 'amanha' | 'no_prazo';
  label: string;
  daysDifference: number;
}

export function getDeadlineInfo(dateString: string, isCompleted: boolean): DeadlineInfo {
  if (isCompleted) {
    return {
      status: 'no_prazo',
      label: 'Meta concluída',
      daysDifference: 0,
    };
  }

  if (!dateString) {
    return {
      status: 'no_prazo',
      label: 'Sem data definida',
      daysDifference: 999,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parts = dateString.split('-');
  let targetDate: Date;
  if (parts.length === 3) {
    targetDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  } else {
    targetDate = new Date(dateString);
  }
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const absDays = Math.abs(diffDays);
    return {
      status: 'atrasado',
      label: absDays === 1 ? 'Atrasado há 1 dia' : `Atrasado há ${absDays} dias`,
      daysDifference: diffDays,
    };
  }

  if (diffDays === 0) {
    return {
      status: 'hoje',
      label: 'Vence hoje!',
      daysDifference: 0,
    };
  }

  if (diffDays === 1) {
    return {
      status: 'amanha',
      label: 'Vence amanhã',
      daysDifference: 1,
    };
  }

  return {
    status: 'no_prazo',
    label: `${diffDays} dias restantes`,
    daysDifference: diffDays,
  };
}
