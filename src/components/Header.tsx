import React from 'react';
import { BookOpen, Plus } from 'lucide-react';

interface HeaderProps {
  onOpenNewGoalModal: () => void;
  totalGoals: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewGoalModal,
  totalGoals,
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zona 1: Marca do aplicativo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-xs">
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              StudyFlow
            </span>
          </div>
        </div>

        {/* Zona 2: Contexto rápido do estudante */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-600">
          <span>Gestão de Metas de Aprendizado</span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>
            {totalGoals === 1 ? '1 objetivo ativo' : `${totalGoals} objetivos registrados`}
          </span>
        </div>

        {/* Zona 3: Ação primária */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenNewGoalModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span className="whitespace-nowrap">Novo Objetivo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
