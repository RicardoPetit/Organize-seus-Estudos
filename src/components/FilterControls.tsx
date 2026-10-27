import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { GoalStatus } from '../types/goal';

export type StatusFilter = 'todos' | GoalStatus;
export type SortOption = 'prazo_asc' | 'prazo_desc' | 'recentes' | 'alfabetica';

interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  sortOption: SortOption;
  onSortOptionChange: (sort: SortOption) => void;
  counts: {
    todos: number;
    nao_iniciado: number;
    em_andamento: number;
    concluido: number;
  };
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortOptionChange,
  counts,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
      {/* Abas funcionais de filtro por status */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
        <button
          type="button"
          onClick={() => onStatusFilterChange('todos')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'todos'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Todos ({counts.todos})
        </button>

        <button
          type="button"
          onClick={() => onStatusFilterChange('nao_iniciado')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'nao_iniciado'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Não iniciados ({counts.nao_iniciado})
        </button>

        <button
          type="button"
          onClick={() => onStatusFilterChange('em_andamento')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'em_andamento'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Em andamento ({counts.em_andamento})
        </button>

        <button
          type="button"
          onClick={() => onStatusFilterChange('concluido')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
            statusFilter === 'concluido'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Concluídos ({counts.concluido})
        </button>
      </div>

      {/* Busca e ordenação */}
      <div className="flex items-center gap-2">
        {/* Campo de pesquisa */}
        <div className="relative flex-1 md:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar objetivos..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-sky-500 transition-colors"
          />
        </div>

        {/* Seleção de ordenação */}
        <div className="flex items-center gap-1.5 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-700 py-1.5 px-2 rounded-lg focus:outline-none focus:bg-white focus:border-sky-500 cursor-pointer"
            aria-label="Ordenar objetivos"
          >
            <option value="prazo_asc">Prazo mais próximo</option>
            <option value="prazo_desc">Prazo mais distante</option>
            <option value="recentes">Criados recentemente</option>
            <option value="alfabetica">Ordem alfabética (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
