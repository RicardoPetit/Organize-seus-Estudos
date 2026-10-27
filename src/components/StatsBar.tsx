import React from 'react';
import { Target, Clock, CheckCircle2, ListOrdered } from 'lucide-react';
import { StudyGoal } from '../types/goal';

interface StatsBarProps {
  goals: StudyGoal[];
}

export const StatsBar: React.FC<StatsBarProps> = ({ goals }) => {
  const total = goals.length;
  const naoIniciados = goals.filter((g) => g.status === 'nao_iniciado').length;
  const emAndamento = goals.filter((g) => g.status === 'em_andamento').length;
  const concluidos = goals.filter((g) => g.status === 'concluido').length;

  const progressoPercent = total > 0 ? Math.round((concluidos / total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Painel do Estudante
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Acompanhe a evolução das suas metas e construa consistência nos estudos.
          </p>
        </div>

        {/* Progresso visual */}
        <div className="w-full md:w-64">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span>Progresso Geral</span>
            <span className="font-mono tabular-nums">{progressoPercent}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${progressoPercent}%` }}
              role="progressbar"
              aria-valuenow={progressoPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Grid de Contadores */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
            <ListOrdered className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono tabular-nums text-slate-900 leading-none">
              {total}
            </span>
            <span className="text-xs text-slate-600 font-medium mt-1 inline-block">
              Total de Metas
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-amber-600 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono tabular-nums text-slate-900 leading-none">
              {naoIniciados}
            </span>
            <span className="text-xs text-slate-600 font-medium mt-1 inline-block">
              Não Iniciados
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-sky-600 shrink-0">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono tabular-nums text-slate-900 leading-none">
              {emAndamento}
            </span>
            <span className="text-xs text-slate-600 font-medium mt-1 inline-block">
              Em Andamento
            </span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="block text-xl font-bold font-mono tabular-nums text-slate-900 leading-none">
              {concluidos}
            </span>
            <span className="text-xs text-slate-600 font-medium mt-1 inline-block">
              Concluídos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
