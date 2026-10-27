import React from 'react';
import { Sparkles, Plus, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  isFiltered: boolean;
  onOpenNewGoalModal: () => void;
  onClearFilter?: () => void;
  onRestoreSamples?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered,
  onOpenNewGoalModal,
  onClearFilter,
  onRestoreSamples,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-md mx-auto my-6">
        <p className="text-sm font-semibold text-slate-800">
          Nenhum objetivo encontrado com esse filtro
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Tente ajustar sua busca ou selecionar outro status na barra de filtros.
        </p>
        {onClearFilter && (
          <button
            type="button"
            onClick={onClearFilter}
            className="mt-4 px-3 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors cursor-pointer"
          >
            Limpar filtros e ver todos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-8 shadow-xs">
      <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mx-auto mb-4">
        <Sparkles className="w-6 h-6" />
      </div>

      <h3 className="text-lg font-bold text-slate-900">
        Nenhum objetivo cadastrado no momento
      </h3>

      <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed max-w-md mx-auto">
        Começar a aprender algo novo pode parecer desafiador, mas definir metas claras
        e pequenas etapas é o primeiro passo para o sucesso!
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenNewGoalModal}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar meu primeiro objetivo</span>
        </button>

        {onRestoreSamples && (
          <button
            type="button"
            onClick={onRestoreSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Carregar exemplos sugeridos</span>
          </button>
        )}
      </div>
    </div>
  );
};
