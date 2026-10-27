import { useState, useEffect, useMemo } from 'react';
import { StudyGoal, GoalFormData, GoalStatus } from './types/goal';
import {
  getStoredGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  restoreSampleGoals,
} from './services/goalStorage';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { FilterControls, StatusFilter, SortOption } from './components/FilterControls';
import { Check, Info } from 'lucide-react';

export default function App() {
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StudyGoal | null>(null);
  const [deletingGoal, setDeletingGoal] = useState<StudyGoal | null>(null);

  // Filtros e busca
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('prazo_asc');

  // Mensagem temporária de feedback (Toast)
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Carrega os objetivos ao inicializar
  useEffect(() => {
    const loaded = getStoredGoals();
    setGoals(loaded);
  }, []);

  // Operação 1: Create (Criar objetivo)
  const handleCreateGoal = (formData: GoalFormData) => {
    const created = createGoal(formData);
    setGoals((prev) => [created, ...prev]);
    setIsFormOpen(false);
    showToast(`Objetivo "${created.titulo}" cadastrado com sucesso!`);
  };

  // Operação 3: Update (Atualizar objetivo)
  const handleUpdateGoal = (formData: GoalFormData) => {
    if (!editingGoal) return;
    const updated = updateGoal(editingGoal.id, formData);
    if (updated) {
      setGoals((prev) =>
        prev.map((g) => (g.id === updated.id ? updated : g))
      );
      showToast(`Objetivo "${updated.titulo}" atualizado!`);
    }
    setEditingGoal(null);
  };

  // Atualização rápida de status direto no cartão
  const handleQuickStatusChange = (id: string, newStatus: GoalStatus) => {
    const updated = updateGoal(id, { status: newStatus });
    if (updated) {
      setGoals((prev) =>
        prev.map((g) => (g.id === updated.id ? updated : g))
      );
      const statusLabel =
        newStatus === 'concluido'
          ? 'concluído!'
          : newStatus === 'em_andamento'
          ? 'iniciado!'
          : 'marcado como não iniciado.';
      showToast(`Objetivo ${statusLabel}`);
    }
  };

  // Operação 4: Delete (Excluir objetivo após confirmação)
  const handleConfirmDelete = () => {
    if (!deletingGoal) return;
    const success = deleteGoal(deletingGoal.id);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== deletingGoal.id));
      showToast(`Objetivo "${deletingGoal.titulo}" excluído.`);
    }
    setDeletingGoal(null);
  };

  // Abertura do modal de criação
  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsFormOpen(true);
  };

  // Abertura do modal de edição
  const handleOpenEditModal = (goal: StudyGoal) => {
    setEditingGoal(goal);
  };

  // Restaurar dados iniciais
  const handleRestoreSamples = () => {
    const restored = restoreSampleGoals();
    setGoals(restored);
    showToast('Metas de estudo de exemplo carregadas com sucesso!');
  };

  // Contadores para abas de filtro
  const filterCounts = useMemo(() => {
    return {
      todos: goals.length,
      nao_iniciado: goals.filter((g) => g.status === 'nao_iniciado').length,
      em_andamento: goals.filter((g) => g.status === 'em_andamento').length,
      concluido: goals.filter((g) => g.status === 'concluido').length,
    };
  }, [goals]);

  // Lista filtrada e ordenada
  const filteredAndSortedGoals = useMemo(() => {
    let result = [...goals];

    // 1. Filtro por status
    if (statusFilter !== 'todos') {
      result = result.filter((g) => g.status === statusFilter);
    }

    // 2. Filtro por termo de busca
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (g) =>
          g.titulo.toLowerCase().includes(term) ||
          g.descricao.toLowerCase().includes(term)
      );
    }

    // 3. Ordenação
    result.sort((a, b) => {
      if (sortOption === 'prazo_asc') {
        return a.prazo.localeCompare(b.prazo);
      }
      if (sortOption === 'prazo_desc') {
        return b.prazo.localeCompare(a.prazo);
      }
      if (sortOption === 'recentes') {
        return new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime();
      }
      if (sortOption === 'alfabetica') {
        return a.titulo.localeCompare(b.titulo);
      }
      return 0;
    });

    return result;
  }, [goals, statusFilter, searchTerm, sortOption]);

  const hasNoGoalsAtAll = goals.length === 0;
  const isFilteredEmpty = !hasNoGoalsAtAll && filteredAndSortedGoals.length === 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Barra de Navegação */}
      <Header
        onOpenNewGoalModal={handleOpenCreateModal}
        totalGoals={goals.length}
      />

      {/* Notificação Toast */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Painel do Estudante com Estatísticas e Progresso */}
        <StatsBar goals={goals} />

        {/* Barra de Busca, Filtros e Ordenação */}
        {!hasNoGoalsAtAll && (
          <FilterControls
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortOption={sortOption}
            onSortOptionChange={setSortOption}
            counts={filterCounts}
          />
        )}

        {/* Informações da listagem */}
        {!hasNoGoalsAtAll && (
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>
                Exibindo <span className="font-semibold text-slate-700">{filteredAndSortedGoals.length}</span> de <span className="font-semibold text-slate-700">{goals.length}</span> objetivos
              </span>
            </div>
            {statusFilter !== 'todos' && (
              <button
                type="button"
                onClick={() => setStatusFilter('todos')}
                className="text-sky-600 hover:text-sky-800 hover:underline cursor-pointer"
              >
                Ver todos os status
              </button>
            )}
          </div>
        )}

        {/* Listagem de Objetivos em Formato de Cartões (Cards) */}
        {hasNoGoalsAtAll ? (
          <EmptyState
            isFiltered={false}
            onOpenNewGoalModal={handleOpenCreateModal}
            onRestoreSamples={handleRestoreSamples}
          />
        ) : isFilteredEmpty ? (
          <EmptyState
            isFiltered={true}
            onOpenNewGoalModal={handleOpenCreateModal}
            onClearFilter={() => {
              setSearchTerm('');
              setStatusFilter('todos');
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAndSortedGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleOpenEditModal}
                onRequestDelete={(g) => setDeletingGoal(g)}
                onQuickStatusChange={handleQuickStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {/* Rodapé Acolhedor */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            StudyFlow · Organização e foco para estudantes iniciantes.
          </p>
          <div className="flex items-center gap-4">
            <span>Persistência local no navegador (localStorage)</span>
          </div>
        </div>
      </footer>

      {/* Modal de Criação / Edição de Objetivo */}
      <GoalFormModal
        isOpen={isFormOpen || Boolean(editingGoal)}
        onClose={() => {
          setIsFormOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={editingGoal ? handleUpdateGoal : handleCreateGoal}
        initialGoal={editingGoal}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingGoal)}
        goal={deletingGoal}
        onCancel={() => setDeletingGoal(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
