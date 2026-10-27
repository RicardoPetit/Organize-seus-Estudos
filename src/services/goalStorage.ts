import { StudyGoal } from '../types/goal';

const STORAGE_KEY = 'studyflow_goals_v1';

// Metas iniciais de exemplo para auxiliar o estudante iniciante a entender a dinâmica
const INITIAL_SAMPLE_GOALS: StudyGoal[] = [
  {
    id: 'goal-1',
    titulo: 'Dominar a estrutura básica de HTML semântico',
    descricao: 'Estudar tags como header, nav, main, section, article e footer para estruturar páginas web com clareza.',
    prazo: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'em_andamento',
    criadoEm: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'goal-2',
    titulo: 'Praticar seletores e Flexbox no CSS',
    descricao: 'Construir 3 layouts simples utilizando flex-direction, justify-content e align-items para treinar alinhamentos.',
    prazo: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'nao_iniciado',
    criadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'goal-3',
    titulo: 'Configurar Git e primeiro repositório no GitHub',
    descricao: 'Instalar o Git, configurar usuário/e-mail e fazer o primeiro commit e push de um projeto de estudos.',
    prazo: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'concluido',
    criadoEm: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    atualizadoEm: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Obtém todos os objetivos salvos no localStorage.
 * Se for o primeiro acesso, inicializa com metas de demonstração.
 */
export function getStoredGoals(): StudyGoal[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // Primeira inicialização
      saveGoals(INITIAL_SAMPLE_GOALS);
      return INITIAL_SAMPLE_GOALS;
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error('Erro ao ler objetivos do localStorage:', err);
    return [];
  }
}

/**
 * Salva a lista completa de objetivos no localStorage.
 */
export function saveGoals(goals: StudyGoal[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  } catch (err) {
    console.error('Erro ao salvar objetivos no localStorage:', err);
  }
}

/**
 * Cria e adiciona um novo objetivo de estudo.
 */
export function createGoal(
  goalData: Omit<StudyGoal, 'id' | 'criadoEm' | 'atualizadoEm'>
): StudyGoal {
  const currentGoals = getStoredGoals();
  const id = typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `goal-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const newGoal: StudyGoal = {
    ...goalData,
    id,
    criadoEm: new Date().toISOString(),
  };

  const updatedGoals = [newGoal, ...currentGoals];
  saveGoals(updatedGoals);
  return newGoal;
}

/**
 * Atualiza um objetivo existente.
 */
export function updateGoal(
  id: string,
  updates: Partial<Omit<StudyGoal, 'id' | 'criadoEm'>>
): StudyGoal | null {
  const currentGoals = getStoredGoals();
  const index = currentGoals.findIndex((g) => g.id === id);

  if (index === -1) {
    return null;
  }

  const updatedGoal: StudyGoal = {
    ...currentGoals[index],
    ...updates,
    atualizadoEm: new Date().toISOString(),
  };

  currentGoals[index] = updatedGoal;
  saveGoals(currentGoals);
  return updatedGoal;
}

/**
 * Remove um objetivo pelo ID.
 */
export function deleteGoal(id: string): boolean {
  const currentGoals = getStoredGoals();
  const filtered = currentGoals.filter((g) => g.id !== id);

  if (filtered.length === currentGoals.length) {
    return false;
  }

  saveGoals(filtered);
  return true;
}

/**
 * Limpa todos os objetivos salvos (útil para testes de lista vazia).
 */
export function clearAllGoals(): void {
  saveGoals([]);
}

/**
 * Restaura os dados de exemplo recomendados para iniciantes.
 */
export function restoreSampleGoals(): StudyGoal[] {
  saveGoals(INITIAL_SAMPLE_GOALS);
  return INITIAL_SAMPLE_GOALS;
}
